import { getPhotos } from '@/lib/data';
import PhotographyClient from './PhotographyClient';

interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function PhotographyPage() {
  // Get initial photos for SSR
  const initialData = await getPhotos(1, 8);

  return (
    <PhotographyClient initialData={initialData} />
  );
}
