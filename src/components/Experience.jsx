import { motion } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { experience } from '../data/resume'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked."
        description="The places I've been, most recent first. A mix of principal, senior, and lead roles across Pune."
      />

      <div className="relative mt-16">
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-cyan/40 via-accent-violet/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <ol className="space-y-10">
          {experience.map((role, i) => {
            return (
              <motion.li
                key={role.company + role.period}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="relative md:grid md:grid-cols-2 md:gap-0"
              >
                <span className="absolute left-[10px] top-4 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-ink-900 md:left-1/2 md:-translate-x-1/2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      role.current
                        ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                        : 'bg-gradient-to-br from-accent-cyan to-accent-violet'
                    }`}
                  />
                </span>

                <div
                  className={`pl-12 md:pl-0 ${
                    i % 2 === 0
                      ? 'md:col-start-1 md:pr-12 md:text-right'
                      : 'md:col-start-2 md:pl-12'
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-wider text-white/60 backdrop-blur-md ${
                      i % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <Briefcase size={12} className="text-accent-cyan" />
                    <span>{role.period}</span>
                    {role.current && (
                      <span className="ml-1 rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300">
                        NOW
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-xl font-semibold text-white">
                    {role.role}
                  </h3>
                  <div className="mt-1 text-sm text-white/60">{role.company}</div>
                  <div
                    className={`mt-1 inline-flex items-center gap-1 text-xs text-white/40 ${
                      i % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <MapPin size={11} />
                    <span>{role.location}</span>
                  </div>

                  <ul
                    className={`mt-4 space-y-2 text-sm leading-relaxed text-white/70 ${
                      i % 2 === 0 ? 'md:ml-auto' : ''
                    } max-w-xl`}
                  >
                    {role.highlights.map((h) => (
                      <li
                        key={h}
                        className={`flex gap-2 ${
                          i % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                        }`}
                      >
                        <span
                          className={`mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan ${
                            i % 2 === 0 ? '' : ''
                          }`}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
