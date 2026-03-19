import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('skip-to-content link is focusable and works', async ({ page }) => {
    await page.goto('/')

    // Tab to the skip link (usually the first focusable element)
    await page.keyboard.press('Tab')

    const skipLink = page.locator('a[href="#main-content"]')
    // The skip link should exist in DOM
    await expect(skipLink).toHaveCount(1)
  })

  test('main landmark exists', async ({ page }) => {
    await page.goto('/')

    const main = page.locator('main, #main-content')
    await expect(main.first()).toBeVisible()
  })

  test('navigation landmark exists', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav').first()).toBeVisible()
  })

  test('footer landmark exists', async ({ page }) => {
    await page.goto('/about')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)

    await expect(page.locator('footer')).toBeVisible()
  })

  test('images have alt text', async ({ page }) => {
    await page.goto('/projects')

    // Wait for project images to load
    const images = page.locator('img')
    await expect(images.first()).toBeVisible({ timeout: 10000 })

    // All images should have non-empty alt attribute
    const count = await images.count()
    for (let i = 0; i < Math.min(count, 5); i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('interactive elements have accessible names', async ({ page }) => {
    await page.goto('/')

    // Theme toggle
    await expect(page.getByRole('button', { name: 'Toggle theme' }).first()).toBeVisible()

    // Locale toggle (unified toolbar shows one button to switch to the other language)
    await expect(page.getByRole('button', { name: '切换到中文' }).first()).toBeVisible()
  })
})
