import { motion } from 'motion/react'
import { useRef } from 'react'
import { EASE } from '@/lib/ease'
import { useReducedMotionPref } from '@/lib/motionPrefs'
import { toggleTheme, useTheme } from '@/lib/theme'

/**
 * Moon-phase theme toggle: a 20 px disc whose copper half rotates 180° between
 * the Midnight and Paper dials. The circular wipe grows from the button's centre.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useTheme()
  const reduced = useReducedMotionPref()
  const ref = useRef<HTMLButtonElement>(null)
  const dark = theme === 'dark'

  const onClick = () => {
    const r = ref.current?.getBoundingClientRect()
    toggleTheme(r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined, reduced)
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label="Dark theme"
      aria-pressed={dark}
      title={dark ? 'Switch to the light theme' : 'Switch to the dark theme'}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-copper transition-colors duration-200 hover:text-copper-hover focus-visible:text-copper-hover active:scale-[0.97] ${className}`}
    >
      <span aria-hidden="true" className="relative block h-5 w-5 overflow-hidden rounded-full border border-current">
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(90deg, currentColor 0 50%, transparent 50% 100%)' }}
          initial={false}
          animate={{ rotate: dark ? 0 : 180 }}
          transition={{ duration: 0.5, ease: EASE.inOutSmooth }}
        />
      </span>
    </button>
  )
}
