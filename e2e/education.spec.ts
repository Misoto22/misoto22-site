import { test, expect } from '@playwright/test'

test.describe('Education page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/education')
  })

  test('loads with page header', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /education/i })).toBeVisible()
  })

  test('shows education timeline entries', async ({ page }) => {
    // Should have at least one education entry with a degree heading
    const entries = page.getByRole('heading', { level: 2 })
    await expect(entries.first()).toBeVisible({ timeout: 10000 })

    const count = await entries.count()
    expect(count).toBeGreaterThan(0)
  })

  test('education entries have school and period info', async ({ page }) => {
    // School name (h3) should be present
    const schoolNames = page.getByRole('heading', { level: 3 })
    await expect(schoolNames.first()).toBeVisible({ timeout: 10000 })

    // Period text (e.g., "2018 - 2022") should be present
    await expect(page.getByText(/\d{4}\s*[-–]\s*\d{4}/).first()).toBeVisible()
  })
})
