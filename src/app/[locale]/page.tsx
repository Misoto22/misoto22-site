import HomeClient from './HomeClient'
import { getProjects, getPhotos, getBlogPosts } from '@/lib/data'
import { FULL_NAME, PROFESSION, SITE_DESCRIPTION, GITHUB_URL, LINKEDIN_URL } from '@/lib/constants'
import { getLocale } from 'next-intl/server'

export const revalidate = 3600

export default async function Home() {
  const locale = await getLocale() as 'en' | 'zh'

  const [projects, photosData, blogData] = await Promise.all([
    getProjects(locale),
    getPhotos(1, 8, locale),
    getBlogPosts({ page: 1, limit: 3, locale }),
  ])

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${FULL_NAME} — ${PROFESSION}`,
      description: SITE_DESCRIPTION,
      url: 'https://misoto22.com',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: FULL_NAME,
      jobTitle: PROFESSION,
      url: 'https://misoto22.com',
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient
        photos={photosData.photos}
        projects={projects}
        blogPosts={blogData.posts}
      />
    </>
  )
}
