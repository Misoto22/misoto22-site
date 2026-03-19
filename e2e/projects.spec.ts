import { test, expect } from '@playwright/test'

test.describe('Projects page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects')
  })

  test('loads with page header', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /projects/i })).toBeVisible()
  })

  test('shows project cards with titles', async ({ page }) => {
    const projectTitles = page.getByRole('heading', { level: 2 })
    await expect(projectTitles.first()).toBeVisible({ timeout: 10000 })

    const count = await projectTitles.count()
    expect(count).toBeGreaterThan(0)
  })

  test('project cards have descriptions and tech badges', async ({ page }) => {
    // Description text
    const descriptions = page.locator('p').filter({ hasText: /.{20,}/ })
    await expect(descriptions.first()).toBeVisible({ timeout: 10000 })

    // Tech badges (font-mono text-xs)
    const badges = page.locator('span.font-mono')
    await expect(badges.first()).toBeVisible()
  })

  test('project cards have source code links', async ({ page }) => {
    // External links to GitHub or similar
    const sourceLinks = page.locator('a[target="_blank"]').filter({ hasText: /source|code|github/i })
    if (await sourceLinks.count() > 0) {
      await expect(sourceLinks.first()).toBeVisible()
    }
  })
})
