import assert from 'node:assert/strict'
import test from 'node:test'
import {
  contactLinks,
  faqItems,
  generalProjectLink,
  otherChallengesService,
  projects,
  servicePackages,
  services,
} from '../src/data/site.js'

const whatsappNumber = '5511918218635'

test('mantém somente a Rede Credenciada Parkaz na vitrine', () => {
  assert.equal(projects.length, 1)
  assert.equal(projects[0].title, 'Rede Credenciada Parkaz')
  assert.equal(projects[0].slides.length, 3)
  assert.deepEqual(
    projects[0].story.map(({ label }) => label),
    ['Desafio', 'Estratégia', 'Entrega'],
  )
  assert.ok(
    projects[0].slides.every(
      ({ image, label, description, width, height }) =>
        image.endsWith('.png') && label && description && width > 0 && height > 0,
    ),
  )
  assert.equal(projects[0].liveUrl, 'https://redecredenciadaparkaz.vercel.app/')
})

test('todos os contatos usam o número oficial do WhatsApp', () => {
  const links = [
    generalProjectLink,
    ...contactLinks.map(({ href }) => href),
    ...services.flatMap(({ offers }) => offers.map(({ href }) => href)),
    ...servicePackages.map(({ href }) => href),
    otherChallengesService.href,
  ]
  assert.ok(links.every((href) => href.startsWith(`https://wa.me/${whatsappNumber}`)))
})

test('apresenta quatro categorias na ordem comercial aprovada', () => {
  assert.deepEqual(
    services.map(({ title }) => title),
    ['Sites e catálogos', 'Presença local e atendimento', 'Planilhas e automações', 'Suporte e manutenção'],
  )
  assert.ok(services.every(({ description, offers }) => description.length > 40 && offers.length === 3))
  assert.equal(otherChallengesService.title, 'Precisa de um sistema ou integração específica?')
  assert.equal(otherChallengesService.isFuture, true)
})

test('FAQ cobre as dúvidas essenciais antes do contato', () => {
  assert.ok(faqItems.length >= 4)
  assert.ok(faqItems.every(({ question, answer }) => question.length > 10 && answer.length > 25))
})

test('cada serviço inicia uma conversa específica', () => {
  const offers = [...services.flatMap(({ offers }) => offers), ...servicePackages, otherChallengesService]
  const messages = offers.map(({ href }) => new URL(href).searchParams.get('text'))
  assert.equal(new Set(messages).size, offers.length)
  assert.match(messages[0], /página profissional/i)
  assert.match(messages[3], /WhatsApp Business/)
  assert.match(messages[6], /planilha/i)
  assert.match(messages[9], /suporte/i)
  assert.match(messages.at(-1), /necessidade|desafio/i)
})

test('FAQ prioriza as dúvidas comerciais e preserva a origem do nome', () => {
  assert.deepEqual(
    faqItems.map(({ question }) => question),
    [
      'Como funciona o primeiro contato?',
      'Já preciso ter um escopo pronto?',
      'O que está incluído no preço?',
      'Domínio, hospedagem e ferramentas estão incluídos?',
      'Preciso contratar uma mensalidade?',
      'E se eu precisar de um sistema personalizado?',
      'O atendimento é remoto?',
      'O que significa o nome Noumena?',
    ],
  )
  assert.match(faqItems.at(-1).answer, /meu gosto pela leitura de Immanuel Kant/)
  assert.match(faqItems.at(-1).answer, /antes de construir uma solução/)
})
