// QA harness: serves dist/ (or uses a URL you pass), drives the site in headless
// Chromium, scrolls through every section so scroll-linked work runs, captures
// screenshots per viewport + theme, and reports console errors, failed requests
// and horizontal overflow. Exit code 1 when anything is wrong.
//
//   pnpm build && node qa/shoot.mjs            # serves dist on :4173 itself
//   node qa/shoot.mjs http://127.0.0.1:5173    # or point it at a dev server
//
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'

const PORT = 4173
let url = process.argv[2]
let server = null

if (!url) {
  const bin = join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js')
  server = spawn(process.execPath, [bin, 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
    windowsHide: true,
  })
  url = `http://127.0.0.1:${PORT}/`
  const deadline = Date.now() + 20000
  let up = false
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url)
      if (r.ok) { up = true; break }
    } catch {}
    await new Promise((r) => setTimeout(r, 250))
  }
  if (!up) { server.kill(); console.error('preview server did not start'); process.exit(2) }
}

const outDir = join(process.cwd(), 'qa', 'screenshots')
mkdirSync(outDir, { recursive: true })

const exe =
  process.env.CHROME_PATH ??
  join(os.homedir(), 'AppData', 'Local', 'ms-playwright', 'chromium-1243', 'chrome-win64', 'chrome.exe')
if (!existsSync(exe)) { console.error('Chromium not found at', exe); server?.kill(); process.exit(2) }

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'phone', width: 390, height: 844, mobile: true },
]
const THEMES = ['dark', 'light']
const only = process.env.ONLY // e.g. ONLY=phone-dark

const browser = await chromium.launch({
  executablePath: exe,
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
})
const report = []
let failures = 0

try {
  for (const vp of VIEWPORTS) {
    for (const theme of THEMES) {
      const tag = `${vp.name}-${theme}`
      if (only && only !== tag) continue
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        isMobile: !!vp.mobile,
        hasTouch: !!vp.mobile,
        colorScheme: theme,
      })
      const page = await context.newPage()
      const errors = []
      const warnings = []
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text())
        if (m.type() === 'warning') warnings.push(m.text())
      })
      page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
      page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText ?? ''}`))
      page.on('response', (r) => { if (r.status() >= 400) errors.push(`http ${r.status()}: ${r.url()}`) })

      await page.addInitScript((t) => { try { localStorage.setItem('rr-theme', t) } catch {} }, theme)
      const t0 = Date.now()
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
      await page.waitForTimeout(3500) // let the preloader + hero entrance finish
      const loadMs = Date.now() - t0

      await page.screenshot({ path: join(outDir, `${tag}-00-hero.png`) })

      const total = await page.evaluate(() => document.documentElement.scrollHeight)
      const step = Math.round(vp.height * 0.6)
      let shot = 1
      let i = 0
      for (let y = step; y < total; y += step) {
        await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y)
        await page.waitForTimeout(160)
        i++
        if (shot <= 40 && i % 2 === 0) {
          await page.screenshot({ path: join(outDir, `${tag}-${String(shot).padStart(2, '0')}.png`) })
          shot++
        }
      }
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
      await page.waitForTimeout(700)
      await page.screenshot({ path: join(outDir, `${tag}-99-footer.png`) })

      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.waitForTimeout(500)
      await page.screenshot({ path: join(outDir, `${tag}-full.png`), fullPage: true })

      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth
        const bad = []
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width > 0 && (r.right > w + 1 || r.left < -1)) {
            const cs = getComputedStyle(el)
            if (cs.position === 'fixed') continue
            const cls = typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).slice(0, 2).join('.') : ''
            bad.push(`${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${cls} left=${Math.round(r.left)} right=${Math.round(r.right)}`)
          }
        }
        return { docWidth: document.documentElement.scrollWidth, clientWidth: w, offenders: bad.slice(0, 12) }
      })

      const entry = { tag, loadMs, total, errors, warningsCount: warnings.length, warnings: warnings.slice(0, 10), overflow }
      report.push(entry)
      const overflowing = overflow.docWidth > overflow.clientWidth
      if (errors.length || overflowing) failures++
      console.log(`\n== ${tag} == load ${loadMs}ms · height ${total}px · errors ${errors.length} · warnings ${warnings.length} · docWidth ${overflow.docWidth}/${overflow.clientWidth}`)
      for (const e of errors) console.log('  ERROR:', e.slice(0, 300))
      for (const w of warnings.slice(0, 5)) console.log('  warn:', w.slice(0, 200))
      if (overflowing) console.log('  OVERFLOW offenders:', overflow.offenders)
      await context.close()
    }
  }
} finally {
  await browser.close()
  server?.kill()
}

writeFileSync(join(process.cwd(), 'qa', 'report.json'), JSON.stringify(report, null, 2))
console.log(`\nDone. ${failures ? failures + ' viewport/theme combos with problems' : 'No console errors, no overflow'}. Screenshots in qa/screenshots`)
process.exit(failures ? 1 : 0)
