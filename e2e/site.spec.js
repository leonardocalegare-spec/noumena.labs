import { expect, test } from '@playwright/test'

test('carrega sem rolagem horizontal ou erros no console', async ({ page }) => {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /transformamos necessidades do seu negócio/i })).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  expect(errors).toEqual([])
})

test('navega pelas evidências do projeto', async ({ page }) => {
  await page.goto('/#projetos')
  await expect(page.getByText('01 / 03')).toBeVisible()
  await page.getByRole('button', { name: 'Próxima evidência visual' }).click()
  await expect(page.getByText('02 / 03')).toBeVisible()
})

test('mantém conteúdo e navegação coerentes ao rolar', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Estado ativo da navegação é exibido no desktop')
  await page.goto('/#projetos')

  await expect(page.getByRole('heading', { name: /um problema real, da análise à entrega/i })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Projeto', exact: true })).toHaveAttribute('aria-current', 'location')
})

test('preserva o conteúdo com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const solutionsHeading = page.getByRole('heading', { name: /dois caminhos para necessidades diferentes/i })
  await solutionsHeading.scrollIntoViewIfNeeded()
  await expect(solutionsHeading).toBeVisible()
})

test('destaca o primeiro Caderno publicado na página inicial', async ({ page }) => {
  await page.goto('/')

  const previewHeading = page.getByRole('heading', { name: 'Da necessidade ao teste: como projetar interfaces para pessoas' })
  await previewHeading.scrollIntoViewIfNeeded()
  await expect(previewHeading).toBeVisible()
  await expect(page.locator('.cadernos-preview .article-card.featured .content-cover--interaction')).toBeVisible()
  await expect(page.locator('.cadernos-preview .preview-empty')).toHaveCount(0)
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

test('contato móvel não cobre as seções de conteúdo', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Fluxo exclusivo do contato móvel')
  await page.goto('/')

  const mobileContact = page.getByRole('link', { name: 'Conversar com Leonardo pelo WhatsApp' })
  await expect(mobileContact).toBeVisible()
  await page.getByRole('heading', { name: /dois caminhos para necessidades diferentes/i }).scrollIntoViewIfNeeded()
  await expect(mobileContact).toBeHidden()
})

test('abre os Cadernos e preserva a navegação editorial', async ({ page, isMobile }) => {
  await page.goto('/cadernos/')

  await expect(page.getByRole('heading', { name: /cadernos noumena/i })).toBeVisible()
  if (isMobile) await page.getByRole('button', { name: 'Abrir menu' }).click()
  await expect(page.getByRole('link', { name: 'Cadernos', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('.noumena-dialogue')).toBeVisible()
  await expect(page.locator('.article-card.featured .content-cover--interaction')).toBeVisible()
  await expect(page.locator('.article-card.featured').getByText('ESTUDO', { exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
})

test('renderiza um rascunho editorial sem comentários ou vídeo fictício', async ({ page }) => {
  await page.goto('/cadernos/primeiro-video/')

  await expect(page.getByRole('heading', { name: 'Prepare seu primeiro vídeo autoral' })).toBeVisible()
  await expect(page.getByText('RASCUNHO LOCAL · NÃO SERÁ PUBLICADO')).toBeVisible()
  await expect(page.getByText('Adicione a URL do YouTube antes de publicar este vídeo.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Comece pelo propósito' })).toBeVisible()
  await expect(page.getByRole('region', { name: /comentários/i })).toHaveCount(0)
})

test('apresenta uma página editorial para endereços inexistentes', async ({ page }) => {
  await page.goto('/cadernos/registro-inexistente/')

  await expect(page.getByRole('heading', { name: 'Esse registro não existe.' })).toBeVisible()
  await expect(page.getByRole('link', { name: /explorar os cadernos/i })).toBeVisible()
})

test('mantém os Cadernos estáveis em tablet e 320 px', async ({ page, isMobile }) => {
  test.skip(isMobile, 'A verificação controla viewports específicas no projeto desktop')

  for (const viewport of [{ width: 768, height: 900 }, { width: 320, height: 720 }]) {
    await page.setViewportSize(viewport)
    await page.goto('/cadernos/')
    await expect(page.getByRole('heading', { name: /cadernos noumena/i })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)

    const filterHeights = await page.locator('.article-filters button').evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().height))
    expect(filterHeights.every((height) => height >= 44)).toBe(true)
    await expect.poll(() => page.locator('.article-filters').evaluate((filters) => filters.scrollWidth <= filters.clientWidth)).toBe(true)
  }
})
