import { test, expect } from '@playwright/test'

test.describe('Experience page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience')
  })

  test('loads with page header', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /experience/i })).toBeVisible()
  })

  test('shows experience timeline entries', async ({ page }) => {
    // Should have at least one job title heading
    const entries = page.getByRole('heading', { level: 2 })
    await expect(entries.first()).toBeVisible({ timeout: 10000 })

    const count = await entries.count()
    expect(count).toBeGreaterThan(0)
  })

  test('experience entries have company and period info', async ({ page }) => {
    // Company name (h3)
    const companies = page.getByRole('heading', { level: 3 })
    await expect(companies.first()).toBeVisible({ timeout: 10000 })

    // Period text
    await expect(page.getByText(/\d{4}\s*[-–]/).first()).toBeVisible()
  })
})
