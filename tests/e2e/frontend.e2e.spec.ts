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

  test('renders the services page', async ({ page }) => {
    await page.goto('http://localhost:3000/services')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Beauty services')
    await expect(page.locator('footer')).toBeVisible()
  })

  test('renders the about page', async ({ page }) => {
    await page.goto('http://localhost:3000/about')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('renders the journal experience', async ({ page }) => {
    await page.goto('http://localhost:3000/journal')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Beauty, beyond')
    await expect(page.locator('footer')).toBeVisible()
  })

  test('renders the enquiry form', async ({ page }) => {
    await page.goto('http://localhost:3000/contact')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByLabel('Your name *')).toBeVisible()
    await expect(page.getByLabel('Email *')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Request availability' })).toBeVisible()
  })
})
