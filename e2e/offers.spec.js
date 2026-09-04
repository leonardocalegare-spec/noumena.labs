import { expect, test } from '@playwright/test'

test('mostra os preços no card e abre somente os serviços da categoria', async ({ page }) => {
  await page.goto('/#solucoes')
  const card = page.locator('.service-card').first()
  await expect(card).toContainText('Página profissional')
  await expect(card).toContainText('A partir de R$ 890')
  await expect(card).toContainText('Catálogo online')
  await expect(card).toContainText('A partir de R$ 1.490')
  await card.getByRole('button', { name: 'Ver serviços de Sites e catálogos' }).click()
  const view = page.getByRole('region', { name: 'Sites e catálogos', exact: true })
  await expect(view.getByRole('heading', { name: 'Sites e catálogos', exact: true })).toBeFocused()
  await expect(view.locator('.service-offer')).toHaveCount(3)
  await expect(view).not.toContainText('WhatsApp Business configurado')
  const offer = view.locator('.service-offer').first()
  await expect(offer).toContainText('Até cinco seções')
  await offer.getByText('Condições e custos', { exact: true }).click()
  await expect(offer).toContainText('Domínio e hospedagem pagos separadamente')
  const link = offer.getByRole('link', { name: 'Quero minha página' })
  const message = new URL(await link.getAttribute('href')).searchParams.get('text')
  expect(message).toContain('Página profissional')
  expect(message).toContain('A partir de R$ 890')
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', 'noreferrer')
  await view.getByRole('button', { name: 'Voltar às categorias' }).click()
  await expect(page.getByRole('button', { name: 'Ver serviços de Sites e catálogos' })).toBeFocused()
  const header = await page.locator('.site-header').boundingBox()
  const controls = await page.locator('.services-carousel-controls').boundingBox()
  expect(controls.y).toBeGreaterThanOrEqual(header.y + header.height)
})

test('volta à categoria correta após redimensionar os detalhes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#solucoes')
  await page.getByRole('button', { name: 'Ver próximas categorias' }).click()
  await page.getByRole('button', { name: 'Ver serviços de Suporte e manutenção' }).click()
  const view = page.getByRole('region', { name: 'Suporte e manutenção', exact: true })
  await expect(view).toContainText('R$ 150')
  await expect(view).toContainText('por sessão de até 1 hora')
  await expect(view).toContainText('R$ 190/mês')
  await page.setViewportSize({ width: 320, height: 720 })
  await view.getByRole('button', { name: 'Voltar às categorias' }).click()
  await expect(page.getByRole('button', { name: 'Ver serviços de Suporte e manutenção' })).toBeFocused()
  await expect(page.locator('.services-carousel-count')).toHaveText('04–04 / 04')
})

for (const width of [1440, 768, 390, 320]) {
  test(`categorias e detalhes cabem em ${width}px com alvos acessíveis`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/#solucoes')
    await expect(page.locator('.service-card').first()).toBeVisible()
    for (const category of [
      'Sites e catálogos',
      'Presença local e atendimento',
      'Planilhas e automações',
      'Suporte e manutenção',
    ]) {
      const open = page.getByRole('button', { name: `Ver serviços de ${category}`, exact: true })
      if (!(await open.count())) {
        await page.getByRole('button', { name: 'Ver próximas categorias' }).click()
        await expect(open).toBeAttached()
      }
      await open.focus()
      await page.keyboard.press('Enter')
      const view = page.getByRole('region', { name: category, exact: true })
      await expect(view.locator('.service-offer')).toHaveCount(3)
      await view.locator('.service-offer summary').last().click()
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      const sizes = await view.locator('button, a, summary').evaluateAll((elements) =>
        elements.map((element) => {
          const { width, height } = element.getBoundingClientRect()
          return { width, height }
        }),
      )
      expect(sizes.every(({ width, height }) => width >= 44 && height >= 44)).toBe(true)
      await view.getByRole('button', { name: 'Voltar às categorias' }).click()
      await expect(open).toBeFocused()
    }
  })
}

test('pacotes mostram preço, escopo e custos e projetos específicos ficam sob orçamento', async ({ page }) => {
  await page.goto('/#solucoes')
  const packages = page.getByRole('region', { name: 'Prefere uma entrega combinada?' })
  await expect(packages).toContainText('R$ 1.090')
  await expect(packages).toContainText('A partir de R$ 3.490')
  await packages.getByText('Negócio Online', { exact: true }).click()
  await expect(packages).toContainText('Até cinco páginas')
  await expect(packages).toContainText('Domínio e hospedagem pagos separadamente')
  const custom = page.locator('.service-custom')
  await expect(custom).toContainText('Sob orçamento')
  await expect(custom.getByRole('link')).toHaveAttribute('href', /^https:\/\/wa.me\/5511918218635\?text=/)
})
