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
      ['pagina-profissional', 597, 'fixed'],
      ['catalogo-online', 897, 'from'],
      ['site-institucional', 1297, 'from'],
      ['whatsapp-business', 247, 'fixed'],
      ['perfil-google', 247, 'fixed'],
      ['clientes-crm', 797, 'from'],
      ['planilha-controle', 497, 'from'],
      ['automacao-tarefa', 997, 'from'],
      ['painel-indicadores', 897, 'from'],
      ['suporte-remoto', 120, 'fixed'],
      ['formatacao', 297, 'from'],
      ['manutencao-site', 129, 'monthly'],
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
      { type: 'fixed', amount: 797 },
      { type: 'from', amount: 1997 },
    ],
  )
  assert.deepEqual(site.otherChallengesService.price, { type: 'quote' })
})
