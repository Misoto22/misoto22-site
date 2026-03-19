import PageHeader from '@/components/layout/PageHeader'
import EducationCard from '@/components/sections/EducationCard'
import { Timeline, TimelineItem } from '@/components/sections/Timeline'
import { getEducation } from '@/lib/data'
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Education')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export const revalidate = 3600

export default async function EducationPage() {
  const locale = await getLocale() as 'en' | 'zh'
  const t = await getTranslations('Education')
  const education = await getEducation(locale)

  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title={t('title')}
          description={t('description')}
        />

        {education && education.length > 0 ? (
          <Timeline>
            {education.map((edu, index) => (
              <TimelineItem key={index} index={index}>
                <EducationCard education={edu} index={index} />
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <p className="text-(--secondary-text)">{t('empty')}</p>
        )}
      </div>
    </section>
  )
}
