'use client'

import { motion } from 'framer-motion'
import {
  Boxes,
  Cloud,
  Code2,
  Database,
  Layout,
  Plug,
  Users,
  Wrench,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import GlassCard from './ui/GlassCard'
import { skills } from '@/data/resume'

const ICONS = { Boxes, Cloud, Code2, Database, Layout, Plug, Users, Wrench }

export default function Skills() {
  return (
    <section className="section" aria-labelledby="skills-heading">
      <SectionHeading
        eyebrow="Stack"
        title="What I work with."
        description="The tools and technologies I use day to day, grouped by what they do."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => {
          const Icon = ICONS[group.icon] ?? Boxes
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 text-white">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {group.category}
                  </h3>
                </div>

                <div className="hairline my-5" />

                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/80 transition-colors hover:border-white/20 hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
