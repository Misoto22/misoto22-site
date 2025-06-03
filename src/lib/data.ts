// Server-side data fetching functions using Supabase
import { type Education, type Experience, type Project } from './supabase'

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

export async function getProjects(): Promise<Project[]> {
  try {
    // Use fetch with explicit cache settings to ensure ISR works properly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const response = await fetch(
      `${supabaseUrl}/rest/v1/projects?select=*&order=order.asc`,
      {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        // Explicitly set cache to force-cache to respect ISR revalidation
        cache: 'force-cache',
        next: {
          revalidate: 3600, // Match the page-level revalidate setting
          tags: ['projects'] // Add tags for more granular revalidation control
        }
      }
    )

    if (!response.ok) {
      console.error('Error fetching projects:', response.statusText)
      return []
    }

    const data = await response.json()
    return data?.map(mapProject) || []
  } catch (error) {
    console.error('Unexpected error fetching projects:', error)
    return []
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    // Use fetch with explicit cache settings to ensure ISR works properly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const response = await fetch(
      `${supabaseUrl}/rest/v1/education?select=*&order=order.asc`,
      {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        // Explicitly set cache to force-cache to respect ISR revalidation
        cache: 'force-cache',
        next: {
          revalidate: 3600, // Match the page-level revalidate setting
          tags: ['education'] // Add tags for more granular revalidation control
        }
      }
    )

    if (!response.ok) {
      console.error('Error fetching education:', response.statusText)
      return []
    }

    const data = await response.json()
    return data?.map(mapEducation) || []
  } catch (error) {
    console.error('Unexpected error fetching education:', error)
    return []
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    // Use fetch with explicit cache settings to ensure ISR works properly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const response = await fetch(
      `${supabaseUrl}/rest/v1/experience?select=*&order=order.asc`,
      {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        // Explicitly set cache to force-cache to respect ISR revalidation
        cache: 'force-cache',
        next: {
          revalidate: 3600, // Match the page-level revalidate setting
          tags: ['experience'] // Add tags for more granular revalidation control
        }
      }
    )

    if (!response.ok) {
      console.error('Error fetching experience:', response.statusText)
      return []
    }

    const data = await response.json()
    return data?.map(mapExperience) || []
  } catch (error) {
    console.error('Unexpected error fetching experience:', error)
    return []
  }
}

export async function getPhotos(page: number = 1, limit: number = 8): Promise<{
  photos: FrontendPhoto[];
  hasMore: boolean;
  totalCount: number;
}> {
  try {
    const offset = (page - 1) * limit
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    // Get total count
    const countResponse = await fetch(
      `${supabaseUrl}/rest/v1/photos?select=*&count=exact`,
      {
        method: 'HEAD',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: {
          revalidate: 1800, // Match the photography page revalidate setting
          tags: ['photos-count']
        }
      }
    )

    const totalCount = parseInt(countResponse.headers.get('content-range')?.split('/')[1] || '0')

    // Get paginated photos
    const dataResponse = await fetch(
      `${supabaseUrl}/rest/v1/photos?select=*&order=order.asc&offset=${offset}&limit=${limit}`,
      {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: {
          revalidate: 1800, // Match the photography page revalidate setting
          tags: ['photos']
        }
      }
    )

    if (!dataResponse.ok) {
      console.error('Error fetching photos:', dataResponse.statusText)
      return { photos: [], hasMore: false, totalCount: 0 }
    }

    const data = await dataResponse.json()
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
}
