import { motion } from 'motion/react'
import { useRef } from 'react'
import { EXPERTISE, TOOLS, type Area } from '@/data/content'
import { usePointerSpecular } from '@/lib/hooks'
import { Settle, SettleGroup } from '@/components/motion/Settle'
import { useTilt } from '@/components/motion/useTilt'
import { Chip } from '@/components/ui/Chip'
import { SectionHead } from '@/components/ui/SectionHead'
import { MobileIcon, ServerIcon, SparkIcon, WebIcon } from '@/components/ui/Icons'

const ICONS = { web: WebIcon, mobile: MobileIcon, server: ServerIcon, spark: SparkIcon }

export default function Expertise() {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <span className="orb orb-sapphire absolute -right-[20vw] top-0 -z-10 h-[50vw] w-[50vw]" aria-hidden="true" />
      <div className="shell">
        <SectionHead numeral="02" eyebrow="Expertise" title="What I *build.*" lead="One engineer from the first screen to the store listing, with the backend in between." />
        <SettleGroup as="ul" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6" stagger={0.08}>
          {EXPERTISE.map((a) => (
            <AreaCard key={a.id} area={a} />
          ))}
        </SettleGroup>
        <Settle className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-soft" delay={0.2}>
          <span className="mono-label">Also</span>
          {TOOLS.map((t) => (
            <Chip key={t} size="sm">
              {t}
            </Chip>
          ))}
        </Settle>
      </div>
    </section>
  )
}

function AreaCard({ area: a }: { area: Area }) {
  const Icon = ICONS[a.icon]
  const ref = useRef<HTMLElement>(null)
  const tilt = useTilt(ref, 5)
  usePointerSpecular(ref)
  return (
    <Settle as="li" inherit className="h-full" style={{ perspective: 1000 }}>
      <motion.article ref={ref} className="group card card-lift specular flex h-full flex-col p-6 md:p-7" style={tilt}>
        <span
          className="metal inline-flex h-12 w-12 items-center justify-center rounded-2xl text-[#1a1008] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:scale-110"
          style={{ transform: 'translateZ(30px)' }}
        >
          <Icon width={22} height={22} />
        </span>
        <h3 className="h-card mt-5">{a.title}</h3>
        <p className="mt-2 text-ink-soft">{a.text}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5 pt-1" aria-label={`${a.title} — technologies`}>
          {a.chips.map((c) => (
            <li key={c}>
              <Chip size="sm">{c}</Chip>
            </li>
          ))}
        </ul>
      </motion.article>
    </Settle>
  )
}
