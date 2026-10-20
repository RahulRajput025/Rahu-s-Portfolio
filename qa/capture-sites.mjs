// Captures real screenshots of Rahul's live products for the Work section.
//   node qa/capture-sites.mjs
// Writes public/shots/<id>-desktop.webp (1440x900) and <id>-phone.webp (390x844).
import { chromium } from 'playwright-core'
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'

const SITES = [
  { id: 'vedicvaibhav', url: 'https://vedicvaibhav.com/' },
  { id: 'astrovaibhav', url: 'https://astrovaibhav.com/' },
  { id: 'vedicshop', url: 'https://vedicshop.store/' },
  { id: 'panditji', url: 'https://panditjiatrequest.com/' },
]
const SHAPES = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'phone', width: 390, height: 844, mobile: true },
]

const exe =
  process.env.CHROME_PATH ??
  join(os.homedir(), 'AppData', 'Local', 'ms-playwright', 'chromium-1243', 'chrome-win64', 'chrome.exe')
const out = join(process.cwd(), 'public', 'shots')
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ executablePath: exe, headless: true })
try {
  for (const site of SITES) {
    for (const s of SHAPES) {
      const ctx = await browser.newContext({
        viewport: { width: s.width, height: s.height },
        deviceScaleFactor: 2,
        isMobile: s.mobile,
        hasTouch: s.mobile,
        userAgent: s.mobile
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
          : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        locale: 'en-IN',
      })
      const page = await ctx.newPage()
      try {
        await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {})
        await page.waitForTimeout(2500)
        // dismiss obvious cookie/consent/promo overlays if present
        for (const sel of ['button:has-text("Accept")', 'button:has-text("Got it")', 'button:has-text("Close")', '[aria-label="Close"]', '.close', '.popup-close']) {
          const b = page.locator(sel).first()
          if (await b.isVisible().catch(() => false)) { await b.click({ timeout: 1000 }).catch(() => {}); await page.waitForTimeout(400) }
        }
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(300)
        const png = await page.screenshot({ type: 'png' })
        const file = join(out, `${site.id}-${s.name}.webp`)
        await sharp(png).webp({ quality: 82 }).toFile(file)
        console.log('saved', file)
      } catch (e) {
        console.error('FAILED', site.id, s.name, e.message)
      } finally {
        await ctx.close()
      }
    }
  }
} finally {
  await browser.close()
}
