import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/context/ThemeContext'

// Custom render function that includes providers
interface AllTheProvidersProps {
  children: React.ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Helper function to create mock blog post
export const createMockBlogPost = (overrides = {}) => ({
  id: 1,
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test excerpt',
  content: 'This is test content',
  category: 'Technology',
  tags: ['test', 'jest'],
  date: '2024-01-01',
  readingTime: 5,
  image: '/test-image.jpg',
  published: true,
  views: 100,
  created_at: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

// Helper function to create mock photo
export const createMockPhoto = (overrides = {}) => ({
  id: 1,
  title: 'Test Photo',
  url: '/test-photo.jpg',
  category: 'Landscape',
  alt: 'Test photo description',
  width: 1920,
  height: 1080,
  created_at: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

// Helper function to create mock project
export const createMockProject = (overrides = {}) => ({
  id: 1,
  title: 'Test Project',
  slug: 'test-project',
  description: 'Test project description',
  image: '/test-project.jpg',
  tags: ['React', 'TypeScript'],
  github: 'https://github.com/test/project',
  demo: 'https://test-project.com',
  featured: true,
  order: 1,
  created_at: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

// Helper to wait for async operations
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0))
