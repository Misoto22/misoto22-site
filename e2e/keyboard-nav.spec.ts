import { test, expect } from '@playwright/test'

test.describe('Keyboard navigation', () => {
  // These tests depend on client-side hydration completing before pressing keys.
  // Under parallel load, hydration timing can vary — allow 1 retry.
  test.describe.configure({ retries: 1 })

  test('ArrowRight navigates to next page', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 })

    await page.keyboard.press('ArrowRight')
    await expect(page).toHaveURL(/\/photography/)
  })

  test('ArrowLeft navigates to previous page', async ({ page }) => {
    await page.goto('/photography')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 })

    await page.keyboard.press('ArrowLeft')
    await expect(page).toHaveURL(/\/projects/)
  })

  test('arrow keys are ignored when input is focused', async ({ page }) => {
    await page.goto('/blog')

    // Wait for the search input to be interactive (blog client hydrated)
    const searchInput = page.getByPlaceholder(/search/i)
    await expect(searchInput).toBeVisible({ timeout: 10000 })
    await searchInput.click()
    await expect(searchInput).toBeFocused()

    await page.keyboard.press('ArrowRight')
    await expect(page).toHaveURL(/\/blog/)
  })

  test('arrow keys are ignored when modal is open', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 })

    await page.keyboard.press('ControlOrMeta+k')
    await expect(page.locator('[role="dialog"]')).toBeVisible()

    await page.keyboard.press('ArrowRight')
    await expect(page).toHaveURL(/\/projects/)

    await page.keyboard.press('Escape')
  })
})
