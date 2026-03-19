import { getPhotos } from '@/lib/data';
import PhotographyClient from './PhotographyClient';
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Photography')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export const revalidate = 3600;

export default async function PhotographyPage() {
  const locale = await getLocale() as 'en' | 'zh'
  const initialData = await getPhotos(1, 8, locale);

  return (
    <PhotographyClient initialData={initialData} />
  );
}
