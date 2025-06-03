// Server-side data fetching functions using Supabase
import { supabase, type Education, type Experience, type Project } from './supabase'

// Convert database field names to frontend interface
function mapEducation(dbEducation: any): Education {
  return {
    degree: dbEducation.degree,
    school: dbEducation.school,
    schoolLink: dbEducation.school_link,
    location: dbEducation.location,
    period: dbEducation.period,
    description: dbEducation.description,
    courses: dbEducation.courses,
    logo: dbEducation.logo,
    order: dbEducation.order
  }
}

function mapExperience(dbExperience: any): Experience {
  return {
    title: dbExperience.title,
    company: dbExperience.company,
    companyLink: dbExperience.company_link,
    location: dbExperience.location,
    period: dbExperience.period,
    description: dbExperience.description,
    technologies: dbExperience.technologies,
    logo: dbExperience.logo,
    order: dbExperience.order
  }
}

function mapProject(dbProject: any): Project {
  return {
    title: dbProject.title,
    description: dbProject.description,
    link: dbProject.link,
    deploy: dbProject.deploy,
    technologies: dbProject.technologies,
    image: dbProject.image_path, // Updated to match your database field name
    category: dbProject.category,
    order: dbProject.order
  }
}

// Frontend Photo interface for components (different from Supabase Photo)
interface FrontendPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

function mapPhoto(dbPhoto: any): FrontendPhoto {
  return {
    id: String(dbPhoto.id || ''), // Convert number to string
    src: dbPhoto.src,
    width: dbPhoto.width,
    height: dbPhoto.height,
    alt: dbPhoto.alt
  }
}

// Create a cached wrapper function for Supabase calls
async function cachedSupabaseCall<T>(
  operation: () => Promise<T>,
  cacheKey: string,
  revalidateTime: number = 3600
): Promise<T> {
  // Use unstable_cache to wrap the Supabase call
  const { unstable_cache } = await import('next/cache')

  const cachedOperation = unstable_cache(
    operation,
    [cacheKey],
    {
      revalidate: revalidateTime,
      tags: [cacheKey]
    }
  )

  return cachedOperation()
}

export async function getProjects(): Promise<Project[]> {
  return cachedSupabaseCall(
    async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order', { ascending: true })

        if (error) {
          console.error('Error fetching projects:', error)
          return []
        }

        return data?.map(mapProject) || []
      } catch (error) {
        console.error('Unexpected error fetching projects:', error)
        return []
      }
    },
    'projects',
    3600
  )
}

export async function getEducation(): Promise<Education[]> {
  return cachedSupabaseCall(
    async () => {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('order', { ascending: true })

        if (error) {
          console.error('Error fetching education:', error)
          return []
        }

        return data?.map(mapEducation) || []
      } catch (error) {
        console.error('Unexpected error fetching education:', error)
        return []
      }
    },
    'education',
    3600
  )
}

export async function getExperience(): Promise<Experience[]> {
  return cachedSupabaseCall(
    async () => {
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('order', { ascending: true })

        if (error) {
          console.error('Error fetching experience:', error)
          return []
        }

        return data?.map(mapExperience) || []
      } catch (error) {
        console.error('Unexpected error fetching experience:', error)
        return []
      }
    },
    'experience',
    3600
  )
}

export async function getPhotos(page: number = 1, limit: number = 8): Promise<{
  photos: FrontendPhoto[];
  hasMore: boolean;
  totalCount: number;
}> {
  return cachedSupabaseCall(
    async () => {
      try {
        const offset = (page - 1) * limit

        // Get total count
        const { count } = await supabase
          .from('photos')
          .select('*', { count: 'exact', head: true })

        // Get paginated photos
        const { data, error } = await supabase
          .from('photos')
          .select('*')
          .order('order', { ascending: true })
          .range(offset, offset + limit - 1)

        if (error) {
          console.error('Error fetching photos:', error)
          return { photos: [], hasMore: false, totalCount: 0 }
        }

        const totalCount = count || 0
        const hasMore = offset + limit < totalCount

        return {
          photos: data?.map(mapPhoto) || [],
          hasMore,
          totalCount
        }
      } catch (error) {
        console.error('Unexpected error fetching photos:', error)
        return { photos: [], hasMore: false, totalCount: 0 }
      }
    },
    `photos-page-${page}-limit-${limit}`,
    1800
  )
}
