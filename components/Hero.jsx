'use client'

import { useEffect, useRef, useState } from 'react'
import Link from '@/components/Link'
import { useInView, useMotionValue, animate } from 'framer-motion'
import { ArrowRight, Briefcase, Clock, Download, Github, Globe, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react'
import AuroraBackground from './ui/AuroraBackground'
import { profile } from '@/data/resume'

function CountUp({ value }) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const hasDecimal = match ? match[1].includes('.') : false

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(hasDecimal ? '0.0' : '0')

  useEffect(() => {
    if (!inView || !match) return
    const controls = animate(mv, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(hasDecimal ? v.toFixed(1) : Math.round(v).toString()),
    })
    return () => controls.stop()
  }, [inView, target, hasDecimal, match, mv])

  if (!match) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <AuroraBackground />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:pb-20 lg:px-10">
        <div className="flex flex-col items-start">
          <div className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Open to new roles</span>
            <span className="mx-1 h-3 w-px bg-white/15" />
            <MapPin size={12} className="text-white/60" />
            <span className="text-white/70">{profile.location}</span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]">
            <span className="gradient-text">Hi, I&apos;m</span>{' '}
            <span className="gradient-brand animate-gradient-pan bg-[length:200%_200%]">
              Nikhil.
            </span>
            <span className="block text-xl leading-snug text-white/70 sm:text-2xl md:text-3xl lg:text-[2.5rem]">Senior Full Stack Engineer<br />building scalable healthcare and enterprise platforms.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
            <span className="text-white/90">{profile.years} years </span> in, I still write code every day — and lead a team doing the same. Most of that time has been in healthcare: HIPAA-regulated APIs, telehealth products, backend work where slow or broken simply isn&apos;t an option. Based in Pune, available for the right full-time role or a well-scoped contract.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/75 backdrop-blur-md">
              <Briefcase size={12} className="text-accent-cyan" />
              {profile.availability.type}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/75 backdrop-blur-md">
              <Globe size={12} className="text-accent-cyan" />
              {profile.availability.remote}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/75 backdrop-blur-md">
              <Clock size={12} className="text-accent-cyan" />
              {profile.availability.notice}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn-primary">
              <Sparkles size={16} />
              See my work
              <ArrowRight size={16} />
            </Link>
            <a href={profile.resumeUrl} download className="btn-ghost">
              <Download size={16} />
              Download resume
            </a>
            <Link href="/contact" className="btn-ghost">
              <Mail size={16} />
              Contact me
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white sm:ml-1 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none"
            >
              <Linkedin size={14} className="sm:hidden" />
              <span className="hidden h-px w-6 bg-white/20 transition-all sm:block group-hover:w-10 group-hover:bg-white/60" />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none"
            >
              <Github size={14} className="sm:hidden" />
              <span className="hidden h-px w-6 bg-white/20 transition-all sm:block group-hover:w-10 group-hover:bg-white/60" />
              GitHub
            </a>
          </div>

          <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {profile.heroStats.map((s) => (
              <div
                key={s.label}
                className="glass reveal-border group relative overflow-hidden rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="font-display text-3xl font-semibold text-white">
                  <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                    <CountUp value={s.value} />
                  </span>
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                  {s.label}
                </div>
                <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent-violet/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
