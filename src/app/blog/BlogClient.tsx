"use client"

import React, { useState, useCallback, useEffect } from 'react'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import { BlogPost } from '@/lib/supabase'
import { Search, Loader2 } from 'lucide-react'

interface BlogClientProps {
  initialData: {
    posts: BlogPost[]
    hasMore: boolean
    totalCount: number
  }
}

const BlogClient: React.FC<BlogClientProps> = ({ initialData }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialData.posts)
  const [hasMore, setHasMore] = useState(initialData.hasMore)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = !selectedCategory || post.category?.name === selectedCategory

    return matchesSearch && matchesCategory
  })

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)

    try {
      const nextPage = currentPage + 1
      const response = await fetch(`/api/blog?page=${nextPage}&limit=10${selectedCategory ? `&category=${selectedCategory}` : ''}`)

      if (!response.ok) throw new Error('Failed to fetch posts')

      const data = await response.json()
      setPosts(prevPosts => [...prevPosts, ...data.posts])
      setHasMore(data.hasMore)
      setCurrentPage(nextPage)
    } catch {
      setError('Failed to load more posts. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, currentPage, selectedCategory])

  const handleCategoryChange = useCallback(async (category: string | undefined) => {
    setSelectedCategory(category)
    setLoading(true)
    setCurrentPage(1)

    try {
      const response = await fetch(`/api/blog?page=1&limit=10${category ? `&category=${category}` : ''}`)

      if (!response.ok) throw new Error('Failed to fetch posts')

      const data = await response.json()
      setPosts(data.posts)
      setHasMore(data.hasMore)
      setCurrentPage(1)
    } catch {
      setError('Failed to load posts. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-(--border-color) rounded-sm w-1/4" />
        </div>
        <div className="grid gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-(--border-color) rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const [featuredPost, ...restPosts] = filteredPosts

  return (
    <div className="space-y-12">
      {/* Search + Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-(--secondary-text) w-4 h-4" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-6 pr-4 py-2 bg-transparent border-b border-(--border-color) text-(--foreground) placeholder-(--secondary-text) focus:outline-hidden focus:border-(--accent) transition-colors duration-200 text-sm"
          />
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Search scope hint */}
      {searchQuery && hasMore && filteredPosts.length === 0 && (
        <p className="text-(--secondary-text) text-sm">
          Search is limited to loaded posts. Try loading more or clearing the search.
        </p>
      )}

      {/* Posts */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-12">
          {/* Featured post — full width */}
          {featuredPost && (
            <BlogCard post={featuredPost} index={0} featured />
          )}

          {/* Divider */}
          {restPosts.length > 0 && (
            <hr className="border-0 h-px bg-(--border-color)" />
          )}

          {/* Remaining posts — 2-col grid */}
          {restPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {restPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index + 1} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-700 dark:text-red-400 py-4">{error}</p>
          )}

          {/* Load more */}
          {hasMore && !searchQuery && (
            <div className="flex justify-center pt-4">
              <button
                onClick={loadMore}
                disabled={loading}
                className="text-sm text-(--accent) hover:text-(--accent-hover) transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>Load more <span aria-hidden="true">&darr;</span></>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-(--secondary-text) py-12">
          {searchQuery || selectedCategory
            ? 'No posts found matching your criteria.'
            : 'No blog posts available yet.'}
        </p>
      )}
    </div>
  )
}

export default BlogClient
