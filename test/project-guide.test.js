import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildProjectGuideHref,
  buildProjectGuideMessage,
  projectGuidePaths,
  resolveProjectGuideSelection,
} from '../src/data/projectGuide.js'

test('oferece quatro necessidades com identificadores únicos', () => {
  assert.equal(projectGuidePaths.length, 4)
  assert.equal(new Set(projectGuidePaths.map(({ id }) => id)).size, 4)
  assert.deepEqual(
    projectGuidePaths.map(({ label }) => label),
    [
      'Quero apresentar melhor meu negócio',
      'Preciso de orientação em tecnologia',
      'Tenho outro problema para resolver',
      'Ainda não sei do que preciso',
    ],
  )
})

test('mantém identificadores únicos dentro de cada caminho', () => {
  projectGuidePaths.forEach(({ situations, goals }) => {
    assert.ok(situations.length >= 3)
    assert.equal(new Set(situations.map(({ id }) => id)).size, situations.length)
    assert.equal(goals.length, 3)
    assert.equal(new Set(goals.map(({ id }) => id)).size, goals.length)
  })
})

test('separa outro problema de uma necessidade ainda desconhecida', () => {
  const other = projectGuidePaths.find(({ id }) => id === 'other')
  const unsure = projectGuidePaths.find(({ id }) => id === 'unsure')

  assert.notEqual(other.situationPrompt, unsure.situationPrompt)
  assert.notDeepEqual(
    other.situations.map(({ label }) => label),
    unsure.situations.map(({ label }) => label),
  )
})

test('gera uma mensagem natural para uma necessidade reconhecida', () => {
  const ids = { needId: 'presence', situationId: 'social-only', goalId: 'whatsapp-contacts' }

  assert.equal(
    buildProjectGuideMessage(ids),
    [
      'Olá, Leonardo! Encontrei a Noumena Labs e gostaria de conversar sobre um projeto.',
      'Preciso apresentar melhor meu negócio. Hoje dependo apenas das redes sociais. Quero começar a receber contatos pelo WhatsApp.',
      'Gostaria de entender qual caminho faz mais sentido.',
    ].join('\n\n'),
  )
})

test('gera uma abertura própria para quem ainda não sabe do que precisa', () => {
  const message = buildProjectGuideMessage({
    needId: 'unsure',
    situationId: 'manual-time',
    goalId: 'understand-paths',
  })

  assert.match(message, /ainda não sei qual solução preciso/i)
  assert.match(message, /tarefas manuais/i)
  assert.match(message, /entender quais caminhos existem/i)
})

test('não gera mensagem ou URL com escolhas incompletas ou incompatíveis', () => {
  const incomplete = { needId: 'presence', situationId: 'social-only', goalId: null }
  const incompatible = { needId: 'presence', situationId: 'manual-time', goalId: 'whatsapp-contacts' }

  assert.equal(resolveProjectGuideSelection(incomplete), null)
  assert.equal(buildProjectGuideMessage(incompatible), null)
  assert.equal(buildProjectGuideHref(incomplete), null)
})

test('codifica todas as combinações válidas para o número oficial', () => {
  projectGuidePaths.forEach((path) => {
    path.situations.forEach((situation) => {
      path.goals.forEach((goal) => {
        const href = buildProjectGuideHref({ needId: path.id, situationId: situation.id, goalId: goal.id })
        const url = new URL(href)

        assert.equal(`${url.origin}${url.pathname}`, 'https://wa.me/5511918218635')
        assert.match(
          url.searchParams.get('text'),
          new RegExp(situation.sentence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        )
      })
    })
  })
})
