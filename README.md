# Nikhil Khot — Principal Software Engineer Portfolio

A premium, dark-themed developer portfolio built with **React (Vite)**, **Tailwind CSS**, and **Framer Motion**. Content is driven entirely by the uploaded resume — no filler copy.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (custom dark theme, glassmorphism utilities, animated gradients)
- **Framer Motion 11** (reveal-on-scroll, staggered entries, animated nav pill)
- **lucide-react** icons
- UI components built in the **21st.dev aesthetic** (glass cards, aurora backgrounds, gradient brand text, animated dot grid) and integrated as reusable primitives

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Structure

```
myweb/
├── index.html              # Google Fonts + root mount
├── vite.config.js
├── tailwind.config.js      # Custom colors, animations, shadows
├── postcss.config.js
├── public/
│   └── favicon.svg         # Gradient "NK" monogram
└── src/
    ├── main.jsx
    ├── App.jsx             # Section composition
    ├── index.css           # Tailwind layers + glass / gradient primitives
    ├── lib/
    │   └── cn.js           # clsx + tailwind-merge helper
    ├── data/
    │   └── resume.js       # Single source of truth (extracted from the resume)
    └── components/
        ├── Navbar.jsx      # Sticky, blur-on-scroll, animated active pill, mobile drawer
        ├── Hero.jsx        # Aurora background, gradient headline, stat grid, CTAs
        ├── About.jsx       # Impact pillars + education strip
        ├── Skills.jsx      # 8 categorized skill groups (Languages / Frontend / ...)
        ├── Experience.jsx  # Dual-side timeline (5 roles)
        ├── Projects.jsx    # Flagship project + 4 secondary cards, tech + impact
        ├── Achievements.jsx# Metrics-first card grid
        ├── Contact.jsx     # Contact cards + mailto form
        ├── Footer.jsx
        └── ui/
            ├── AuroraBackground.jsx  # Animated radial blobs + dot grid
            ├── GlassCard.jsx         # Cursor-tracking spotlight + gradient border on hover
            └── SectionHeading.jsx
```

## Design system

- **Palette** — `ink-950` base (#05060a) with cyan (#22d3ee), violet (#8b5cf6), rose (#fb7185) accents
- **Typography** — Space Grotesk (display) + Inter (body) + JetBrains Mono (code)
- **Primitives** — `glass`, `chip`, `btn-primary`, `btn-ghost`, `gradient-brand`, `reveal-border` defined in `src/index.css`
- **Motion** — Entry animations use a cubic-bezier easeOut; section reveals fire once with a `-80px` root margin

## Editing content

All copy lives in [src/data/resume.js](src/data/resume.js) — update there and the whole site updates. No content is hardcoded inside components.
