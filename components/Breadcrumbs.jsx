import Link from '@/components/Link'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items = [] }) {
  const crumbs = [{ name: 'Home', href: '/' }, ...items]
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={c.href + i} className="flex items-center gap-1.5">
              {i === 0 && <Home size={12} className="text-white/40" />}
              {isLast ? (
                <span aria-current="page" className="text-white/80">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-white">
                  {c.name}
                </Link>
              )}
              {!isLast && (
                <ChevronRight size={12} className="text-white/30" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
