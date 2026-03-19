import { test, expect } from '@playwright/test'

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('loads with background and skills sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /background/i })).toBeVisible()
    await expect(page.getByText(/graduate|master|university/i).first()).toBeVisible()

    const skillsHeading = page.getByRole('heading', { name: /skills/i }).first()
    await skillsHeading.scrollIntoViewIfNeeded()
    await expect(skillsHeading).toBeVisible()
  })

  test('resume download link is present', async ({ page }) => {
    const resumeLink = page.locator('a[href*="resume"][download]')
    await expect(resumeLink).toBeVisible()
  })

  test('skills section shows categories', async ({ page }) => {
    const skillsHeading = page.getByRole('heading', { name: /skills/i }).first()
    await skillsHeading.scrollIntoViewIfNeeded()

    // Use heading role to avoid matching bio paragraphs
    await expect(page.getByRole('heading', { name: /programming/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /web development/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /devops/i })).toBeVisible()
  })

  test('interests section is visible', async ({ page }) => {
    // Scroll to bottom to find interests section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)

    const interestsHeading = page.getByRole('heading', { name: /interests/i })
    await expect(interestsHeading).toBeVisible({ timeout: 10000 })
  })
})
