import { test, expect } from '@playwright/test'

test.describe('Keyboard navigation', () => {
  test('ArrowRight navigates to next page', async ({ page }) => {
    await page.goto('/projects')

    // Press right arrow to go to next page in nav order
    // NAV_PAGES order: Home, Projects, Photography, ...
    await page.keyboard.press('ArrowRight')

    await expect(page).toHaveURL(/\/photography/)
  })

  test('ArrowLeft navigates to previous page', async ({ page }) => {
    await page.goto('/photography')

    await page.keyboard.press('ArrowLeft')

    await expect(page).toHaveURL(/\/projects/)
  })

  test('arrow keys are ignored when input is focused', async ({ page }) => {
    await page.goto('/blog')

    // Focus the search input
    const searchInput = page.getByPlaceholder(/search/i)
    await searchInput.click()

    // Arrow keys should NOT navigate away
    await page.keyboard.press('ArrowRight')

    // Should still be on /blog
    await expect(page).toHaveURL(/\/blog/)
  })

  test('arrow keys are ignored when modal is open', async ({ page }) => {
    await page.goto('/projects')

    // Open command palette
    await page.keyboard.press('Meta+k')
    await expect(page.locator('[role="dialog"]')).toBeVisible()

    // Arrow keys should control palette, not page navigation
    await page.keyboard.press('ArrowRight')
    await expect(page).toHaveURL(/\/projects/)

    await page.keyboard.press('Escape')
  })
})
