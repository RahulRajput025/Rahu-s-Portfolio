import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '@/lib/ease'

/**
 * Masked label swap.
 *  - Hover form (CSS, parent has class "group"): the label slides up and out while
 *    a duplicate slides in from below (350 ms). Hover-only media, so touch never sticks.
 *  - Controlled form: pass `value`; changes swap through the mask (used by
 *    section indicators, step readouts, "Sending… → Delivered").
 */
export function SwapLabel({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block overflow-hidden align-baseline ${className}`}>
      <span className="block transition-transform duration-[350ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-[110%] group-focus-visible:-translate-y-[110%]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-[110%] transition-transform duration-[350ms] ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  )
}

export function Swap({ value, className = '', live = false }: { value: string; className?: string; live?: boolean }) {
  return (
    <span className={`relative inline-grid overflow-hidden align-baseline ${className}`} aria-live={live ? 'polite' : undefined}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="col-start-1 row-start-1 block whitespace-nowrap"
          initial={{ y: '110%', opacity: 0.4 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0.4 }}
          transition={{ duration: 0.35, ease: EASE.outExpo }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
