import { expect, test } from '@playwright/test'

test('carrega sem rolagem horizontal ou erros no console', async ({ page }) => {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await expect(page.locator('.hero h1')).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    .toBe(true)
  expect(errors).toEqual([])
})

test('apresenta uma proposta ampla e direta na abertura', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: 'Seu negócio pode vender melhor, trabalhar com mais organização e tomar decisões com clareza.',
    }),
  ).toBeVisible()
  await expect(page.locator('.hero .eyebrow')).toHaveCount(0)
  await expect(page.locator('.hero-text')).toHaveCount(0)
  await expect(page.locator('.hero-copy')).not.toContainText('—')
})

test('organiza a proposta comercial antes do conteúdo editorial', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#inicio + #solucoes')).toHaveCount(1)
  await expect(page.locator('#solucoes + #projetos')).toHaveCount(1)
  await expect(page.locator('#projetos + #faq')).toHaveCount(1)
  await expect(page.locator('#processo')).toHaveCount(0)
  await expect(page.locator('#faq + #cadernos')).toHaveCount(1)
  await expect(page.locator('#contato')).toHaveCount(0)
})

test('leva os principais convites diretamente para o WhatsApp', async ({ page }) => {
  await page.goto('/')

  const heroAction = page.locator('.hero-actions').getByRole('link', { name: 'Conversar sobre meu projeto' })
  const headerAction = page.locator('.site-header .nav-cta')

  for (const action of [heroAction, headerAction]) {
    await expect(action).toHaveAttribute('href', /^https:\/\/wa\.me\/5511918218635\?text=/)
    await expect(action).toHaveAttribute('target', '_blank')
    await expect(action).toHaveAttribute('rel', 'noreferrer')
  }
})

test('inicia as soluções diretamente pela proposta comercial', async ({ page }) => {
  await page.goto('/#solucoes')

  await expect(page.locator('#solucoes .section-heading')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Veja como posso ajudar o seu negócio.' })).toBeVisible()
  await expect(page.locator('#solucoes .section-heading > p')).toHaveCount(0)
  await expect(page.locator('.commercial-principle')).toHaveCount(0)
})

test('apresenta os serviços em páginas navegáveis', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#solucoes')

  const region = page.getByRole('region', { name: /veja como posso ajudar o seu negócio/i })
  const previous = region.getByRole('button', { name: 'Ver categorias anteriores' })
  const next = region.getByRole('button', { name: 'Ver próximas categorias' })

  await expect(region.locator('.service-card')).toHaveCount(3)
  await expect(region).toContainText('Sites e catálogos')
  await expect(region).toContainText('Planilhas e automações')
  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await expect(region.locator('.services-carousel-count')).toHaveText('3 de 4 categorias')

  await next.click()
  await expect(region).toContainText('Suporte e manutenção')
  await expect(region).toContainText('Não encontrou o que precisa?')
  await expect(previous).toBeEnabled()
  await expect(next).toBeDisabled()
  await expect(region.locator('.services-carousel-count')).toHaveText('4 de 4 categorias')
})

test('mantém os contatos fora dos cards de serviços', async ({ page }) => {
  await page.goto('/#solucoes')
  await expect(page.locator('.service-card').first()).toBeVisible()
  await expect(page.locator('.service-card a')).toHaveCount(0)
  await expect(page.locator('.hero-actions .button').first()).toHaveAttribute('href', /^https:\/\/wa\.me\//)
  await expect(page.locator('.brand-contact').getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\//,
  )
})

for (const viewport of [
  { width: 1440, height: 900, visible: 3 },
  { width: 1024, height: 900, visible: 3 },
  { width: 768, height: 900, visible: 2 },
  { width: 390, height: 844, visible: 1 },
  { width: 320, height: 720, visible: 1 },
]) {
  test(`mantém o carrossel íntegro em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#solucoes')

    const carousel = page.locator('.services-carousel')
    await expect(carousel.locator('.service-card')).toHaveCount(viewport.visible)
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
      .toBe(true)

    for (const button of await carousel.getByRole('button').all()) {
      const box = await button.boundingBox()
      expect(box).not.toBeNull()
      expect(box.width).toBeGreaterThanOrEqual(44)
      expect(box.height).toBeGreaterThanOrEqual(44)
    }
  })
}

test('mantém navegação válida ao redimensionar e usar teclado', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#solucoes')

  const carousel = page.locator('.services-carousel')
  const next = carousel.getByRole('button', { name: 'Ver próximas categorias' })
  await next.focus()
  await page.keyboard.press('Enter')
  await expect(carousel.locator('[data-services-announcement]')).toHaveText('Categorias 4 a 4 de 4')

  await page.setViewportSize({ width: 768, height: 900 })
  await expect(carousel.locator('.service-card')).toHaveCount(2)
  await expect(carousel.locator('.services-carousel-count')).toHaveText('4 de 4 categorias')
  await expect(next).toBeDisabled()
})

test('aceita gesto horizontal no celular e preserva a rolagem vertical', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#solucoes')

  const viewport = page.locator('.services-carousel-viewport')
  await viewport.scrollIntoViewIfNeeded()
  const box = await viewport.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.8, box.y + 180)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width * 0.2, box.y + 184, { steps: 6 })
  await page.mouse.up()

  await expect(page.locator('.services-carousel-count')).toHaveText('2 de 4 categorias')
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    .toBe(true)
})

test('remove o deslocamento do carrossel com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#solucoes')
  await page.locator('[data-services-next]').click()
  await expect(page.locator('.services-carousel-page')).toHaveCSS('animation-name', 'none')
})

test('apresenta o case como problema, solução, estratégia e entrega', async ({ page }) => {
  await page.goto('/#projetos')
  const project = page.locator('.project-card')

  await expect(project.locator('.case-sequence > div').nth(0)).toContainText('Desafio')
  await expect(project.locator('.case-sequence > div').nth(1)).toContainText('Solução entregue')
  await expect(project.locator('.case-sequence > div').nth(2)).toContainText('Estratégia')
  await expect(project.locator('.case-sequence > div').nth(3)).toContainText('Entrega')
  await expect(project.getByRole('link', { name: 'Abrir projeto publicado' })).toBeVisible()
  await expect(project.getByRole('link', { name: 'Conversar sobre um projeto parecido' })).toBeVisible()
})

test('mantém os cabeçalhos das seções sem descrições auxiliares', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#cadernos')).toBeAttached()

  await expect(page.locator('#projetos .project-heading > p')).toHaveCount(0)
  await expect(page.locator('#projetos .project-heading h2')).toHaveText('Veja como uma necessidade vira uma solução digital.')
  await expect(page.locator('#faq .faq-description')).toHaveText('Entenda como funciona antes de contratar.')
  await expect(page.locator('#cadernos .section-heading > p')).toHaveCount(0)
})

test('remove a seção de processo e seu item de navegação', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#cadernos')).toBeAttached()

  await expect(page.locator('#processo')).toHaveCount(0)
  await expect(page.locator('.nav a[href="#processo"]')).toHaveCount(0)
})

test('mantém o título comercial sem coluna vazia no tablet', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto('/#solucoes')

  const heading = page.locator('#solucoes .section-heading')
  await expect(heading.getByRole('heading', { name: 'Veja como posso ajudar o seu negócio.' })).toBeVisible()
  await expect(heading.locator(':scope > p')).toHaveCount(0)
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    .toBe(true)
})

test('navega pelas evidências do projeto', async ({ page }) => {
  await page.goto('/#projetos')
  await expect(page.getByText('01 / 03')).toBeVisible()
  await page.getByRole('button', { name: 'Evidência visual anterior' }).click()
  await expect(page.getByText('03 / 03')).toBeVisible()
  await expect(page.locator('.project-slide')).toHaveClass(/slide-previous/)
  await page.getByRole('button', { name: 'Próxima evidência visual' }).click()
  await expect(page.getByText('01 / 03')).toBeVisible()
  await expect(page.locator('.project-slide')).toHaveClass(/slide-next/)
})

test('mantém conteúdo e navegação coerentes ao rolar', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Estado ativo da navegação é exibido no desktop')
  await page.goto('/#projetos')

  await expect(page.locator('#projetos .section-label')).toContainText('02 UM PROJETO NA PRÁTICA')
  await expect(page.getByRole('heading', { name: 'Rede Credenciada Parkaz' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Projeto', exact: true })).toHaveAttribute('aria-current', 'location')
})

test('preserva o conteúdo com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const solutionsHeading = page.getByRole('heading', {
    name: /veja como posso ajudar o seu negócio/i,
  })
  await solutionsHeading.scrollIntoViewIfNeeded()
  await expect(solutionsHeading).toBeVisible()
})

test('destaca o estudo mais recente na página inicial', async ({ page }) => {
  await page.goto('/')

  const previewHeading = page.getByRole('heading', {
    name: 'Do componente ao diagnóstico: o que aprendi sobre suporte de TI',
  })
  await previewHeading.scrollIntoViewIfNeeded()
  await expect(previewHeading).toBeVisible()
  await expect(page.locator('.cadernos-preview .article-card')).toHaveCount(1)
  await expect(page.locator('.cadernos-preview .article-card.featured .content-cover--support')).toBeVisible()
  await expect(page.locator('.cadernos-preview .preview-empty')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Explorar todos os Cadernos' })).toHaveAttribute('href', '/cadernos/')
  await expect(page.locator('#faq + #cadernos')).toHaveCount(1)
})

test('oferece a marca e os contatos em um encerramento centralizado', async ({ page }) => {
  await page.goto('/#sobre')
  const contact = page.locator('.brand-contact')
  const linkedin = contact.getByRole('link', { name: 'LinkedIn', exact: true })
  const whatsapp = contact.getByRole('link', { name: 'WhatsApp' })

  await expect(contact).toBeVisible()
  await expect(contact.locator('.brand-contact-mark')).toBeVisible()
  await expect(page.locator('.founder-copy')).toHaveCount(0)
  await expect(linkedin).toBeVisible()
  await expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/company/noumena-labs-tecnologia/')
  await expect(linkedin).toHaveAttribute('target', '_blank')
  await expect(linkedin).toHaveAttribute('rel', 'noreferrer')
  await expect(linkedin.locator('svg')).toBeVisible()
  await expect(whatsapp).toBeVisible()
  await expect(whatsapp).toHaveAttribute('href', /^https:\/\/wa\.me\/5511918218635\?text=/)
  await expect(whatsapp).toHaveAttribute('target', '_blank')
  await expect(whatsapp).toHaveAttribute('rel', 'noreferrer')
  await expect(whatsapp.locator('svg')).toBeVisible()

  const markBox = await contact.locator('.brand-contact-mark').boundingBox()
  expect(markBox).not.toBeNull()
  expect(Math.abs(markBox.x + markBox.width / 2 - (await page.evaluate(() => window.innerWidth)) / 2)).toBeLessThan(2)
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

  await menu.click()
  await expect(page.locator('body')).toHaveClass(/menu-open/)
  await page.setViewportSize({ width: 1200, height: 900 })
  await expect(page.locator('body')).not.toHaveClass(/menu-open/)
  await expect(page.locator('.menu-button')).toHaveAttribute('aria-expanded', 'false')
})

test('contato móvel complementa as ações sem duplicar o contato visível', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Fluxo exclusivo do contato móvel')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const mobileContact = page.getByRole('link', { name: 'Conversar com Leonardo pelo WhatsApp' })
  await expect(mobileContact).toBeHidden()
  await page.getByRole('heading', { name: 'Sites e catálogos' }).scrollIntoViewIfNeeded()
  await expect(mobileContact).toBeHidden()
  await page.getByRole('heading', { name: 'Tire suas dúvidas' }).scrollIntoViewIfNeeded()
  await expect(mobileContact).toBeVisible()
  await page.locator('.brand-contact').scrollIntoViewIfNeeded()
  await expect(mobileContact).toBeHidden()
})

test('contato móvel não bloqueia as ações do hero em telas compactas', async ({ page, isMobile }) => {
  test.skip(isMobile, 'A verificação controla viewports compactas no projeto desktop')
  const overlapAreas = []

  for (const viewport of [
    { width: 320, height: 720 },
    { width: 390, height: 720 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await expect(page.locator('.hero h1')).toBeVisible()

    const overlapArea = await page.evaluate(() => {
      const contact = document.querySelector('.mobile-contact')
      const actions = document.querySelector('.hero-actions')
      if (!contact) return 0
      const contactRect = contact.getBoundingClientRect()
      const actionsRect = actions.getBoundingClientRect()
      const overlapWidth = Math.max(
        0,
        Math.min(contactRect.right, actionsRect.right) - Math.max(contactRect.left, actionsRect.left),
      )
      const overlapHeight = Math.max(
        0,
        Math.min(contactRect.bottom, actionsRect.bottom) - Math.max(contactRect.top, actionsRect.top),
      )

      return overlapWidth * overlapHeight
    })

    overlapAreas.push({ viewport: `${viewport.width}x${viewport.height}`, area: overlapArea })
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Conversar com Leonardo pelo WhatsApp' })).toBeHidden()
  expect(overlapAreas).toEqual([
    { viewport: '320x720', area: 0 },
    { viewport: '390x720', area: 0 },
  ])
})

test('indicador decorativo do hero não recorta nem sobrepõe o conteúdo no tablet', async ({ page, isMobile }) => {
  test.skip(isMobile, 'A verificação controla o viewport de tablet no projeto desktop')
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto('/')

  const indicator = page.locator('.hero-visual .card-top')
  const box = await indicator.boundingBox()
  const copyBox = await page.locator('.hero-copy').boundingBox()

  const overlapArea =
    box && copyBox
      ? Math.max(0, Math.min(box.x + box.width, copyBox.x + copyBox.width) - Math.max(box.x, copyBox.x)) *
        Math.max(0, Math.min(box.y + box.height, copyBox.y + copyBox.height) - Math.max(box.y, copyBox.y))
      : 0

  expect(box === null || (box.x >= 0 && box.x + box.width <= 768)).toBe(true)
  expect(overlapArea).toBe(0)
})

test('mantém o núcleo orbital visível e sem overflow nos viewports principais', async ({ page, isMobile }) => {
  test.skip(isMobile, 'A verificação controla viewports específicas no projeto desktop')

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 320, height: 720 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')

    const core = await page.locator('.hero-visual .core').boundingBox()
    expect(core).not.toBeNull()
    expect(core.x).toBeGreaterThanOrEqual(0)
    expect(core.x + core.width).toBeLessThanOrEqual(viewport.width)
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
      .toBe(true)

    const status = page.locator('.hero-visual .card-top')
    if (viewport.width >= 981) await expect(status).toBeVisible()
    else await expect(status).toBeHidden()
  }
})

test('oferece uma composição orbital estática com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const animationNames = await page
    .locator('.hero-visual, .hero-visual *')
    .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName))
  expect(animationNames.every((name) => name === 'none')).toBe(true)
  await expect(page.locator('.hero-visual .core')).toBeVisible()
})

test('abre os Cadernos e preserva a navegação editorial', async ({ page, isMobile }) => {
  await page.goto('/cadernos/')

  await expect(page.getByRole('heading', { name: /cadernos noumena/i })).toBeVisible()
  if (isMobile) await page.getByRole('button', { name: 'Abrir menu' }).click()
  await expect(page.getByRole('link', { name: 'Cadernos', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('.noumena-dialogue')).toBeVisible()
  await expect(page.locator('.article-card.featured .content-cover--data')).toBeVisible()
  await expect(page.locator('.article-card.featured').getByText('ESTUDO', { exact: true })).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    .toBe(true)
})

test('renderiza a capa autoral do estudo de Suporte de TI', async ({ page }) => {
  await page.goto('/cadernos/do-componente-ao-diagnostico/')

  await expect(
    page.getByRole('heading', { name: 'Do componente ao diagnóstico: o que aprendi sobre suporte de TI' }),
  ).toBeVisible()
  await expect(page.locator('.article-hero-meta').getByText('EST/002', { exact: true })).toBeVisible()
  await expect(page.getByText('#suporte de TI', { exact: true })).toBeVisible()
  await expect(page.getByRole('complementary', { name: 'Nesta página' })).toBeVisible()
  await expect(page.locator('.article-media .content-cover--support')).toBeVisible()
  await expect(page.locator('.article-media .support-diagnostic')).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    .toBe(true)
})

test('renderiza um rascunho editorial sem comentários ou vídeo fictício', async ({ page }) => {
  await page.goto('/cadernos/primeiro-video/')

  await expect(page.getByRole('heading', { name: 'Prepare seu primeiro vídeo autoral' })).toBeVisible()
  await expect(page.getByText('RASCUNHO LOCAL · NÃO SERÁ PUBLICADO')).toBeVisible()
  await expect(page.getByText('Adicione a URL do YouTube antes de publicar este vídeo.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Comece pelo propósito' })).toBeVisible()
  await expect(page.getByRole('region', { name: /comentários/i })).toHaveCount(0)
})

test('renderiza o estudo publicado de análise de dados com sua capa editorial', async ({ page }) => {
  await page.goto('/cadernos/do-dado-a-decisao/')

  await expect(page.getByRole('heading', { name: 'Do dado à decisão: o que aprendi sobre análise de dados' })).toBeVisible()
  await expect(page.getByText('RASCUNHO LOCAL · NÃO SERÁ PUBLICADO')).toHaveCount(0)
  await expect(page.locator('.article-hero-meta').getByText('EST/003', { exact: true })).toBeVisible()
  await expect(page.locator('.article-media .content-cover--data')).toBeVisible()
  await expect(page.locator('.article-media .data-pipeline')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Dados não falam sozinhos' })).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    .toBe(true)
})

test('apresenta uma página editorial para endereços inexistentes', async ({ page }) => {
  await page.goto('/cadernos/registro-inexistente/')

  await expect(page.getByRole('heading', { name: 'Esse registro não existe.' })).toBeVisible()
  const skipLink = page.getByRole('link', { name: 'Pular para o conteúdo' })
  await skipLink.focus()
  await expect(skipLink).toBeFocused()
  await expect(page.getByRole('link', { name: /explorar os cadernos/i })).toBeVisible()
})

test('mantém os Cadernos estáveis em tablet e 320 px', async ({ page, isMobile }) => {
  test.skip(isMobile, 'A verificação controla viewports específicas no projeto desktop')

  for (const viewport of [
    { width: 768, height: 900 },
    { width: 320, height: 720 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/cadernos/')
    await expect(page.getByRole('heading', { name: /cadernos noumena/i })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible()
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
      .toBe(true)

    const filterHeights = await page
      .locator('.article-filters button')
      .evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().height))
    expect(filterHeights.every((height) => height >= 44)).toBe(true)
    await expect
      .poll(() => page.locator('.article-filters').evaluate((filters) => filters.scrollWidth <= filters.clientWidth))
      .toBe(true)
  }
})
