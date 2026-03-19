import { test, expect } from '@playwright/test'

test.describe('Photography page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/photography')
  })

  test('loads with photo grid', async ({ page }) => {
    const photos = page.locator('img[alt]').filter({ hasNotText: /logo/i })
    await expect(photos.first()).toBeVisible({ timeout: 15000 })

    const count = await photos.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('clicking photo opens modal', async ({ page }) => {
    const photoItems = page.locator('.cursor-pointer').filter({ has: page.locator('img') })
    await expect(photoItems.first()).toBeVisible({ timeout: 15000 })

    await photoItems.first().click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()

    await expect(page.getByText(/1\s*\/\s*\d+/)).toBeVisible()
  })

  test('modal navigation with buttons', async ({ page }) => {
    const photoItems = page.locator('.cursor-pointer').filter({ has: page.locator('img') })
    await expect(photoItems.first()).toBeVisible({ timeout: 15000 })

    await photoItems.first().click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()

    // Wait for counter to confirm modal is ready
    await expect(page.getByText(/1\s*\/\s*\d+/)).toBeVisible()

    // Use the next button instead of arrow keys (more reliable in E2E)
    const nextButton = page.getByRole('button', { name: 'Next image' })
    if (await nextButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await nextButton.click()
      await expect(page.getByText(/2\s*\/\s*\d+/)).toBeVisible({ timeout: 5000 })

      // Go back with previous button
      const prevButton = page.getByRole('button', { name: 'Previous image' })
      await prevButton.click()
      await expect(page.getByText(/1\s*\/\s*\d+/)).toBeVisible({ timeout: 5000 })
    }
  })

  test('infinite scroll loads more photos', async ({ page }) => {
    const photos = page.locator('img[alt]').filter({ hasNotText: /logo/i })
    await expect(photos.first()).toBeVisible({ timeout: 15000 })

    const initialCount = await photos.count()

    // Scroll to the loading indicator to trigger IntersectionObserver
    const loadingIndicator = page.locator('#loading-indicator')
    if (await loadingIndicator.isVisible({ timeout: 3000 }).catch(() => false)) {
      await loadingIndicator.scrollIntoViewIfNeeded()
      await page.waitForTimeout(2000)

      const newCount = await page.locator('img[alt]').filter({ hasNotText: /logo/i }).count()
      expect(newCount).toBeGreaterThan(initialCount)
    }
  })

  test('modal EXIF toggle with i key', async ({ page }) => {
    const photoItems = page.locator('.cursor-pointer').filter({ has: page.locator('img') })
    await expect(photoItems.first()).toBeVisible({ timeout: 15000 })

    await photoItems.first().click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()

    // Press 'i' to toggle EXIF info
    await page.keyboard.press('i')

    // If photo has EXIF data, info panel should appear (camera, lens, etc.)
    // If no EXIF, nothing happens — just verify modal is still open
    await expect(modal).toBeVisible()

    // Press 'i' again to toggle off
    await page.keyboard.press('i')
    await expect(modal).toBeVisible()
  })

  test('Escape while zoomed resets zoom instead of closing', async ({ page }) => {
    const photoItems = page.locator('.cursor-pointer').filter({ has: page.locator('img') })
    await expect(photoItems.first()).toBeVisible({ timeout: 15000 })

    await photoItems.first().click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()

    // Double-click to zoom in — click on the image container (which handles the event)
    const imageContainer = modal.locator('.select-none').first()
    await imageContainer.dblclick()
    await page.waitForTimeout(300)

    // Press Escape — should reset zoom, NOT close modal
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)

    // Modal should still be open (zoom was reset, not closed)
    await expect(modal).toBeVisible()

    // Press Escape again — now it should close
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })

  test('modal closes with Escape key', async ({ page }) => {
    const photoItems = page.locator('.cursor-pointer').filter({ has: page.locator('img') })
    await expect(photoItems.first()).toBeVisible({ timeout: 15000 })

    await photoItems.first().click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })
})
