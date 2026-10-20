import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type FormEvent } from 'react'
import { CONTACT, PERSON } from '@/data/content'
import { asset } from '@/lib/asset'
import { EASE } from '@/lib/ease'
import { useClock, usePointerSpecular } from '@/lib/hooks'
import { Settle } from '@/components/motion/Settle'
import { Swap } from '@/components/motion/Swap'
import { useTilt } from '@/components/motion/useTilt'
import { Button } from '@/components/ui/Button'
import { SectionHead } from '@/components/ui/SectionHead'
import { CheckIcon, DocIcon, GitHubIcon, LinkedInIcon, SendIcon } from '@/components/ui/Icons'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export default function Contact() {
  const clock = useClock(PERSON.timezone, PERSON.timezoneLabel)
  const formRef = useRef<HTMLFormElement>(null)
  const tilt = useTilt(formRef, 2)
  usePointerSpecular(formRef)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const need = String(fd.get('need') ?? '')
    const message = String(fd.get('message') ?? '').trim()
    const honey = String(fd.get('_honey') ?? '')

    const next: Errors = {}
    if (name.length < 2) next.name = 'Please add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please add a valid e-mail.'
    if (message.length < 10) next.message = 'A few words about the project help.'
    setErrors(next)
    if (Object.keys(next).length) return
    if (honey) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const r = await fetch(CONTACT.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, need, message, _subject: `${CONTACT.subject} — ${need}`, _replyto: email, _template: 'table' }),
      })
      const json = (await r.json().catch(() => ({}))) as { success?: string | boolean }
      if (!r.ok || String(json.success) === 'false') throw new Error('send failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const label = status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send message'

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <span className="orb orb-sapphire absolute -right-[16vw] top-[10%] -z-10 h-[48vw] w-[48vw]" aria-hidden="true" />
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHead numeral="04" eyebrow="Contact" title={CONTACT.heading} lead={CONTACT.lead} noRule compact />
          <Settle as="ul" className="grid gap-1" delay={0.1}>
            <Row href={PERSON.linkedin} external icon={<LinkedInIcon />} label="LinkedIn" value="rahul-rajput-828a71216" />
            <Row href={PERSON.github} external icon={<GitHubIcon />} label="GitHub" value="RahulRajput025" />
            <Row href={asset(PERSON.resume)} download icon={<DocIcon />} label="Résumé" value="PDF" />
          </Settle>
          <Settle as="p" className="mono-label mt-8" delay={0.2}>
            {PERSON.location}
            {clock ? ` · ${clock}` : ''}
          </Settle>
        </div>

        <Settle className="lg:col-span-7" delay={0.15}>
          <motion.form ref={formRef} onSubmit={onSubmit} noValidate className="card specular relative overflow-hidden p-6 md:p-8" style={tilt} aria-describedby="contact-status">
            {status === 'sending' && <span aria-hidden="true" className="metal absolute inset-x-0 top-0 h-[3px] w-1/3 rounded-full [animation:wire_1.4s_var(--ease-in-out-smooth)_infinite]" />}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} placeholder="Your name" />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="c-email">E-mail</label>
                <input id="c-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} placeholder="you@company.com" />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="field md:col-span-2">
                <label htmlFor="c-need">What do you need?</label>
                <select id="c-need" name="need" defaultValue={CONTACT.needs[0]}>
                  {CONTACT.needs.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field md:col-span-2">
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" name="message" required aria-invalid={!!errors.message} placeholder="What are we building, and by when?" />
                {errors.message && <span className="error">{errors.message}</span>}
              </div>
              {/* honeypot — hidden from people, filled by bots */}
              <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="c-honey">Leave this empty</label>
                <input id="c-honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Button type="submit" icon={<SendIcon />} swap={false} disabled={status === 'sending' || status === 'sent'} className="disabled:opacity-70">
                {label}
              </Button>
              <p id="contact-status" aria-live="polite" className={`text-[length:var(--step--1)] ${status === 'error' ? 'text-err' : 'text-ink-soft'}`}>
                <Swap value={status === 'sent' ? CONTACT.success : status === 'error' ? CONTACT.error : status === 'sending' ? 'Delivering…' : 'Replies come by e-mail.'} />
              </p>
            </div>
            <AnimatePresence>
              {status === 'sent' && (
                <motion.span
                  className="metal absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-full text-[#1a1008] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.6)]"
                  initial={{ scale: 1.4, rotate: -10, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE.stamp }}
                  aria-hidden="true"
                >
                  <CheckIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.form>
        </Settle>
      </div>
    </section>
  )
}

function Row({ href, icon, label, value, external, download }: { href: string; icon: React.ReactNode; label: string; value: string; external?: boolean; download?: boolean }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: '' } : {})}
        className="group flex min-h-14 items-center gap-4 border-b border-rule py-3 transition-[padding,color] duration-300 ease-[var(--ease-out-expo)] hover:pl-2 hover:text-copper focus-visible:pl-2 focus-visible:text-copper"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink-soft transition-colors duration-300 group-hover:border-copper group-hover:text-copper">{icon}</span>
        <span className="mono-label w-20">{label}</span>
        <span className="text-ink transition-colors duration-200 group-hover:text-copper">{value}</span>
        <span className="ml-auto text-ink-mute transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" aria-hidden="true">
          {external ? '↗' : '↓'}
        </span>
      </a>
    </li>
  )
}
