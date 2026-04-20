import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { projects } from '../data/resume'

function ProjectShell({ accent, children, className = '' }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors hover:border-white/20 ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent}`}
      />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent-violet/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent-cyan/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="relative">{children}</div>
    </div>
  )
}

function MetricRail({ items, layout = 'horizontal' }) {
  const gridCls =
    layout === 'vertical'
      ? 'grid h-full grid-cols-3 lg:grid-cols-1'
      : 'grid grid-cols-3'
  const dividerCls = (idx) =>
    layout === 'vertical'
      ? idx > 0
        ? 'border-l border-white/10 lg:border-l-0 lg:border-t'
        : ''
      : idx > 0
      ? 'border-l border-white/10'
      : ''

  const valueSize =
    layout === 'vertical'
      ? 'text-2xl sm:text-3xl lg:text-4xl'
      : 'text-base sm:text-lg'

  return (
    <div className={gridCls}>
      {items.map((m, idx) => (
        <div
          key={m.label}
          className={`relative flex min-w-0 flex-col justify-center p-5 sm:p-6 ${dividerCls(idx)}`}
        >
          <div
            className={`font-display font-semibold leading-tight tracking-tight ${valueSize} break-words hyphens-auto`}
          >
            <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
              {m.value}
            </span>
          </div>
          <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-xs">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function FlagshipCard({ project }) {
  return (
    <ProjectShell accent={project.accent}>
      <div className="grid gap-0 lg:grid-cols-12">
        <div className="p-8 sm:p-10 lg:col-span-7 lg:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            <Sparkles size={12} />
            Current project
          </div>

          <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {project.name}
          </h3>
          <p className="mt-2 text-base text-white/60 sm:text-lg">{project.tagline}</p>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-white/10 bg-ink-900/60 px-2.5 py-1 text-xs font-medium text-white/85 backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 lg:col-span-5 lg:border-l lg:border-t-0">
          <MetricRail items={project.impact} layout="vertical" />
        </div>
      </div>
    </ProjectShell>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <ProjectShell accent={project.accent} className="flex h-full flex-col">
        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Past project
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-white">
                {project.name}
              </h3>
              <p className="mt-1.5 text-sm text-white/55">{project.tagline}</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition-all group-hover:border-white/25 group-hover:text-white">
              <ArrowUpRight size={15} />
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/70">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-white/10 bg-ink-900/60 px-2.5 py-1 text-xs font-medium text-white/85 backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10">
          <MetricRail items={project.impact} layout="horizontal" />
        </div>
      </ProjectShell>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="Selected work"
        title="Some things I've built."
        description="A few projects from over the years. Some are still running, some taught me a lot, most did both."
      />

      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <FlagshipCard project={featured} />
        </motion.div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rest.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
