"use client"

import React, { useState, useCallback, useEffect } from 'react'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import { BlogPost } from '@/lib/supabase'
import { motion } from 'framer-motion'
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

  // Effect for initial mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter posts based on search query and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = !selectedCategory || post.category?.name === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Load more posts
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    try {
      const nextPage = currentPage + 1
      const response = await fetch(`/api/blog?page=${nextPage}&limit=10${selectedCategory ? `&category=${selectedCategory}` : ''}`)

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()

      setPosts(prevPosts => [...prevPosts, ...data.posts])
      setHasMore(data.hasMore)
      setCurrentPage(nextPage)
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, currentPage, selectedCategory])

  // Handle category change
  const handleCategoryChange = useCallback(async (category: string | undefined) => {
    setSelectedCategory(category)
    setLoading(true)
    setCurrentPage(1)

    try {
      const response = await fetch(`/api/blog?page=1&limit=10${category ? `&category=${category}` : ''}`)

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()

      setPosts(data.posts)
      setHasMore(data.hasMore)
      setCurrentPage(1)
    } catch (error) {
      console.error('Error fetching posts by category:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-(--border-color) rounded-sm w-1/4"></div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-(--border-color) rounded-full" />
            ))}
          </div>
        </div>
        <div className="grid gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-(--border-color) rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Filters and Search */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-(--secondary-text) w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-(--card-background) border border-(--border-color) rounded-2xl text-(--foreground) placeholder-(--secondary-text) focus:outline-hidden focus:ring-2 focus:ring-(--foreground) focus:ring-opacity-50 transition-all duration-200 text-base"
          />
        </div>

        {/* Category Filter */}
        <div className="flex justify-center">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && !searchQuery && (
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3 bg-(--foreground) text-(--background) rounded-xl font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Load More Posts</span>
                )}
              </motion.button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-(--secondary-text) text-lg">
            {searchQuery || selectedCategory 
              ? 'No posts found matching your criteria.' 
              : 'No blog posts available yet.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default BlogClient
