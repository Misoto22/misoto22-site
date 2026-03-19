import PageHeader from '@/components/layout/PageHeader'
import ExperienceCard from '@/components/sections/ExperienceCard'
import { Timeline, TimelineItem } from '@/components/sections/Timeline'
import { getExperience } from '@/lib/data'
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Experience')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export const revalidate = 3600

export default async function ExperiencePage() {
  const locale = await getLocale() as 'en' | 'zh'
  const t = await getTranslations('Experience')
  const experiences = await getExperience(locale)

  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title={t('title')}
          description={t('description')}
        />

        {experiences && experiences.length > 0 ? (
          <Timeline>
            {experiences.map((exp, index) => (
              <TimelineItem key={index} index={index}>
                <ExperienceCard experience={exp} index={index} />
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
