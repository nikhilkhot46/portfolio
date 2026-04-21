'use client'

import { motion } from 'framer-motion'
import { Code2, Users, Gauge, ShieldCheck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import GlassCard from './ui/GlassCard'
import { profile, education } from '@/data/resume'

const pillars = [
  {
    icon: Users,
    title: 'Leading the team',
    body: "Running a team of 5 at Spring. That means code reviews, sprint planning, and being the person who has to make architecture calls when the team disagrees.",
  },
  {
    icon: Gauge,
    title: 'Backend and databases',
    body: "Most of my day is backend work. A lot of it is MySQL — writing queries, adding indexes, figuring out why something is slow. I like this part of the job.",
  },
  {
    icon: Code2,
    title: 'Comfortable across stacks',
    body: "PHP, Node.js, Angular, and MySQL are what I reach for most. I've worked with Python, Java, and TypeScript when projects needed them.",
  },
  {
    icon: ShieldCheck,
    title: 'Deployments and security',
    body: "Deploy through CI/CD to AWS EC2 and S3. For the telehealth product I also handle HIPAA work — encryption, access control, audit logs.",
  },
]

export default function About() {
  return (
    <section className="section" aria-labelledby="about-heading">
      <SectionHeading
        eyebrow="About"
        title="A bit about me."
        description={profile.summary}
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <GlassCard className="h-full">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 text-accent-cyan">
                <p.icon size={18} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.body}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8"
      >
        <GlassCard className="px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">Education</div>
              <div className="mt-1 text-white/90">{education.degree}</div>
              <div className="text-sm text-white/50">{education.school}</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-white/40">Graduated</div>
              <div className="mt-1 font-display text-2xl font-semibold text-white">{education.year}</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}
