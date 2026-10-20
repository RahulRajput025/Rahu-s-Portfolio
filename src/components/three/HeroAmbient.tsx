import { useEffect, useRef } from 'react'
import { useIsDesktop } from '@/lib/hooks'
import { useReducedMotionPref } from '@/lib/motionPrefs'
import { getTheme, useTheme } from '@/lib/theme'
import type { AmbientHandle } from '@/three/ambient'

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}
type NetNavigator = Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }

/**
 * Progressive enhancement: on desktop, after the page is idle, on a decent
 * connection, with motion allowed and WebGL available, the three.js ambient
 * scene is fetched (its own chunk) and mounted behind the portrait. The page
 * never waits for it.
 */
export function HeroAmbient({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const handle = useRef<AmbientHandle | null>(null)
  const desktop = useIsDesktop()
  const reduced = useReducedMotionPref()
  const theme = useTheme()

  useEffect(() => {
    const el = ref.current
    if (!el || !desktop || reduced) return
    const conn = (navigator as NetNavigator).connection
    if (conn?.saveData || /^(slow-2g|2g|3g)$/.test(conn?.effectiveType ?? '')) return
    let cancelled = false
    const w = window as IdleWindow
    const start = () => {
      if (cancelled) return
      import('@/three/ambient')
        .then((m) => {
          if (cancelled) return
          handle.current = m.mountAmbient(el, { theme: getTheme() })
        })
        .catch(() => {
          /* decorative only */
        })
    }
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 3000 }) : window.setTimeout(start, 1500)
    return () => {
      cancelled = true
      if (typeof w.requestIdleCallback === 'function' && typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(id)
      else window.clearTimeout(id)
      handle.current?.dispose()
      handle.current = null
    }
  }, [desktop, reduced])

  useEffect(() => {
    handle.current?.setTheme(theme)
  }, [theme])

  return <div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
