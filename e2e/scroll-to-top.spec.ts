import { test, expect } from '@playwright/test'

// Helper: scroll and ensure the scroll event fires
async function scrollTo(page: import('@playwright/test').Page, y: number) {
  await page.evaluate((scrollY) => {
    window.scrollTo(0, scrollY)
    window.dispatchEvent(new Event('scroll'))
  }, y)
  await page.waitForTimeout(300)
}

test.describe('Scroll to top button', () => {
  test('appears after scrolling and scrolls to top on click', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    const button = page.getByRole('button', { name: 'Scroll to top' })

    // At top: button should have opacity-0
    await expect(button).toHaveClass(/opacity-0/)

    // Scroll down past the 200px threshold
    await scrollTo(page, 1000)

    // Button should switch to opacity-100
    await expect(button).toHaveClass(/opacity-100/, { timeout: 5000 })

    // Click it
    await button.click()
    await page.waitForTimeout(800)

    // Should have scrolled back near the top
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(100)
  })

  test('hides when modal is open', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    const button = page.getByRole('button', { name: 'Scroll to top' })

    // Scroll down to make button visible
    await scrollTo(page, 1000)
    await expect(button).toHaveClass(/opacity-100/, { timeout: 5000 })

    // Open command palette
    await page.keyboard.press('ControlOrMeta+k')
    await expect(page.locator('[role="dialog"]')).toBeVisible()

    // Button should hide (opacity-0)
    await expect(button).toHaveClass(/opacity-0/, { timeout: 5000 })

    // Close modal
    await page.keyboard.press('Escape')

    // Button should reappear
    await expect(button).toHaveClass(/opacity-100/, { timeout: 5000 })
  })
})
