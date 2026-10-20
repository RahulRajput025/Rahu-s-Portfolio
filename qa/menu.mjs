// Phone interaction probe: open the mobile menu, toggle the theme, submit an empty form (validation).
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import os from 'node:os'
const PORT = 4500 + Math.floor(Math.random() * 300)
const server = spawn(process.execPath, [join('node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], { stdio: 'ignore', windowsHide: true })
const url = `http://127.0.0.1:${PORT}/`
for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break } catch {} await new Promise((r) => setTimeout(r, 250)) }
const exe = process.env.CHROME_PATH ?? join(os.homedir(), 'AppData', 'Local', 'ms-playwright', 'chromium-1243', 'chrome-win64', 'chrome.exe')
const browser = await chromium.launch({ executablePath: exe, headless: true })
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: 'dark' })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.click('button[aria-label="Open menu"]')
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'qa/screenshots/probe-menu-open.png' })
  console.log('menu expanded:', await page.getAttribute('button[aria-controls="mobile-menu"]', 'aria-expanded'))
  await page.click('#mobile-menu a[href="#contact"]')
  await page.waitForTimeout(1200)
  console.log('menu closed after nav:', (await page.$('#mobile-menu')) === null, '· scrollY', await page.evaluate(() => Math.round(window.scrollY)))
  await page.click('button[aria-label="Dark theme"]')
  await page.waitForTimeout(900)
  console.log('theme after toggle:', await page.evaluate(() => document.documentElement.dataset.theme))
  await page.click('button[type="submit"]')
  await page.waitForTimeout(400)
  const errs = await page.$$eval('.field .error', (els) => els.map((e) => e.textContent))
  console.log('validation messages:', errs)
  await page.screenshot({ path: 'qa/screenshots/probe-contact-validation.png' })
  console.log('errors:', errors.length ? errors : 'none')
  await ctx.close()
} finally {
  await browser.close()
  server.kill()
}
