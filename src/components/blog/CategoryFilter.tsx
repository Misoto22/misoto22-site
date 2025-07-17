"use client"

import React, { useState, useEffect } from 'react'
import { BlogCategory } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface CategoryFilterProps {
  selectedCategory?: string
  onCategoryChange: (category: string | undefined) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/blog/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="flex space-x-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-(--border-color) rounded-full animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-(--foreground) text-center">Categories</h3>
      <div className="flex flex-wrap justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(undefined)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            !selectedCategory
              ? 'bg-(--foreground) text-(--background) shadow-lg'
              : 'bg-(--card-background) text-(--foreground) border border-(--border-color) hover:bg-(--background) hover:shadow-md'
          }`}
        >
          All Posts
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.name)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.name
                ? 'bg-(--foreground) text-(--background) shadow-lg'
                : 'bg-(--card-background) text-(--foreground) border border-(--border-color) hover:bg-(--background) hover:shadow-md'
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
