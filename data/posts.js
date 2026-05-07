export const posts = [
  {
    slug: 'angular-vs-react-2026',
    title: 'Angular vs React in 2026: Which One Should You Choose?',
    metaTitle: 'Angular vs React 2026: Which to Choose',
    excerpt:
      'Angular vs React in 2026 — a senior engineer\'s breakdown of signals, server components, performance, hiring, and the project shapes where each one actually wins.',
    date: '2026-05-07',
    readingTime: '12 min read',
    tags: ['Angular', 'React', 'Frontend', 'Architecture', 'Career'],
    image: '/og-image.png',
    author: 'Nikhil Khot',
    content: [
      {
        type: 'p',
        text: "Every year someone asks me, \"Should we go with **Angular or React** for the new project?\" In 2026 the answer is less obvious than it was three years ago. React has reinvented its rendering model around server components. Angular has rebuilt its reactivity layer around signals. Both frameworks look meaningfully different from the ones engineers learned in 2022.",
      },
      {
        type: 'p',
        text: "I've shipped production apps in both for over a decade — telehealth dashboards in Angular, ed-tech and rentals platforms in React, and a few hybrids where one team owned each. This post is the honest comparison I wish more architects had before they kicked off a build. No tribal flag-waving. Just where each framework wins, where each one hurts, and how to pick.",
      },
      {
        type: 'h2',
        text: 'The 2026 landscape, briefly',
      },
      {
        type: 'p',
        text: "Both frameworks shed a lot of legacy weight in the last two years.",
      },
      {
        type: 'h3',
        text: 'Where Angular is in 2026',
      },
      {
        type: 'p',
        text: "Angular 19 and 20 finished the migration to **standalone components**, **signals**, and **deferrable views**. NgModules are effectively gone from new projects. Zone.js is now opt-out — most new apps run zoneless and get measurably faster change detection. The CLI moved fully to esbuild and Vite, so build times that used to be 40 seconds are now 4. SSR via Angular Universal got rebuilt as `@angular/ssr` with hydration that actually works.",
      },
      {
        type: 'h3',
        text: 'Where React is in 2026',
      },
      {
        type: 'p',
        text: "React 19 is the steady state. **Server Components** are no longer experimental — they're how Next.js, Remix (now part of React Router), and TanStack Start expect you to build. The compiler (formerly React Forget) ships memoization automatically, so most `useMemo` and `useCallback` calls are dead code. Suspense, transitions, and the `use()` hook are the new primitives. The pure client-side React app — Vite, no SSR, no streaming — is now the minority.",
      },
      {
        type: 'h2',
        text: 'Reactivity: signals vs the React compiler',
      },
      {
        type: 'p',
        text: "This is the most consequential architectural difference in 2026. The frameworks took opposite paths to solve the same problem: how do we stop re-rendering things that didn't change?",
      },
      {
        type: 'h3',
        text: 'Angular signals',
      },
      {
        type: 'p',
        text: "Angular's `signal()`, `computed()`, and `effect()` are a fine-grained reactivity system. When a signal updates, only the views that read it re-render. There's no virtual DOM diff, no component-tree walk. For data-heavy dashboards — twenty widgets, real-time updates, a thousand rows — this is dramatically faster than the old Zone.js model.",
      },
      {
        type: 'h3',
        text: 'The React compiler',
      },
      {
        type: 'p',
        text: "React kept its mental model — render the whole component, diff the output — but added a compiler that auto-memoizes everything safely. The result is that idiomatic React code is now performant by default. You write the same components you did in 2020, and the compiler turns them into the optimized version you used to write by hand.",
      },
      {
        type: 'h3',
        text: 'Which one wins?',
      },
      {
        type: 'p',
        text: "For raw rendering performance on highly reactive UIs, signals win. For developer ergonomics on large teams, the React compiler wins — it's invisible. Most apps will never feel the difference. The ones that do are real-time dashboards, complex forms, and editors. If your product is one of those, weigh signals seriously.",
      },
      {
        type: 'h2',
        text: 'Server rendering and the data layer',
      },
      {
        type: 'p',
        text: "In 2026, choosing between **Angular and React** is increasingly a choice about how you render and fetch data, not just how you bind it.",
      },
      {
        type: 'h3',
        text: 'React Server Components',
      },
      {
        type: 'p',
        text: "RSC let you fetch data on the server inside a component, stream HTML to the browser, and keep the client bundle smaller. The model is genuinely different — async components, no `useEffect` for data, server/client boundaries enforced by the bundler. Once a team groks it, the wins are real: faster TTFB, smaller payloads, simpler data flow. The cost is conceptual; new hires take two weeks to stop putting `'use client'` at the top of every file.",
      },
      {
        type: 'h3',
        text: 'Angular SSR and resource()',
      },
      {
        type: 'p',
        text: "Angular's SSR story is more conservative. `@angular/ssr` renders the full app on the server and hydrates it on the client. The new `resource()` and `httpResource()` APIs give you reactive data fetching that integrates with signals. There's no equivalent of server-only components — the whole app ships to the browser. For most CRUD apps that's totally fine. For content-heavy marketing sites where bundle size is the bottleneck, React's RSC is ahead.",
      },
      {
        type: 'h2',
        text: 'Bundle size and performance in production',
      },
      {
        type: 'p',
        text: "I've audited both Angular and React apps in production this year. Some honest numbers from real projects:",
      },
      {
        type: 'ul',
        items: [
          '**Initial bundle, identical app:** Angular 20 with deferrable views landed at ~140 KB gzipped. Next.js 15 with the same feature set landed at ~95 KB gzipped — most of the win came from RSC moving code off the client.',
          '**Time to interactive:** within 200 ms of each other on a mid-tier Android device. Both frameworks are fast enough in 2026 that the bottleneck is your code, not theirs.',
          '**Memory under load:** Angular signals app held steady. React app with heavy client state crept up over an hour. Tied to your patterns, not the framework.',
          '**Build times:** Angular CLI esbuild hits ~3 s incremental; Next.js with Turbopack hits ~1.5 s. Both have stopped being the bottleneck.',
        ],
      },
      {
        type: 'h2',
        text: 'Tooling, structure, and team scale',
      },
      {
        type: 'h3',
        text: 'Angular is opinionated',
      },
      {
        type: 'p',
        text: "Angular ships a router, a forms library, an HTTP client, an animations module, a testing setup, an i18n system, and a CLI that scaffolds the lot. On a team of 20+ engineers across multiple modules, this consistency is worth real money. Code review across teams is easier because the conventions are already settled. Onboarding a senior dev to a new Angular codebase is largely \"learn this domain\" — not \"learn this team's chosen forms library.\"",
      },
      {
        type: 'h3',
        text: 'React is unopinionated',
      },
      {
        type: 'p',
        text: "React gives you the runtime and the renderer. Routing, data fetching, forms, state management, styling — you pick. In 2026 the dominant stack is Next.js + TanStack Query + Zustand or Redux Toolkit + Tailwind + shadcn/ui, but every team makes its own picks. For small teams shipping fast that flexibility is liberating. For 50-person engineering orgs without strong platform leadership, it's chaos.",
      },
      {
        type: 'h2',
        text: 'Hiring in 2026',
      },
      {
        type: 'p',
        text: "I lead engineering teams and I write the JDs. The hiring market for **Angular and React developers** looks very different now.",
      },
      {
        type: 'ul',
        items: [
          '**React talent is broader.** More juniors learn React first. More bootcamp graduates know React. The supply is bigger, especially in North America.',
          '**Angular talent is deeper.** Engineers who pick Angular tend to stay in it. The average years of experience on an Angular CV is meaningfully higher. Enterprise-heavy markets — India, Germany, the UK financial sector — have huge Angular pools.',
          '**Senior rates are similar** for the equivalent skill level. The myth that Angular devs cost more is mostly outdated.',
          '**Cross-training is realistic.** A senior React engineer can become productive in Angular in 6–8 weeks, and vice versa. The fundamentals — TypeScript, component architecture, state, testing — transfer directly.',
        ],
      },
      {
        type: 'p',
        text: "If you're in India hiring senior front-end talent, I wrote a longer breakdown in [Hire an Angular Developer in India](/blog/hire-angular-developer-india).",
      },
      {
        type: 'h2',
        text: 'When I pick Angular',
      },
      {
        type: 'p',
        text: "I reach for Angular when:",
      },
      {
        type: 'ul',
        items: [
          '**The product is a long-lived enterprise app** — admin panels, CRMs, ERPs, healthcare dashboards, banking front-ends. The opinionated structure pays off across years and many engineers.',
          '**The team is large or distributed** — five squads working on the same app. Angular\'s built-in module boundaries (now via standalone components and route-level lazy loading) keep teams from stepping on each other.',
          '**Forms are the product** — multi-step wizards, dynamic validation, conditional fields. Angular Reactive Forms remain the strongest forms library in any major framework.',
          '**The org already runs Java or .NET** — the dependency-injection model and decorator-driven structure feel native to backend engineers crossing the stack.',
          '**Real-time, signal-driven UIs** — trading dashboards, telehealth consoles, observability tools. Signals shine here.',
        ],
      },
      {
        type: 'h2',
        text: 'When I pick React',
      },
      {
        type: 'p',
        text: "I reach for React when:",
      },
      {
        type: 'ul',
        items: [
          '**The product is content-led** — marketing sites, blogs, ecommerce, SaaS landing pages. Next.js with RSC + ISR is the strongest stack in the industry for SEO-driven products.',
          '**You\'re shipping an MVP fast** — small team, tight timeline, undefined scope. React + Vite + a component library gets you to demo quickly.',
          '**The product is a public app with millions of unique visitors** — bundle size, edge rendering, and streaming HTML matter. RSC gives you levers Angular doesn\'t.',
          '**You need React Native or cross-platform reach** — code and patterns transfer to mobile.',
          '**The team is hiring fast in a competitive market** — the React talent pool is simply larger.',
        ],
      },
      {
        type: 'h2',
        text: 'When the choice doesn\'t matter',
      },
      {
        type: 'p',
        text: "For roughly 70% of the apps I see, the framework choice is genuinely not the deciding factor. The same engineers who ship a clean Angular app will ship a clean React app, and the inverse is true. What kills projects is unclear ownership, poor data modelling, missing tests, and architecture decisions that get made in a Slack thread instead of a written doc. Pick the framework your team can run with and put the energy into the parts that actually compound.",
      },
      {
        type: 'h2',
        text: 'My honest 2026 default',
      },
      {
        type: 'p',
        text: "If a startup founder asks me today, with no other context: **Next.js with React 19**. The hiring pool is larger, RSC reduces the amount of state you have to manage, and the deployment story on Vercel or any edge platform is the simplest in the industry.",
      },
      {
        type: 'p',
        text: "If an enterprise CTO asks me — long-lived product, regulated industry, team of 30+: **Angular 20**. The opinionated structure and standalone-component story are worth the slightly steeper learning curve. You'll lose less time to bikeshedding and more code will look the same six months in.",
      },
      {
        type: 'p',
        text: "And if the team is already deep in one of them, the right answer is almost always to stay. Migration costs more than the framework difference saves.",
      },
      {
        type: 'h2',
        text: 'FAQ: Angular vs React in 2026',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Is Angular dying in 2026?',
            a: 'No. Angular is in the strongest shape it has been in years. Standalone components, signals, deferrable views, and zoneless change detection have modernised the framework. Adoption is steady in enterprise and high in markets like India and Germany. Job listings and Stack Overflow surveys still show meaningful Angular demand.',
          },
          {
            q: 'Is React still the most popular front-end framework in 2026?',
            a: 'Yes, by a wide margin in raw numbers and job postings, especially in North America. React powers more of the public web than any other framework. Angular has a smaller but loyal share, mainly in enterprise applications.',
          },
          {
            q: 'Which is easier to learn — Angular or React in 2026?',
            a: 'React has a gentler entry curve. You can build a useful component in an hour. Angular asks you to learn TypeScript, decorators, dependency injection, and signals before you ship anything serious — but the structure pays off on larger projects. For a developer with a strong OOP background, Angular often feels more natural.',
          },
          {
            q: 'Which has better performance in 2026, Angular or React?',
            a: 'Both are fast enough that the framework rarely is the bottleneck. Angular signals give an edge on highly reactive UIs with frequent fine-grained updates. React with Server Components has an edge on initial page load and bundle size for content-heavy apps. Pick based on workload shape, not benchmark numbers.',
          },
          {
            q: 'Should I learn Angular or React first as a new developer in 2026?',
            a: 'Learn React first if you want maximum job optionality and a faster path to your first paid project. Learn Angular first if you want to work in enterprise, fintech, or healthcare, or if you already write Java or C# and prefer that style. Strong front-end engineers know both within a few years.',
          },
          {
            q: 'Can I migrate from Angular to React (or vice versa)?',
            a: 'Technically yes, practically rarely worth it. Migration costs are typically 6–18 months of engineering time for a non-trivial app, with feature freezes and parallel runs. Unless the existing framework is genuinely blocking the business, invest that effort in the product instead.',
          },
          {
            q: 'Which is better for SEO — Angular or React?',
            a: 'React with Next.js and Server Components is the strongest SEO stack in 2026. Angular with @angular/ssr is solid and competitive but the React/Next.js ecosystem has a deeper bench of SEO tooling, edge rendering options, and ISR patterns.',
          },
          {
            q: 'Which framework pays better in 2026?',
            a: 'Senior salaries are roughly comparable. React skews slightly higher in startup roles and product companies; Angular skews slightly higher in enterprise, financial services, and healthcare contracts. The bigger pay drivers are seniority, system-design ability, and domain expertise — not framework choice.',
          },
        ],
      },
      {
        type: 'h2',
        text: 'Need help choosing or building?',
      },
      {
        type: 'p',
        text: "If you're at the start of a build and weighing **Angular vs React** for a real product — with real users, real revenue, and real constraints — I'm available for architecture reviews and engagements. I've led teams in both frameworks across telehealth, ed-tech, rentals, and HIPAA-regulated platforms.",
      },
      {
        type: 'cta',
        text: 'Skim the work, take a look at the experience, then send a short note about what you are building.',
        primary: { href: '/contact', label: 'Get in touch' },
        secondary: { href: '/projects', label: 'See my work' },
      },
    ],
  },
  {
    slug: 'hire-angular-developer-india',
    title: 'Hire an Angular Developer in India: What 10+ Years on Live Projects Taught Me',
    metaTitle: 'Hire Angular Developer India (2026 Guide)',
    excerpt:
      'Hire an Angular developer in India with confidence. A hands-on 2026 guide covering rates, engagement models, the skills that actually matter, and the hiring mistakes that cost projects months.',
    date: '2026-04-21',
    readingTime: '11 min read',
    tags: ['Angular', 'Hiring', 'India', 'Team', 'Career'],
    image: '/og-image.png',
    author: 'Nikhil Khot',
    content: [
      {
        type: 'p',
        text: "If you're searching for an **Angular developer in India**, you've probably already skimmed a dozen listings. Most of them read the same — \"5+ years Angular, TypeScript, RxJS, strong fundamentals.\" The listings don't tell you what actually separates a good Angular developer from one who'll ship a codebase you'll regret in eighteen months.",
      },
      {
        type: 'p',
        text: "I've been building with Angular since Angular 2, and I've led teams of **Angular developers in India** across telehealth, health-tech, ed-tech, and rentals. This post is the one I wish every engineering manager had in front of them before hiring. It covers what \"good\" looks like technically, what Indian Angular engineers bring to the table, how rates and engagement models really work, and where projects go sideways when the hiring bar is off.",
      },
      {
        type: 'h2',
        text: 'Why hire an Angular Developer in India?',
      },
      {
        type: 'p',
        text: "The short answer: depth of talent, time-zone overlap with Europe and the Middle East, and budgets that still let you build a real team instead of one isolated contractor. I've worked with **Angular developers in India** since the AngularJS days, and in the last decade the Indian Angular ecosystem has matured into something most hiring managers outside the country still underestimate.",
      },
      {
        type: 'h3',
        text: 'A mature Angular talent pool',
      },
      {
        type: 'p',
        text: "India has been shipping production Angular apps for nearly a decade. Senior engineers have seen the upgrade treadmill — AngularJS to Angular 2, Ivy renderer, standalone components, signals. An **Angular developer in India** with six-plus years of experience has almost certainly migrated at least one major version. That migration muscle is worth more than a fresh hire who only knows the latest syntax.",
      },
      {
        type: 'h3',
        text: 'Time zone and English overlap',
      },
      {
        type: 'p',
        text: "Pune, Bengaluru, Hyderabad, and Gurgaon sit roughly 5.5 hours ahead of London and 10.5 ahead of New York. For European teams you get a full overlapping workday. For US teams you get a working handoff: a feature request at 5 PM EST lands with a working PR by 9 AM the next morning. English is the working language across every Indian IT hub I've recruited in.",
      },
      {
        type: 'h3',
        text: 'Cost — without cutting corners',
      },
      {
        type: 'p',
        text: "The cliché is that India is cheap. The reality, if you're hiring **senior Angular developers in India**, is that you're still paying senior rates — just on a different curve. A principal-level Angular engineer in Pune costs roughly 35–50% of the same role in San Francisco, but 2–3× what a mid-level developer costs locally. The delta is real, but \"cheap\" is the wrong frame. Think efficient.",
      },
      {
        type: 'h2',
        text: 'What a strong Angular Developer India actually knows',
      },
      {
        type: 'p',
        text: "Every candidate's CV in India claims TypeScript, RxJS, and Angular Material. The skills I actually interview for are narrower and more revealing.",
      },
      {
        type: 'h3',
        text: 'RxJS beyond .subscribe()',
      },
      {
        type: 'p',
        text: "A lot of Angular code is written by engineers who treat Observables like Promises. A strong **Angular developer in India** should explain `switchMap` vs `mergeMap` vs `concatMap` in the context of a real search autocomplete or form-save flow. They should know why `share()` and `shareReplay()` exist, and when `takeUntilDestroyed()` saves them from memory leaks.",
      },
      {
        type: 'h3',
        text: 'Change detection and OnPush',
      },
      {
        type: 'p',
        text: "If a candidate can't walk me through `ChangeDetectionStrategy.OnPush` and when to reach for `ChangeDetectorRef.markForCheck()`, they'll write dashboards that spin CPU on every mouse move. This is the single most common cause of slow Angular apps I've inherited from other teams.",
      },
      {
        type: 'h3',
        text: 'The build and the bundle',
      },
      {
        type: 'p',
        text: "A senior **Angular developer in India** should understand lazy loading, route-level code splitting, and why your initial bundle should stay under 250 KB gzipped if you care about Largest Contentful Paint. They should have opened `stats.json` at least once and know what `esbuild` changed in the Angular CLI.",
      },
      {
        type: 'h3',
        text: 'State management that fits the project',
      },
      {
        type: 'p',
        text: "NgRx is the default answer in interviews, but it's overkill for half the apps it ends up in. An experienced Angular engineer knows when a service with a `BehaviorSubject` is enough, when to reach for Component Store, and when the project genuinely needs full Redux-style state. Picking the right tool saves a year of boilerplate.",
      },
      {
        type: 'h3',
        text: 'Signals and the new reactivity model',
      },
      {
        type: 'p',
        text: "Angular 17+ replaced Zone.js-based change detection with a signals-based reactivity system. Any serious **Angular developer in India** you hire in 2026 should know `signal()`, `computed()`, and `effect()` — and when they replace RxJS patterns entirely versus when the two should coexist. A red flag: candidates who still describe NgZone or `ngDoCheck` as the recommended approach for new projects.",
      },
      {
        type: 'h2',
        text: 'Engagement models for hiring Angular Developers in India',
      },
      {
        type: 'p',
        text: 'There are three clean ways to work with an **Angular developer in India**, and choosing wrong wastes months.',
      },
      {
        type: 'h3',
        text: 'Full-time employee (FTE)',
      },
      {
        type: 'p',
        text: "Best when Angular is core to your product and the work will be ongoing for a year or more. You get team integration, institutional memory, and the ability to invest in code quality. Notice periods in India are typically 60–90 days — plan accordingly when you build a hiring pipeline.",
      },
      {
        type: 'h3',
        text: 'Contract / staff augmentation',
      },
      {
        type: 'p',
        text: "Best when you need to ramp a team quickly for a defined phase — a feature, a migration, a rewrite. Expect 15–30 day onboarding ramps. A good contract **Angular developer in India** should pass the same technical bar as your full-time engineers; don't drop the bar for contractors or you'll spend the savings on clean-up later.",
      },
      {
        type: 'h3',
        text: 'Project-based / fixed scope',
      },
      {
        type: 'p',
        text: "Best for greenfield builds with clear requirements. The risk is that \"fixed scope\" almost never stays fixed, and change orders get expensive. If you go this route, pick a partner who documents assumptions in writing and treats scope changes as first-class events, not annoyances.",
      },
      {
        type: 'h2',
        text: 'The stack that pairs well with Angular',
      },
      {
        type: 'p',
        text: "Angular rarely exists alone. In my experience leading **Angular developers in India**, the stack that pairs best depends on the product shape:",
      },
      {
        type: 'ul',
        items: [
          '**Angular + PHP (Laravel, Symfony):** my default for data-heavy apps — booking platforms, admin dashboards, ed-tech. Mature ecosystem, fast to iterate.',
          '**Angular + Node.js (Express, NestJS):** best when you need real-time features, WebSockets, or shared TypeScript types across front and back. NestJS in particular borrows Angular\'s module and decorator patterns.',
          '**Angular + Java Spring:** common in fintech and regulated industries. Pair a senior Angular dev with a Java architect and you can move fast without spooking the compliance team.',
          '**Databases:** MySQL or PostgreSQL for relational workloads. MongoDB only when the data is genuinely document-shaped.',
          '**Cloud:** AWS is the default in India — EC2, S3, RDS, CloudFront. GCP and Azure are both well-supported.',
        ],
      },
      {
        type: 'h2',
        text: 'How I approach Angular projects',
      },
      {
        type: 'p',
        text: "When I take on an Angular project — whether as a principal engineer or leading a team of **Angular developers in India** — the first two weeks are always the same.",
      },
      {
        type: 'p',
        text: "Week one is listening. I read the existing code, run the app under a profiler, and talk to the product owner about what hurts. I want to know which two or three screens are slow, which workflows trigger support tickets, and which parts of the codebase engineers avoid touching. That tells me more about the real architecture than any design doc will.",
      },
      {
        type: 'p',
        text: "Week two is the plan. I write a short document — usually three to five pages — that lists the five biggest risks, the five highest-leverage wins, and the order I'd do them in. Architecture decisions go in writing because six months later, no one remembers why we picked one approach over another.",
      },
      {
        type: 'p',
        text: "From there we work in two-week cycles with mid-cycle demos. Code reviews are non-negotiable — every PR gets a review, and the reviewer is expected to leave at least one substantive comment. That's how junior engineers grow into mid-level ones. It's also how you catch the subtle RxJS leak before it hits production.",
      },
      {
        type: 'h2',
        text: 'Common mistakes when hiring an Angular Developer in India',
      },
      {
        type: 'p',
        text: 'A few patterns I see every single year:',
      },
      {
        type: 'ul',
        items: [
          '**Hiring on framework version.** "Angular 19 required" filters out engineers who\'ve shipped production apps for a decade but started their current job on Angular 17. Seniority compounds; version specifics don\'t.',
          '**Skipping the system-design round.** Angular developers who only answer component-level questions will build you a beautiful screen that doesn\'t scale. Ask how they\'d design a dashboard with 20 widgets that each fetch from a different API.',
          '**Underpaying senior talent.** Trying to hire a principal-level **Angular developer in India** at mid-level rates is the fastest way to ship a project twice. Pay for the bar you want.',
          '**No code review from day one.** New hires left without review for the first month absorb the codebase\'s bad habits, and you don\'t find out until the first incident.',
          '**Treating English tests as skill tests.** Fluent English does not equal strong engineering. Conversational comfort matters, but the interview loop should still be technical.',
        ],
      },
      {
        type: 'h2',
        text: 'FAQ: Hiring an Angular Developer in India',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How much does it cost to hire an Angular developer in India?',
            a: 'Junior Angular developers in India typically cost USD 15–25 per hour; mid-level 25–45; senior 45–75; principal 70–110. Full-time annual salaries range from around INR 6 LPA at entry level to INR 50+ LPA for principal engineers at product companies. Rates vary by city, specialization, and whether you hire through an agency or direct.',
          },
          {
            q: 'How long does it take to hire an Angular developer in India?',
            a: 'Through an agency or staff-augmentation partner, 1–3 weeks from brief to start date is realistic. Direct full-time hires typically take 6–10 weeks, because notice periods in India are commonly 60–90 days.',
          },
          {
            q: "What's the difference between a freelance and full-time Angular developer in India?",
            a: 'Freelance Angular developers are flexible and fast to onboard but harder to integrate into a long-running product team. Full-time Angular developers give you institutional memory and deeper code ownership, but cost more in benefits and come with longer hiring cycles.',
          },
          {
            q: 'Do Angular developers in India also know TypeScript, RxJS, and NgRx?',
            a: 'Yes. Any serious Angular developer in India will be fluent in TypeScript (it is the default for modern Angular) and comfortable with RxJS. NgRx familiarity is common but not universal — ask about it explicitly if your project uses it, and test for judgment on when state management is and is not appropriate.',
          },
          {
            q: 'What time zones do Angular developers in India work in?',
            a: 'Indian Standard Time (UTC+5:30). That is a full workday overlap with Europe and the Middle East, and roughly 4–5 hours of morning overlap with the US East Coast. Most Indian Angular developers are comfortable stretching hours a little to meet team standups in either direction.',
          },
          {
            q: 'Can I hire an Angular developer in India for a short project?',
            a: 'Yes. Contract engagements from 1 to 6 months are common. Shorter engagements under 4 weeks are possible for specific deliverables like a performance audit, a version migration, or a code-quality review.',
          },
          {
            q: 'Which cities in India have the strongest Angular developer talent pools?',
            a: 'Pune, Bengaluru, Hyderabad, Chennai, Gurgaon, and Noida all have mature Angular ecosystems. Pune and Bengaluru have the highest concentration of principal-level engineers with product experience; Hyderabad and Chennai have strong enterprise backgrounds.',
          },
        ],
      },
      {
        type: 'h2',
        text: 'Ready to hire an Angular Developer in India?',
      },
      {
        type: 'p',
        text: "If you're looking to hire an **Angular developer in India** for a project that matters — something with real users, real revenue, and real constraints — I'm available. I've spent 10+ years leading Angular teams on healthtech, HIPAA-compliant telehealth, ed-tech, and enterprise projects.",
      },
      {
        type: 'cta',
        text: 'Have a look at the work, skim the experience, then send a short note about what you are building.',
        primary: { href: '/contact', label: 'Get in touch' },
        secondary: { href: '/projects', label: 'See my work' },
      },
    ],
  },
  {
    slug: 'cutting-api-response-times-by-40-percent',
    title: 'How I cut API response times by 40%',
    metaTitle: 'Cut API Response Times by 40% — MySQL & PHP Performance',
    excerpt:
      'A practical walkthrough of MySQL slow query logging, composite indexing, N+1 fixes, connection pooling, and PHP service-layer cleanup that took a telehealth API from 1.4 s p95 to under 800 ms.',
    date: '2026-02-12',
    updated: '2026-03-04',
    readingTime: '10 min read',
    tags: ['MySQL', 'Performance', 'PHP', 'Backend'],
    image: '/og-image.png',
    author: 'Nikhil Khot',
    content: [
      {
        type: 'p',
        text: "When I took over the telehealth API at Spring, p95 latency was sitting around 1.4 seconds. Most of it was MySQL. The rest was PHP doing work it didn't need to do. We got it under 800 ms in six weeks without touching the schema or switching databases.",
      },
      {
        type: 'p',
        text: "The techniques aren't exotic. They're the same ones that fix 80% of slow APIs: instrument first, index correctly, stop querying the same row twice, and pool connections. Here's exactly what we did.",
      },
      {
        type: 'h2',
        text: 'Start with EXPLAIN, not intuition',
      },
      {
        type: 'p',
        text: "Every engineer has a hunch about which query is slow. Most hunches are wrong. I logged every query over 200 ms for a week using MySQL's slow query log, then ran `EXPLAIN ANALYZE` on the top offenders. Three of them were doing full table scans on a 12M row appointments table — `type: ALL` in the output, which is the bad kind.",
      },
      {
        type: 'h3',
        text: 'Setting up slow query logging',
      },
      {
        type: 'p',
        text: "Add these to your `my.cnf` and restart: `slow_query_log = 1`, `slow_query_log_file = /var/log/mysql/slow.log`, `long_query_time = 0.2`. Then use `pt-query-digest` from Percona Toolkit to aggregate the log into a ranked report. Within five minutes you'll know which three queries are responsible for 70% of the pain.",
      },
      {
        type: 'h2',
        text: 'The indexing pass',
      },
      {
        type: 'p',
        text: "Once I had the culprit queries, the fixes were mostly indexing. Adding composite indexes on `(doctor_id, scheduled_at)` and `(patient_id, status)` cut the worst queries from 900 ms to under 40 ms. The key insight is column order: put the equality condition first, the range condition second.",
      },
      {
        type: 'h3',
        text: 'Composite indexes vs single-column',
      },
      {
        type: 'p',
        text: "A lot of databases have a single index on `doctor_id` and a separate one on `scheduled_at`. MySQL's optimizer will use one of them, not both. A composite `(doctor_id, scheduled_at)` index lets the query filter on doctor first — shrinking the result set to one doctor's rows — then scan only that subset ordered by date. That's often a 20× improvement over either single-column index.",
      },
      {
        type: 'h3',
        text: 'Dropping dead indexes',
      },
      {
        type: 'p',
        text: "I also dropped five unused indexes. Every index costs write performance — MySQL updates all indexes on every `INSERT` and `UPDATE`. The `sys.schema_unused_indexes` view shows indexes that haven't been used since the last restart. Any index with zero reads over a live week is a candidate for removal.",
      },
      {
        type: 'h2',
        text: 'Fixing N+1 queries',
      },
      {
        type: 'p',
        text: "The indexing pass took us to around 600 ms p95. The remaining work was PHP. The most common pattern I found was N+1 queries — a query returning N rows, followed by N separate queries to fetch a related row for each one.",
      },
      {
        type: 'p',
        text: "In our case: an endpoint fetched 50 appointments, then for each appointment fired a separate query to fetch the doctor's name. 50 appointments meant 51 queries. The fix was to collect the `doctor_id` values from the first query, run one `WHERE doctor_id IN (...)` query, and hydrate from a map. 51 queries became 2.",
      },
      {
        type: 'ul',
        items: [
          '**Identify N+1s:** log every query in a single request and look for repeated query shapes with different IDs.',
          '**Fix with IN queries:** collect the IDs from the first query, batch-fetch related rows in one round trip.',
          '**Use eager loading:** Eloquent, Doctrine, and ActiveRecord all have eager-loading APIs — use them explicitly for known relationships.',
          '**Cap IN-clause size:** batch IDs in chunks of 200–500; very large IN clauses degrade query planning.',
        ],
      },
      {
        type: 'h2',
        text: 'The service layer',
      },
      {
        type: 'p',
        text: "The real surprise was the PHP service layer. One endpoint was running the same user-lookup query four times across nested method calls. Each layer called `UserService::find($id)` independently, assuming someone else had already cached it.",
      },
      {
        type: 'h3',
        text: 'Request-scoped caching',
      },
      {
        type: 'p',
        text: "The fix was a request-scoped identity map: a simple array keyed by user ID that the service checked before hitting the database. Because it lives on the service object and the service is a singleton for the lifetime of the request, it resets automatically on the next request. No external cache, no invalidation logic, no TTL to manage. The p95 dropped another 200 ms from that change alone.",
      },
      {
        type: 'p',
        text: "The pattern generalises. Any object looked up by ID more than once per request is a candidate for request-scoped caching. Role lookups, feature flags, configuration values — all of these get queried repeatedly in typical PHP apps.",
      },
      {
        type: 'h2',
        text: 'Connection pooling',
      },
      {
        type: 'p',
        text: "PHP's traditional model is one MySQL connection per request, opened at the start and closed at the end. On a server with 200 concurrent requests, that's 200 connection handshakes per second. At p95 scale, that overhead adds up — around 8 ms per request on our setup.",
      },
      {
        type: 'p',
        text: "We added **ProxySQL** in front of MySQL. It maintains a pool of persistent connections to MySQL and hands them off to PHP processes on demand. Connection establishment time dropped from ~8 ms to under 1 ms. For a 150 ms API endpoint, 8 ms per connection is meaningful.",
      },
      {
        type: 'h2',
        text: 'Caching hot reads with Redis',
      },
      {
        type: 'p',
        text: "After all of the above, we were at 420 ms p95 — already a 70% improvement. The last push came from caching reference data that never changes between deployments: specialty lists, clinic locations, procedure codes. These were being queried on every request because they live in the database.",
      },
      {
        type: 'p',
        text: "We cached them in Redis with a 10-minute TTL and a manual flush on deploy. The queries went from ~12 ms each to sub-millisecond. Rule of thumb: any table a developer would hesitate to `UPDATE` in production is a caching candidate.",
      },
      {
        type: 'h2',
        text: 'Monitoring what you improved',
      },
      {
        type: 'p',
        text: "The work isn't done until you can see it in a dashboard. We set up three metrics: p50 and p95 latency per endpoint (via application-level timing middleware), slow query count per minute (from the MySQL slow log), and cache hit rate (from Redis `INFO stats`). If any of those regress on a deploy, we catch it in the first five minutes.",
      },
      {
        type: 'h2',
        text: "What I'd do differently",
      },
      {
        type: 'p',
        text: "I'd set up slow query logging and endpoint-level latency tracking on day one. Half the work here was finding the problems, not fixing them. In a fresh project I'd also enforce a `SELECT *` ban from the start — most of the heaviest queries were selecting 20 columns when they needed 3.",
      },
      {
        type: 'h2',
        text: 'FAQ: MySQL and API performance',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How do I find which MySQL queries are slow?',
            a: "Enable the slow query log with `slow_query_log = 1` and `long_query_time = 0.2` in my.cnf. Then use pt-query-digest from Percona Toolkit to aggregate the log into a ranked report. You'll have the top offenders in minutes.",
          },
          {
            q: 'When should I add a composite index vs a single-column index?',
            a: 'Add a composite index when your WHERE clause filters on two or more columns together. Put the most selective column first and range conditions (>, <, BETWEEN, LIKE) last. Single-column indexes are fine when queries filter on one column at a time.',
          },
          {
            q: 'What is an N+1 query problem and how do I fix it?',
            a: 'An N+1 problem is when you fetch N rows and then fire one additional query per row to fetch related data, resulting in N+1 total queries. Fix it by collecting all the needed IDs from the first query and fetching related rows in one batch using WHERE id IN (...).',
          },
          {
            q: 'Is Redis necessary for a PHP MySQL application?',
            a: 'Not always. Redis adds value for data that is read frequently, changes rarely, and is expensive to recompute. Reference tables, session data, and rate-limit counters are the clearest wins. For frequently-written data, the cost of cache invalidation often outweighs the benefit.',
          },
          {
            q: 'What is connection pooling and do I need it?',
            a: 'Connection pooling maintains a set of pre-opened database connections and hands them to PHP processes on demand, avoiding the cost of a new TCP handshake on every request. It becomes worth the added infrastructure above roughly 100–150 concurrent requests. ProxySQL and PgBouncer are the most common options.',
          },
        ],
      },
      {
        type: 'h2',
        text: 'Working on a slow API?',
      },
      {
        type: 'p',
        text: "If your backend has latency you can't explain — or you've inherited a codebase with no instrumentation — I'm available for performance audits and engineering engagements. I've optimised APIs in PHP, Node.js, and Python across healthcare, ed-tech, and rentals products.",
      },
      {
        type: 'cta',
        text: 'Take a look at the work, then reach out with what you are trying to fix.',
        primary: { href: '/contact', label: 'Get in touch' },
        secondary: { href: '/projects', label: 'See my work' },
      },
    ],
  },
  {
    slug: 'leading-a-team-without-losing-your-hands',
    title: 'Leading a team without losing your hands',
    metaTitle: 'Leading an Engineering Team Without Losing Technical Edge',
    excerpt:
      'Notes from two years of running a team of five: how I balance code reviews, architecture calls, 1:1s, delegation, and keeping my own IDE warm without becoming a meeting-only manager.',
    date: '2026-01-20',
    readingTime: '9 min read',
    tags: ['Leadership', 'Team', 'Career'],
    image: '/og-image.png',
    author: 'Nikhil Khot',
    content: [
      {
        type: 'p',
        text: "The cliché is that when you become a lead you stop coding. I disagreed with that when I took the role, and two years in I still do. But the way I code changed completely — and figuring out how it changed was the actual work.",
      },
      {
        type: 'h2',
        text: 'Code the thin slices',
      },
      {
        type: 'p',
        text: "I don't pick up feature tickets anymore. I pick up the scaffolding: a new auth module, the first version of a background job runner, the service that glues two teams' work together. These are the places where a bad pattern costs a year of cleanup.",
      },
      {
        type: 'p',
        text: "The rule I follow: any piece of code that five other engineers will copy in the next month is mine to write. Whatever I write becomes the template, and templates compound. If I write it correctly — clean interfaces, sensible error handling, a test that demonstrates intent — the team absorbs that standard without a policy meeting.",
      },
      {
        type: 'h2',
        text: 'Reviews are a teaching surface',
      },
      {
        type: 'p',
        text: "Every PR I review is a chance to explain a decision in writing. I try to keep comments short and link to the reasoning, not just the fix. \"Extract this into a service\" is less useful than \"extract this into a service — logic in controllers becomes hard to test and impossible to reuse when the second caller arrives.\"",
      },
      {
        type: 'p',
        text: "I have one rule: if I leave the same comment for the third time, I write a short internal doc instead and link to it from the review. That converts a repeated correction into a durable standard. Three months in, I'm not the one catching it anymore.",
      },
      {
        type: 'h2',
        text: '1:1s that actually do something',
      },
      {
        type: 'p',
        text: "Most 1:1s are status updates in disguise. The engineer talks about what they finished and what's next. The lead nods. Thirty minutes gone. I stopped running status-update 1:1s after the first quarter — I get that from stand-up and the ticket board.",
      },
      {
        type: 'p',
        text: "What I ask instead: what's the one thing slowing you down that I could fix today? What are you not learning that you want to be learning? Is there anything in the codebase you'd be embarrassed to show an outsider? That last question is worth the whole meeting. Engineers know where the skeletons are. They rarely get asked.",
      },
      {
        type: 'h2',
        text: 'Delegation without abandonment',
      },
      {
        type: 'p',
        text: "The failure mode I see most in new leads is the pendulum: they either hold everything (can't let go) or drop everything on the team without context (disappeared into meetings). Both feel bad to the team, for opposite reasons.",
      },
      {
        type: 'p',
        text: "My version of healthy delegation has three parts: clear outcome, clear constraints, and a defined check-in point. \"Build the export feature. It needs to handle 100K rows without timing out. Show me a design doc by Thursday before you write code.\" The engineer owns the problem. I own the context and the unblock.",
      },
      {
        type: 'ul',
        items: [
          '**Outcome, not process:** define what done looks like, not how to get there.',
          '**Constraints up front:** performance requirements, timeline, API compatibility — things the engineer will hit mid-implementation if not told early.',
          '**One check-in before the halfway point:** catch mis-direction before it becomes sunk cost.',
          "**Don't re-delegate your feedback:** if you told the engineer to build it, review their design yourself.",
        ],
      },
      {
        type: 'h2',
        text: 'Keeping your own technical depth',
      },
      {
        type: 'p',
        text: "This is the one most leads lose without noticing. You stop writing code, then you stop reading code closely, then your architecture opinions become increasingly detached from what the codebase actually is. Six months later you're making decisions based on what you remember, not what exists.",
      },
      {
        type: 'p',
        text: "I protect three things: I read every non-trivial PR, even the ones I'm not formally reviewing. I write the first version of any new service or module. And I keep one small self-contained ticket in every sprint that I ship myself. It takes 4–6 hours a week, but it keeps the signal alive.",
      },
      {
        type: 'h2',
        text: 'Managing up while shipping down',
      },
      {
        type: 'p',
        text: "The lead sits between the team and everyone above it. That means translating in both directions. When I talk to product or exec, I translate technical complexity into business risk: \"This refactor isn't optional, it's three months away from being a two-week outage.\" When I talk to the team, I translate business pressure into focus: \"This quarter the one thing that matters is the performance work, not the feature backlog.\"",
      },
      {
        type: 'p',
        text: "Most engineers in lead roles over-explain technical detail upward and under-explain business context downward. The team doesn't need the full OKR deck. They need to know why the order of work matters right now.",
      },
      {
        type: 'h2',
        text: 'When to stop coding entirely',
      },
      {
        type: 'p',
        text: "There are two legitimate reasons to step back from the keyboard. One: when you're in a period of high people management load — a hiring push, a performance conversation, a team restructure. Trying to deliver code commitments during a hiring sprint splits your attention in a way that hurts both.",
      },
      {
        type: 'p',
        text: "Two: when the codebase has grown to the point where your time has higher leverage in architecture review than in writing. A principal-level engineer whose reviews unblock four engineers delivers more than one who ships one feature themselves.",
      },
      {
        type: 'p',
        text: "But I push back on the idea that this is the natural endpoint for all leads. Plenty of senior engineers stay hands-on for their whole career. The right level of coding depends on the team's needs, not an org chart assumption.",
      },
      {
        type: 'h2',
        text: 'FAQ: Engineering leadership',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How much should an engineering lead code?',
            a: 'It depends on team size and phase. Leading a team of 3–5, I aim for 30–40% coding time — scaffolding, architecture, sharp-edge tickets. Leading a team of 10+, that typically drops to 15–20%, mostly architecture and review. In a hiring push or incident week, it can drop to zero. The goal is enough hands-on time to keep your technical judgment sharp.',
          },
          {
            q: 'How do I run better 1:1s as an engineering lead?',
            a: "Drop the status update format — you can get that from stand-up. Instead ask: what is slowing you down that I can fix? What do you want to be learning that you're not? Is there anything in the codebase you'd be embarrassed to show an outsider? The last question surfaces technical debt faster than any code review process.",
          },
          {
            q: 'How do you delegate without micromanaging?',
            a: "Define outcome and constraints up front, set one check-in before the halfway point, and then get out of the way. The common failure is defining neither outcome nor constraints and then micromanaging when the engineer goes in a direction you didn't expect. If you didn't define what done looks like, the misdirection is on you.",
          },
          {
            q: 'How do you handle a team member who is underperforming?',
            a: "First, make sure the problem is actually performance and not clarity. A lot of underperformance is engineers working on the wrong things without knowing it. Have a direct conversation about the specific gap — late delivery, code quality, communication — with examples. Set a defined improvement window of 4–6 weeks with a clear bar. Most people respond to honesty and specificity.",
          },
          {
            q: 'How do you keep a team motivated during a long unglamorous project?',
            a: "Tie the work to something visible. A performance project that no one sees externally still has internal milestones — p95 going from 1.4 s to 600 ms is a win worth celebrating. Run a mid-project demo even if it's just metrics. And protect the team from scope creep that arrives during the hardest part of a project — nothing kills motivation faster than being asked to add features mid-migration.",
          },
        ],
      },
      {
        type: 'h2',
        text: 'Building a team or stepping into a lead role?',
      },
      {
        type: 'p',
        text: "If you're growing an engineering team or moving into a first lead role and want a sounding board — I work with early-stage and scale-up engineering teams on architecture, hiring, and team structure.",
      },
      {
        type: 'cta',
        text: 'Take a look at the experience, then reach out about what you are building.',
        primary: { href: '/contact', label: 'Get in touch' },
        secondary: { href: '/about', label: 'My experience' },
      },
    ],
  },
  {
    slug: 'hipaa-for-engineers-who-never-asked-for-it',
    title: 'HIPAA for engineers who never asked for it',
    metaTitle: 'HIPAA for Engineers: A Practical 2026 Checklist',
    excerpt:
      "A practical guide for the engineer who just found out their feature is going into a HIPAA-regulated product. PHI classification, encryption, audit logs, BAAs, and breach notification — the parts that actually affect your code.",
    date: '2025-12-08',
    readingTime: '12 min read',
    tags: ['HIPAA', 'Security', 'Healthcare', 'Compliance'],
    image: '/og-image.png',
    author: 'Nikhil Khot',
    content: [
      {
        type: 'p',
        text: "HIPAA is not a framework you install. It's a set of outcomes the federal law requires — and unlike GDPR or SOC 2, there's no certification to point at when an auditor asks what you've done. Here's the shape of what your code and your team have to do to be in defensible shape.",
      },
      {
        type: 'p',
        text: "I've built and reviewed HIPAA-compliant systems at a regulated telehealth company for several years. Most engineers approaching HIPAA for the first time over-focus on encryption and under-focus on access control and audit trails. This post covers both.",
      },
      {
        type: 'h2',
        text: 'What counts as PHI',
      },
      {
        type: 'p',
        text: "Protected Health Information (PHI) is any information that can link a health condition or healthcare transaction to a specific person. It's broader than most engineers expect.",
      },
      {
        type: 'ul',
        items: [
          '**Obvious PHI:** diagnosis codes, medication names, lab results, clinical notes, treatment dates.',
          '**Less obvious PHI:** appointment timestamps (they imply a healthcare interaction), billing amounts (they link a person to a payment for care), device identifiers if attached to a health record.',
          '**PHI in logs:** if your application log contains a user ID and a health-related action (\"user 1234 viewed prescription\"), that log line is PHI. Log files need the same controls as your database.',
          '**De-identified data is not PHI** — but Safe Harbor de-identification requires removing 18 specific identifiers including full name, zip codes below 5 digits, dates more precise than year, and device identifiers. Half-measures do not count.',
        ],
      },
      {
        type: 'h2',
        text: 'Encryption at rest',
      },
      {
        type: 'p',
        text: "HIPAA requires encryption at rest as an addressable standard — meaning you have to implement it or document why an equivalent alternative is sufficient. In practice: just do it.",
      },
      {
        type: 'ul',
        items: [
          '**Database volumes:** use encrypted EBS volumes on AWS (AES-256). Enable at provisioning — encrypting a running instance requires a snapshot-and-restore.',
          '**S3 buckets:** enable SSE-KMS with a customer-managed key. Enforce via bucket policy that denies `s3:PutObject` without `x-amz-server-side-encryption`.',
          '**Application-level encryption for the most sensitive fields:** consider encrypting PHI fields (diagnoses, SSNs) at the application layer with a key stored in AWS KMS, separate from the database key. This protects against a DBA with direct DB access.',
          '**Backups:** encrypted at the same level as the source. RDS automated backups inherit encryption; manual snapshots shared to another account may not — verify explicitly.',
        ],
      },
      {
        type: 'h2',
        text: 'Encryption in transit',
      },
      {
        type: 'p',
        text: "All PHI in transit must be encrypted. \"In transit\" means everywhere: client to server, server to server, application to database, application to S3.",
      },
      {
        type: 'ul',
        items: [
          '**TLS 1.2 minimum, 1.3 preferred:** disable TLS 1.0 and 1.1 at the load balancer and in your MySQL/Postgres SSL config. Test with `testssl.sh`.',
          '**Internal traffic is not exempt:** service-to-service calls inside a VPC still carry PHI and should use TLS or mTLS. \"It\'s internal\" is not a HIPAA defence.',
          '**HSTS in response headers:** set `Strict-Transport-Security: max-age=31536000; includeSubDomains` to prevent browser downgrades.',
          '**Certificate management:** use ACM on AWS or Let\'s Encrypt with auto-renewal. A lapsed cert causing a patient-facing outage is a bad day; a lapsed internal cert that someone works around with `verify=false` is a breach.',
        ],
      },
      {
        type: 'h2',
        text: 'Audit logs you can actually search',
      },
      {
        type: 'p',
        text: "If you can't answer 'who accessed patient X's record last Tuesday at 3 PM?' in under five minutes, your audit log isn't doing its job. HIPAA's Security Rule requires audit controls — a mechanism to record and examine activity.",
      },
      {
        type: 'p',
        text: "Every audit log entry needs three things: who (`user_id`, role), what (`action`, `resource_type`, `resource_id`), and when (`timestamp` in UTC with millisecond precision). If you only log the who and when, you can prove someone accessed the system but not what they saw.",
      },
      {
        type: 'ul',
        items: [
          '**Log at the application layer, not just the DB layer:** application logs capture intent (\"user viewed appointment\"). DB logs capture statements. You want both, but application logs are more useful for investigations.',
          '**Immutable logs:** audit logs must not be modifiable by application code. Write to a separate log store that application credentials can INSERT into but not DELETE or UPDATE from.',
          '**Retention:** HIPAA requires 6 years for policies and certain records. For audit logs, 6 years is a safe default. Cost is minimal with S3 Glacier.',
          '**Searchable:** index on `user_id`, `resource_id`, and `created_at`. If your audit table grows to 100M rows with no indexes, investigations become impractical.',
        ],
      },
      {
        type: 'h2',
        text: 'Access control, written down',
      },
      {
        type: 'p',
        text: "RBAC is the technical floor. What auditors actually want is a document that says who can access what data, under what circumstances, signed by someone accountable, and updated when it changes.",
      },
      {
        type: 'p',
        text: "In code: enforce role checks at the service layer, not the controller layer. A controller check is easy to miss when a new endpoint is added. A service that enforces `hasPermission('read:phi')` before returning any PHI is harder to accidentally bypass.",
      },
      {
        type: 'ul',
        items: [
          '**Minimum necessary:** HIPAA\'s minimum necessary standard means users should only see the PHI required for their role. A billing clerk shouldn\'t have read access to clinical notes.',
          '**Break-glass access:** some workflows require a provider to access records outside their normal patient panel. Log these explicitly with a reason code and flag them in your compliance dashboard.',
          '**Access reviews:** HIPAA requires periodic review of who has access to what. Build an export that lists all users with PHI access by role. Running this quarterly is the minimum.',
        ],
      },
      {
        type: 'h2',
        text: 'Business Associate Agreements',
      },
      {
        type: 'p',
        text: "A Business Associate is any vendor or contractor who handles PHI on your behalf. You need a signed BAA with every one of them before PHI touches their systems.",
      },
      {
        type: 'p',
        text: "The ones engineers forget most often: your cloud provider (AWS, GCP, and Azure all offer BAAs — you have to request them, they are not automatic), your error tracking tool (Sentry, Datadog — scrub PHI from payloads or get a BAA), your log aggregator, and any LLM API if you're sending patient data to it.",
      },
      {
        type: 'p',
        text: "No BAA means you're moving PHI to a vendor without a legal framework. That's a direct HIPAA violation regardless of encryption or access controls.",
      },
      {
        type: 'h2',
        text: 'Breach notification',
      },
      {
        type: 'p',
        text: "If PHI is accessed by an unauthorised party, HIPAA's Breach Notification Rule kicks in. The clock starts when you discover the breach, not when it occurred.",
      },
      {
        type: 'ul',
        items: [
          '**Under 500 individuals affected:** notify each affected individual within 60 days of discovery. Report to HHS annually.',
          '**Over 500 individuals affected:** notify affected individuals within 60 days, notify HHS within 60 days, AND notify prominent media in the affected state. This is the one that makes news.',
          '**Document everything:** documentation that you assessed a potential incident and determined it was not a breach is almost as important as the breach response itself. Undocumented assessments look like cover-ups.',
          '**Have a runbook before you need it:** a breach at 2 AM is the wrong time to figure out who the Privacy Officer is and how to reach HHS.',
        ],
      },
      {
        type: 'h2',
        text: "The HIPAA engineer's practical checklist",
      },
      {
        type: 'ul',
        items: [
          '**Classify all data:** decide before you write a line of code which fields are PHI and document it.',
          '**Encrypt at rest and in transit:** EBS, S3, database volumes — all encrypted. TLS 1.2+ everywhere, including internal traffic.',
          '**Application-layer audit logging:** who, what, when — immutable, retained 6 years, indexed for search.',
          '**RBAC with minimum necessary enforcement:** role checks at the service layer, not the controller.',
          '**BAAs signed before PHI touches the vendor:** cloud, error tracking, logging, LLM APIs.',
          '**Scrub PHI from error payloads and logs:** never let a stack trace carry a patient name or record ID.',
          '**Incident response runbook:** who is the Privacy Officer, what is the HHS notification process, who drafts the patient notification.',
          '**Periodic access reviews:** quarterly export of all users with PHI access, reviewed by someone accountable.',
        ],
      },
      {
        type: 'h2',
        text: 'FAQ: HIPAA for engineers',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Does HIPAA apply to my app?',
            a: "HIPAA applies to Covered Entities (healthcare providers, insurers, clearinghouses) and their Business Associates (vendors who handle PHI on their behalf). If your app stores or transmits identifiable health data for a covered entity, HIPAA applies to you as a Business Associate. If you're building a general wellness app not connected to a provider, HIPAA may not apply — but FTC Act requirements around health data still do.",
          },
          {
            q: 'What is the difference between HIPAA Technical Safeguards and Administrative Safeguards?',
            a: "Technical safeguards are the code: encryption, access control, audit logging, automatic logoff. Administrative safeguards are the policies and training: who is the Privacy Officer, how employees are trained, how access is reviewed, how incidents are handled. HIPAA requires both. Most engineers focus on technical safeguards and their organisation ignores administrative ones — but administrative gaps are what HHS enforcement actions most commonly cite.",
          },
          {
            q: 'Do I need to encrypt PHI inside a VPC?',
            a: "Yes. \"It's internal\" is not a HIPAA defence. Service-to-service traffic inside a VPC should use TLS or mTLS if it carries PHI. The Security Rule's encryption standard is addressable — but choosing not to encrypt internal traffic requires documented justification for an equivalent alternative. The justification is rarely worth the effort.",
          },
          {
            q: 'What happens if my error tracker captures PHI in a stack trace?',
            a: "That error tracking provider needs a BAA, and the captured PHI constitutes a disclosure. Most error trackers allow you to scrub sensitive fields before the payload is sent — use that for any field that could contain PHI. A safer default is to log error codes and IDs, not field values, and look up values separately during investigation.",
          },
          {
            q: 'Can we use an LLM API with patient data?',
            a: "Only with a BAA in place and after reviewing what the provider does with the data. AWS Bedrock, Azure OpenAI, and Google Vertex AI all offer enterprise agreements with BAAs. The public ChatGPT and Claude APIs are not covered by a BAA unless you have an enterprise arrangement. Sending PHI to an uncovered API is a direct violation.",
          },
          {
            q: 'What is the minimum retention period for HIPAA audit logs?',
            a: 'HIPAA requires a 6-year retention period for documentation under the Security Rule. For audit logs, 6 years from the date of the last action is the safe default. Store aged logs in cold storage (S3 Glacier) to keep costs reasonable.',
          },
        ],
      },
      {
        type: 'h2',
        text: 'Building in a regulated environment?',
      },
      {
        type: 'p',
        text: "If your team is entering a HIPAA-regulated space for the first time — or inherited a codebase you're not sure is compliant — I've done this work hands-on at a telehealth company and can help you reach a defensible baseline.",
      },
      {
        type: 'cta',
        text: 'Take a look at the experience, then get in touch with what you are working on.',
        primary: { href: '/contact', label: 'Get in touch' },
        secondary: { href: '/about', label: 'My background' },
      },
    ],
  },
]

export function getAllPosts() {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null
}

export function getAllPostSlugs() {
  return posts.map((p) => p.slug)
}
