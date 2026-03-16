import { getPhotos } from '@/lib/data';
import PhotographyClient from './PhotographyClient';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Capturing the beauty of urban landscapes and natural wonders across Australia.',
}

export const revalidate = 3600;

export default async function PhotographyPage() {
  // Get initial photos for SSR
  const initialData = await getPhotos(1, 8);

  return (
    <PhotographyClient initialData={initialData} />
  );
}
