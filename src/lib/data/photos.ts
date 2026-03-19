// Photo gallery data fetching
import { supabase } from '../supabase'
import { type Locale, zh } from './shared'

// Database row type — matches Supabase photos table
export interface DbPhoto {
  id: number; src: string; width: number; height: number; alt: string
  camera?: string; lens?: string; focal_length?: string
  aperture?: string; shutter_speed?: string; iso?: string
  alt_zh?: string
}

// Frontend Photo interface for components
export interface FrontendPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
}

export function mapPhoto(db: DbPhoto, locale: Locale = 'en'): FrontendPhoto {
  return {
    id: String(db.id || ''),
    src: db.src,
    width: db.width,
    height: db.height,
    alt: zh(db.alt_zh, db.alt, locale),
    camera: db.camera ?? undefined,
    lens: db.lens ?? undefined,
    focalLength: db.focal_length ?? undefined,
    aperture: db.aperture ?? undefined,
    shutterSpeed: db.shutter_speed ?? undefined,
    iso: db.iso ?? undefined,
  }
}

export async function getPhotos(page: number = 1, limit: number = 8, locale: Locale = 'en'): Promise<{
  photos: FrontendPhoto[];
  hasMore: boolean;
  totalCount: number;
}> {
  try {
    const offset = (page - 1) * limit

    // Get total count for main photos only
    const { count } = await supabase
      .from('photos')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'main')

    // Get paginated photos, sorted by taken_at descending (newest first)
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('type', 'main')
      .order('taken_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching photos:', error)
      return { photos: [], hasMore: false, totalCount: 0 }
    }

    const totalCount = count || 0
    const hasMore = offset + limit < totalCount

    return {
      photos: data?.map(d => mapPhoto(d, locale)) || [],
      hasMore,
      totalCount
    }
  } catch (error) {
    console.error('Unexpected error fetching photos:', error)
    return { photos: [], hasMore: false, totalCount: 0 }
  }
}
