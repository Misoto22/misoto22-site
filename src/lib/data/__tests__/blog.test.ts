jest.mock('../../supabase', () => ({ supabase: {} }))

import { mapBlogPost, mapBlogCategory, mapBlogTag, type DbBlogPost, type DbNamedRecord } from '../blog'

const baseBlogPost: DbBlogPost = {
  id: 'post-1',
  title: 'Getting Started with Next.js',
  slug: 'getting-started-nextjs',
  content: '# Hello World\nThis is a blog post.',
  summary: 'A guide to Next.js',
  cover_image: '/blog/nextjs.png',
  published_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-02-01T00:00:00Z',
  is_published: true,
  title_zh: 'Next.js 入门',
  summary_zh: 'Next.js 指南',
  users: { id: 'user-1', name: 'John', avatar: '/avatar.jpg', bio: 'Developer' },
  blog_categories: { id: 'cat-1', name: 'Technology' },
  blog_subcategories: { id: 'sub-1', name: 'Frontend', category_id: 'cat-1' },
  blog_post_tags: [
    { tags: { id: 'tag-1', name: 'Next.js' } },
    { tags: { id: 'tag-2', name: 'React' } },
  ],
}

describe('mapBlogPost', () => {
  it('maps full post in English', () => {
    const result = mapBlogPost(baseBlogPost, 'en')
    expect(result.title).toBe('Getting Started with Next.js')
    expect(result.summary).toBe('A guide to Next.js')
    expect(result.slug).toBe('getting-started-nextjs')
    expect(result.coverImage).toBe('/blog/nextjs.png')
    expect(result.isPublished).toBe(true)
    expect(result.publishedAt).toBe('2024-01-15T00:00:00Z')
  })

  it('maps full post in Chinese', () => {
    const result = mapBlogPost(baseBlogPost, 'zh')
    expect(result.title).toBe('Next.js 入门')
    expect(result.summary).toBe('Next.js 指南')
    // Content stays English (no content_zh)
    expect(result.content).toBe('# Hello World\nThis is a blog post.')
  })

  it('maps author correctly', () => {
    const result = mapBlogPost(baseBlogPost)
    expect(result.author).toEqual({
      id: 'user-1', name: 'John', avatar: '/avatar.jpg', bio: 'Developer'
    })
  })

  it('maps category and subcategory', () => {
    const result = mapBlogPost(baseBlogPost)
    expect(result.category).toEqual({ id: 'cat-1', name: 'Technology' })
    expect(result.subcategory).toEqual({ id: 'sub-1', name: 'Frontend', categoryId: 'cat-1' })
  })

  it('maps tags from join table', () => {
    const result = mapBlogPost(baseBlogPost)
    expect(result.tags).toEqual([
      { id: 'tag-1', name: 'Next.js' },
      { id: 'tag-2', name: 'React' },
    ])
  })

  it('handles missing optional relations', () => {
    const minimal: DbBlogPost = {
      id: 'post-2', title: 'Minimal', slug: 'minimal',
      content: 'test', is_published: false,
    }
    const result = mapBlogPost(minimal)
    expect(result.author).toBeUndefined()
    expect(result.category).toBeUndefined()
    expect(result.subcategory).toBeUndefined()
    expect(result.tags).toEqual([])
  })

  it('falls back to English when zh translations are null', () => {
    const noZh: DbBlogPost = { ...baseBlogPost, title_zh: undefined, summary_zh: undefined }
    const result = mapBlogPost(noZh, 'zh')
    expect(result.title).toBe('Getting Started with Next.js')
    expect(result.summary).toBe('A guide to Next.js')
  })
})

describe('mapBlogCategory', () => {
  it('maps category record', () => {
    const db: DbNamedRecord = { id: 'cat-1', name: 'Technology' }
    expect(mapBlogCategory(db)).toEqual({ id: 'cat-1', name: 'Technology' })
  })
})

describe('mapBlogTag', () => {
  it('maps tag record', () => {
    const db: DbNamedRecord = { id: 'tag-1', name: 'React' }
    expect(mapBlogTag(db)).toEqual({ id: 'tag-1', name: 'React' })
  })
})
