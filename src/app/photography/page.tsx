import { getPhotos } from '@/lib/data';
import PhotographyClient from './PhotographyClient';

interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

// Enable ISR with revalidation every 1800 seconds (30 minutes)
export const revalidate = 1800;

export default async function PhotographyPage() {
  // Get initial photos for SSR
  const initialData = await getPhotos(1, 8);

  return (
    <PhotographyClient initialData={initialData} />
  );
}
