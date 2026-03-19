# Decision Records

## 1. next-intl with `localePrefix: 'as-needed'`

English is the default locale (no URL prefix). Chinese gets the `/zh` prefix.

Chosen for SEO -- existing English URLs remain unchanged, avoiding broken links and redirect chains. Simpler than prefix-always since most visitors use English.

## 2. ISR with 3600s revalidation

Balance between freshness and build performance. Content changes infrequently; a 1-hour cache is acceptable. When immediate updates are needed, force redeploy via `npx vercel --prod`.

## 3. `_zh` suffix columns for translations

Adding `title_zh`, `description_zh`, etc. to existing tables (方案 A). Simpler than a separate translations table -- no JOINs needed, schema stays flat. The `zh()` helper picks the `_zh` value when `locale='zh'` and falls back to the English column when the translation is null.

## 4. Supabase over local CMS

Managed PostgreSQL + Storage + Auth. No server to maintain. Row-level security for future authenticated features. Real-time subscriptions available if needed. Free tier covers current traffic.

## 5. Db*/Frontend type separation

Database types match the Supabase schema (snake_case, nullable columns). Frontend types use camelCase with stricter typing. Mapper functions handle the conversion and locale selection in one place. This keeps components decoupled from the DB schema -- if a column is renamed or a new `_zh` field is added, only the mapper changes.

## 6. Blog content stays English-only (Phase 1)

Blog markdown content is substantial to translate. Title and summary get `_zh` variants for listing pages, but the `content` column stays English. Can add `content_zh` later when there is enough translated content to justify the effort.

## 7. Stats SQL merges locale paths

Analytics queries strip the `/zh` prefix to merge page views across locales for unified stats. This avoids splitting traffic numbers for the same logical page and gives a clearer picture of which content is popular regardless of language.
