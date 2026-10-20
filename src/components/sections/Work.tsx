import { motion, useInView, useScroll, useSpring, type Variants } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { EDUCATION, EMPLOYERS, SIDE_PROJECTS, type Employer, type Project, type Visual } from '@/data/content'
import { asset } from '@/lib/asset'
import { EASE, SPRING } from '@/lib/ease'
import { usePointerSpecular } from '@/lib/hooks'
import { Counter } from '@/components/motion/Counter'
import { Settle } from '@/components/motion/Settle'
import { useTilt } from '@/components/motion/useTilt'
import { Chip } from '@/components/ui/Chip'
import { SectionHead } from '@/components/ui/SectionHead'
import { AppleIcon, ArrowNE, GitHubIcon, GlobeIcon, PlayStoreIcon } from '@/components/ui/Icons'

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
const card3d: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.95, ease: EASE.outExpo } },
}

export default function Work() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 75%'] })
  const fill = useSpring(scrollYProgress, SPRING.rail)

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <span className="orb orb-sapphire absolute -right-[22vw] top-[8%] -z-10 h-[52vw] w-[52vw]" aria-hidden="true" />
      <span className="orb orb-copper absolute -left-[24vw] bottom-[6%] -z-10 h-[56vw] w-[56vw]" aria-hidden="true" />
      <div className="shell">
        <SectionHead numeral="01" eyebrow="Experience & work" title="Where I worked, what I *shipped.*" lead="Three companies, nine products — each built inside the role it belonged to." />

        <ol ref={listRef} className="relative pl-8 md:pl-12">
          <span aria-hidden="true" className="absolute bottom-3 left-0 top-3 w-px bg-rule" />
          <motion.span aria-hidden="true" className="absolute bottom-3 left-0 top-3 w-px origin-top bg-copper" style={{ scaleY: fill, boxShadow: '0 0 12px var(--glow-copper)' }} />
          {EMPLOYERS.map((e) => (
            <EmployerBlock key={e.id} employer={e} />
          ))}
          <Node last>
            <Settle className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-rule pt-6">
              <div>
                <h3 className="h-card text-[length:var(--step-1)]">{EDUCATION.degree}</h3>
                <p className="mt-1 text-[length:var(--step--1)] text-ink-soft">{EDUCATION.school}</p>
              </div>
              <div className="flex items-baseline gap-5">
                <span className="mono text-[length:var(--step--2)] uppercase tracking-[0.14em] text-copper">{EDUCATION.period}</span>
                <span className="flex items-baseline gap-2">
                  <span className="h-card metal-text">
                    <Counter value={EDUCATION.cgpa} decimals={2} duration={1.3} />
                  </span>
                  <span className="mono-label">CGPA</span>
                </span>
              </div>
            </Settle>
          </Node>
        </ol>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Settle as="p" className="mono-label md:col-span-2">
            Also built, on my own time
          </Settle>
          {SIDE_PROJECTS.map((s, i) => (
            <Settle key={s.id} delay={i * 0.08} className="card card-lift group flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="h-card text-[length:var(--step-1)]">{s.name}</h3>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} on GitHub`} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rule text-ink-soft transition-colors duration-200 hover:border-copper hover:text-copper">
                  <GitHubIcon width={16} height={16} />
                </a>
              </div>
              <p className="text-[length:var(--step--1)] text-ink-soft">{s.what}</p>
              <ul className="flex flex-wrap gap-1.5">
                {s.stack.map((c) => (
                  <li key={c}>
                    <Chip size="sm">{c}</Chip>
                  </li>
                ))}
              </ul>
            </Settle>
          ))}
        </div>
      </div>
    </section>
  )
}

function Node({ children, last = false }: { children: ReactNode; last?: boolean }) {
  const ref = useRef<HTMLLIElement>(null)
  const lit = useInView(ref, { margin: '-35% 0px -45% 0px' })
  return (
    <li ref={ref} className={`relative ${last ? '' : 'pb-16 lg:pb-20'}`}>
      <span
        aria-hidden="true"
        className={`absolute -left-8 top-[0.45em] h-4 w-4 -translate-x-1/2 rounded-full border transition-all duration-500 md:-left-12 ${
          lit ? 'border-copper bg-copper shadow-[0_0_0_6px_color-mix(in_oklab,var(--copper)_22%,transparent)]' : 'border-rule-strong bg-ground'
        }`}
      />
      {children}
    </li>
  )
}

function EmployerBlock({ employer: e }: { employer: Employer }) {
  return (
    <Node>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <Settle>
            <p className="mono flex flex-wrap items-center gap-x-3 text-[length:var(--step--2)] uppercase tracking-[0.14em] text-copper">
              <span className="ghost-numeral !text-[2.6rem]">{e.numeral}</span>
              <span>
                {e.period} · {e.place}
              </span>
            </p>
            <h3 className="h-card mt-3 !text-[clamp(1.4rem,1.2rem+0.9vw,1.9rem)]">
              {e.url ? (
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-2 transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                  {e.company}
                  <ArrowNE width={16} height={16} className="mt-2 shrink-0 text-ink-mute transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                e.company
              )}
            </h3>
            <p className="mt-1 font-medium text-ink">{e.role}</p>
            <p className="mt-4 text-[length:var(--step--1)] leading-relaxed text-ink-soft">{e.summary}</p>
            <p className="mono-label mb-2 mt-5">Owned</p>
            <ul className="flex flex-wrap gap-1.5" aria-label="Responsibilities">
              {e.owned.map((o) => (
                <li key={o}>
                  <Chip size="sm" tone="copper">
                    {o}
                  </Chip>
                </li>
              ))}
            </ul>
          </Settle>
        </div>

        <motion.ul
          className="grid gap-5 md:grid-cols-2 lg:col-span-8 xl:gap-7"
          style={{ perspective: 1200 }}
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          aria-label={`Products built at ${e.company}`}
        >
          {e.projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} wide={e.projects.length % 2 === 1 && i === e.projects.length - 1} />
          ))}
        </motion.ul>
      </div>
    </Node>
  )
}

/** A wide card (the odd last card of a block) spans both columns — visual left, copy right. */
function ProjectCard({ project: p, wide = false }: { project: Project; wide?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const tilt = useTilt(ref, 4)
  usePointerSpecular(ref)
  return (
    <motion.li variants={card3d} className={`h-full ${wide ? 'md:col-span-2' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
      <motion.article ref={ref} className={`card card-lift specular flex h-full flex-col ${wide ? 'md:grid md:grid-cols-[1fr_1.15fr]' : ''}`} style={tilt}>
        <div
          className={`relative aspect-[16/10] rounded-t-[var(--r-card)] [overflow:clip] ${wide ? 'md:aspect-auto md:h-full md:min-h-[320px] md:rounded-l-[var(--r-card)] md:rounded-tr-none' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Art visual={p.visual} name={p.name} />
        </div>
        <div className="flex flex-1 flex-col gap-3.5 p-5 md:p-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <h4 className="h-card text-[length:var(--step-1)]">{p.name}</h4>
            <ul className="flex flex-wrap gap-1" aria-label="Platforms">
              {p.surfaces.map((s) => (
                <li key={s}>
                  <Chip size="sm" tone="copper">
                    {s}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[length:var(--step--1)] text-ink">{p.what}</p>
          <ul className="grid gap-1.5 text-[length:var(--step--1)] text-ink-soft">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-2.5">
                <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
            {p.stack.map((s) => (
              <li key={s}>
                <Chip size="sm">{s}</Chip>
              </li>
            ))}
          </ul>
          {(p.links.length > 0 || p.note) && (
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-3.5 text-[length:var(--step--1)]">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-ink transition-colors duration-200 hover:text-copper focus-visible:text-copper">
                  {l.kind === 'play' ? <PlayStoreIcon /> : l.kind === 'appstore' ? <AppleIcon /> : l.kind === 'github' ? <GitHubIcon width={15} height={15} /> : <GlobeIcon />}
                  <span>{l.label}</span>
                  <ArrowNE width={13} height={13} className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
              {p.note && <span className="mono text-[length:var(--step--2)] uppercase tracking-[0.12em] text-ink-mute">{p.note}</span>}
            </div>
          )}
        </div>
      </motion.article>
    </motion.li>
  )
}

/* ───────────────── card visuals ───────────────── */

function Art({ visual, name }: { visual: Visual; name: string }) {
  switch (visual.kind) {
    case 'shots':
      return <Shots id={visual.id} name={name} />
    case 'dashboard':
      return <DashboardArt />
    case 'migration':
      return <MigrationArt />
    case 'chat':
      return <ChatArt />
    case 'sites':
      return <SitesArt />
    case 'angular':
      return <AngularArt />
  }
}

function Shots({ id, name }: { id: string; name: string }) {
  const d800 = asset(`shots/${id}-desktop-800.webp`)
  const d1440 = asset(`shots/${id}-desktop-1440.webp`)
  const p360 = asset(`shots/${id}-phone-360.webp`)
  const p640 = asset(`shots/${id}-phone-640.webp`)
  return (
    <>
      <span className="orb orb-copper absolute -right-16 -top-16 h-56 w-56" aria-hidden="true" />
      <span className="orb orb-sapphire absolute -bottom-20 -left-10 h-48 w-48" aria-hidden="true" />
      <img
        src={d800}
        srcSet={`${d800} 800w, ${d1440} 1440w`}
        sizes="(min-width: 1024px) 430px, (min-width: 768px) 42vw, 78vw"
        alt={`${name} — website`}
        width={1440}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute left-[6%] top-[9%] w-[78%] rounded-lg border border-rule shadow-[0_24px_40px_-22px_rgba(0,0,0,0.7)]"
        style={{ transform: 'translateZ(12px)' }}
      />
      <div className="bezel float-b absolute bottom-[-7%] right-[6%] w-[21%] rounded-[14px] bg-[#2f3542] p-[3px] shadow-[0_26px_40px_-18px_rgba(0,0,0,0.75)]" style={{ transform: 'translateZ(46px) rotate(-4deg)', animationDuration: '9s' }}>
        <div className="aspect-[9/19.5] overflow-hidden rounded-[11px] bg-screen">
          <img src={p360} srcSet={`${p360} 360w, ${p640} 640w`} sizes="(min-width: 1024px) 110px, 20vw" alt={`${name} — on a phone`} width={640} height={1385} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        </div>
      </div>
    </>
  )
}

/** ChildcarePro — a day-sheet: rows sign in as a copper now-line sweeps the hours. */
function DashboardArt() {
  const rows = [0.72, 0.58, 0.84, 0.46, 0.66, 0.78]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <div ref={ref} className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_10%,var(--glow-sapphire),transparent_60%)]">
      <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full" aria-label="Day-sheet schematic: attendance rows filling as the day runs">
        <g stroke="var(--rule)" strokeWidth="1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1={70 + i * 42} x2={70 + i * 42} y1="28" y2="186" />
          ))}
        </g>
        <g fill="var(--ink-mute)" fontSize="8" fontFamily="var(--font-mono)">
          {['07', '09', '11', '13', '15', '17'].map((t, i) => (
            <text key={t} x={70 + i * 42} y="20" textAnchor="middle">
              {t}
            </text>
          ))}
        </g>
        {rows.map((w, i) => (
          <g key={i}>
            <rect x="18" y={38 + i * 25} width="38" height="12" rx="6" fill="var(--panel-2)" />
            <motion.rect x="70" y={38 + i * 25} height="12" rx="6" fill="var(--copper)" opacity="0.85" initial={{ width: 0 }} animate={{ width: inView ? 210 * w : 0 }} transition={{ duration: 1.1, ease: EASE.outExpo, delay: 0.15 + i * 0.1 }} />
          </g>
        ))}
        <motion.line x1="70" x2="70" y1="28" y2="186" stroke="var(--copper)" strokeWidth="1.5" strokeDasharray="3 3" initial={{ x: 0 }} animate={{ x: inView ? 190 : 0 }} transition={{ duration: 1.6, ease: EASE.outExpo, delay: 0.1 }} />
        <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-soft)">
          <text x="18" y="22">Day sheet</text>
          <text x="302" y="22" textAnchor="end" fill="var(--copper)">CCS ✓</text>
        </g>
      </svg>
    </div>
  )
}

/** Service Points — the migration: PHP + MySQL → Node.js + MongoDB. */
function MigrationArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-[radial-gradient(70%_80%_at_20%_20%,var(--glow-copper),transparent_60%)] px-6">
      <div className="mono rounded-xl border border-rule bg-raise/80 p-4 text-[11px] leading-5 text-ink-soft">
        <div className="mb-1 text-ink-mute">before</div>
        <div>CodeIgniter · PHP</div>
        <div>MySQL</div>
      </div>
      <div className="relative h-px w-16 shrink-0 bg-rule">
        <span className="absolute inset-y-[-2px] left-0 w-full overflow-hidden" aria-hidden="true">
          <span className="metal block h-[5px] w-10 rounded-full [animation:wire_1.8s_var(--ease-in-out-smooth)_infinite]" />
        </span>
      </div>
      <div className="mono rounded-xl border border-copper/50 bg-raise/80 p-4 text-[11px] leading-5 text-ink">
        <div className="mb-1 text-copper">after</div>
        <div>Node.js · Express</div>
        <div>MongoDB</div>
      </div>
    </div>
  )
}

/** Real-time chat — one PUBLISH fans out to every server instance, then to clients. */
function ChatArt() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const subs = [48, 100, 152]
  return (
    <div ref={ref} className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_0%,var(--glow-sapphire),transparent_60%)]">
      <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full" aria-label="Redis Pub/Sub fan-out schematic">
        <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-soft)">
          <text x="18" y="22">PUBLISH chat:room</text>
          <text x="302" y="22" textAnchor="end" fill="var(--copper)">3 instances · n clients</text>
        </g>
        <rect x="24" y="86" width="64" height="28" rx="8" fill="var(--panel-2)" stroke="var(--copper)" strokeOpacity="0.6" />
        <text x="56" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink)">redis</text>
        {subs.map((y, i) => (
          <g key={y}>
            <motion.path d={`M88 100 C 130 100, 130 ${y}, 170 ${y}`} fill="none" stroke="var(--copper)" strokeWidth="1.2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }} transition={{ duration: 0.9, ease: EASE.inOutSmooth, delay: 0.2 + i * 0.15 }} />
            <motion.rect x="170" y={y - 11} width="54" height="22" rx="6" fill="var(--panel-2)" stroke="var(--rule-strong)" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }} transition={{ duration: 0.4, ease: EASE.outExpo, delay: 0.9 + i * 0.15 }} style={{ transformOrigin: `197px ${y}px` }} />
            <text x="197" y={y + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-soft)">node {i + 1}</text>
            {[0, 1].map((k) => (
              <motion.circle key={k} cx={262 + k * 22} cy={y} r="5" fill="var(--copper)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }} transition={{ duration: 0.35, ease: EASE.stamp, delay: 1.3 + i * 0.15 + k * 0.1 }} style={{ transformOrigin: `${262 + k * 22}px ${y}px` }} />
            ))}
            <motion.line x1="224" x2="256" y1={y} y2={y} stroke="var(--rule-strong)" initial={{ pathLength: 0 }} animate={{ pathLength: inView ? 1 : 0 }} transition={{ duration: 0.4, delay: 1.2 + i * 0.15 }} />
          </g>
        ))}
      </svg>
    </div>
  )
}

/** Four live websites — four small browser windows. */
function SitesArt() {
  const sites = ['Atria University', 'RLJIT', 'Ghousia Group', 'Magsol Industry']
  return (
    <motion.div className="absolute inset-0 grid grid-cols-2 gap-3 bg-[radial-gradient(70%_80%_at_80%_90%,var(--glow-copper),transparent_60%)] p-5" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
      {sites.map((s, i) => (
        <motion.div key={s} className="overflow-hidden rounded-lg border border-rule bg-raise/85 shadow-[0_14px_24px_-16px_rgba(0,0,0,0.6)]" style={{ transform: `translateZ(${18 + (i % 2) * 14}px)` }} variants={{ hidden: { opacity: 0, y: 16, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE.outExpo } } }}>
          <div className="flex items-center gap-1 border-b border-rule px-2 py-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-rule-strong/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-rule-strong/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-rule-strong/35" />
          </div>
          <div className="space-y-1.5 p-2.5">
            <div className="h-1.5 w-3/4 rounded-full bg-copper/70" />
            <div className="h-1 w-full rounded-full bg-rule-strong/40" />
            <div className="h-1 w-5/6 rounded-full bg-rule-strong/30" />
            <p className="mono pt-1 text-[9px] uppercase tracking-[0.12em] text-ink-soft">{s}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

/** Angular applications — two app panels. */
function AngularArt() {
  const apps = [
    { name: 'Blog', stack: 'Angular + Firebase', rows: [0.8, 0.55, 0.7] },
    { name: 'CRUD', stack: 'Angular + Node + MongoDB', rows: [0.6, 0.85, 0.5] },
  ]
  return (
    <motion.div className="absolute inset-0 grid grid-cols-2 gap-3 bg-[radial-gradient(70%_80%_at_10%_10%,var(--glow-sapphire),transparent_60%)] p-5" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
      {apps.map((a, i) => (
        <motion.div key={a.name} className="flex flex-col rounded-lg border border-rule bg-raise/85 p-3 shadow-[0_14px_24px_-16px_rgba(0,0,0,0.6)]" style={{ transform: `translateZ(${20 + i * 16}px)` }} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.outExpo } } }}>
          <div className="flex items-center justify-between">
            <span className="font-display text-[length:var(--step-0)]">{a.name}</span>
            <span className="metal inline-flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-[#1a1008]">A</span>
          </div>
          <p className="mono mt-1 text-[9px] uppercase tracking-[0.12em] text-ink-soft">{a.stack}</p>
          <div className="mt-auto space-y-1.5 pt-3">
            {a.rows.map((w, k) => (
              <motion.div key={k} className="h-1.5 rounded-full bg-copper/60" style={{ width: `${w * 100}%` }} initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.3 + k * 0.1 }} />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
