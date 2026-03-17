import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/data'

const BASE_URL = 'https://misoto22.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getBlogPosts({ limit: 200, published: true })

  const blogEntries = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || undefined,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/projects`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/blog`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/photography`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/education`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/experience`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/about`, priority: 0.5, changeFrequency: 'monthly' },
    ...blogEntries,
  ]
}
