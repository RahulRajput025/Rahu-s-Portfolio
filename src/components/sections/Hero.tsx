import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { HERO, PERSON } from '@/data/content'
import { PORTRAIT_BLUR } from '@/data/portraitBlur'
import { asset } from '@/lib/asset'
import { EASE } from '@/lib/ease'
import { useClock } from '@/lib/hooks'
import { Counter } from '@/components/motion/Counter'
import { Rise } from '@/components/motion/Rise'
import { Settle } from '@/components/motion/Settle'
import { useTilt } from '@/components/motion/useTilt'
import { Button } from '@/components/ui/Button'
import { ArrowDown, DocIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'
import { HeroAmbient } from '@/components/three/HeroAmbient'

/** floating elements around the plate: [position classes, translateZ px, float variant] */
const FLOATERS: { pos: string; z: number; float: string }[] = [
  { pos: '-right-5 top-[24%] lg:-right-6', z: 58, float: 'float-a' },
  { pos: '-left-4 top-[47%] lg:-left-5', z: 66, float: 'float-b' },
  { pos: '-right-3 bottom-[34%] lg:-right-4', z: 60, float: 'float-a' },
  { pos: '-left-5 bottom-[19%] lg:-left-6', z: 72, float: 'float-b' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  const tilt = useTilt(plateRef, 7)
  const clock = useClock(PERSON.timezone, PERSON.timezoneLabel)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section ref={ref} id="hero" className="relative isolate pt-[calc(var(--header-h)+1.5rem)] pb-12 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20 lg:pt-[calc(var(--header-h)+2rem)]" aria-labelledby="hero-title">
      <motion.span className="orb orb-copper orb-drift -left-[22vw] top-[18vh] -z-10 h-[64vw] w-[64vw]" style={{ y: orbY }} aria-hidden="true" />
      <motion.span className="orb orb-sapphire orb-drift-b -right-[18vw] -top-[14vh] -z-10 h-[56vw] w-[56vw]" style={{ y: orbY }} aria-hidden="true" />

      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-16">
        {/* portrait plate — first on phones, right column on desktop */}
        <div className="order-first lg:order-none lg:col-span-6 lg:col-start-7">
          <div className="relative mx-auto mt-4 w-[min(68vw,300px)] lg:ml-auto lg:mr-4 lg:mt-0 lg:w-[min(100%,460px)] xl:w-[min(100%,520px)]" style={{ perspective: 1500 }}>
            <HeroAmbient className="absolute -inset-[26%] -z-10 hidden lg:block" />
            <span aria-hidden="true" className="ring-dashed -inset-[9%] -z-10 hidden lg:block" />

            <motion.div ref={plateRef} className="relative" style={{ ...tilt, y: plateY }}>
              <span aria-hidden="true" className="metal absolute inset-0 rounded-[30px] opacity-25" style={{ transform: 'translate3d(26px, 30px, -90px) rotate(5deg)' }} />
              <span aria-hidden="true" className="absolute -inset-[6px] rounded-[30px] border border-[color-mix(in_oklab,var(--copper)_55%,transparent)]" style={{ transform: 'translate3d(14px, 14px, -40px)' }} />

              <motion.figure
                className="relative overflow-hidden rounded-[24px] bg-panel"
                style={{ boxShadow: 'var(--shadow-card)' }}
                initial={{ clipPath: 'inset(10% round 24px)', opacity: 0 }}
                animate={{ clipPath: 'inset(0% round 24px)', opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE.outExpo, delay: 0.25 }}
              >
                <div className="aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url(${PORTRAIT_BLUR})` }}>
                  <motion.img
                    src={asset(PERSON.portrait.large)}
                    srcSet={`${asset(PERSON.portrait.small)} 720w, ${asset(PERSON.portrait.large)} 1122w`}
                    sizes="(max-width: 1023px) 300px, (max-width: 1279px) 460px, 520px"
                    width={1122}
                    height={1402}
                    alt={PERSON.portrait.alt}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: EASE.outExpo, delay: 0.25 }}
                  />
                </div>
                <span aria-hidden="true" className="absolute inset-0 mix-blend-multiply" style={{ background: 'color-mix(in oklab, var(--copper-raw) 9%, transparent)' }} />
                <span aria-hidden="true" className="absolute inset-0 rounded-[24px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09), inset 0 -90px 110px -60px rgba(7,11,20,0.75)' }} />
                <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 58%, rgba(7,11,20,0.92) 100%)' }} />
                <span aria-hidden="true" className="tick tick-tl" />
                <span aria-hidden="true" className="tick tick-tr" />
                <span aria-hidden="true" className="tick tick-bl" />
                <span aria-hidden="true" className="tick tick-br" />

                <figcaption className="absolute inset-x-5 bottom-4 hidden items-end justify-between gap-3 text-[#f4f0e8] lg:inset-x-6 lg:bottom-5 lg:flex">
                  <span>
                    <span className="block font-display text-[length:var(--step-1)] leading-tight">{PERSON.name}</span>
                    <span className="mono text-[10px] uppercase tracking-[0.14em] text-[#c9d0dc] lg:text-[11px]">
                      {PERSON.locationShort}
                      {clock ? ` · ${clock}` : ''}
                    </span>
                  </span>
                  <span className="mono hidden rounded-full border border-[#f4f0e8]/30 bg-[#070b14]/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] sm:inline-block">{PERSON.focus}</span>
                </figcaption>
              </motion.figure>

              <motion.span
                className="absolute -left-6 top-[7%] lg:-left-7"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.9 }}
              >
                <span className="chip-glass float-a" style={{ transform: 'translateZ(78px)' }}>
                  {HERO.badge}
                </span>
              </motion.span>

              {HERO.chips.map((chip, i) => {
                const f = FLOATERS[i]!
                return (
                  <motion.span
                    key={chip}
                    className={`absolute ${f.pos}`}
                    style={{ transformStyle: 'preserve-3d' }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE.outExpo, delay: 1.02 + i * 0.1 }}
                  >
                    <span className={`chip-glass ${f.float}`} style={{ transform: `translateZ(${f.z}px)`, animationDelay: `${0.6 + i * 0.7}s` }}>
                      {chip}
                    </span>
                  </motion.span>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* copy */}
        <motion.div className="lg:col-span-6 lg:col-start-1 lg:row-start-1" style={{ y: copyY, opacity: copyOpacity }}>
          <Settle as="p" className="eyebrow mb-5 lg:mb-6" delay={0.05}>
            {HERO.kicker}
          </Settle>
          <Rise as="h1" id="hero-title" text={HERO.title} className="h-display" immediate delay={0.18} />
          <Rise as="p" text={HERO.line} className="h-sub mt-4 text-ink-soft lg:mt-5" immediate delay={0.42} stagger={0.05} />
          <Settle as="p" className="lead measure mt-6 text-ink-soft lg:mt-7" delay={0.62}>
            {HERO.lead}
          </Settle>
          <Settle className="mt-7 flex flex-wrap items-center gap-3 lg:mt-8" delay={0.74}>
            <Button href="#work" icon={<ArrowDown />}>
              See the work
            </Button>
            <Button href="#contact" variant="secondary">
              Let’s talk
            </Button>
            <span className="ml-1 flex items-center gap-1">
              <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                <LinkedInIcon />
              </a>
              <a href={PERSON.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                <GitHubIcon />
              </a>
              <a href={asset(PERSON.resume)} download aria-label="Download résumé (PDF)" title="Résumé (PDF)" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                <DocIcon />
              </a>
            </span>
          </Settle>

          <Settle as="dl" className="mt-9 grid max-w-[600px] grid-cols-3 gap-4 border-t border-rule pt-6 lg:mt-10" delay={0.9}>
            {HERO.stats.map((s) => (
              <div key={s.label}>
                <dd className="h-card metal-text">
                  <Counter value={s.value} suffix={s.suffix} duration={1.2} delay={1} />
                </dd>
                <dt className="mono-label mt-1">{s.label}</dt>
              </div>
            ))}
          </Settle>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-[var(--gutter)] hidden items-center gap-4 lg:flex" aria-hidden="true">
        <span className="scroll-cue" />
        <span className="mono-label">scroll</span>
      </div>
    </section>
  )
}
