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

- **Dark / Light theme** with smooth transitions
- **Photography gallery** with masonry layout and lightbox
- **Blog** with markdown rendering, categories, and tags
- **Contact form** via EmailJS
- **ISR** with on-demand revalidation
- **Framer Motion** animations throughout
- **Mobile-first** responsive design

---

### Tech Stack

| | |
|:--|:--|
| **Framework** | Next.js 16 · Turbopack |
| **Language** | TypeScript 5.9 |
| **UI** | React 19.2 · Tailwind CSS 4.2 · Framer Motion 12 |
| **Data** | Supabase PostgreSQL · Supabase Storage |
| **Testing** | Jest 30 · Testing Library |
| **Deploy** | Vercel (auto-deploy on push) |

---

### Project Structure

```
src/
├── app/                 Pages & API routes (App Router)
├── components/
│   ├── animations/      FadeInSlideUp, TextReveal
│   ├── blog/            BlogCard, BlogPostContent, CategoryFilter
│   ├── layout/          Navigation, Footer, PageHeader
│   ├── photography/     ImageModal
│   ├── sections/        ProjectCard, FeaturedWork, PhotoStrip, Timeline
│   └── ui/              Badge, Card, Tag, ThemeSelector
├── context/             ThemeContext
└── lib/                 animation, constants, data, supabase, utils
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
pnpm test            Run tests
pnpm test:coverage   Tests with coverage
```

---

### Deployment

Auto-deploys to [misoto22.com](https://misoto22.com) on push to `main`.

Manual redeploy: `npx vercel --prod`

---

<div align="center">
<sub>Built by Henry Chen</sub>
</div>
