# CLAUDE.md — myweb (Nikhil Khot portfolio + blog)

## Project overview

Personal portfolio and blog site for Nikhil Khot. Built with **Next.js (static export)**, **React 18**, **Tailwind CSS**, and **Framer Motion**. Deployed as a fully static site (`output: 'export'` in `next.config.js`).

## Tech stack

| Layer     | Library / tool                                         |
|-----------|--------------------------------------------------------|
| Framework | Next.js 16 (App Router)                                |
| UI        | React 18, Tailwind CSS 3, shadcn-style utility classes |
| Icons     | Lucide React                                           |
| Animation | Framer Motion                                          |
| Linting   | ESLint (next/core-web-vitals)                          |

## Important constraints

- **Do not run `npm run build`** after edits. The user handles build and deploy.
- The site uses `output: 'export'` — no API routes, no `getServerSideProps`, no server actions, no `revalidate`.
- Images must use `unoptimized: true` (already set). Do not use `next/image` with external URLs outside `remotePatterns`.
- `trailingSlash: false` — never add trailing slashes to internal links.

## Project structure

```
app/
  blog/
    page.jsx           Blog index (reads all posts, sorted by date)
    [slug]/page.jsx    Blog post renderer
  about/page.jsx
  contact/page.jsx
  projects/page.jsx
  layout.jsx
  globals.css
components/            Link.jsx, Breadcrumbs.jsx, JsonLd.jsx, ui/SectionHeading.jsx
data/
  posts.js             Single source of truth for all blog posts
  resume.js
lib/
  seo.js               SEO helpers (buildMetadata, schema builders)
public/                Static assets
scripts/               Post-build scripts (hide-stack.mjs)
```

---

## How to add a blog post

All content lives in `data/posts.js`. New posts go at the **top** of the array — `getAllPosts()` sorts by `date` descending.

### Post object shape

```js
{
  slug: 'primary-keyword-slug',        // permanent URL /blog/[slug] — never change after publish
  title: 'Full display title',
  metaTitle: 'SEO title 50–60 chars',  // without "— Nikhil Khot" suffix
  excerpt: '140–155 char description', // doubles as meta description; must contain primary keyword
  date: 'YYYY-MM-DD',                  // original publish date — never change
  updated: 'YYYY-MM-DD',              // OPTIONAL: date of last substantive edit
  readingTime: 'N min read',           // estimate at 225 wpm to match blogPostingSchema()
  category: 'Frontend Engineering',    // see allowed values below
  tags: ['Tag1', 'Tag2'],              // 3–5 items; first 3 shown on cards
  image: '/og-image.png',             // og:image — 1200×630 px
  author: 'Nikhil Khot',
  content: [ /* content blocks */ ],
}
```

Every post must end with a `faq` block (triggers FAQPage schema) and a `cta` block.

### Allowed `category` values

| Value | Use for |
|---|---|
| `Frontend Engineering` | Angular, React, frontend architecture, build tooling |
| `Backend Engineering`  | PHP, Node.js, MySQL, APIs, performance, databases |
| `Engineering Leadership` | Team management, hiring, career, delegation |
| `Healthcare & Compliance` | HIPAA, healthcare tech, security, compliance |

Omitting `category` falls back to `'Engineering'` in the schema. Always set it explicitly.

### Content block types

All blocks are rendered by `renderBlock()` in `app/blog/[slug]/page.jsx`.

| `type` | Shape | Notes |
|--------|-------|-------|
| `p`    | `{ type: 'p', text }` | Supports `**bold**` and `` `code` `` inline |
| `h2`   | `{ type: 'h2', text }` | Major section heading |
| `h3`   | `{ type: 'h3', text }` | Sub-section — must follow an h2 |
| `ul`   | `{ type: 'ul', items: [] }` | Bulleted list; items support `**bold**` |
| `faq`  | `{ type: 'faq', items: [{ q, a }] }` | Accordion; triggers FAQPage schema |
| `cta`  | `{ type: 'cta', text, primary: { href, label }, secondary: { href, label } }` | CTA block |

No code block type exists — use backtick inline formatting in `p` or `ul` items.

---

## Humanized content — strict rules

Every piece of writing must read like it came from a person with real opinions and real experience. These rules apply to every content block on the site.

### Voice and tone

- **Write as Nikhil.** First-person, experience-grounded. "I've built", "I've shipped", "I've inherited". No generic "you should" advice — anchor every claim to a real project or decision.
- **Conversational but not casual.** Like a senior engineer explaining something to a smart peer over coffee — direct, no hedging, no corporate-speak.
- **Opinionated.** State a position. "I reach for Y when Z" is always better than "There are trade-offs to consider."
- **No cheerleading.** Never describe a tool as "powerful", "amazing", "robust", "cutting-edge", or "game-changing". Say what it does and when it matters.
- **No throat-clearing.** Every sentence earns its place. Delete sentences that summarise what the next sentence is about to say.
- **Active voice.** "I added the index" not "The index was added".
- **Short paragraphs.** 2–4 sentences max. One idea per paragraph. Mix long setup sentences with short declarative ones.

### Forbidden phrases

Never use these — they are AI-generation fingerprints:

| Forbidden | Why |
|---|---|
| "In this comprehensive guide..." | Throat-clearing filler |
| "In this article, we will explore..." | Same |
| "It's worth noting that..." | Filler; just say it |
| "Let's dive in" / "Let's get started" | Cliché opener |
| "At the end of the day..." | Meaningless |
| "Leverage" (as a verb) | Corporate-speak |
| "Robust" / "Powerful" / "Seamless" | Meaningless adjectives |
| "Game-changer" / "Revolutionary" | Hyperbole |
| "In today's fast-paced world..." | AI boilerplate opener |
| "Whether you're a beginner or expert..." | Padding |
| "Hope you found this helpful!" | Sycophantic sign-off |
| "Feel free to..." | Filler permission |
| Rhetorical questions as section openers | "But what exactly is X?" — just explain X |
| Numbered lists that restate the heading | Don't open "Three Mistakes" with "Here are three mistakes:" |

### Opening paragraph rules

The first `p` block is the most important sentence in the post:
- Start with a concrete scene, problem, or observation — not a definition, not a question.
- Reference real experience within the first two sentences.
- Never begin with the post title rephrased as a sentence.

```
BAD:  "Building a scalable Angular project structure is important for any large-scale application."
GOOD: "I've inherited enough poorly structured Angular codebases to know that the architecture
       decisions made in week one compound for years."
```

### Section body rules

- Each H2 section must open with 1–2 sentences of prose before any `ul` or `h3`. Never drop straight into a list.
- `ul` bullets are for genuinely parallel items — not a way to avoid writing prose. Each bullet must be a complete thought.
- Bold in bullets highlights the key term (2–5 words), not the entire bullet.

### FAQ and CTA rules

- **FAQ answers:** 2–5 sentences of prose, answered directly without restating the question. No bullet lists inside answers. Sound like a spoken reply, not documentation.
- **CTA text:** Must name the specific type of work (architecture review, performance audit, engineering engagement) and the relevant domain (telehealth, ed-tech, enterprise, HIPAA). Never generic "get in touch to learn more".

---

## Inline text formatting

The `renderInline()` function in `app/blog/[slug]/page.jsx` handles:

- `**bold text**` → `<strong>` with `text-white` class
- `` `code` `` → `<code>` styled with `text-accent-cyan` and a subtle background

Links inside post text are not supported inline — use the `cta` block for links.

---

## SEO — strict rules

SEO is a primary goal. Every page and every post must follow these rules exactly.

### SEO infrastructure (`lib/seo.js`)

| Helper | Purpose |
|---|---|
| `buildMetadata(opts)` | Next.js `Metadata` — title, description, canonical, OG, Twitter, robots |
| `personSchema()` | `Person` JSON-LD — used on homepage |
| `websiteSchema()` | `WebSite` JSON-LD — used on homepage |
| `blogPostingSchema(post)` | `BlogPosting` JSON-LD — auto-applied in `[slug]/page.jsx` |
| `faqPageSchema(items)` | `FAQPage` JSON-LD — auto-applied when post has a `faq` block |
| `breadcrumbSchema(items)` | `BreadcrumbList` JSON-LD — must be added to every page |
| `absoluteUrl(path)` | Converts path to full canonical URL |

Schema is injected via `<JsonLd id="..." data={...} />`. Each `<JsonLd>` needs a **unique `id` prop**.

### Title tags

- `metaTitle` is the SEO title — **50–60 characters** max. `buildMetadata()` appends `— Nikhil Khot` automatically, so write `metaTitle` without it.
- Primary keyword must appear in the **first 30 characters** of `metaTitle` where possible.
- `title` is the display title shown on the page; it can be longer.
- Never write click-bait. Titles must accurately describe the content.

### Meta descriptions

- `excerpt` doubles as the meta description — **140–155 characters**. Must contain the primary keyword. Must read as a genuine sentence, not a keyword list.
- Every page in `app/` must pass a unique `description` to `buildMetadata()`. Never leave it as the site default.

### Slug conventions

Slugs are permanent. A slug change after publish = a broken URL (static export has no redirect support).

- Lowercase, hyphen-separated, 3–6 words, must include the primary keyword.
- No dates, no stop words (`the`, `a`, `an`), no underscores, no camelCase.

### Heading hierarchy

- **H1** is `title`, rendered once by the blog template. Never add a second H1.
- **H2** blocks target a secondary keyword or answer a likely search query.
- **H3** blocks must always follow a parent H2 — never skip a level.
- Do not use bold as a substitute for headings.

### Keyword strategy

- One primary keyword per post. It must appear in: `metaTitle`, `excerpt`, first `p`, at least one `h2`, and `tags`.
- Use natural keyword variations — don't repeat the exact phrase robotically.
- Keyword density cap: no more than once per 150 words on average.
- `tags` feeds `keywords` meta and `BlogPosting` schema — keep to 3–5 real search terms.

### Content length

- **Minimum 1,500 words** per blog post. Target **2,000–3,000** for competitive topics.
- `readingTime` must be accurate at **225 wpm** — this matches the formula in `blogPostingSchema()`.

### Internal linking

- Every post must link to at least one other post via the `cta` block or prose references.
- Internal links use `<Link>` from `@/components/Link` — never a raw `<a>` tag.
- No trailing slashes on `href` values (`/blog` not `/blog/`).
- No orphan pages — every new page must be linked from at least one other page.

### Structured data rules

**Blog posts** (automatic via `[slug]/page.jsx` — do not modify unless broken):
- `BlogPosting`, `BreadcrumbList`, and `FAQPage` (when a `faq` block exists) are all auto-injected.

**New pages added to `app/`:**
- Must include `<JsonLd>` with `breadcrumbSchema()` at minimum.
- Add `<JsonLd>` with `faqPageSchema()` if the page has a FAQ section.

**Never:** hardcode JSON-LD as a raw `<script>` tag — always use `<JsonLd>`.

### The `updated` field

Add `updated: 'YYYY-MM-DD'` to a post when making a substantive edit (new sections, corrected facts, updated data). Typo fixes don't count. `updated` feeds `dateModified` in `BlogPosting` schema and `lastModified` in `sitemap.js`. Never change `date` — it is the original publish date.

### Sitemap

`app/sitemap.js` auto-generates `/sitemap.xml`. Blog posts are included automatically via `getAllPosts()`. New static pages must be added manually to `staticRoutes` with a `priority` and `changeFrequency`. Priority scale: homepage `1.0`, about/projects `0.9`, blog index `0.8`, contact `0.7`, blog posts `0.6`. Do not inflate priorities.

### Canonical URLs

`buildMetadata()` sets the canonical from the `path` argument — always pass it. Never create two URLs that render the same content.

### OG image

All posts currently use `/og-image.png` (1200×630 px, defined in `SITE.ogImage`). Per-post images are undecided. If added in future: name them `/public/og-[slug].png`, exactly 1200×630 px, under 1 MB, and set `image: '/og-[slug].png'` on the post object.

### Google Search Console and Analytics

Both GA and GSC are connected. The sitemap is already registered at `https://nikhilkhot.com/sitemap.xml`.

- **New posts:** no manual GSC action needed — Google will discover them on the next crawl. For priority posts, submit via **GSC → URL Inspection → Request Indexing**.
- **New static pages:** add to `staticRoutes` in `sitemap.js` before deploy, then verify coverage in GSC within 48–72 hours.
- Never remove or rename the `sitemap.xml` output path. Never block a page via `robots.js` without an explicit decision to de-index it.

### SEO anti-patterns — never do these

- **No `<a>` for internal links** — always use `<Link>` from `@/components/Link`.
- **No trailing slashes on `href`** — they create a redirect, wasting crawl budget.
- **No manual `<title>` or `<meta name="description">`** — `buildMetadata()` handles them; duplicates break indexing.
- **Never change a published `slug`** — static export has no redirect support.
- **Never omit the `faq` block** — FAQPage schema is the highest-impact rich result this site generates.
- **`metaTitle` must be ≤60 chars** — verify the count before saving.
- **`excerpt` must be 140–155 chars** — both extremes hurt SERP appearance.
- **No `h3` without a preceding `h2`** — broken hierarchy confuses Google's content parser.
- **Always set `tags`** — they feed the schema `keywords` field.

---

## Master pre-publish checklist

Run this on every new post before it goes in `data/posts.js`.

### Post object fields
- [ ] `slug` — lowercase, hyphen-separated, 3–6 words, includes the primary keyword
- [ ] `metaTitle` — 50–60 characters, starts with primary keyword, no "— Nikhil Khot" suffix
- [ ] `excerpt` — 140–155 characters, contains the primary keyword, reads as a genuine sentence
- [ ] `date` — today's date in `YYYY-MM-DD` format
- [ ] `readingTime` — accurate at 225 wpm
- [ ] `category` — one of the four allowed values
- [ ] `tags` — 3–5 items matching actual search terms
- [ ] `author` — `'Nikhil Khot'`
- [ ] `image` — `'/og-image.png'`

### Content structure
- [ ] First `p` opens with a concrete scene or observation — not a definition, not the title rephrased
- [ ] First `p` references real experience within the first two sentences
- [ ] Primary keyword appears in the first `p` block
- [ ] Primary keyword appears in at least one `h2` block
- [ ] No `h3` without a preceding `h2` in the same post
- [ ] Every `h2` section opens with at least one sentence of prose before any `ul` or `h3`
- [ ] Post has exactly one `faq` block
- [ ] Post ends with a `cta` block naming specific work and domain
- [ ] Post links to at least one other post on the site

### Content quality
- [ ] No sentence uses a forbidden phrase from the banned list
- [ ] No paragraph exceeds 4 sentences or covers more than one idea
- [ ] No `ul` bullet is one word or an incomplete phrase
- [ ] No tool described as "powerful", "robust", "seamless", or "amazing"
- [ ] Every claim is grounded in a real project or observation
- [ ] FAQ answers are 2–5 sentences of prose — no bullet lists inside answers
- [ ] CTA text names the specific type of engagement and domain

### SEO checks
- [ ] `metaTitle` character count verified (50–60 chars)
- [ ] `excerpt` character count verified (140–155 chars)
- [ ] Primary keyword in: `metaTitle`, `excerpt`, first `p`, at least one `h2`, `tags`
- [ ] No keyword appears more than once per 150 words on average
- [ ] New post placed at the **top** of the `posts` array in `data/posts.js`
- [ ] `updated` field added if this is a revision of an existing post

---

## Styling conventions

- Tailwind utility classes only — no custom CSS except in `app/globals.css`.
- Dark theme. Background near-black; text `text-white/70` to `text-white/90`; accents `text-accent-cyan` and `text-accent-violet`.
- Cards: `rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl`.
- Buttons: `btn-primary` (primary), `btn-ghost` (ghost) — both defined in `globals.css`.
- Responsive breakpoints: `sm:`, `md:`, `lg:` (Tailwind defaults).

## Dev server

```bash
npm run dev   # http://localhost:3000
```

The user handles `npm run build` and deployment. Do not run the build unless explicitly asked.
