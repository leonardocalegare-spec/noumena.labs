import assert from 'node:assert/strict'
import test from 'node:test'
import { contactLinks, faqItems, generalProjectLink, projects, services } from '../src/data/site.js'

const whatsappNumber = '5511918218635'

test('mantém somente a Rede Credenciada Parkaz na vitrine', () => {
  assert.equal(projects.length, 1)
  assert.equal(projects[0].title, 'Rede Credenciada Parkaz')
  assert.equal(projects[0].slides.length, 3)
  assert.deepEqual(projects[0].story.map(([label]) => label), ['Desafio', 'Estratégia', 'Entrega'])
  assert.ok(projects[0].slides.every(({ image, label, description, width, height }) => image.endsWith('.png') && label && description && width > 0 && height > 0))
  assert.equal(projects[0].liveUrl, 'https://redecredenciadaparkaz.vercel.app/')
})

test('todos os contatos usam o número oficial do WhatsApp', () => {
  const links = [generalProjectLink, ...contactLinks.map(({ href }) => href), ...services.map(({ href }) => href)]
  assert.ok(links.every((href) => href.startsWith(`https://wa.me/${whatsappNumber}`)))
})

test('cada serviço inicia uma conversa específica', () => {
  const messages = services.map(({ href }) => decodeURIComponent(new URL(href).searchParams.get('text')))
  assert.match(messages[0], /landing page/i)
  assert.match(messages[1], /consultoria em TI/i)
  assert.notEqual(messages[0], messages[1])
})

test('FAQ cobre as dúvidas essenciais antes do contato', () => {
  assert.ok(faqItems.length >= 4)
  assert.ok(faqItems.every(({ question, answer }) => question.length > 10 && answer.length > 25))
})
