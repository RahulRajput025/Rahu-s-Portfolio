import { motion, type HTMLMotionProps, type SVGMotionProps } from 'motion/react'
import { EASE } from '@/lib/ease'

/** A hairline that draws left → right (scaleX 0 → 1) when it enters view. */
export interface HairlineProps extends HTMLMotionProps<'span'> {
  delay?: number
  duration?: number
  /** 'copper' draws in copper; default is the neutral rule */
  tone?: 'rule' | 'copper'
  vertical?: boolean
  /** controlled instead of in-view */
  on?: boolean
}

export function Hairline({ delay = 0, duration = 0.8, tone = 'rule', vertical = false, on, className = '', style, ...rest }: HairlineProps) {
  const axis = vertical ? { scaleY: 0 } : { scaleX: 0 }
  const full = vertical ? { scaleY: 1 } : { scaleX: 1 }
  const trigger = on !== undefined ? { animate: on ? full : axis } : { whileInView: full, viewport: { once: true, amount: 0.6 } }
  return (
    <motion.span
      aria-hidden="true"
      className={`block ${vertical ? 'w-px h-full origin-top' : 'h-px w-full origin-left'} ${tone === 'copper' ? 'bg-copper' : 'bg-rule'} ${className}`}
      initial={axis}
      transition={{ duration, ease: EASE.outExpo, delay }}
      style={style}
      {...trigger}
      {...rest}
    />
  )
}

/** Props for an SVG path that draws itself (pathLength 0 → 1). */
export function drawPath(delay = 0, duration = 1, on?: boolean): SVGMotionProps<SVGPathElement> {
  const trigger = on !== undefined ? { animate: { pathLength: on ? 1 : 0, opacity: on ? 1 : 0 } } : { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }
  return {
    initial: { pathLength: 0, opacity: 0 },
    transition: { pathLength: { duration, ease: EASE.inOutSmooth, delay }, opacity: { duration: 0.2, delay } },
    ...trigger,
  }
}

export const MotionPath = motion.path
export const MotionCircle = motion.circle
export const MotionLine = motion.line
export const MotionRect = motion.rect
