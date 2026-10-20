import { animate, useInView } from 'motion/react'
import { useEffect, useRef } from 'react'
import { EASE } from '@/lib/ease'
import { useReducedMotionPref } from '@/lib/motionPrefs'

/** Counts 0 → value once in view; the final value is the accessible label. */
export interface CounterProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  delay?: number
}

export function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 1.4, className = '', delay = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotionPref()
  const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced || !inView) {
      if (reduced) el.textContent = fmt(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE.outExpo,
      onUpdate: (v) => {
        el.textContent = fmt(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value])

  return (
    <span ref={ref} className={`mono tabular-nums ${className}`} aria-label={fmt(value)}>
      {reduced ? fmt(value) : fmt(0)}
    </span>
  )
}
