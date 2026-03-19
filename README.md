# Henry Chen

<div align="center">

<img alt="misoto22.com" src="https://woownigzadvconxswkpv.supabase.co/storage/v1/object/public/project-images/personal-website-readme.jpg" />

<br />

**Developer. Photographer.**

A personal portfolio and blog — built with Next.js, TypeScript, and Supabase.

<br />

[Live Site](https://misoto22.com) · [Report Issue](https://github.com/Misoto22/misoto22-site/issues)

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-000?logo=next.js&logoColor=fff)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_4.2-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff)](https://vercel.com/)

</div>

---

### Features

- **Bilingual** — Chinese / English with next-intl (locale-prefix `as-needed`)
- **Dark / Light theme** with smooth transitions
- **Photography gallery** with masonry layout and lightbox
- **Blog** with markdown rendering, categories, and tags
- **Command palette** (Cmd+K) for quick navigation
- **Contact form** via EmailJS
- **ISR** with on-demand revalidation
- **Framer Motion** animations throughout
- **Mobile-first** responsive design
- **CI pipeline** — lint, typecheck, build, unit tests, E2E tests on every PR

---

### Tech Stack

| | |
|:--|:--|
| **Framework** | Next.js 16 · Turbopack |
| **Language** | TypeScript 5.9 |
| **UI** | React 19 · Tailwind CSS 4.2 · Framer Motion 12 |
| **i18n** | next-intl (en/zh) |
| **Data** | Supabase PostgreSQL · Supabase Storage |
| **Testing** | Jest 30 · Testing Library · Playwright (E2E) |
| **Deploy** | Vercel (auto-deploy on push) |

---

### Project Structure

```
src/
├── app/
│   ├── [locale]/           Locale-aware pages (en default, /zh for Chinese)
│   └── api/                REST API routes (photos, blog, command-palette)
├── components/
│   ├── animations/         FadeInSlideUp, TextReveal
│   ├── blog/               BlogCard, BlogPostContent, CategoryFilter
│   ├── command-palette/    Cmd+K search
│   ├── contact/            Contact form
│   ├── layout/             Navigation, Footer, PageHeader, LocaleSwitcher
│   ├── photography/        ImageModal
│   ├── sections/           ProjectCard, FeaturedWork, PhotoStrip
│   └── ui/                 Badge, Card, Tag, ThemeSelector
├── context/                ThemeContext
├── i18n/                   next-intl routing, navigation, request config
└── lib/
    ├── data/               Domain-split fetchers + Db→Frontend mappers
    └── ...                 animation, constants, supabase, utils
messages/                   i18n strings (en.json, zh.json)
docs/                       Architecture & decision records
```

---

### Getting Started

```bash
git clone https://github.com/Misoto22/misoto22-site.git
cd misoto22-site
cp .env.local.example .env.local   # fill in credentials
pnpm install
pnpm dev                           # → http://localhost:3000
```

**Prerequisites** — Node.js 22+, pnpm 10+

**Scripts**

```
pnpm dev             Dev server
pnpm build           Production build
pnpm lint            ESLint
pnpm typecheck       TypeScript check
pnpm test            Unit tests (Jest)
pnpm test:coverage   Unit tests with coverage
pnpm test:e2e        E2E tests (Playwright)
pnpm test:e2e:ui     E2E tests with interactive UI
```

---

### Deployment

Auto-deploys to [misoto22.com](https://misoto22.com) on push to `main`.

Manual redeploy: `npx vercel --prod`

---

<div align="center">
<sub>Built by Henry Chen</sub>
</div>
