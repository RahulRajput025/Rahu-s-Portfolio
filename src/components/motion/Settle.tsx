import { motion, type HTMLMotionProps, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE } from '@/lib/ease'

/**
 * The default reveal: content settles into place (opacity 0 → 1, y 24 → 0,
 * scale .985 → 1, 700 ms, expo-out), once, when 30 % is in view.
 * Inside a <SettleGroup> children inherit the parent's stagger (set `inherit`).
 */
export const settleVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: custom.duration ?? 0.7, ease: EASE.outExpo, delay: custom.delay ?? 0 },
  }),
}

type Tag = 'div' | 'section' | 'li' | 'ul' | 'p' | 'span' | 'article' | 'figure' | 'header' | 'footer' | 'h2' | 'h3' | 'dl' | 'tr'

export interface SettleProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  as?: Tag
  delay?: number
  duration?: number
  amount?: number
  once?: boolean
  /** take variants from a parent SettleGroup instead of own viewport trigger */
  inherit?: boolean
  children?: ReactNode
}

export function Settle({ as = 'div', delay = 0, duration, amount = 0.2, once = true, inherit = false, children, ...rest }: SettleProps) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      className="reveal"
      variants={settleVariants}
      custom={{ delay, duration }}
      {...(inherit ? {} : { initial: 'hidden', whileInView: 'show', viewport: { once, amount } })}
      {...rest}
    >
      {children}
    </M>
  )
}

export interface SettleGroupProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  as?: Tag
  stagger?: number
  delay?: number
  amount?: number
  once?: boolean
  children?: ReactNode
}

/** Parent-owned stagger (beforeChildren). Children use <Settle inherit>.
 *  `amount` stays tiny: a tall group on a phone can never have a quarter of itself in view. */
export function SettleGroup({ as = 'div', stagger = 0.08, delay = 0, amount = 0.05, once = true, children, ...rest }: SettleGroupProps) {
  const M = motion[as] as typeof motion.div
  const variants: Variants = {
    hidden: {},
    show: { transition: { when: 'beforeChildren', delayChildren: delay, staggerChildren: stagger } },
  }
  return (
    <M variants={variants} initial="hidden" whileInView="show" viewport={{ once, amount }} {...rest}>
      {children}
    </M>
  )
}
