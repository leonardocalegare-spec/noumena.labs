import { expect, test } from '@playwright/test'

test('carrega sem rolagem horizontal ou erros no console', async ({ page }) => {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /tecnologia certa/i })).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  expect(errors).toEqual([])
})

test('navega pelas evidências do projeto', async ({ page }) => {
  await page.goto('/#projetos')
  await expect(page.getByText('01 / 03')).toBeVisible()
  await page.getByRole('button', { name: 'Próxima evidência visual' }).click()
  await expect(page.getByText('02 / 03')).toBeVisible()
})

test('menu móvel abre, fecha e devolve o foco', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Fluxo exclusivo do menu móvel')
  await page.goto('/')

  const menu = page.getByRole('button', { name: 'Abrir menu' })
  await menu.click()
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})
