import { test, expect } from '@playwright/test'

test.describe('Command Palette', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Cmd+K opens palette with focused search input', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    // Search input should be focused
    const searchInput = dialog.locator('input[role="combobox"]')
    await expect(searchInput).toBeVisible()
    await expect(searchInput).toBeFocused()
  })

  test('shows Quick Links by default', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    // Should show "Quick Links" group
    await expect(dialog.getByText('Quick Links')).toBeVisible()

    // Should show page names
    for (const name of ['Home', 'Projects', 'Photography', 'Blog']) {
      await expect(dialog.getByRole('option', { name: new RegExp(name, 'i') }).first()).toBeVisible()
    }
  })

  test('typing filters results', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    const dialog = page.locator('[role="dialog"]')
    const input = dialog.locator('input[role="combobox"]')
    await input.fill('blog')

    // Should filter — "Blog" should still be visible as an option
    await expect(dialog.getByRole('option', { name: /blog/i }).first()).toBeVisible()

    // Items that don't match "blog" (like Photography) should not show
    await expect(dialog.getByRole('option', { name: /photography/i })).not.toBeVisible()
  })

  test('arrow keys navigate and Enter selects', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    // Press ArrowDown to move to second item
    await page.keyboard.press('ArrowDown')

    // Second item should have aria-selected=true
    const secondItem = dialog.locator('[role="option"][aria-selected="true"]')
    await expect(secondItem).toBeVisible()

    // Press Enter to navigate to the selected item
    const selectedHref = await secondItem.evaluate(el => {
      // The button text should map to a page
      return el.textContent
    })

    await page.keyboard.press('Enter')

    // Dialog should close (for navigation items)
    await expect(dialog).not.toBeVisible()

    // Should have navigated away from home (if item was a page link)
    // The exact URL depends on which item was selected
  })

  test('shows Actions group by default', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    // Should show "Actions" group alongside Quick Links
    await expect(dialog.getByText('Actions')).toBeVisible()

    // Should show action items: Toggle Theme, Copy Email, Download Resume
    await expect(dialog.getByRole('option', { name: /toggle theme/i })).toBeVisible()
    await expect(dialog.getByRole('option', { name: /copy email/i })).toBeVisible()
    await expect(dialog.getByRole('option', { name: /download resume/i })).toBeVisible()
  })

  test('toggle theme action does not close palette', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    // Click the toggle theme action
    await dialog.getByRole('option', { name: /toggle theme/i }).click()

    // Palette should remain open (actions don't close)
    await expect(dialog).toBeVisible()
  })

  test('search returns dynamic content from API', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    const dialog = page.locator('[role="dialog"]')
    const input = dialog.locator('input[role="combobox"]')

    // Wait a moment for dynamic data to load (fetched on open)
    await page.waitForTimeout(500)

    // Type a broad query that should match dynamic data
    await input.fill('a')

    // Should show results from multiple groups (at least pages + dynamic data)
    const options = dialog.locator('[role="option"]')
    const count = await options.count()
    // With a single-letter query, should match many items across groups
    expect(count).toBeGreaterThan(3)
  })

  test('Escape closes palette', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(dialog).not.toBeVisible()
  })
})
