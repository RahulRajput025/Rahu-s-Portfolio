// Hero probe: waits for the ambient scene, screenshots the hero in the starting theme,
// toggles the theme twice and screenshots again — to compare ring rendering per theme.
//   node qa/probe.mjs [dark|light]
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import os from 'node:os'

const theme = process.argv[2] ?? 'dark'
const PORT = 4400 + Math.floor(Math.random() * 300)
const server = spawn(process.execPath, [join('node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], { stdio: 'ignore', windowsHide: true })
const url = `http://127.0.0.1:${PORT}/`
for (let i = 0; i < 60; i++) {
  try { if ((await fetch(url)).ok) break } catch {}
  await new Promise((r) => setTimeout(r, 250))
}
const exe = process.env.CHROME_PATH ?? join(os.homedir(), 'AppData', 'Local', 'ms-playwright', 'chromium-1243', 'chrome-win64', 'chrome.exe')
const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme })
  const page = await ctx.newPage()
  page.on('console', (m) => { if (m.type() !== 'log') console.log('console:', m.type(), m.text().slice(0, 200)) })
  page.on('pageerror', (e) => console.log('pageerror:', e.message))
  await page.addInitScript((t) => { try { localStorage.setItem('rr-theme', t) } catch {} }, theme)
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(7000)
  const hasCanvas = await page.evaluate(() => !!document.querySelector('#hero canvas'))
  console.log('canvas mounted:', hasCanvas, 'theme:', await page.evaluate(() => document.documentElement.dataset.theme))
  await page.screenshot({ path: `qa/screenshots/probe-${theme}-1.png` })
  await page.click('button[aria-label="Dark theme"]')
  await page.waitForTimeout(2500)
  console.log('after toggle theme:', await page.evaluate(() => document.documentElement.dataset.theme))
  await page.screenshot({ path: `qa/screenshots/probe-${theme}-2-toggled.png` })
  await page.click('button[aria-label="Dark theme"]')
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `qa/screenshots/probe-${theme}-3-back.png` })
  await ctx.close()
} finally {
  await browser.close()
  server.kill()
}
console.log('probe done')
