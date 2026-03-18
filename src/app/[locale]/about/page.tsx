import PageHeader from '@/components/layout/PageHeader'
import AboutClient from './AboutClient'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('About')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function AboutPage() {
  const t = await getTranslations('About')

  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title={t('title')}
          description={t('description')}
        />
        <AboutClient />
      </div>
    </section>
  )
}
