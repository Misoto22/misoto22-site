"use client"

import React, { useState, useEffect } from 'react'
import { BlogCategory } from '@/lib/supabase'
import { useTranslations } from 'next-intl'

interface CategoryFilterProps {
  selectedCategory?: string
  onCategoryChange: (category: string | undefined) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const t = useTranslations('Blog')
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
      <div className="flex gap-3 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-5 w-16 bg-(--border-color) rounded-sm animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3 sm:gap-6">
      <button
        onClick={() => onCategoryChange(undefined)}
        className={`text-sm transition-colors duration-200 ${
          !selectedCategory
            ? 'text-(--foreground) underline underline-offset-4 decoration-(--accent)'
            : 'text-(--secondary-text) hover:text-(--foreground)'
        }`}
      >
        {t('all')}
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.name)}
          className={`text-sm transition-colors duration-200 ${
            selectedCategory === category.name
              ? 'text-(--foreground) underline underline-offset-4 decoration-(--accent)'
              : 'text-(--secondary-text) hover:text-(--foreground)'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
