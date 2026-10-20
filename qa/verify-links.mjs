// Every absolute URL in src/data/content.ts must answer (2xx/3xx). Exit 1 otherwise.
import { readFileSync } from 'node:fs'
const src = readFileSync('src/data/content.ts', 'utf8')
const urls = [...new Set([...src.matchAll(/https?:\/\/[^\s'"`)<>]+/g)].map((m) => m[0].replace(/[.,;]+$/, '')))]
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
let bad = 0
for (const url of urls) {
  let status = 0
  let note = ''
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 20000)
    let r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': ua } })
    if (r.status === 405 || r.status === 403 || r.status === 404) r = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': ua } })
    clearTimeout(t)
    status = r.status
  } catch (e) {
    note = e.name === 'AbortError' ? 'timeout' : e.message
  }
  const ok = status >= 200 && status < 400
  if (!ok) bad++
  console.log(`${ok ? 'OK ' : 'BAD'} ${status || '---'} ${url} ${note}`)
}
console.log(bad ? `\n${bad} broken link(s)` : '\nAll links answer')
process.exit(bad ? 1 : 0)
