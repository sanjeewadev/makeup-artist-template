import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the editorial homepage shell', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main#main-content')).toBeVisible()
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('renders the portfolio experience', async ({ page }) => {
    await page.goto('http://localhost:3000/portfolio')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('A study in beauty')
    await expect(page.locator('main#main-content')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})
