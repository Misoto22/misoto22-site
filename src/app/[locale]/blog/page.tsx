import React from 'react'
import { Metadata } from 'next'
import PageHeader from '@/components/layout/PageHeader'
import BlogClient from './BlogClient'
import { getBlogPosts } from '@/lib/data'
import { unstable_cache } from 'next/cache'
import { getTranslations, getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Blog')
  return {
    title: t('pageTitle'),
    description: t('description'),
  }
}

export const revalidate = 3600;

function getCachedBlogPosts(locale: 'en' | 'zh') {
  return unstable_cache(
    () => getBlogPosts({ page: 1, limit: 10, locale }),
    ['blog-posts', locale],
    { revalidate: 3600, tags: ['blog-posts'] }
  )()
}

export default async function BlogPage() {
  const locale = await getLocale() as 'en' | 'zh'
  const t = await getTranslations('Blog')
  const initialData = await getCachedBlogPosts(locale)

  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title={t('title')}
          description={t('description')}
        />

        <BlogClient initialData={initialData} />
      </div>
    </section>
  )
}
