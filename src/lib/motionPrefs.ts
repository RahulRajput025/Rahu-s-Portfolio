import { createStore } from './store'

export type MotionPref = 'system' | 'reduced'
const KEY = 'rr-motion'
const isClient = typeof window !== 'undefined'

const mq = () => window.matchMedia('(prefers-reduced-motion: reduce)')

function readOverride(): MotionPref {
  try {
    return localStorage.getItem(KEY) === 'reduced' ? 'reduced' : 'system'
  } catch {
    return 'system'
  }
}

function compute(): boolean {
  if (!isClient) return false
  return readOverride() === 'reduced' || mq().matches
}

/** true when motion must be reduced — OS preference OR the site-level switch. */
export const reducedMotionStore = createStore<boolean>(compute())
export const motionOverrideStore = createStore<MotionPref>(isClient ? readOverride() : 'system')

export const useReducedMotionPref = () => reducedMotionStore.use()
export const useMotionOverride = () => motionOverrideStore.use()
export const isReducedMotion = () => reducedMotionStore.get()

export function setMotionOverride(pref: MotionPref) {
  if (!isClient) return
  try {
    if (pref === 'reduced') localStorage.setItem(KEY, 'reduced')
    else localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  const d = document.documentElement
  if (pref === 'reduced') d.setAttribute('data-motion', 'reduced')
  else d.removeAttribute('data-motion')
  motionOverrideStore.set(pref)
  reducedMotionStore.set(compute())
}

export function initMotionPrefs() {
  if (!isClient) return
  mq().addEventListener('change', () => reducedMotionStore.set(compute()))
}
