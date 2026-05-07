import Link from '@/components/Link'
import { profile, navLinks } from '@/data/resume'

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-8 sm:pb-10 lg:px-10">
      <div className="hairline mb-8" />
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet text-[11px] font-bold text-ink-950">
              NK
            </span>
            <span className="font-display text-sm font-semibold text-white/90">
              {profile.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Principal Software Engineer in Pune. Web apps, backend performance, team leadership.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <div className="text-xs uppercase tracking-widest text-white/40">Pages</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/40">Elsewhere</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href={`mailto:${profile.email}`} className="hover:text-white">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        {/* <span>Built with Next.js · Deployed on the edge.</span> */}
      </div>
    </footer>
  )
}
