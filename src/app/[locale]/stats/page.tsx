import type { Metadata } from 'next'
import StatsClient from './StatsClient'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Stats')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function StatsPage() {
  return <StatsClient />
}
