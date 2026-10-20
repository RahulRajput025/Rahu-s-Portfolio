import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { SwapLabel } from '@/components/motion/Swap'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
type Size = 'md' | 'sm'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconEnd?: boolean
  className?: string
  children: string
  /** masked label swap on hover (default on for primary/secondary) */
  swap?: boolean
}
type AnchorProps = BaseProps & { href: string; download?: boolean | string; external?: boolean } & Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'href'>
type NativeProps = BaseProps & { href?: undefined; external?: undefined; download?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, 'children'>
export type ButtonProps = AnchorProps | NativeProps

const base =
  'group btn-press inline-flex items-center justify-center gap-2 rounded-full font-medium select-none whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 ease-[var(--ease-out-quart)]'
const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 text-[length:var(--step-0)]',
  sm: 'min-h-9 px-4 text-[length:var(--step--1)]',
}
const variants: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-[oklch(from_var(--primary-fill)_calc(l+0.06)_c_h)] shadow-[0_1px_0_oklch(100%_0_0/0.12)_inset]',
  secondary: 'border border-rule-strong text-ink hover:border-copper hover:text-copper',
  ghost: 'text-ink-soft hover:text-ink',
  link: 'min-h-0 rounded-none px-0 text-copper bg-[linear-gradient(var(--copper),var(--copper))] bg-[length:100%_1px] bg-[position:0_100%] bg-no-repeat hover:bg-[length:0%_1px] pb-0.5',
}

/**
 * Pill button. Renders <a> when `href` is given (external → new tab, download →
 * download attribute), otherwise <button>. Labels are strings so they can swap.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconEnd = true, className = '', children, swap } = props
  const doSwap = swap ?? (variant === 'primary' || variant === 'secondary')
  const cls = `${base} ${variant === 'link' ? '' : sizes[size]} ${variants[variant]} ${className}`
  const label = doSwap ? <SwapLabel>{children}</SwapLabel> : <span>{children}</span>
  const inner = (
    <>
      {icon && !iconEnd && <span className="inline-flex shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      {label}
      {icon && iconEnd && <span className="inline-flex shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
    </>
  )
  if (props.href !== undefined) {
    const { href, download, external, variant: _v, size: _s, icon: _i, iconEnd: _e, className: _c, children: _ch, swap: _sw, ...rest } = props
    return (
      <a
        href={href}
        className={cls}
        {...(download ? { download: download === true ? '' : download } : {})}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {inner}
      </a>
    )
  }
  const { variant: _v, size: _s, icon: _i, iconEnd: _e, className: _c, children: _ch, swap: _sw, href: _h, external: _x, download: _d, type, ...rest } = props
  return (
    <button type={type ?? 'button'} className={cls} {...rest}>
      {inner}
    </button>
  )
}

export const ArrowNE = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12 12 4M6 4h6v6" />
  </svg>
)
export const ArrowDown = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
)
export const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)
