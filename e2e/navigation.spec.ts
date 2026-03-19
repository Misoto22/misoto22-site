import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('desktop nav is visible with all links', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop only')

    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()

    for (const label of ['Home', 'Projects', 'Photography', 'Blog', 'Contact']) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible()
    }

    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible()
  })

  test('desktop nav links navigate correctly', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop only')

    const nav = page.locator('nav').first()

    await nav.getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL(/\/projects/)

    await nav.getByRole('link', { name: 'Photography' }).click()
    await expect(page).toHaveURL(/\/photography/)

    await nav.getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL(/\/blog/)

    await nav.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/\/contact/)
  })

  test('About dropdown shows children on hover', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop only')

    const nav = page.locator('nav').first()
    const aboutLink = nav.getByRole('link', { name: 'About' })
    await aboutLink.hover()

    await expect(nav.getByRole('link', { name: 'Education' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Experience' })).toBeVisible()
  })

  test('mobile hamburger opens menu and nav items work', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only')

    const hamburger = page.getByRole('button', { name: 'Toggle menu' })
    await expect(hamburger).toBeVisible()

    await hamburger.click()

    await expect(page.getByRole('link', { name: 'Projects' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible()

    await page.getByRole('link', { name: 'Projects' }).first().click()
    await expect(page).toHaveURL(/\/projects/)
  })

  test('mobile About group shows Education and Experience links', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only')

    await page.getByRole('button', { name: 'Toggle menu' }).click()

    // Mobile menu shows About as a label with children
    await expect(page.getByRole('link', { name: 'Education' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Experience' }).first()).toBeVisible()

    // Click Education link
    await page.getByRole('link', { name: 'Education' }).first().click()
    await expect(page).toHaveURL(/\/education/)
  })

  test('theme toggle changes dark class', async ({ page }) => {
    // Force theme to 'light' via localStorage so we know the starting state
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light')
    })
    await page.reload()

    const htmlEl = page.locator('html')
    await expect(htmlEl).not.toHaveClass(/dark/)

    // cycleTheme: light(0) → dark(1). One click should add 'dark' class
    // getByRole finds only the visible button (accessibility tree excludes display:none)
    await page.getByRole('button', { name: 'Toggle theme' }).first().click()

    await expect(htmlEl).toHaveClass(/dark/)

    // Reload and check persistence
    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('locale switch to Chinese adds /zh prefix', async ({ page }) => {
    // getByRole already filters hidden elements, so .first() gets the visible one
    await page.getByRole('button', { name: '中文' }).first().click()

    await expect(page).toHaveURL(/\/zh/)

    // Verify Chinese content is present (use page title or main content, not hidden nav)
    await expect(page.locator('main, #main-content').getByText(/开发者|摄影师|首页/).first()).toBeVisible({ timeout: 10000 })
  })

  test('locale switch back to English removes /zh prefix', async ({ page }) => {
    await page.goto('/zh')

    await page.getByRole('button', { name: 'English' }).first().click()

    await expect(page).not.toHaveURL(/\/zh/)

    // Verify English content is present
    await expect(page.locator('main, #main-content').getByText(/Developer|Photographer/).first()).toBeVisible({ timeout: 10000 })
  })
})
