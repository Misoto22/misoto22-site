import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/data'

const BASE_URL = 'https://misoto22.com'

const staticPages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/photography', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/education', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/experience', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getBlogPosts({ limit: 200, published: true })

  const entries: MetadataRoute.Sitemap = []

  // Static pages — both locales
  for (const page of staticPages) {
    // English (default, no prefix)
    entries.push({
      url: `${BASE_URL}${page.path || '/'}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
      alternates: {
        languages: {
          en: `${BASE_URL}${page.path || '/'}`,
          zh: `${BASE_URL}/zh${page.path || '/'}`,
        },
      },
    })
  }

  // Blog posts — both locales
  for (const post of posts) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || undefined,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE_URL}/blog/${post.slug}`,
          zh: `${BASE_URL}/zh/blog/${post.slug}`,
        },
      },
    })
  }

  return entries
}
