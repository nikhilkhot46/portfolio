import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Send, Check, Download, FileText } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import GlassCard from './ui/GlassCard'
import { profile } from '../data/resume'

const contactItems = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, '')}`,
    icon: Phone,
    external: false,
  },
  {
    label: 'Location',
    value: profile.location,
    href: null,
    icon: MapPin,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/nikhilkhot46',
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/nikhilkhot46',
    href: profile.github,
    icon: Github,
    external: true,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const lines = [
      'Hi Nikhil,',
      'I came across your portfolio and wanted to get in touch.',
      '',
      '*— Details —*',
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      '',
      '*Message:*',
      form.message,
    ]
    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${profile.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch."
        description="If you want to chat about a role, a project, or have a question, here's where to find me. I usually reply within a day."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <GlassCard interactive={false} className="flex h-full flex-col p-7 sm:p-8">
            <div className="text-xs uppercase tracking-widest text-white/40">Contact details</div>
            <ul className="mt-5 flex-1 divide-y divide-white/[0.06]">
              {contactItems.map((c) => {
                const Wrapper = c.href ? 'a' : 'div'
                return (
                  <li key={c.label}>
                    <Wrapper
                      {...(c.href
                        ? {
                            href: c.href,
                            target: c.external ? '_blank' : undefined,
                            rel: 'noreferrer',
                          }
                        : {})}
                      className="group flex items-center gap-4 py-4 transition-colors hover:text-white"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-cyan/15 to-accent-violet/15 text-white/80 transition-colors group-hover:border-white/25 group-hover:text-white">
                        <c.icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-widest text-white/40">
                          {c.label}
                        </div>
                        <div className="mt-0.5 truncate text-sm text-white/85 group-hover:text-white">
                          {c.value}
                        </div>
                      </div>
                    </Wrapper>
                  </li>
                )
              })}
            </ul>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-6 lg:col-span-3"
        >
          <div className="reveal-border group flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-5 backdrop-blur-xl transition-colors hover:bg-white/[0.05]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 text-white">
                <FileText size={18} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Resume</div>
                <div className="mt-0.5 text-sm text-white/90">
                  Full PDF, kept up to date.{' '}
                  <span className="text-white/50">{profile.years} years of experience, one page.</span>
                </div>
              </div>
            </div>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/40 hover:bg-white/[0.08] hover:text-white"
            >
              <Download size={14} />
              Download PDF
            </a>
          </div>
          <GlassCard interactive={false} className="p-7 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me a bit about what you're working on, or what role you have in mind."
                  className="w-full resize-none rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-accent-violet/60 focus:bg-ink-900/80"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-white/40">
                  Opens WhatsApp with the message already filled in.
                </div>
                <button type="submit" className="btn-primary">
                  {sent ? (
                    <>
                      <Check size={16} /> Sent
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send message
                    </>
                  )}
                </button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-accent-violet/60 focus:bg-ink-900/80"
      />
    </div>
  )
}
