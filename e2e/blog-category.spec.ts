import { test, expect } from '@playwright/test'

test.describe('Blog category page', () => {
  test('loads category page with filtered posts', async ({ page, request }) => {
    // Get a valid category name from the API
    const catResponse = await request.get('/api/blog/categories')
    const categories = await catResponse.json()
    if (!categories.length) return

    // URL uses encodeURIComponent, matching generateStaticParams
    const categoryName = categories[0].name
    const slug = encodeURIComponent(categoryName)

    await page.goto(`/blog/category/${slug}`)

    // Should show a heading (the category posts title)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 })

    // Should have a back link (scoped to main content, not nav)
    const mainContent = page.locator('section, main')
    const backLink = mainContent.locator('a[href*="/blog"]').first()
    await expect(backLink).toBeVisible()
  })

  test('back link returns to main blog page', async ({ page, request }) => {
    const catResponse = await request.get('/api/blog/categories')
    const categories = await catResponse.json()
    if (!categories.length) return

    const slug = encodeURIComponent(categories[0].name)
    await page.goto(`/blog/category/${slug}`)

    const mainContent = page.locator('section, main')
    const backLink = mainContent.locator('a[href*="/blog"]').first()
    await backLink.click()
    await expect(page).toHaveURL(/\/blog\/?$/)
  })
})
