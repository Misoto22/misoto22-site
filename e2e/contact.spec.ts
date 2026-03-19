import { test, expect } from '@playwright/test'

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('form fields are visible', async ({ page }) => {
    await expect(page.locator('#name')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#subject')).toBeVisible()
    await expect(page.locator('#message')).toBeVisible()
    await expect(page.getByRole('button', { name: /send/i })).toBeVisible()
  })

  test('submit empty form shows validation error', async ({ page }) => {
    // Bypass HTML5 required validation so JS handler runs
    await page.evaluate(() => {
      document.querySelector('form')?.setAttribute('novalidate', '')
    })

    await page.getByRole('button', { name: /send/i }).click()

    await expect(page.getByText(/fill in all fields/i)).toBeVisible()
  })

  test('invalid email shows email validation error', async ({ page }) => {
    // Bypass HTML5 validation so JS handler runs
    await page.evaluate(() => {
      document.querySelector('form')?.setAttribute('novalidate', '')
    })

    await page.locator('#name').fill('Test User')
    await page.locator('#email').fill('not-an-email')
    await page.locator('#subject').fill('Test Subject')
    await page.locator('#message').fill('Test message content')

    await page.getByRole('button', { name: /send/i }).click()

    await expect(page.getByText(/valid email/i)).toBeVisible()
  })
})
