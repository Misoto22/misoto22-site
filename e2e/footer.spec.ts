import { test, expect } from '@playwright/test'

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about') // shorter page, footer is easier to reach
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)
  })

  test('shows navigation links', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    for (const name of ['Projects', 'Photography', 'Blog', 'Contact']) {
      await expect(footer.getByRole('link', { name })).toBeVisible()
    }
  })

  test('shows social links with correct aria-labels', async ({ page }) => {
    const footer = page.locator('footer')

    for (const label of ['GitHub', 'LinkedIn', 'Instagram']) {
      const link = footer.getByRole('link', { name: label })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('target', '_blank')
    }
  })

  test('shows copyright', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText(/© \d{4}/)).toBeVisible()
  })
})
