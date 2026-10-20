import { Hairline } from '@/components/motion/Draw'
import { Rise } from '@/components/motion/Rise'
import { Settle } from '@/components/motion/Settle'

/**
 * Every section opens the same way: stroke-only ghost numeral, mono eyebrow,
 * H2 words rising from masks, optional lead, then a hairline that draws.
 */
export interface SectionHeadProps {
  numeral: string
  eyebrow: string
  title: string
  lead?: string
  className?: string
  titleClassName?: string
  /** hide the hairline (pinned stages draw their own) */
  noRule?: boolean
  compact?: boolean
}

export function SectionHead({ numeral, eyebrow, title, lead, className = '', titleClassName = '', noRule = false, compact = false }: SectionHeadProps) {
  return (
    <header className={`relative ${compact ? 'mb-8' : 'mb-[clamp(2.5rem,6vh,4.5rem)]'} ${className}`}>
      <span className="ghost-numeral pointer-events-none absolute -top-[0.2em] right-0 select-none text-[3.2rem] sm:-top-[0.35em] sm:text-[length:var(--step-5)]" aria-hidden="true">
        {numeral}
      </span>
      <Settle as="p" className="eyebrow mb-5" amount={0.6}>
        {eyebrow}
      </Settle>
      <Rise as="h2" text={title} className={`h-section max-w-[20ch] ${titleClassName}`} />
      {lead && (
        <Settle as="p" delay={0.15} className="lead measure mt-6 text-ink-soft">
          {lead}
        </Settle>
      )}
      {!noRule && <Hairline className={compact ? 'mt-6' : 'mt-10'} />}
    </header>
  )
}
