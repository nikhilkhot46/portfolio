import { profile } from '../data/resume'

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-24 pt-6 sm:px-8 sm:pb-10 lg:px-10">
      <div className="hairline mb-6" />
      <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet text-[10px] font-bold text-ink-950">
            NK
          </span>
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} className="hover:text-white/80">
            {profile.email}
          </a>
          <span className="h-3 w-px bg-white/10" />
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white/80">
            LinkedIn
          </a>
          <span className="h-3 w-px bg-white/10" />
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white/80">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
