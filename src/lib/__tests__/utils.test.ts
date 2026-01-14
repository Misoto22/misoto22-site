import {
  estimateReadingTime,
  formatDate,
  generateSlug,
  truncateText,
  debounce,
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

describe('generateSlug', () => {
  it('should convert text to lowercase slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
  })

  it('should replace spaces with hyphens', () => {
    expect(generateSlug('This is a test')).toBe('this-is-a-test')
  })

  it('should remove special characters', () => {
    expect(generateSlug('Hello! World?')).toBe('hello-world')
    expect(generateSlug('Test@#$%^&*()')).toBe('test')
  })

  it('should replace multiple spaces with single hyphen', () => {
    expect(generateSlug('Hello    World')).toBe('hello-world')
  })

  it('should remove leading and trailing hyphens', () => {
    expect(generateSlug('  Hello World  ')).toBe('hello-world')
    expect(generateSlug('-Hello-World-')).toBe('hello-world')
  })

  it('should handle underscores', () => {
    expect(generateSlug('hello_world')).toBe('hello-world')
  })

  it('should handle mixed special characters and spaces', () => {
    expect(generateSlug('The Quick-Brown Fox!')).toBe('the-quick-brown-fox')
  })

  it('should handle empty string', () => {
    expect(generateSlug('')).toBe('')
  })

  it('should handle string with only special characters', () => {
    expect(generateSlug('!@#$%^&*()')).toBe('')
  })
})

describe('truncateText', () => {
  it('should truncate text longer than max length', () => {
    const text = 'This is a very long text that needs to be truncated'
    expect(truncateText(text, 20)).toBe('This is a very lo...')
  })

  it('should not truncate text shorter than max length', () => {
    const text = 'Short text'
    expect(truncateText(text, 20)).toBe('Short text')
  })

  it('should use custom suffix', () => {
    const text = 'This is a long text'
    expect(truncateText(text, 10, '…')).toBe('This is a…')
  })

  it('should handle exact length match', () => {
    const text = 'Exactly 20 chars!!!!'
    expect(truncateText(text, 20)).toBe('Exactly 20 chars!!!!')
  })

  it('should handle empty string', () => {
    expect(truncateText('', 10)).toBe('')
  })

  it('should handle maxLength smaller than suffix', () => {
    // When maxLength is 2 and suffix is 3 chars, slice(0, -1) returns 'Hell'
    expect(truncateText('Hello', 2)).toBe('Hell...')
  })

  it('should account for suffix length', () => {
    const text = 'Hello World'
    const result = truncateText(text, 10, '...')
    expect(result.length).toBe(10)
    expect(result).toBe('Hello W...')
  })
})

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should delay function execution', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc()
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should only execute once for multiple rapid calls', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc()
    debouncedFunc()
    debouncedFunc()

    jest.advanceTimersByTime(1000)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should reset timer on subsequent calls', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc()
    jest.advanceTimersByTime(500)

    debouncedFunc()
    jest.advanceTimersByTime(500)
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(500)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments correctly', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc('arg1', 'arg2', 123)
    jest.advanceTimersByTime(1000)

    expect(func).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should use the latest arguments when called multiple times', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 1000)

    debouncedFunc('first')
    debouncedFunc('second')
    debouncedFunc('third')

    jest.advanceTimersByTime(1000)
    expect(func).toHaveBeenCalledWith('third')
    expect(func).toHaveBeenCalledTimes(1)
  })
})
