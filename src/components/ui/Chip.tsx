import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface ChipProps extends ComponentPropsWithoutRef<'span'> {
  tone?: 'default' | 'copper' | 'live' | 'warn' | 'ink'
  /** cross-highlight key (StackMap lights every chip with the same tech) */
  tech?: string
  children: ReactNode
  size?: 'sm' | 'md'
}

const tones = {
  default: 'border-rule text-ink-soft',
  copper: 'border-[color-mix(in_oklab,var(--copper)_45%,transparent)] text-copper',
  live: 'border-[color-mix(in_oklab,var(--live)_45%,transparent)] text-live',
  warn: 'border-[color-mix(in_oklab,var(--warn)_45%,transparent)] text-warn',
  ink: 'border-rule-strong text-ink',
}

export function Chip({ tone = 'default', tech, className = '', children, size = 'md', ...rest }: ChipProps) {
  return (
    <span
      data-tech={tech}
      className={`mono inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-[color-mix(in_oklab,var(--panel)_60%,transparent)] ${size === 'sm' ? 'px-2 py-0.5 text-[length:var(--step--2)]' : 'px-2.5 py-1 text-[length:var(--step--2)]'} tracking-wide transition-colors duration-200 ${tones[tone]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}
