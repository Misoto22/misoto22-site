import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('hero section loads with title and CTA buttons', async ({ page }) => {
    await expect(page.getByText('Developer.')).toBeVisible()
    await expect(page.getByText('Photographer.')).toBeVisible()

    const viewProjects = page.getByRole('link', { name: /view projects/i })
    await expect(viewProjects).toBeVisible()

    const browsePhotography = page.getByRole('link', { name: /browse photography/i })
    await expect(browsePhotography).toBeVisible()
  })

  test('featured work section shows project cards', async ({ page }) => {
    const workHeading = page.getByText('Selected Work')
    await workHeading.scrollIntoViewIfNeeded()
    await expect(workHeading).toBeVisible()

    // Should have project-related content in main area (not nav)
    const mainContent = page.locator('main, #main-content')
    const projectLinks = mainContent.locator('a').filter({ hasText: /view|project/i })
    await expect(projectLinks.first()).toBeVisible({ timeout: 10000 })
  })

  test('blog preview section shows post cards', async ({ page }) => {
    // Scroll down to find blog links — they link to /blog/[slug]
    const blogLinks = page.locator('a[href*="/blog/"]')

    // Scroll to page bottom to trigger any lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    await expect(blogLinks.first()).toBeVisible({ timeout: 10000 })
  })

  test('about section becomes visible on scroll', async ({ page }) => {
    // Scroll down to find about content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3))
    await page.waitForTimeout(500)

    // The home page has about-related text
    const aboutContent = page.getByText(/CS grad|Developer|photographer/i).first()
    await expect(aboutContent).toBeVisible({ timeout: 10000 })
  })

  test('CTA section is visible at bottom', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    const ctaHeading = page.getByText("Let's work together.")
    await expect(ctaHeading).toBeVisible({ timeout: 10000 })
  })
})
