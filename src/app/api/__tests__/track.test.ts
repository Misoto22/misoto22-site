jest.mock('@/lib/supabase', () => ({ supabase: {} }))
jest.mock('next/server', () => ({
  NextRequest: class {},
  NextResponse: { json: jest.fn() },
}))

import { BOT_PATTERNS, parseDevice, parseBrowser, extractDomain, createSessionHash } from '../track/route'

describe('BOT_PATTERNS', () => {
  it('detects common bots', () => {
    expect(BOT_PATTERNS.test('Googlebot/2.1')).toBe(true)
    expect(BOT_PATTERNS.test('facebookexternalhit/1.1')).toBe(true)
    expect(BOT_PATTERNS.test('LinkedInBot/1.0')).toBe(true)
    expect(BOT_PATTERNS.test('Twitterbot/1.0')).toBe(true)
    expect(BOT_PATTERNS.test('WhatsApp/2.0')).toBe(true)
    expect(BOT_PATTERNS.test('HeadlessChrome')).toBe(true)
    expect(BOT_PATTERNS.test('PhantomJS')).toBe(true)
    expect(BOT_PATTERNS.test('Selenium')).toBe(true)
  })

  it('does not flag real browsers', () => {
    expect(BOT_PATTERNS.test('Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 Chrome/120.0')).toBe(false)
    expect(BOT_PATTERNS.test('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Safari/604.1')).toBe(false)
  })
})

describe('parseDevice', () => {
  it('detects mobile', () => {
    expect(parseDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Mobile')).toBe('mobile')
    expect(parseDevice('Mozilla/5.0 (Linux; Android 14) Mobile')).toBe('mobile')
  })

  it('detects tablet', () => {
    expect(parseDevice('Mozilla/5.0 (iPad; CPU OS 17_0)')).toBe('tablet')
  })

  it('defaults to desktop', () => {
    expect(parseDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')).toBe('desktop')
    expect(parseDevice('')).toBe('desktop')
  })
})

describe('parseBrowser', () => {
  it('detects Chrome', () => {
    expect(parseBrowser('Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36')).toBe('Chrome')
  })

  it('detects Safari (not Chrome)', () => {
    expect(parseBrowser('Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15')).toBe('Safari')
  })

  it('detects Firefox', () => {
    expect(parseBrowser('Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0')).toBe('Firefox')
  })

  it('detects Edge (before Chrome)', () => {
    expect(parseBrowser('Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36 Edg/120.0')).toBe('Edge')
  })

  it('returns Other for unknown', () => {
    expect(parseBrowser('curl/7.88.1')).toBe('Other')
    expect(parseBrowser('')).toBe('Other')
  })
})

describe('extractDomain', () => {
  it('extracts domain from referrer URL', () => {
    expect(extractDomain('https://www.google.com/search?q=test')).toBe('google.com')
    expect(extractDomain('https://twitter.com/user')).toBe('twitter.com')
  })

  it('strips www prefix', () => {
    expect(extractDomain('https://www.example.com')).toBe('example.com')
  })

  it('filters self-referral', () => {
    expect(extractDomain('https://misoto22.com/projects')).toBeNull()
    expect(extractDomain('http://localhost:3000/blog')).toBeNull()
  })

  it('returns null for empty/invalid input', () => {
    expect(extractDomain('')).toBeNull()
    expect(extractDomain('not-a-url')).toBeNull()
  })
})

describe('createSessionHash', () => {
  it('returns a consistent hash for same inputs', () => {
    const hash1 = createSessionHash('2024-01-01', '/projects', 'Mozilla/5.0 Chrome')
    const hash2 = createSessionHash('2024-01-01', '/projects', 'Mozilla/5.0 Chrome')
    expect(hash1).toBe(hash2)
  })

  it('returns different hashes for different dates', () => {
    const hash1 = createSessionHash('2024-01-01', '/projects', 'Mozilla/5.0')
    const hash2 = createSessionHash('2024-01-02', '/projects', 'Mozilla/5.0')
    expect(hash1).not.toBe(hash2)
  })

  it('returns different hashes for different paths', () => {
    const hash1 = createSessionHash('2024-01-01', '/projects', 'Mozilla/5.0')
    const hash2 = createSessionHash('2024-01-01', '/blog', 'Mozilla/5.0')
    expect(hash1).not.toBe(hash2)
  })

  it('returns a string', () => {
    const hash = createSessionHash('2024-01-01', '/', 'ua')
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })
})
