import { flushSync } from 'react-dom'
import { createStore } from './store'

export type Theme = 'dark' | 'light'
const KEY = 'rr-theme'
const THEME_COLOR: Record<Theme, string> = { dark: '#090D16', light: '#F5F3EE' }

const isClient = typeof document !== 'undefined'

function readDom(): Theme {
  if (!isClient) return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export const themeStore = createStore<Theme>(readDom())

/** Current theme as React state. Safe to call anywhere. */
export const useTheme = () => themeStore.use()

/** Read the theme outside React (e.g. inside useFrame). */
export const getTheme = () => themeStore.get()

export function hasThemeOverride(): boolean {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark'
  } catch {
    return false
  }
}

export function applyTheme(theme: Theme, persist = true) {
  if (!isClient) return
  const d = document.documentElement
  d.setAttribute('data-theme', theme)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  if (persist) {
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* storage unavailable */
    }
  }
  themeStore.set(theme)
}

/** "System": drop the stored choice and follow the OS. */
export function clearThemeOverride() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark', false)
}

type VTDocument = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> }
}

/**
 * Moon-phase toggle. With the View Transitions API (and motion allowed) the new
 * theme is revealed as a circle growing from `origin`; otherwise it is an
 * instant swap with transitions suppressed for a frame so nothing recolours twice.
 */
export function toggleTheme(origin?: { x: number; y: number }, reduced = false) {
  const next: Theme = themeStore.get() === 'dark' ? 'light' : 'dark'
  setThemeAnimated(next, origin, reduced)
}

export function setThemeAnimated(next: Theme, origin?: { x: number; y: number }, reduced = false) {
  if (!isClient) return
  const d = document.documentElement
  const doc = document as VTDocument
  if (!doc.startViewTransition || reduced || !origin) {
    d.setAttribute('data-theme-switching', '')
    applyTheme(next)
    requestAnimationFrame(() => requestAnimationFrame(() => d.removeAttribute('data-theme-switching')))
    return
  }
  const { x, y } = origin
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  d.setAttribute('data-theme-switching', '')
  let vt: { ready: Promise<void>; finished: Promise<void> }
  try {
    vt = doc.startViewTransition(() => {
      flushSync(() => applyTheme(next))
    })
  } catch {
    applyTheme(next)
    d.removeAttribute('data-theme-switching')
    return
  }
  vt.ready
    .then(() => {
      d.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
    .catch(() => {})
  vt.finished.finally(() => d.removeAttribute('data-theme-switching')).catch(() => {})
}

/** Follow the OS while no explicit choice is stored. Call once at boot. */
export function initTheme() {
  if (!isClient) return
  const mq = window.matchMedia('(prefers-color-scheme: light)')
  const onChange = () => {
    if (!hasThemeOverride()) applyTheme(mq.matches ? 'light' : 'dark', false)
  }
  mq.addEventListener('change', onChange)
}
