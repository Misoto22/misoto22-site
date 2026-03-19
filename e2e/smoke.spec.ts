import { test, expect } from '@playwright/test'

test.describe('API smoke tests', () => {
  test('GET /api/blog returns posts', async ({ request }) => {
    const response = await request.get('/api/blog?limit=1')
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('posts')
    expect(Array.isArray(data.posts)).toBeTruthy()
    expect(data.posts.length).toBeGreaterThan(0)
  })

  test('GET /api/photos returns photos', async ({ request }) => {
    const response = await request.get('/api/photos?page=1&limit=1')
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('photos')
    expect(Array.isArray(data.photos)).toBeTruthy()
    expect(data.photos.length).toBeGreaterThan(0)
  })

  test('GET /api/blog/categories returns categories', async ({ request }) => {
    const response = await request.get('/api/blog/categories')
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(Array.isArray(data)).toBeTruthy()
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toHaveProperty('name')
  })

  test('GET /api/stats returns stats data', async ({ request }) => {
    const response = await request.get('/api/stats?days=7')
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('totalViews')
    expect(data).toHaveProperty('uniqueVisitors')
    expect(data).toHaveProperty('dailyViews')
  })

  test('GET /api/blog/:slug returns post data', async ({ request }) => {
    // First get a valid slug
    const listResponse = await request.get('/api/blog?limit=1')
    const listData = await listResponse.json()
    if (!listData.posts?.length) return

    const slug = listData.posts[0].slug
    const response = await request.get(`/api/blog/${slug}`)
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('title')
    expect(data).toHaveProperty('content')
  })

  test('GET /api/blog/:slug returns 404 for non-existent post', async ({ request }) => {
    const response = await request.get('/api/blog/this-post-does-not-exist-xyz')
    expect(response.status()).toBe(404)
  })

  test('GET /api/command-palette returns dynamic data', async ({ request }) => {
    const response = await request.get('/api/command-palette')
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('projects')
    expect(data).toHaveProperty('posts')
    expect(data).toHaveProperty('experience')
    expect(data).toHaveProperty('education')
  })

  test('POST /api/track returns ok', async ({ request }) => {
    const response = await request.post('/api/track', {
      data: { path: '/test-e2e', referrer: '' },
    })
    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    expect(data).toHaveProperty('ok', true)
  })

  test('POST /api/track rejects missing path', async ({ request }) => {
    const response = await request.post('/api/track', {
      data: {},
    })
    expect(response.status()).toBe(400)
  })

  test('GET /api/photos rejects invalid params', async ({ request }) => {
    const response = await request.get('/api/photos?page=0&limit=-1')
    expect(response.status()).toBe(400)
  })
})
