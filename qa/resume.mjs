// Builds public/Rahul-Rajput-Resume.pdf from D:/Rahul_Resume_2026.html WITHOUT phone/email
// (LinkedIn + GitHub + city stay). Source résumé is never modified.
import { chromium } from 'playwright-core'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
let html = readFileSync('D:/Rahul_Resume_2026.html', 'utf8')
const before = html.length
html = html.replace(/<span>\+91-9915084857<\/span>\s*/g, '')
html = html.replace(/<span><a href="mailto:[^"]*">[^<]*<\/a><\/span>\s*/g, '')
html = html.replace(/(<span><a href="https:\/\/github\.com\/RahulRajput025">github\.com\/RahulRajput025<\/a><\/span>)/, '<span><a href="https://www.linkedin.com/in/rahul-rajput-828a71216/">linkedin.com/in/rahul-rajput-828a71216</a></span>\n    $1')
if (html.length === before) { console.error('contact block not found — résumé HTML changed'); process.exit(1) }
if (/9915084857|rahulrajput02525/.test(html)) { console.error('phone/email still present'); process.exit(1) }
writeFileSync('qa/resume-public.html', html)
const exe = process.env.CHROME_PATH ?? join(os.homedir(), 'AppData', 'Local', 'ms-playwright', 'chromium-1243', 'chrome-win64', 'chrome.exe')
const browser = await chromium.launch({ executablePath: exe, headless: true })
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle' })
await page.pdf({ path: 'public/Rahul-Rajput-Resume.pdf', preferCSSPageSize: true, printBackground: true, tagged: true })
await browser.close()
console.log('résumé PDF written without phone/email')
