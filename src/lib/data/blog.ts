// Blog data fetching: posts, categories, tags
import { supabase, type BlogPost, type BlogCategory, type BlogTag } from '../supabase'
import { type Locale, zh } from './shared'

// Database row types — match Supabase table schemas
export interface DbBlogPost {
  id: string; title: string; slug: string; content: string; summary?: string
  cover_image?: string; published_at?: string; updated_at?: string; is_published: boolean
  title_zh?: string; summary_zh?: string
  users?: { id: string; name: string; avatar?: string; bio?: string }
  blog_categories?: { id: string; name: string }
  blog_subcategories?: { id: string; name: string; category_id?: string }
  blog_post_tags?: { tags: { id: string; name: string } }[]
}

export interface DbNamedRecord { id: string; name: string }

// Blog data mapping functions
export function mapBlogPost(dbPost: DbBlogPost, locale: Locale = 'en'): BlogPost {
  return {
    id: dbPost.id,
    title: zh(dbPost.title_zh, dbPost.title, locale),
    slug: dbPost.slug,
    content: dbPost.content,
    summary: zh(dbPost.summary_zh, dbPost.summary, locale),
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

export function mapBlogCategory(dbCategory: DbNamedRecord): BlogCategory {
  return {
    id: dbCategory.id,
    name: dbCategory.name
  }
}

export function mapBlogTag(dbTag: DbNamedRecord): BlogTag {
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
  published?: boolean;
  locale?: Locale;
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
      published = true,
      locale = 'en'
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
      posts: data?.map(d => mapBlogPost(d, locale)) || [],
      hasMore,
      totalCount
    }
  } catch (error) {
    console.error('Unexpected error fetching blog posts:', error)
    return { posts: [], hasMore: false, totalCount: 0 }
  }
}

export async function getBlogPostBySlug(slug: string, locale: Locale = 'en'): Promise<BlogPost | null> {
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

    return data ? mapBlogPost(data, locale) : null
  } catch (error) {
    console.error('Unexpected error fetching blog post:', error)
    return null
  }
}

export async function getRelatedPosts(post: BlogPost, limit: number = 3, locale: Locale = 'en'): Promise<BlogPost[]> {
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
      .eq('is_published', true)
      .neq('id', post.id)
      .order('published_at', { ascending: false })
      .limit(limit * 3)

    if (error || !data) return []

    const candidates = data.map(d => mapBlogPost(d, locale))
    const postTagIds = new Set(post.tags?.map(t => t.id) || [])

    // 按相关度排序：同 category +2, 同 subcategory +1, 每个重叠 tag +1
    const scored = candidates.map(c => {
      let score = 0
      if (c.category?.id === post.category?.id) score += 2
      if (c.subcategory?.id === post.subcategory?.id) score += 1
      score += c.tags?.filter(t => postTagIds.has(t.id)).length || 0
      return { post: c, score }
    })

    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, limit).map(s => s.post)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
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
