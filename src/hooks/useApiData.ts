'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDataCache } from '@/context/ThemeContext'

interface UseApiDataOptions {
  endpoint: string
  cacheKey: 'projects' | 'education' | 'experience' | 'photos'
  maxAge?: number // Cache max age in milliseconds, default 5 minutes
}

interface UseApiDataReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useApiData<T = any>({
  endpoint,
  cacheKey,
  maxAge = 5 * 60 * 1000
}: UseApiDataOptions): UseApiDataReturn<T> {
  const { cache, setCache, isDataFresh } = useDataCache()
  const [error, setError] = useState<string | null>(null)
  const [hasFetched, setHasFetched] = useState(false)

  const cachedEntry = cache[cacheKey]
  const data = cachedEntry?.data || null
  const loading = cachedEntry?.loading || false

  const fetchData = useCallback(async () => {
    if (loading) return // Prevent multiple simultaneous requests

    try {
      setError(null)
      setCache(cacheKey, data, true) // Set loading state

      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const result = await response.json()
      setCache(cacheKey, result, false) // Set data and clear loading
      setHasFetched(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      setCache(cacheKey, data, false) // Clear loading state on error
      console.error(`Error fetching ${cacheKey}:`, err)
    }
  }, [endpoint, cacheKey, data, setCache, loading])

  const refetch = useCallback(async () => {
    setHasFetched(false)
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    // Only fetch if we haven't fetched yet and don't have fresh data
    if (!hasFetched && !isDataFresh(cacheKey, maxAge) && !loading) {
      fetchData()
    } else if (isDataFresh(cacheKey, maxAge)) {
      setHasFetched(true)
    }
  }, [cacheKey, maxAge, isDataFresh, fetchData, hasFetched, loading])

  return {
    data,
    loading,
    error,
    refetch
  }
}

// Specialized hooks for each data type
export function useProjects() {
  return useApiData<any[]>({
    endpoint: '/api/projects',
    cacheKey: 'projects'
  })
}

export function useEducation() {
  return useApiData<any[]>({
    endpoint: '/api/education',
    cacheKey: 'education'
  })
}

export function useExperience() {
  return useApiData<any[]>({
    endpoint: '/api/experience',
    cacheKey: 'experience'
  })
}

// Photos hook with pagination support
interface PhotosData {
  photos: any[]
  hasMore: boolean
  page: number
}

export function usePhotos(page: number = 1, limit: number = 8) {
  const { cache, setCache, isDataFresh } = useDataCache()
  const [error, setError] = useState<string | null>(null)
  const [hasFetched, setHasFetched] = useState(false)

  const cachedEntry = cache.photos
  const data = cachedEntry?.data || { photos: [], hasMore: true, page: 0 }
  const loading = cachedEntry?.loading || false

  const loadPhotos = useCallback(async (pageNum: number, append: boolean = false) => {
    if (loading) return // Prevent multiple simultaneous requests

    try {
      setError(null)
      const currentData = cache.photos?.data || { photos: [], hasMore: true, page: 0 }
      setCache('photos', currentData, true) // Set loading state

      const response = await fetch(`/api/photos?page=${pageNum}&limit=${limit}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.statusText}`)
      }

      const result = await response.json()

      const newData = {
        photos: append ? [...currentData.photos, ...result.photos] : result.photos,
        hasMore: result.hasMore,
        page: pageNum
      }

      setCache('photos', newData, false) // Set data and clear loading
      setHasFetched(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      const currentData = cache.photos?.data || { photos: [], hasMore: true, page: 0 }
      setCache('photos', currentData, false) // Clear loading state on error
      console.error('Error fetching photos:', err)
    }
  }, [limit, cache.photos, setCache, loading])

  const loadMore = useCallback(async () => {
    if (!loading && data.hasMore) {
      await loadPhotos(data.page + 1, true)
    }
  }, [loading, data.hasMore, data.page, loadPhotos])

  const refetch = useCallback(async () => {
    setHasFetched(false)
    await loadPhotos(1, false)
  }, [loadPhotos])

  useEffect(() => {
    // Only fetch if we haven't fetched yet and don't have fresh data
    if (!hasFetched && (!isDataFresh('photos') || data.page === 0) && !loading) {
      loadPhotos(page, false)
    } else if (isDataFresh('photos') && data.page > 0) {
      setHasFetched(true)
    }
  }, [page, isDataFresh, data.page, loadPhotos, hasFetched, loading])

  return {
    data,
    loading,
    error,
    loadMore,
    refetch
  }
}
