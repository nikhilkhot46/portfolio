'use client'

import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { achievements } from '@/data/resume'

export default function Achievements() {
  return (
    <section className="section" aria-labelledby="achievements-heading">
      <SectionHeading
        eyebrow="Impact"
        title="A few numbers."
        description="Specific wins from projects I've worked on, pulled together in one place."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:bg-white/[0.05]"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-accent-violet/30 to-accent-cyan/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="font-display text-5xl font-semibold leading-none tracking-tight">
                <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                  {a.metric}
                </span>
              </div>
              <div className="mt-3 text-sm font-medium text-white/90">{a.label}</div>
              <div className="mt-2 text-sm leading-relaxed text-white/55">{a.detail}</div>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-accent-cyan/40 via-accent-violet/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
