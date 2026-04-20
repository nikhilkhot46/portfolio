import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { ArrowRight, Briefcase, Clock, Download, Github, Globe, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react'
import AuroraBackground from './ui/AuroraBackground'
import { profile } from '../data/resume'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

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
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <AuroraBackground />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:pb-20 lg:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-col items-start"
        >
          <motion.div custom={0} variants={fadeUp} className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Open to new roles</span>
            <span className="mx-1 h-3 w-px bg-white/15" />
            <MapPin size={12} className="text-white/60" />
            <span className="text-white/70">{profile.location}</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            <span className="gradient-text">Hi, I'm</span>{' '}
            <span className="gradient-brand animate-gradient-pan bg-[length:200%_200%]">
              Nikhil.
            </span>
            <span className="block text-white/70">I build web applications.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
          >
            Principal Software Engineer based in Pune, India.{' '}
            <span className="text-white/90">{profile.years} years</span> working on web apps,
            mostly with PHP, Node.js, Angular, and MySQL. Currently leading a team of 5 at
            Spring Computing Technologies on a telehealth product.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-2 text-xs"
          >
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
          </motion.div>

          <motion.div custom={4} variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              <Sparkles size={16} />
              See my work
              <ArrowRight size={16} />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="btn-ghost"
            >
              <Download size={16} />
              Download resume
            </a>
            <a href="#contact" className="btn-ghost">
              <Mail size={16} />
              Contact me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white sm:ml-1 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none sm:hover:border-0"
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
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none sm:hover:border-0"
            >
              <Github size={14} className="sm:hidden" />
              <span className="hidden h-px w-6 bg-white/20 transition-all sm:block group-hover:w-10 group-hover:bg-white/60" />
              GitHub
            </a>
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeUp}
            className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {profile.heroStats.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass reveal-border group relative overflow-hidden rounded-2xl p-5"
                style={{ animationDelay: `${i * 0.15}s` }}
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 1 },
            y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/30 md:flex"
        >
          <span>Scroll</span>
          <span className="block h-5 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
