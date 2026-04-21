import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SectionHeading from '@/components/ui/SectionHeading'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, breadcrumbSchema, absoluteUrl } from '@/lib/seo'
import { getAllPosts } from '@/data/posts'

export const metadata = buildMetadata({
  title: 'Blog',
  path: '/blog',
  description:
    'Writing from Nikhil Khot on backend performance, MySQL optimization, team leadership, HIPAA, and building web applications at scale.',
})

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Nikhil Khot — Blog',
    url: absoluteUrl('/blog'),
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      datePublished: p.date,
      url: absoluteUrl(`/blog/${p.slug}`),
    })),
  }

  return (
    <>
      <JsonLd
        id="blog-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
        ])}
      />
      <JsonLd id="blog-list" data={blogSchema} />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 sm:px-8 lg:px-10">
        <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />
      </div>

      <section className="section" aria-labelledby="blog-heading">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the work."
          description="Short pieces on backend performance, team leadership, security, and the unglamorous middle of shipping software."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.05]">
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={post.title}>
                  <span className="sr-only">{post.title}</span>
                </Link>

                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest text-white/40">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={11} />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={11} />
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-xl font-semibold leading-tight text-white transition-colors group-hover:text-white sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{post.excerpt}</p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/70"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-cyan transition-transform group-hover:translate-x-0.5">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
