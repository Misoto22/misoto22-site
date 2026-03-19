import type { Metadata } from 'next'
import NotFoundClient from './NotFoundClient'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NotFound')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default function NotFound() {
  return <NotFoundClient />
}
