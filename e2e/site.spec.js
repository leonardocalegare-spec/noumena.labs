import { expect, test } from '@playwright/test'

test('carrega sem rolagem horizontal ou erros no console', async ({ page }) => {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /transformamos necessidades do seu negócio/i })).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    .toBe(true)
  expect(errors).toEqual([])
})

test('oferece um guia opcional imediatamente depois do hero', async ({ page }) => {
  await page.goto('/')

  const hero = page.locator('#inicio')
  const guide = page.getByRole('region', { name: 'O que você precisa resolver?' })
  await expect(guide).toBeVisible()
  await expect(page.locator('#inicio + #guia-projeto')).toHaveCount(1)
  await expect(guide.getByRole('button')).toHaveCount(4)
  await expect(guide.getByRole('link', { name: 'Prefiro explorar as soluções' })).toHaveAttribute('href', '#solucoes')
  await expect(hero).toBeVisible()
})

test('organiza a proposta comercial antes do conteúdo editorial', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#inicio + #guia-projeto')).toHaveCount(1)
  await expect(page.locator('#guia-projeto + #solucoes')).toHaveCount(1)
  await expect(page.locator('#solucoes + #projetos')).toHaveCount(1)
  await expect(page.locator('#projetos + #processo')).toHaveCount(1)
  await expect(page.locator('#processo + #faq')).toHaveCount(1)
  await expect(page.locator('#faq + #contato')).toHaveCount(1)
  await expect(page.locator('#contato + #cadernos')).toHaveCount(1)
})

test('inicia as soluções diretamente pela proposta comercial', async ({ page }) => {
  await page.goto('/#solucoes')

  await expect(page.locator('#solucoes .section-heading')).toBeVisible()
  await expect(page.locator('.commercial-principle')).toHaveCount(0)
})

test('apresenta ofertas comparáveis e mantém outros desafios como alternativa', async ({ page }) => {
  await page.goto('/#solucoes')
  const cards = page.locator('.service-card:not(.future-card)')
  await expect(cards).toHaveCount(2)
  for (const card of await cards.all()) {
    await expect(card.getByText('Para quem', { exact: true })).toBeVisible()
    await expect(card.locator('.service-fit')).toBeVisible()
    await expect(card.getByText('Quando ajuda', { exact: true })).toBeVisible()
    await expect(card.locator('.service-problem')).toBeVisible()
    await expect(card.getByText('Você recebe')).toBeVisible()
    await expect(card.locator('li')).toHaveCount(3)
  }
  await expect(page.locator('.future-card')).toContainText('OUTROS DESAFIOS')
  await expect(page.getByRole('link', { name: 'Apresentar meu desafio' })).toBeVisible()
})

test('apresenta o case como problema, mudança, estratégia e entrega', async ({ page }) => {
  await page.goto('/#projetos')
  const project = page.locator('.project-card')

  await expect(project.locator('.case-sequence > div').nth(0)).toContainText('Desafio')
  await expect(project.locator('.case-sequence > div').nth(1)).toContainText('O que foi construído')
  await expect(project.locator('.case-sequence > div').nth(2)).toContainText('Estratégia')
  await expect(project.locator('.case-sequence > div').nth(3)).toContainText('Entrega')
  await expect(project.getByRole('link', { name: 'Ver projeto publicado' })).toBeVisible()
  await expect(project.getByRole('link', { name: 'Quero construir algo assim' })).toBeVisible()
})

test('mostra somente a descrição ativa do processo', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await page.goto('/#processo')
  const understand = page.getByRole('button', { name: /01 entender/i })
  const build = page.getByRole('button', { name: /03 construir/i })

  await expect(understand).toHaveAttribute('aria-expanded', 'true')
  await expect(build).toHaveAttribute('aria-expanded', 'false')
  await expect(understand.locator('p')).toBeVisible()
  await expect
    .poll(() => understand.locator('p').evaluate((element) => element.clientHeight >= element.scrollHeight))
    .toBe(true)
  await expect(build.locator('p')).toBeHidden()
  await build.click()
  await expect(build).toHaveAttribute('aria-expanded', 'true')
  await expect(build.locator('p')).toBeVisible()
  await expect
    .poll(() => build.locator('p').evaluate((element) => element.clientHeight >= element.scrollHeight))
    .toBe(true)
  await expect(understand.locator('p')).toBeHidden()
})

test('mantém o título comercial legível no tablet', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto('/#solucoes')

  const heading = page.locator('#solucoes .section-heading')
  await expect.poll(() => heading.evaluate((element) => getComputedStyle(element).flexDirection)).toBe('column')
})

test('monta uma mensagem contextualizada em três escolhas rápidas', async ({ page }) => {
  await page.goto('/#guia-projeto')
  const guide = page.getByRole('region', { name: 'O que você precisa resolver?' })

  await guide.getByRole('button', { name: 'Quero apresentar melhor meu negócio' }).click()
  await expect(guide.getByRole('heading', { name: 'Como está a situação hoje?' })).toBeFocused()
  await guide.getByRole('button', { name: 'Dependo apenas das redes sociais' }).click()
  await expect(guide.getByRole('heading', { name: 'O que espera alcançar?' })).toBeFocused()
  await guide.getByRole('button', { name: 'Receber contatos pelo WhatsApp' }).click()

  const summaryHeading = guide.getByRole('heading', { name: 'Seu contexto está pronto' })
  await expect(summaryHeading).toBeFocused()
  await expect
    .poll(() =>
      summaryHeading.evaluate((heading) => {
        const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom
        const headingBounds = heading.getBoundingClientRect()
        return headingBounds.top >= headerBottom && headingBounds.bottom <= window.innerHeight
      }),
    )
    .toBe(true)

  const whatsapp = guide.getByRole('link', { name: 'Conversar no WhatsApp' })
  await expect(whatsapp).toBeVisible()
  const href = await whatsapp.getAttribute('href')
  const message = new URL(href).searchParams.get('text')
  expect(message).toContain('Preciso apresentar melhor meu negócio.')
  expect(message).toContain('Hoje dependo apenas das redes sociais.')
  expect(message).toContain('Quero começar a receber contatos pelo WhatsApp.')
})

test('orienta quem ainda não sabe sem abrir ou enviar o WhatsApp', async ({ page }) => {
  await page.goto('/#guia-projeto')
  const guide = page.getByRole('region', { name: 'O que você precisa resolver?' })

  await guide.getByRole('button', { name: 'Ainda não sei do que preciso' }).click()
  await expect(guide.getByRole('button', { name: 'Não consigo identificar o problema principal' })).toBeVisible()
  await expect(guide.getByRole('button', { name: 'Automatizar uma tarefa repetitiva' })).toHaveCount(0)
  await guide.getByRole('button', { name: 'Não consigo identificar o problema principal' }).click()
  await guide.getByRole('button', { name: 'Receber uma orientação inicial' }).click()

  await expect(page).toHaveURL(/#guia-projeto$/)
  await expect(guide.getByText(/ainda não sei qual solução preciso/i)).toBeVisible()
})

test('permite voltar, alterar uma resposta e recomeçar sem manter dependências antigas', async ({ page }) => {
  await page.goto('/#guia-projeto')
  const guide = page.getByRole('region', { name: 'O que você precisa resolver?' })

  await guide.getByRole('button', { name: 'Quero apresentar melhor meu negócio' }).click()
  await guide.getByRole('button', { name: 'Dependo apenas das redes sociais' }).click()
  await guide.getByRole('button', { name: 'Receber contatos pelo WhatsApp' }).click()
  await expect(guide.getByRole('heading', { name: 'Seu contexto está pronto' })).toBeFocused()
  await guide.getByRole('button', { name: 'Voltar' }).click()
  await guide.getByRole('button', { name: 'Voltar' }).click()

  const previous = guide.getByRole('button', { name: 'Dependo apenas das redes sociais' })
  await expect(previous).toHaveAttribute('aria-pressed', 'true')
  await guide.getByRole('button', { name: 'Minha página não explica bem a oferta' }).click()
  await guide.getByRole('button', { name: 'Apresentar minha oferta com clareza' }).click()

  await expect(guide.getByText(/minha página atual não explica bem a oferta/i)).toBeVisible()
  await expect(guide.getByText(/hoje dependo apenas das redes sociais/i)).toHaveCount(0)
  await guide.getByRole('button', { name: 'Recomeçar' }).click()
  await expect(guide.getByRole('button')).toHaveCount(4)
  await expect(guide.getByRole('progressbar', { name: 'Progresso do guia' })).toHaveAttribute('aria-valuenow', '1')
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

  await expect(page.getByRole('heading', { name: /um problema real, da análise à entrega/i })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Projeto', exact: true })).toHaveAttribute('aria-current', 'location')
})

test('preserva o conteúdo com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const guide = page.getByRole('region', { name: 'O que você precisa resolver?' })
  await guide.getByRole('button', { name: 'Quero apresentar melhor meu negócio' }).click()
  await expect(guide.getByRole('heading', { name: 'Como está a situação hoje?' })).toBeVisible()

  const reducedStyles = await guide
    .locator('.project-guide-choice')
    .first()
    .evaluate((element) => ({
      transitionDuration: getComputedStyle(element).transitionDuration,
      fillTransitionDuration: getComputedStyle(element, '::before').transitionDuration,
      stepAnimationName: getComputedStyle(element.closest('.project-guide-step')).animationName,
    }))
  expect(reducedStyles.transitionDuration).toBe('0s')
  expect(reducedStyles.fillTransitionDuration).toBe('0s')
  expect(reducedStyles.stepAnimationName).toBe('none')

  const solutionsHeading = page.getByRole('heading', { name: /dois caminhos principais para necessidades diferentes/i })
  await solutionsHeading.scrollIntoViewIfNeeded()
  await expect(solutionsHeading).toBeVisible()
})

test('mantém o guia acessível por teclado e estável em larguras críticas', async ({ page, isMobile }) => {
  test.skip(isMobile, 'A verificação controla viewports específicas no projeto desktop')
  test.setTimeout(60_000)

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 900 },
    { width: 390, height: 844 },
    { width: 320, height: 720 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/#guia-projeto')
    const guide = page.getByRole('region', { name: 'O que você precisa resolver?' })
    const choices = guide.locator('.project-guide-choice')
    expect(await choices.evaluateAll((items) => items.every((item) => item.getBoundingClientRect().height >= 44))).toBe(
      true,
    )
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
      .toBe(true)
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#guia-projeto')
  const firstChoice = page.getByRole('button', { name: 'Quero apresentar melhor meu negócio' })
  await firstChoice.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Como está a situação hoje?' })).toBeFocused()
  await expect(page.getByRole('progressbar', { name: 'Progresso do guia' })).toHaveAttribute('aria-valuenow', '2')
})

test('anima o preenchimento da escolha antes de avançar', async ({ page, isMobile }) => {
  test.skip(isMobile, 'A verificação usa um dispositivo com ponteiro e suporte a hover')

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#guia-projeto')
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
  await page.getByRole('button', { name: 'Quero apresentar melhor meu negócio' }).click()
  await expect(page.getByRole('heading', { name: 'Como está a situação hoje?' })).toBeFocused()
  const animatedChoice = page.getByRole('button', { name: 'Não tenho uma página' })
  await animatedChoice.hover()
  await expect.poll(() => animatedChoice.evaluate((element) => element.matches(':hover'))).toBe(true)
  await expect
    .poll(() => animatedChoice.evaluate((element) => getComputedStyle(element, '::before').transform))
    .toBe('matrix(1, 0, 0, 1, 0, 0)')
  await animatedChoice.click()
  await expect(page.locator('.project-guide-step')).toHaveClass(/is-leaving/, { timeout: 250 })
  await expect(page.getByRole('heading', { name: 'O que espera alcançar?' })).toBeFocused()
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
  await expect(page.locator('#contato + #cadernos')).toHaveCount(1)
})

test('oferece acesso seguro ao LinkedIn do fundador', async ({ page }) => {
  await page.goto('/#sobre')
  const linkedin = page.getByRole('link', { name: 'Ver perfil no LinkedIn' })

  await expect(linkedin).toBeVisible()
  await expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/leocalegare')
  await expect(linkedin).toHaveAttribute('target', '_blank')
  await expect(linkedin).toHaveAttribute('rel', 'noreferrer')
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
  await page.locator('#guia-projeto').evaluate((element) => {
    window.scrollTo({ top: element.offsetTop + 240, behavior: 'instant' })
  })
  await expect(page.getByRole('button', { name: 'Ainda não sei do que preciso' })).toBeVisible()
  await expect
    .poll(() =>
      page
        .locator('.hero-actions .button')
        .first()
        .evaluate((element) => element.getBoundingClientRect().bottom),
    )
    .toBeLessThanOrEqual(0)
  await page.waitForTimeout(300)
  await expect(mobileContact).toBeHidden()
  await page.getByRole('heading', { name: 'Landing pages' }).scrollIntoViewIfNeeded()
  await expect(mobileContact).toBeVisible()
  await page.getByRole('heading', { name: /conte o que precisa mudar no seu negócio/i }).scrollIntoViewIfNeeded()
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
    await expect(page.getByRole('heading', { name: /transformamos necessidades do seu negócio/i })).toBeVisible()

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

test('abre os Cadernos e preserva a navegação editorial', async ({ page, isMobile }) => {
  await page.goto('/cadernos/')

  await expect(page.getByRole('heading', { name: /cadernos noumena/i })).toBeVisible()
  if (isMobile) await page.getByRole('button', { name: 'Abrir menu' }).click()
  await expect(page.getByRole('link', { name: 'Cadernos', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('.noumena-dialogue')).toBeVisible()
  await expect(page.locator('.article-card.featured .content-cover--support')).toBeVisible()
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
