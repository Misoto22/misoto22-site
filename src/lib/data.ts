// Server-side data fetching functions using Supabase
import { supabase, type Education, type Experience, type Project, type BlogPost, type BlogCategory, type BlogTag, type BlogAuthor } from './supabase'

// Database row types — match Supabase table schemas
interface DbEducation {
  degree: string; school: string; school_link?: string; location: string
  period: string; description: string[]; courses: string[]; logo: string; order?: number
}

interface DbExperience {
  title: string; company: string; company_link?: string; location: string
  period: string; description: string[]; technologies: string[]; logo: string; order?: number
}

interface DbProject {
  title: string; description: string; link: string; deploy?: string
  technologies: string[]; image_path: string; category: string; order?: number
}

interface DbPhoto {
  id: number; src: string; width: number; height: number; alt: string
  camera?: string; lens?: string; focal_length?: string
  aperture?: string; shutter_speed?: string; iso?: string
}

interface DbBlogPost {
  id: string; title: string; slug: string; content: string; summary?: string
  cover_image?: string; published_at?: string; updated_at?: string; is_published: boolean
  users?: { id: string; name: string; avatar?: string; bio?: string }
  blog_categories?: { id: string; name: string }
  blog_subcategories?: { id: string; name: string; category_id?: string }
  blog_post_tags?: { tags: { id: string; name: string } }[]
}

interface DbNamedRecord { id: string; name: string }

// Convert database field names to frontend interface
function mapEducation(dbEducation: DbEducation): Education {
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

function mapExperience(dbExperience: DbExperience): Experience {
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

function mapProject(dbProject: DbProject): Project {
  return {
    title: dbProject.title,
    description: dbProject.description,
    link: dbProject.link,
    deploy: dbProject.deploy,
    technologies: dbProject.technologies,
    image: dbProject.image_path,
    category: dbProject.category,
    order: dbProject.order
  }
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

function mapPhoto(dbPhoto: DbPhoto): FrontendPhoto {
  return {
    id: String(dbPhoto.id || ''),
    src: dbPhoto.src,
    width: dbPhoto.width,
    height: dbPhoto.height,
    alt: dbPhoto.alt,
    camera: dbPhoto.camera ?? undefined,
    lens: dbPhoto.lens ?? undefined,
    focalLength: dbPhoto.focal_length ?? undefined,
    aperture: dbPhoto.aperture ?? undefined,
    shutterSpeed: dbPhoto.shutter_speed ?? undefined,
    iso: dbPhoto.iso ?? undefined,
  }
}

export async function getProjects(): Promise<Project[]> {
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
}

export async function getEducation(): Promise<Education[]> {
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
}

export async function getExperience(): Promise<Experience[]> {
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
}

export async function getPhotos(page: number = 1, limit: number = 8): Promise<{
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
      photos: data?.map(mapPhoto) || [],
      hasMore,
      totalCount
    }
  } catch (error) {
    console.error('Unexpected error fetching photos:', error)
    return { photos: [], hasMore: false, totalCount: 0 }
  }
}

// Blog data mapping functions
function mapBlogPost(dbPost: DbBlogPost): BlogPost {
  return {
    id: dbPost.id,
    title: dbPost.title,
    slug: dbPost.slug,
    content: dbPost.content,
    summary: dbPost.summary,
    coverImage: dbPost.cover_image,
    publishedAt: dbPost.published_at,
    updatedAt: dbPost.updated_at,
    isPublished: dbPost.is_published,
    author: dbPost.users ? {
      id: dbPost.users.id,
      name: dbPost.users.name,
      avatar: dbPost.users.avatar,
      bio: dbPost.users.bio
    } : undefined,
    category: dbPost.blog_categories ? {
      id: dbPost.blog_categories.id,
      name: dbPost.blog_categories.name
    } : undefined,
    subcategory: dbPost.blog_subcategories ? {
      id: dbPost.blog_subcategories.id,
      name: dbPost.blog_subcategories.name,
      categoryId: dbPost.blog_subcategories.category_id
    } : undefined,
    tags: dbPost.blog_post_tags?.map((tagRelation) => ({
      id: tagRelation.tags.id,
      name: tagRelation.tags.name
    })) || []
  }
}

function mapBlogCategory(dbCategory: DbNamedRecord): BlogCategory {
  return {
    id: dbCategory.id,
    name: dbCategory.name
  }
}

function mapBlogTag(dbTag: DbNamedRecord): BlogTag {
  return {
    id: dbTag.id,
    name: dbTag.name
  }
}

// Blog data fetching functions
export async function getBlogPosts(options: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  published?: boolean;
} = {}): Promise<{
  posts: BlogPost[];
  hasMore: boolean;
  totalCount: number;
}> {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      published = true
    } = options

    const offset = (page - 1) * limit

    // Build the query
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        users (id, name, avatar, bio),
        blog_categories (id, name),
        blog_subcategories (id, name, category_id),
        blog_post_tags (
          tags (id, name)
        )
      `)

    // Apply filters
    if (published) {
      query = query.eq('is_published', true)
    }

    // Resolve category ID once if filtering by category
    let categoryId: string | undefined
    if (category) {
      const { data: cat } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('name', category)
        .single()
      categoryId = cat?.id
      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }
    }

    // Get total count
    let countQuery = supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    if (published) {
      countQuery = countQuery.eq('is_published', true)
    }

    if (categoryId) {
      countQuery = countQuery.eq('category_id', categoryId)
    }

    const { count } = await countQuery

    // Get paginated posts
    const { data, error } = await query
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching blog posts:', error)
      return { posts: [], hasMore: false, totalCount: 0 }
    }

    const totalCount = count || 0
    const hasMore = offset + limit < totalCount

    return {
      posts: data?.map(mapBlogPost) || [],
      hasMore,
      totalCount
    }
  } catch (error) {
    console.error('Unexpected error fetching blog posts:', error)
    return { posts: [], hasMore: false, totalCount: 0 }
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        users (id, name, avatar, bio),
        blog_categories (id, name),
        blog_subcategories (id, name, category_id),
        blog_post_tags (
          tags (id, name)
        )
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    return data ? mapBlogPost(data) : null
  } catch (error) {
    console.error('Unexpected error fetching blog post:', error)
    return null
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching blog categories:', error)
      return []
    }

    return data?.map(mapBlogCategory) || []
  } catch (error) {
    console.error('Unexpected error fetching blog categories:', error)
    return []
  }
}

export async function getBlogTags(): Promise<BlogTag[]> {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching blog tags:', error)
      return []
    }

    return data?.map(mapBlogTag) || []
  } catch (error) {
    console.error('Unexpected error fetching blog tags:', error)
    return []
  }
}
