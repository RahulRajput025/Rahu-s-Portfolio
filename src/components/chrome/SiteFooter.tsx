import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { FOOTER, NAV, PERSON } from '@/data/content'
import { asset } from '@/lib/asset'
import { EASE } from '@/lib/ease'
import { useClock } from '@/lib/hooks'
import { useReducedMotionPref } from '@/lib/motionPrefs'
import { MotionSwitch } from '@/components/chrome/MotionSwitch'
import { Rise } from '@/components/motion/Rise'
import { Settle } from '@/components/motion/Settle'
import { Monogram } from '@/components/ui/Monogram'
import { ArrowNE, ArrowUp, DocIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'

export function Footer() {
  const year = new Date().getFullYear()
  const clock = useClock(PERSON.timezone, PERSON.timezoneLabel)
  const reduced = useReducedMotionPref()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })

  return (
    <footer ref={ref} id="site-footer" className="relative isolate overflow-clip border-t border-rule">
      <span aria-hidden="true" className="ring-dashed -right-[14vw] -top-[20vw] -z-10 hidden h-[44vw] w-[44vw] opacity-60 lg:block" />
      <span aria-hidden="true" className="orb orb-copper absolute -left-[20vw] bottom-[-30vw] -z-10 h-[60vw] w-[60vw] opacity-80" />

      <div className="shell grid gap-10 pb-10 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        <div className="lg:col-span-7">
          <Settle as="p" className="eyebrow mb-5">
            Next
          </Settle>
          <a href="#contact" className="group block">
            <Rise as="span" text={FOOTER.line} className="h-section block max-w-[16ch]" />
            <motion.span aria-hidden="true" className="mt-5 block h-px w-full max-w-[22rem] origin-left bg-copper" initial={{ scaleX: 0 }} animate={{ scaleX: inView ? 1 : 0 }} transition={{ duration: 1, ease: EASE.outExpo, delay: 0.5 }} />
          </a>
          <Settle as="p" className="caption mt-4 max-w-[46ch]" delay={0.2}>
            {FOOTER.note}
          </Settle>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:pl-8">
          <Settle delay={0.1}>
            <p className="mono-label mb-4">Navigate</p>
            <ul className="grid gap-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="group inline-flex items-center gap-2 text-ink-soft transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                    <span className="h-px w-0 bg-copper transition-[width] duration-300 ease-[var(--ease-out-expo)] group-hover:w-4" aria-hidden="true" />
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={asset(PERSON.resume)} download className="group inline-flex items-center gap-2 text-ink-soft transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                  <span className="h-px w-0 bg-copper transition-[width] duration-300 ease-[var(--ease-out-expo)] group-hover:w-4" aria-hidden="true" />
                  Résumé (PDF)
                  <DocIcon width={14} height={14} />
                </a>
              </li>
            </ul>
          </Settle>
          <Settle delay={0.18}>
            <p className="mono-label mb-4">Elsewhere</p>
            <ul className="grid gap-2.5">
              <li>
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-ink-soft transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                  <LinkedInIcon width={15} height={15} />
                  LinkedIn
                  <ArrowNE width={13} height={13} className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li>
                <a href={PERSON.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-ink-soft transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                  <GitHubIcon width={15} height={15} />
                  GitHub
                  <ArrowNE width={13} height={13} className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            </ul>
            <p className="mono-label mb-2 mt-7">Based in</p>
            <p className="text-ink-soft">{PERSON.location}</p>
            {clock && <p className="mono text-[length:var(--step--1)] text-ink-mute">{clock}</p>}
          </Settle>
        </div>
      </div>

      <div className="shell">
        <div className="hairline" />
        <div className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
          <a href="#hero" className="group flex items-center gap-3" aria-label="Back to the top">
            <Monogram size={44} />
            <span>
              <span className="block font-display text-[length:var(--step-1)] leading-tight">{PERSON.name}</span>
              <span className="caption">
                {PERSON.role} · {PERSON.focus}
              </span>
            </span>
          </a>
          <div className="flex flex-wrap items-center gap-4">
            <MotionSwitch />
            <button type="button" onClick={toTop} className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-rule px-4 text-[length:var(--step--1)] text-ink-soft transition-colors duration-200 hover:border-copper hover:text-copper focus-visible:text-copper">
              Back to top
              <ArrowUp width={15} height={15} className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 pb-8 text-[length:var(--step--1)] text-ink-mute md:flex-row md:items-center md:justify-between">
          <p>© {year} Rahul Rajput</p>
          <p>Built with React, Motion and three.js · no trackers</p>
        </div>
      </div>
    </footer>
  )
}
