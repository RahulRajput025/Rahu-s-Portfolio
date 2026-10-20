import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'
import { useInView } from 'motion/react'

const isClient = typeof window !== 'undefined'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      if (!isClient) return () => {}
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => (isClient ? window.matchMedia(query).matches : false),
    () => false,
  )
}

/** ≥ 1061px: desktop header nav, spine, no dock */
export const useIsNav = () => useMediaQuery('(min-width: 1061px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

/** true after first client render — gate time-dependent text to avoid mismatches */
export function useMounted(): boolean {
  const [m, setM] = useState(false)
  useEffect(() => setM(true), [])
  return m
}

export function useInViewOnce(ref: RefObject<Element | null>, amount = 0.3, margin?: string) {
  return useInView(ref, { once: true, amount, ...(margin ? { margin: margin as never } : {}) })
}

/** Live local time such as "14:32 IST"; empty until mounted; ticks every 30 s. */
export function useClock(timeZone = 'Asia/Kolkata', label = 'IST'): string {
  const [text, setText] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone })
    const tick = () => setText(`${fmt.format(new Date())} ${label}`)
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [timeZone, label])
  return text
}

/** Writes --pointer-x/--pointer-y (px) on the element for the .specular highlight. Fine pointers only. */
export function usePointerSpecular<T extends HTMLElement>(ref: RefObject<T | null>) {
  const fine = useFinePointer()
  useEffect(() => {
    const el = ref.current
    if (!el || !fine) return
    let raf = 0
    let x = 0
    let y = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x = e.clientX - r.left
      y = e.clientY - r.top
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--pointer-x', `${x}px`)
          el.style.setProperty('--pointer-y', `${y}px`)
          raf = 0
        })
      }
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      el.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, fine])
}

/** Lock document scrolling while `locked` (menus, dialogs). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [locked])
}

/** document.visibilityState === 'visible' */
export function usePageVisible(): boolean {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener('visibilitychange', cb)
      return () => document.removeEventListener('visibilitychange', cb)
    },
    () => document.visibilityState === 'visible',
    () => true,
  )
}

/** Previous value of anything. */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

/** Copy text; resolves true on success. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
