# Architecture

Next.js 16 personal portfolio with Supabase backend, bilingual (en/zh) support.

## Data Flow

Supabase → `lib/data/*.ts` (mappers + fetchers) → Server Components (SSR/ISR revalidate=3600) → Client Components

## Directory Map

```
src/
  app/                 # Next.js App Router
    [locale]/          # Locale-aware pages (en default, /zh for Chinese)
      about/           # About page
      blog/            # Blog list, [slug] detail, category/[category] filter
      contact/         # Contact form page
      education/       # Education timeline
      experience/      # Work experience timeline
      photography/     # Photo gallery with infinite scroll
      projects/        # Project showcase
      stats/           # Self-hosted analytics dashboard
    api/               # REST API routes
      blog/            # GET /api/blog, /api/blog/[slug], /api/blog/categories
      photos/          # GET /api/photos (paginated)
      command-palette/ # GET /api/command-palette (search data)
      stats/           # GET /api/stats (analytics aggregates via Supabase RPCs)
      track/           # POST /api/track (page view tracking, bot-filtered)
      revalidate/      # POST /api/revalidate (on-demand ISR, secret-protected)
  components/          # UI components organized by domain
    analytics/         # Stats dashboard (Recharts)
    animations/        # Framer Motion wrappers (FadeInSlideUp, TextReveal)
    blog/              # BlogCard, BlogPostContent, CategoryFilter, MarkdownRenderer
    command-palette/   # Cmd+K search overlay
    common/            # Shared components
    contact/           # ContactForm (EmailJS)
    layout/            # Navigation, Footer, PageHeader, LocaleSwitcher, KeyboardNavigation
    photography/       # ImageModal with EXIF display
    sections/          # Homepage sections (FeaturedWork, PhotoStrip, ProjectCard, SkillsSection)
    ui/                # Generic primitives (Badge, Card, Tag, ThemeSelector)
  context/             # ThemeContext (dark/light/system mode)
  i18n/                # next-intl configuration
    routing.ts         # Locale list, defaultLocale, localePrefix: 'as-needed'
    navigation.ts      # Locale-aware Link, useRouter, usePathname
    request.ts         # Server-side locale resolution
  lib/
    data/              # Domain-split data fetchers + Db→Frontend mappers
      shared.ts        # Locale type, zh() fallback helper
      portfolio.ts     # getProjects, getEducation, getExperience
      photos.ts        # getPhotos, FrontendPhoto
      blog.ts          # getBlogPosts, getBlogPostBySlug, getRelatedPosts, categories, tags
      index.ts         # Re-exports for backward-compatible @/lib/data imports
    constants.ts       # NAV_PAGES, SITE_CONFIG, social URLs
    supabase.ts        # Supabase client + frontend interface types
    animation.ts       # Framer Motion variants
    utils.ts           # estimateReadingTime, formatDate
  test-utils/          # Jest render helper with ThemeProvider
e2e/                   # Playwright E2E tests (87 tests across 18 spec files)
messages/              # i18n JSON files (en.json, zh.json) for UI strings
docs/                  # Architecture, decisions, DB schema
scripts/               # Agent bootstrap (init.sh)
```

## Key Patterns

- **Db\*/Frontend type separation**: Database types (`DbEducation`, `DbProject`, etc.) map to frontend interfaces via mapper functions. Database types use snake_case matching Supabase schema; frontend types use camelCase.
- **`zh()` fallback**: Picks `_zh` column value when `locale='zh'`, falls back to English when translation is null.
- **ISR revalidation**: Pages revalidate every 3600s (1 hour). Force redeploy via `npx vercel --prod` when needed.
- **Locale-aware navigation**: All `Link` and `useRouter` imports come from `@/i18n/navigation`, not `next/link`. This ensures `/zh` prefix is maintained across navigation.

## Boundaries

- Components never import the Supabase client directly -- all data access goes through `lib/data/`.
- Data fetching only happens in `lib/data/` and `app/api/`.
- All internal `Link` and `useRouter` must come from `@/i18n/navigation` (ESLint enforced).

## i18n Strategy

- **UI strings**: `messages/en.json` and `messages/zh.json` via next-intl.
- **DB content**: `_zh` suffix columns (`title_zh`, `description_zh`, etc.) with `zh()` helper fallback.
- **Blog content**: English-only (Phase 1). Title and summary have `_zh` variants; markdown content stays English.

## Data Operations

### Common SQL

```sql
-- List all projects
SELECT id, title, category, "order" FROM projects ORDER BY "order";

-- Add a new project
INSERT INTO projects (title, description, link, deploy, technologies, image_path, category, "order")
VALUES ('Title', 'Desc', 'https://github.com/...', 'https://...', ARRAY['React', 'TypeScript'], 'https://...supabase.co/storage/v1/object/public/project-images/filename.png', 'Full-stack', 1);

-- Update project image
UPDATE projects SET image_path = 'new_url', updated_at = NOW() WHERE id = ?;

-- Reorder projects
UPDATE projects SET "order" = ? WHERE id = ?;

-- Update blog post
UPDATE blog_posts SET content = '...', updated_at = NOW() WHERE slug = 'post-slug';
```

### Image Upload (Supabase Storage)

```bash
source .env.local && curl -s -X POST \
  "${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/BUCKET_NAME/filename.png" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: image/png" \
  -H "x-upsert: true" \
  --data-binary @/path/to/local/image.png
```

Storage buckets: `project-images`, `blog-post-images`

Public URL pattern: `https://woownigzadvconxswkpv.supabase.co/storage/v1/object/public/{bucket}/{path}`
