import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { NAV, PERSON } from '@/data/content'
import { asset } from '@/lib/asset'
import { EASE } from '@/lib/ease'
import { useScrollLock } from '@/lib/hooks'
import { ThemeToggle } from '@/components/chrome/ThemeToggle'
import { MotionSwitch } from '@/components/chrome/MotionSwitch'
import { Button } from '@/components/ui/Button'
import { Monogram } from '@/components/ui/Monogram'
import { CloseIcon, DocIcon, GitHubIcon, LinkedInIcon, MenuIcon } from '@/components/ui/Icons'

/** Which section crosses the middle band of the viewport (one observer, no scroll work). */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const top = () => {
      if (window.scrollY < 120) setActive('')
    }
    window.addEventListener('scroll', top, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', top)
    }
  }, [ids])
  return active
}

const IDS = NAV.map((n) => n.id)

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 48))
  const active = useActiveSection(IDS)
  const [open, setOpen] = useState(false)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[70]">
      <motion.span aria-hidden="true" className="metal absolute inset-x-0 top-0 h-[2px] origin-left" style={{ scaleX: progress }} />
      <div className="shell">
        <motion.div
          className={`pointer-events-auto relative mt-3 flex h-14 items-center justify-between rounded-full pl-2 pr-2 transition-[background-color,box-shadow,border-color] duration-400 ${
            solid ? 'glass border border-rule shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]' : 'border border-transparent'
          }`}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.1 }}
        >
          <a href="#hero" className="group flex items-center gap-3 rounded-full py-1 pl-1 pr-3" aria-label="Rahul Rajput — top">
            <Monogram size={38} />
            <span className="hidden font-display text-[length:var(--step-0)] sm:inline">{PERSON.name}</span>
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((n) => {
              const on = active === n.id
              return (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[length:var(--step--1)] font-medium transition-colors duration-200 ${on ? 'text-ink' : 'text-ink-soft hover:text-ink'}`}
                >
                  {n.label}
                  {on && <motion.span layoutId="nav-underline" className="absolute inset-x-3.5 -bottom-0.5 h-px bg-copper" transition={{ duration: 0.35, ease: EASE.outExpo }} />}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button href="#contact" size="sm" className="hidden sm:inline-flex">
              Let’s talk
            </Button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              className="pointer-events-auto card glass mt-2 p-3 md:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE.outExpo }}
            >
              <nav aria-label="Primary (mobile)" className="grid">
                {NAV.map((n, i) => (
                  <motion.a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="font-display flex min-h-12 items-center justify-between rounded-xl px-3 text-[length:var(--step-1)] hover:bg-panel"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: EASE.outExpo, delay: 0.05 + i * 0.05 }}
                  >
                    {n.label}
                    <span className="mono text-[length:var(--step--2)] text-copper">0{i + 1}</span>
                  </motion.a>
                ))}
              </nav>
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-rule px-1 pt-3">
                <div className="flex items-center gap-1">
                  <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft hover:text-copper">
                    <LinkedInIcon />
                  </a>
                  <a href={PERSON.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft hover:text-copper">
                    <GitHubIcon />
                  </a>
                  <a href={asset(PERSON.resume)} download aria-label="Download résumé (PDF)" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft hover:text-copper">
                    <DocIcon />
                  </a>
                </div>
                <MotionSwitch />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
