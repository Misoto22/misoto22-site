# Architecture

Next.js 16 personal portfolio with Supabase backend, bilingual (en/zh) support.

## Data Flow

Supabase → `lib/data/*.ts` (mappers + fetchers) → Server Components (SSR/ISR revalidate=3600) → Client Components

## Directory Map

```
src/
  app/             # Next.js App Router - [locale] routing via next-intl
    [locale]/      # Locale-aware pages (en default, zh optional)
    api/           # REST API routes (photos, blog, command-palette)
  components/      # UI components organized by domain
    analytics/     # Stats dashboard
    animations/    # Framer Motion wrappers
    blog/          # Blog list, post, categories
    command-palette/ # Cmd+K search
    common/        # Shared components
    contact/       # Contact form (EmailJS)
    layout/        # Header, Footer, Navigation
    photography/   # Photo gallery, modal
    sections/      # Homepage sections
    ui/            # Generic UI primitives (Card, Badge, etc.)
  context/         # ThemeContext (dark/light mode)
  lib/
    data/          # Domain-split data fetchers + Db->Frontend mappers
      shared.ts    # Locale type, zh() fallback helper
      portfolio.ts # getProjects, getEducation, getExperience
      photos.ts    # getPhotos, FrontendPhoto
      blog.ts      # getBlogPosts, getBlogPostBySlug, getRelatedPosts, categories, tags
      index.ts     # Re-exports for backward-compatible @/lib/data imports
    constants.ts   # NAV_PAGES, SITE_CONFIG
    supabase.ts    # Supabase client + frontend interface types
    animation.ts   # Framer Motion variants
    utils.ts       # Utility functions
  test-utils/      # Jest test helpers + mock factories
messages/          # i18n JSON files (en.json, zh.json) for UI strings
docs/              # Architecture & decision records
scripts/           # Agent bootstrap scripts
```

## Key Patterns

- **Db\*/Frontend type separation**: Database types (`DbEducation`, `DbProject`, etc.) map to frontend interfaces via mapper functions. Database types use snake_case matching Supabase schema; frontend types use camelCase.
- **`zh()` fallback**: Picks `_zh` column value when `locale='zh'`, falls back to English when translation is null.
- **ISR revalidation**: Pages revalidate every 3600s (1 hour). Force redeploy via `npx vercel --prod` when needed.

## Boundaries

- Components never import the Supabase client directly -- all data access goes through `lib/data/`.
- Data fetching only happens in `lib/data/` and `app/api/`.

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
