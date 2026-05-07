# Nikhil Khot — Principal Software Engineer Portfolio

Personal portfolio and blog at [nikhilkhot.com](https://nikhilkhot.com). Built with **Next.js 16** (App Router, static export), **Tailwind CSS 3**, and **Framer Motion 11**. Deployed as static HTML/CSS/JS to an EC2 instance via nginx.

## Stack

- **Next.js 16** — App Router, `output: 'export'` (fully static)
- **React 18**
- **Tailwind CSS 3** — custom dark theme, glassmorphism utilities, animated gradients
- **Framer Motion 11** — scroll reveals, staggered entries, animated nav pill
- **lucide-react** icons
- **No TypeScript** — `.jsx` throughout

## Commands

```bash
npm install
npm run dev        # Next.js dev server → http://localhost:3000
npm run build      # next build + post-build cleanup (see below)
npm run lint       # ESLint via next lint
```

> **Do not run `npm run build` after edits** — build and deploy are handled manually.

## Build pipeline

`npm run build` runs two steps:

1. `next build` — emits a fully static site into `out/`
2. `node scripts/hide-stack.mjs` — post-processes the `out/` directory:
   - Renames `out/_next/` → `out/static/` and rewrites all references
   - Strips `__NEXT_DATA__` script tags and `next-head-count` meta tags from HTML
   - Prunes RSC `.txt` payloads and `_not-found` artifacts

## Deployment

Rsync `out/` to EC2 at `/var/www/html/nikhilkhot/`. TLS via Let's Encrypt, served by nginx. See `DEPLOYMENT.md` for the full steps and nginx config.

## Project structure

```
myweb/
├── app/
│   ├── layout.jsx              # Root layout, fonts, Analytics
│   ├── page.jsx                # / — Hero + Achievements
│   ├── about/page.jsx          # /about
│   ├── projects/page.jsx       # /projects
│   ├── contact/page.jsx        # /contact
│   ├── blog/
│   │   ├── page.jsx            # /blog — post index
│   │   └── [slug]/page.jsx     # /blog/:slug — individual posts
│   ├── sitemap.js
│   ├── robots.js
│   └── not-found.jsx
├── components/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Achievements.jsx
│   ├── Contact.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Breadcrumbs.jsx
│   ├── Link.jsx                # Custom link wrapper for static export
│   ├── JsonLd.jsx              # Renders JSON-LD <script> tags
│   ├── ScrollToTop.jsx
│   ├── WhatsAppButton.jsx
│   └── ui/
│       ├── AuroraBackground.jsx
│       ├── GlassCard.jsx
│       └── SectionHeading.jsx
├── data/
│   ├── resume.js               # All profile content — skills, experience, projects, stats
│   └── posts.js                # Blog posts as structured JS objects (typed content blocks)
├── lib/
│   ├── seo.js                  # buildMetadata(), JSON-LD schema generators, SITE config
│   └── cn.js                   # clsx + tailwind-merge utility
├── public/
├── scripts/
│   └── hide-stack.mjs          # Post-build cleanup (see Build pipeline above)
├── next.config.js
├── tailwind.config.js
├── jsconfig.json               # Path alias: @/ → project root
└── DEPLOYMENT.md
```

## Content

All content is data-driven — nothing is hardcoded in components.

- **`data/resume.js`** — profile info, skills, experience, projects, achievements, hero stats. Every section component reads from here.
- **`data/posts.js`** — blog posts as structured JS objects. Each post has a `content` array of typed blocks: `p`, `h2`, `h3`, `ul`, `faq`, `cta`, `code`.

To add a blog post, append a new object to the `posts` array in `data/posts.js`. The sitemap and blog index pick it up automatically.

## SEO

`lib/seo.js` exports:

- `buildMetadata(options)` — generates Next.js `metadata` with Open Graph, Twitter card, and canonical URL
- `blogPostingSchema(post)` — JSON-LD BlogPosting schema
- `breadcrumbSchema(items)` — JSON-LD BreadcrumbList
- `faqPageSchema(items)` — JSON-LD FAQPage (used when a post has a `faq` content block)
- `personSchema()`, `websiteSchema()` — site-level structured data

Every page exports `metadata` via `buildMetadata()` and renders `<JsonLd>` schema tags.

## Design system

- **Palette** — `ink-950` (#05060a) base with cyan (`#22d3ee`), violet (`#8b5cf6`), emerald, and rose accents
- **Typography** — Space Grotesk (display, `font-display`) + Inter (body, `font-sans`) via `next/font/google`
- **Primitives** — `glass`, `chip`, `btn-primary`, `btn-ghost`, `gradient-brand`, `reveal-border`, `gradient-text` defined in `app/globals.css`
- **Animations** — shimmer, float, gradient-pan, pulse-slow (Tailwind config); scroll reveals via Framer Motion with `-80px` root margin
