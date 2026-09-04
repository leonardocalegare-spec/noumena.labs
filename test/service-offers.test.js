import assert from 'node:assert/strict'
import test from 'node:test'
import * as site from '../src/data/site.js'

test('catálogo aprovado tem quatro categorias e doze ofertas com preço público', () => {
  assert.equal(site.services.length, 4)
  const offers = site.services.flatMap(({ offers }) => offers)
  assert.equal(offers.length, 12)
  assert.equal(new Set(offers.map(({ id }) => id)).size, 12)
  assert.deepEqual(
    offers.map(({ id, price }) => [id, price.amount, price.type]),
    [
      ['pagina-profissional', 890, 'from'],
      ['catalogo-online', 1490, 'from'],
      ['site-institucional', 2490, 'from'],
      ['whatsapp-business', 290, 'fixed'],
      ['perfil-google', 290, 'fixed'],
      ['clientes-crm', 1290, 'from'],
      ['planilha-controle', 990, 'from'],
      ['automacao-tarefa', 2190, 'from'],
      ['painel-indicadores', 2490, 'from'],
      ['suporte-remoto', 150, 'fixed'],
      ['formatacao', 390, 'from'],
      ['manutencao-site', 190, 'monthly'],
    ],
  )
})

test('ofertas e pacotes explicam escopo, custos externos e levam ao contato oficial', () => {
  assert.ok(site.services.every(({ offers }) => offers?.length === 3))
  const offers = [...site.services.flatMap(({ offers }) => offers), ...site.servicePackages]
  for (const offer of offers) {
    assert.equal(offer.includes.length, 3, offer.id)
    assert.ok(offer.conditions && offer.externalCosts && offer.description, offer.id)
    const url = new URL(offer.href)
    assert.equal(`${url.origin}${url.pathname}`, 'https://wa.me/5511918218635')
    assert.ok(url.searchParams.get('text').includes(offer.title), offer.id)
    assert.ok(
      url.searchParams.get('text').includes(String(offer.price.amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.')),
      offer.id,
    )
  }
  const maintenance = offers.find(({ id }) => id === 'manutencao-site')
  assert.match(new URL(maintenance.href).searchParams.get('text'), /\/mês/)
  assert.doesNotMatch(JSON.stringify(offers), /minimumPrice|costPerHour|internalCost|profitMargin/)
})

test('pacotes e projeto específico conservam os modelos comerciais aprovados', () => {
  assert.ok(Array.isArray(site.servicePackages))
  assert.deepEqual(
    site.servicePackages.map(({ price }) => price),
    [
      { type: 'fixed', amount: 1090 },
      { type: 'from', amount: 3490 },
    ],
  )
  assert.deepEqual(site.otherChallengesService.price, { type: 'quote' })
})
