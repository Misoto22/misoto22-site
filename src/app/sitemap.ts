import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getBlogPosts({ limit: 200, published: true })

  const blogEntries = posts.map((post) => ({
    url: `https://misoto22.com/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || undefined,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    { url: 'https://misoto22.com', priority: 1.0, changeFrequency: 'weekly' },
    { url: 'https://misoto22.com/projects', priority: 0.9, changeFrequency: 'weekly' },
    { url: 'https://misoto22.com/blog', priority: 0.9, changeFrequency: 'weekly' },
    { url: 'https://misoto22.com/photography', priority: 0.8, changeFrequency: 'weekly' },
    { url: 'https://misoto22.com/contact', priority: 0.6, changeFrequency: 'monthly' },
    { url: 'https://misoto22.com/education', priority: 0.5, changeFrequency: 'monthly' },
    { url: 'https://misoto22.com/experience', priority: 0.5, changeFrequency: 'monthly' },
    { url: 'https://misoto22.com/about', priority: 0.5, changeFrequency: 'monthly' },
    ...blogEntries,
  ]
}
