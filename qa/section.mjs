// Per-section visual check. Builds into its own output dir (so parallel runs never
// collide), serves it on a free port, scrolls through ONE section at several
// positions and screenshots each, in the requested viewports and themes.
//
//   node qa/section.mjs <sectionId> [--vp desktop|phone|tablet|all] [--theme dark|light|all]
//                       [--steps 5] [--no-build] [--tier 3] [--reduced]
//
// Output: qa/screenshots/sec-<id>-<vp>-<theme>-<k>.png  (+ console errors printed)
import { chromium } from 'playwright-core'
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'

const args = process.argv.slice(2)
const id = args.find((a) => !a.startsWith('--'))
if (!id) {
  console.error('usage: node qa/section.mjs <sectionId> [--vp desktop|phone|tablet|all] [--theme dark|light|all] [--steps 5] [--no-build] [--tier N] [--reduced]')
  process.exit(2)
}
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : def
}
const flag = (name) => args.includes(`--${name}`)
const vpSel = opt('vp', 'all')
const themeSel = opt('theme', 'all')
const steps = Math.max(2, Number(opt('steps', '5')))
const tier = opt('tier', null)
const reduced = flag('reduced')

const outDir = join(process.cwd(), 'qa', `dist-${id}`)
if (!flag('no-build')) {
  const r = spawnSync(process.execPath, [join('node_modules', 'vite', 'bin', 'vite.js'), 'build', '--outDir', outDir, '--emptyOutDir'], { stdio: 'inherit', windowsHide: true })
  if (r.status !== 0) {
    console.error('build failed')
    process.exit(1)
  }
} else if (!existsSync(outDir)) {
  console.error('no previous build at', outDir, '— run without --no-build first')
  process.exit(2)
}

// serve on a free port
const port = 4300 + Math.floor(Math.random() * 500)
const server = spawn(process.execPath, [join('node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--outDir', outDir, '--host', '127.0.0.1', '--port', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
  windowsHide: true,
  env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }, // keep the printed URL free of ANSI codes
})
const url = await new Promise((resolve, reject) => {
  let buf = ''
  const t = setTimeout(() => reject(new Error('preview did not start')), 20000)
  server.stdout.on('data', (d) => {
    buf += d.toString()
    const m = buf.match(/https?:\/\/127\.0\.0\.1:(\d+)\//)
    if (m) {
      clearTimeout(t)
      resolve(m[0])
    }
  })
  server.stderr.on('data', (d) => { buf += d.toString() })
}).catch((e) => {
  server.kill()
  console.error(e.message)
  process.exit(2)
})

const shots = join(process.cwd(), 'qa', 'screenshots')
mkdirSync(shots, { recursive: true })
const exe = process.env.CHROME_PATH ?? join(os.homedir(), 'AppData', 'Local', 'ms-playwright', 'chromium-1243', 'chrome-win64', 'chrome.exe')

const ALL_VP = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1112, mobile: true },
  { name: 'phone', width: 390, height: 844, mobile: true },
]
const VPS = vpSel === 'all' ? ALL_VP.filter((v) => v.name !== 'tablet') : ALL_VP.filter((v) => v.name === vpSel)
const THEMES = themeSel === 'all' ? ['dark', 'light'] : [themeSel]

const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
let problems = 0
try {
  for (const vp of VPS) {
    for (const theme of THEMES) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        isMobile: !!vp.mobile,
        hasTouch: !!vp.mobile,
        colorScheme: theme,
        reducedMotion: reduced ? 'reduce' : 'no-preference',
      })
      const page = await ctx.newPage()
      const errors = []
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
      page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
      page.on('response', (r) => { if (r.status() >= 400) errors.push(`http ${r.status()}: ${r.url()}`) })
      await page.addInitScript((t) => { try { localStorage.setItem('rr-theme', t); sessionStorage.setItem('rr-wound', '1') } catch {} }, theme)
      const q = tier ? `?tier=${tier}` : ''
      await page.goto(url + q, { waitUntil: 'networkidle', timeout: 60000 })
      await page.waitForTimeout(1500)

      const box = await page.evaluate((sid) => {
        const el = document.getElementById(sid)
        if (!el) return null
        const r = el.getBoundingClientRect()
        return { top: r.top + window.scrollY, height: r.height, vh: window.innerHeight }
      }, id)
      if (!box) {
        console.error(`section #${id} not found (${vp.name}/${theme})`)
        problems++
        await ctx.close()
        continue
      }
      const pinned = box.height > box.vh * 1.25
      const positions = []
      if (pinned) {
        for (let k = 0; k < steps; k++) positions.push(box.top + ((box.height - box.vh) * k) / (steps - 1))
      } else {
        // approach, centred, leaving
        positions.push(Math.max(0, box.top - box.vh * 0.7))
        positions.push(Math.max(0, box.top - box.vh * 0.35))
        positions.push(Math.max(0, box.top + box.height / 2 - box.vh / 2))
        if (box.height > box.vh * 0.9) positions.push(box.top + box.height - box.vh)
      }
      // warm up: scroll gradually to the section so reveals above have fired
      for (let y = 0; y < positions[0]; y += box.vh * 0.6) {
        await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y)
        await page.waitForTimeout(60)
      }
      let k = 0
      for (const y of positions) {
        await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y)
        await page.waitForTimeout(pinned ? 900 : 1400)
        const file = join(shots, `sec-${id}-${vp.name}-${theme}-${k}.png`)
        await page.screenshot({ path: file })
        console.log('saved', file)
        k++
      }
      const overflow = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }))
      if (overflow.doc > overflow.client) {
        problems++
        console.log(`  OVERFLOW: document ${overflow.doc}px > viewport ${overflow.client}px (${vp.name}/${theme})`)
      }
      if (errors.length) {
        problems++
        console.log(`  ${errors.length} console/page errors (${vp.name}/${theme}):`)
        for (const e of errors.slice(0, 8)) console.log('   -', e.slice(0, 240))
      }
      await ctx.close()
    }
  }
} finally {
  await browser.close()
  server.kill()
}
console.log(problems ? `Done with ${problems} problem(s).` : 'Done — no errors, no overflow.')
process.exit(problems ? 1 : 0)
