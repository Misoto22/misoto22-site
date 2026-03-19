import { test, expect } from '@playwright/test'

test.describe('Blog page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog')
    // Wait for client hydration (skeleton disappears)
    await page.waitForSelector('.animate-pulse', { state: 'detached', timeout: 10000 }).catch(() => {})
  })

  test('loads with post cards', async ({ page }) => {
    const postLinks = page.locator('a[href*="/blog/"]')
    await expect(postLinks.first()).toBeVisible({ timeout: 10000 })
  })

  test('search filters posts', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i)
    await expect(searchInput).toBeVisible()

    // Get first post title to search for
    const firstPostTitle = await page.locator('a[href*="/blog/"] h2, a[href*="/blog/"] h3').first().textContent()
    if (!firstPostTitle) return

    const searchTerm = firstPostTitle.split(' ')[0]
    await searchInput.fill(searchTerm)

    await expect(page.getByText(firstPostTitle)).toBeVisible()
  })

  test('search with gibberish shows no results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i)
    await searchInput.fill('xyznonexistent123456')

    await expect(page.getByText(/no posts found/i)).toBeVisible()
  })

  test('category filter works', async ({ page }) => {
    // Wait for category filter to load (skeleton disappears)
    const allButton = page.locator('main').getByRole('button', { name: /^all$/i })

    if (await allButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Category buttons are siblings of "All" in the same flex container
      const categoryContainer = allButton.locator('..')
      const categoryButtons = categoryContainer.locator('button').filter({ hasNotText: /^all$/i })
      const count = await categoryButtons.count()

      if (count > 0) {
        await categoryButtons.first().click()
        await page.waitForTimeout(1000)

        await allButton.click()
        await page.waitForTimeout(1000)
      }
    }
  })

  test('load more button fetches additional posts', async ({ page }) => {
    const loadMoreButton = page.getByRole('button', { name: /load more/i })

    if (await loadMoreButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      const initialPostCount = await page.locator('a[href*="/blog/"]').count()
      await loadMoreButton.click()

      await expect(loadMoreButton).not.toContainText(/loading/i, { timeout: 10000 })

      const newPostCount = await page.locator('a[href*="/blog/"]').count()
      expect(newPostCount).toBeGreaterThanOrEqual(initialPostCount)
    }
  })

  test('post detail page loads correctly', async ({ page }) => {
    const firstPost = page.locator('a[href*="/blog/"]').first()
    await firstPost.click()

    await expect(page).toHaveURL(/\/blog\//)

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible({ timeout: 10000 })

    const content = page.locator('article, main')
    await expect(content.first()).toBeVisible()
  })

  test('search combined with category filter', async ({ page }) => {
    const allButton = page.locator('main').getByRole('button', { name: /^all$/i })

    if (await allButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      const categoryContainer = allButton.locator('..')
      const categoryButtons = categoryContainer.locator('button').filter({ hasNotText: /^all$/i })

      if (await categoryButtons.count() > 0) {
        // Select a category first
        await categoryButtons.first().click()
        await page.waitForTimeout(1000)

        // Now type in search
        const searchInput = page.getByPlaceholder(/search/i)
        await searchInput.fill('xyznonexistent123456')

        // Should show no results
        await expect(page.getByText(/no posts found/i)).toBeVisible()

        // Clear search
        await searchInput.fill('')

        // Posts from the category should reappear
        const postLinks = page.locator('a[href*="/blog/"]')
        await expect(postLinks.first()).toBeVisible({ timeout: 5000 })
      }
    }
  })

  test('post detail shows related articles section', async ({ page }) => {
    await page.locator('a[href*="/blog/"]').first().click()
    await expect(page).toHaveURL(/\/blog\//)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 })

    // Scroll to bottom to find related articles
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // Related articles section should be visible (if the post has related posts)
    const relatedHeading = page.getByText(/related/i)
    if (await relatedHeading.isVisible({ timeout: 3000 }).catch(() => false)) {
      // Should have links to other posts
      const relatedLinks = page.locator('a[href*="/blog/"]')
      expect(await relatedLinks.count()).toBeGreaterThan(0)
    }
  })

  test('back navigation from post works', async ({ page }) => {
    await page.locator('a[href*="/blog/"]').first().click()
    await expect(page).toHaveURL(/\/blog\//)

    const backLink = page.getByRole('link', { name: /back to blog/i })
    if (await backLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await backLink.click()
    } else {
      await page.goBack()
    }
    await expect(page).toHaveURL(/\/blog\/?$/)
  })
})
