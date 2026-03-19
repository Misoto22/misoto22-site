import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
import ProjectCard from '@/components/sections/ProjectCard'
import { getProjects } from '@/lib/data'
import { unstable_cache } from 'next/cache'
import { FULL_NAME } from '@/lib/constants'
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Projects')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export const revalidate = 3600;

function getCachedProjects(locale: 'en' | 'zh') {
  return unstable_cache(
    () => getProjects(locale),
    ['projects', locale],
    { revalidate: 3600, tags: ['projects'] }
  )()
}

export default async function Projects() {
  const locale = await getLocale() as 'en' | 'zh'
  const t = await getTranslations('Projects')
  const projects = await getCachedProjects(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${FULL_NAME}'s Projects`,
    itemListElement: projects.map((project, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: project.deploy || project.link,
        author: { '@type': 'Person', name: FULL_NAME },
        keywords: project.technologies.join(', '),
      },
    })),
  }

  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title={t('title')}
          description={t('description')}
        />

        <div className="space-y-20">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))
          ) : (
            <p className="text-(--secondary-text)">{t('empty')}</p>
          )}
        </div>
      </div>
    </section>
  )
}
