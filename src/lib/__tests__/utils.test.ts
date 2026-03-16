import {
  estimateReadingTime,
  formatDate,
} from '../utils'

describe('estimateReadingTime', () => {
  it('should calculate reading time for a given content', () => {
    // Create content with exactly 200 words
    const words = Array(200).fill('word').join(' ')
    const readingTime = estimateReadingTime(words)
    expect(readingTime).toBe(1) // 200 words / 200 wpm = 1 minute
  })

  it('should round up to nearest minute', () => {
    // Create content with exactly 100 words
    const words = Array(100).fill('word').join(' ')
    const readingTime = estimateReadingTime(words)
    expect(readingTime).toBe(1) // 100 words / 200 wpm = 0.5, rounds to 1
  })

  it('should accept custom words per minute', () => {
    // Create content with exactly 100 words
    const words = Array(100).fill('word').join(' ')
    const readingTime = estimateReadingTime(words, 100)
    expect(readingTime).toBe(1) // 100 words / 100 wpm = 1 minute
  })

  it('should handle empty content', () => {
    expect(estimateReadingTime('')).toBe(1) // Empty string has 1 word (empty string splits to [""])
  })

  it('should handle single word', () => {
    expect(estimateReadingTime('Hello')).toBe(1)
  })
})

describe('formatDate', () => {
  it('should format ISO date string correctly', () => {
    const date = '2024-01-15T00:00:00.000Z'
    const formatted = formatDate(date)
    expect(formatted).toBe('January 15, 2024')
  })

  it('should handle different months', () => {
    expect(formatDate('2024-12-25T00:00:00.000Z')).toBe('December 25, 2024')
    expect(formatDate('2024-06-01T00:00:00.000Z')).toBe('June 1, 2024')
  })

  it('should handle leap year dates', () => {
    expect(formatDate('2024-02-29T00:00:00.000Z')).toBe('February 29, 2024')
  })

  it('should format dates from different years', () => {
    expect(formatDate('2023-01-01T00:00:00.000Z')).toBe('January 1, 2023')
    expect(formatDate('2025-12-31T00:00:00.000Z')).toBe('December 31, 2025')
  })
})
