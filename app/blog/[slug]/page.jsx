import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import {
  buildMetadata,
  blogPostingSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '@/lib/seo'
import { getAllPostSlugs, getAllPosts, getPostBySlug } from '@/data/posts'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.metaTitle || post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated || post.date,
    keywords: post.tags,
  })
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded-md border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.9em] text-accent-cyan"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function FaqBlock({ items }) {
  return (
    <div className="my-8 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-white/90 transition-colors hover:bg-white/[0.03]">
            <span className="font-display text-base font-semibold sm:text-lg">
              {item.q}
            </span>
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="px-6 pb-6 text-sm leading-relaxed text-white/70 sm:text-base">
            {renderInline(item.a)}
          </div>
        </details>
      ))}
    </div>
  )
}

function CtaBlock({ block }) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-accent-violet/15 via-white/[0.03] to-accent-cyan/10 p-7 backdrop-blur-xl sm:p-8">
      <p className="text-base leading-relaxed text-white/85 sm:text-lg">
        {renderInline(block.text)}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {block.primary && (
          <Link href={block.primary.href} className="btn-primary">
            {block.primary.label}
            <ArrowRight size={14} />
          </Link>
        )}
        {block.secondary && (
          <Link href={block.secondary.href} className="btn-ghost">
            {block.secondary.label}
          </Link>
        )}
      </div>
    </div>
  )
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>
    case 'h3':
      return (
        <h3
          key={i}
          className="mt-8 mb-2 font-display text-xl font-semibold text-white sm:text-2xl"
        >
          {block.text}
        </h3>
      )
    case 'ul':
      return (
        <ul key={i} className="my-5 space-y-2.5 pl-0">
          {block.items.map((item, j) => (
            <li
              key={j}
              className="flex gap-3 text-base leading-relaxed text-white/75 sm:text-lg"
            >
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
    case 'faq':
      return <FaqBlock key={i} items={block.items} />
    case 'cta':
      return <CtaBlock key={i} block={block} />
    case 'p':
    default:
      return <p key={i}>{renderInline(block.text)}</p>
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const idx = allPosts.findIndex((p) => p.slug === post.slug)
  const related = allPosts.filter((_, i) => i !== idx).slice(0, 2)

  const faqBlock = post.content.find((b) => b.type === 'faq')

  return (
    <>
      <JsonLd id={`post-schema-${post.slug}`} data={blogPostingSchema(post)} />
      <JsonLd
        id={`post-breadcrumb-${post.slug}`}
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ])}
      />
      {faqBlock && (
        <JsonLd
          id={`post-faq-${post.slug}`}
          data={faqPageSchema(faqBlock.items)}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-6 pt-32 sm:px-8 lg:px-10">
        <Breadcrumbs
          items={[
            { name: 'Blog', href: '/blog' },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <article className="mx-auto max-w-3xl">
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest text-white/40">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={11} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={11} />
                {post.readingTime}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-white/65">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/70"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="hairline" />

          <div className="prose-article mt-8">
            {post.content.map(renderBlock)}
          </div>
        </article>

        {related.length > 0 && (
          <aside
            aria-labelledby="related-heading"
            className="mx-auto mt-16 max-w-3xl border-t border-white/5 pt-10"
          >
            <h2 id="related-heading" className="font-display text-lg font-semibold text-white">
              Continue reading
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="text-[11px] uppercase tracking-widest text-white/40">
                      {formatDate(p.date)}
                    </div>
                    <div className="mt-2 font-display text-base font-semibold text-white">
                      {p.title}
                    </div>
                    <div className="mt-1 text-xs text-white/55 line-clamp-2">{p.excerpt}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mx-auto mt-12 mb-8 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to all posts
          </Link>
        </div>
      </div>
    </>
  )
}
