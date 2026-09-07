import { expect, test } from '@playwright/test'

for (const width of [1440, 768, 390, 320]) {
  test(`FAQ agrupa perguntas e mantém uma resposta aberta em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/#faq')
    const faq = page.locator('#faq')
    await expect(faq.getByRole('heading', { name: 'Tire suas dúvidas' })).toBeVisible()
    for (const label of ['Para começar', 'Valores e condições', 'Entrega e atendimento']) {
      const button = faq.getByRole('button', { name: label, exact: true })
      await button.focus()
      await page.keyboard.press('Enter')
      await expect(button).toHaveAttribute('aria-pressed', 'true')
      await expect(faq.locator('details')).toHaveCount(4)
      await expect(faq.locator('details[open]')).toHaveCount(0)
      const questions = faq.locator('summary')
      await questions.first().focus()
      await page.keyboard.press('Enter')
      await expect(faq.locator('details[open]')).toHaveCount(1)
      await expect(faq.locator('details').first().locator('.faq-answer')).toBeVisible()
      await questions.nth(1).focus()
      await page.keyboard.press('Enter')
      await expect(faq.locator('details[open]')).toHaveCount(1)
      await expect(faq.locator('details').nth(1)).toHaveAttribute('open', '')
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      for (const target of await faq.locator('button, summary').all()) {
        const box = await target.boundingBox()
        expect(box.width).toBeGreaterThanOrEqual(44)
        expect(box.height).toBeGreaterThanOrEqual(44)
      }
    }
  })
}
