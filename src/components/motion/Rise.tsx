import { motion, type Variants } from 'motion/react'
import { createElement, Fragment, type ElementType } from 'react'
import { EASE } from '@/lib/ease'
import { useReducedMotionPref } from '@/lib/motionPrefs'

/**
 * Word-mask rise: each word climbs out of its own overflow-hidden mask.
 * `*word*` marks italic copper emphasis. Splits by word only; the element
 * keeps the full text as aria-label and the spans are aria-hidden.
 */
export interface RiseProps {
  text: string
  as?: ElementType
  className?: string
  /** seconds before the first word */
  delay?: number
  stagger?: number
  duration?: number
  /** animate on mount instead of in view */
  immediate?: boolean
  amount?: number
  once?: boolean
  id?: string
}

const wordVariants: Variants = {
  hidden: { y: '112%', rotate: 2.5 },
  show: (custom: { duration: number }) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: custom.duration, ease: EASE.word },
  }),
}

export function parseEm(text: string): { word: string; em: boolean }[] {
  const out: { word: string; em: boolean }[] = []
  let em = false
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    let w = raw
    let thisEm = em
    if (w.startsWith('*')) {
      em = true
      thisEm = true
      w = w.slice(1)
    }
    if (w.endsWith('*') || /\*[.,;:!?]$/.test(w)) {
      em = false
      w = w.replace('*', '')
    }
    out.push({ word: w, em: thisEm })
  }
  return out
}

export function Rise({
  text,
  as = 'span',
  className,
  delay = 0,
  stagger = 0.075,
  duration = 0.9,
  immediate = false,
  amount = 0.3,
  once = true,
  id,
}: RiseProps) {
  const reduced = useReducedMotionPref()
  const words = parseEm(text)
  const plain = words.map((w) => w.word).join(' ')

  const container: Variants = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  }

  // the space must live OUTSIDE the inline-block mask (trailing whitespace inside one is dropped)
  const children = words.map((w, i) => (
    <Fragment key={i}>
      <span className="mask inline-block align-top" aria-hidden="true">
        <motion.span
          className={`inline-block will-change-transform ${w.em ? 'italic font-light text-copper' : ''}`}
          variants={wordVariants}
          custom={{ duration }}
          style={reduced ? { transform: 'none' } : undefined}
        >
          {w.word}
        </motion.span>
      </span>
      {i < words.length - 1 ? ' ' : null}
    </Fragment>
  ))

  const props = {
    id,
    className,
    'aria-label': plain,
    variants: container,
    initial: reduced ? 'show' : 'hidden',
    ...(immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once, amount } }),
  }

  return createElement(motionTag(as), props, children)
}

// one motion component per tag, created once (a new component per render would remount the words)
const cache = new Map<string, typeof motion.span>()
function motionTag(as: ElementType): typeof motion.span {
  const key = typeof as === 'string' ? as : 'span'
  let c = cache.get(key)
  if (!c) {
    c = motion.create(key as keyof HTMLElementTagNameMap) as typeof motion.span
    cache.set(key, c)
  }
  return c
}
