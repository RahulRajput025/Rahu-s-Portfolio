import { motion } from 'motion/react'
import { SPRING } from '@/lib/ease'
import { setMotionOverride, useMotionOverride } from '@/lib/motionPrefs'

/**
 * Site-level reduced-motion switch (role="switch"). The OS preference still wins
 * whenever it is set; this adds a way to turn motion down without it.
 */
export function MotionSwitch({ className = '', label = 'Reduce motion' }: { className?: string; label?: string }) {
  const override = useMotionOverride()
  const on = override === 'reduced'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setMotionOverride(on ? 'system' : 'reduced')}
      className={`group inline-flex min-h-11 items-center gap-3 text-[length:var(--step--1)] text-ink-soft transition-colors duration-200 hover:text-ink focus-visible:text-ink ${className}`}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 ${
          on ? 'border-copper bg-[color-mix(in_oklab,var(--copper)_28%,transparent)]' : 'border-rule-strong bg-panel'
        }`}
      >
        <motion.span
          className={`absolute left-[2px] top-[2px] h-[14px] w-[14px] rounded-full transition-colors duration-200 ${on ? 'bg-copper' : 'bg-rule-strong'}`}
          initial={false}
          animate={{ x: on ? 16 : 0 }}
          transition={SPRING.knob}
        />
      </span>
    </button>
  )
}
