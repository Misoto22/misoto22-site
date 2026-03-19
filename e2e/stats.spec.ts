import { test, expect } from '@playwright/test'

test.describe('Stats page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stats')
  })

  test('loads with page header', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /stats/i })).toBeVisible()
  })

  test('shows stat cards after data loads', async ({ page }) => {
    // Wait for loading to finish — stat values should appear
    const statValues = page.locator('.font-heading').filter({ hasText: /\d/ })
    await expect(statValues.first()).toBeVisible({ timeout: 15000 })
  })

  test('range toggle buttons work', async ({ page }) => {
    const btn7d = page.getByRole('button', { name: '7d' })
    const btn30d = page.getByRole('button', { name: '30d' })

    await expect(btn30d).toBeVisible({ timeout: 10000 })

    await btn7d.click()

    // Data should reload — stat cards should still show
    const statValues = page.locator('.font-heading').filter({ hasText: /\d/ })
    await expect(statValues.first()).toBeVisible({ timeout: 15000 })
  })

  test('shows privacy notice at bottom', async ({ page }) => {
    // Wait for data to load first
    const statValues = page.locator('.font-heading').filter({ hasText: /\d/ })
    await expect(statValues.first()).toBeVisible({ timeout: 15000 })

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // Use .last() since "no cookies" also appears in the page description
    await expect(page.getByText(/No cookies · No IP/).first()).toBeVisible({ timeout: 5000 })
  })
})
