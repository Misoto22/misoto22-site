import { test, expect } from '@playwright/test'

test.describe('404 page', () => {
  test('shows 404 for non-existent blog post', async ({ page }) => {
    // Use a blog slug that doesn't exist — triggers notFound() with custom layout
    await page.goto('/blog/this-post-definitely-does-not-exist-xyz')

    // The custom 404 page should show "404" title
    await expect(page.getByText('404').first()).toBeVisible({ timeout: 10000 })
  })

  test('shows 404 for non-existent top-level route', async ({ page }) => {
    // Next.js default 404 for routes outside [locale]
    const response = await page.goto('/nonexistent-route-xyz')

    // Page should exist (not a network error) but show 404 content
    await expect(page.getByText('404')).toBeVisible({ timeout: 10000 })
  })
})
