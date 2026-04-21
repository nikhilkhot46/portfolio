import Link from '@/components/Link'
import { ArrowLeft } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: '404 — Page not found',
  path: '/404',
  description: 'The page you are looking for does not exist.',
})

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 pt-32 text-center">
      <div className="font-display text-7xl font-semibold tracking-tight">
        <span className="gradient-brand animate-gradient-pan bg-[length:200%_200%]">404</span>
      </div>
      <h1 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-md text-sm text-white/60">
        The link may be broken or the page may have been moved. Head back home and try again.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft size={16} />
        Back home
      </Link>
    </section>
  )
}
