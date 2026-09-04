import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildProjectGuideHref,
  buildProjectGuideMessage,
  getProjectGuideSituation,
  projectGuidePaths,
  resolveProjectGuideSelection,
} from '../src/data/projectGuide.js'

test('oferece seis necessidades reconhecíveis com identificadores únicos', () => {
  assert.equal(projectGuidePaths.length, 6)
  assert.equal(new Set(projectGuidePaths.map(({ id }) => id)).size, 6)
  assert.deepEqual(
    projectGuidePaths.map(({ label }) => label),
    [
      'Quero apresentar meu negócio e atender melhor',
      'Quero organizar tarefas e controles do negócio',
      'Preciso resolver um problema em computadores',
      'Quero entender melhor os dados do negócio',
      'Tenho outro problema para resolver',
      'Ainda não sei por onde começar',
    ],
  )
})

test('cada situação oferece exatamente três resultados próprios', () => {
  const situationIds = []
  const scopedGoalIds = []

  projectGuidePaths.forEach(({ situations }) => {
    assert.ok(situations.length >= 4)
    situations.forEach(({ id, goalPrompt, goals }) => {
      situationIds.push(id)
      assert.ok(goalPrompt.length > 20)
      assert.equal(goals.length, 3)
      assert.equal(new Set(goals.map((goal) => goal.id)).size, 3)
      goals.forEach((goal) => scopedGoalIds.push(`${id}:${goal.id}`))
    })
  })

  assert.equal(new Set(situationIds).size, situationIds.length)
  assert.equal(new Set(scopedGoalIds).size, scopedGoalIds.length)
})

test('mantém outro problema separado de uma necessidade desconhecida', () => {
  const other = projectGuidePaths.find(({ id }) => id === 'other')
  const unsure = projectGuidePaths.find(({ id }) => id === 'unsure')

  assert.notEqual(other.situationPrompt, unsure.situationPrompt)
  assert.notDeepEqual(
    other.situations.map(({ label }) => label),
    unsure.situations.map(({ label }) => label),
  )
})

test('encontra a situação somente dentro do caminho selecionado', () => {
  const sales = projectGuidePaths.find(({ id }) => id === 'sales')

  assert.equal(getProjectGuideSituation(sales, 'no-site')?.label, 'Meu negócio ainda não tem um site')
  assert.equal(getProjectGuideSituation(sales, 'paper-records'), null)
  assert.equal(getProjectGuideSituation(null, 'no-site'), null)
})

test('gera uma mensagem natural para uma situação reconhecida', () => {
  const selection = { needId: 'sales', situationId: 'no-site', goalId: 'whatsapp-contacts' }

  assert.equal(
    buildProjectGuideMessage(selection),
    [
      'Olá, Leonardo! Encontrei a Noumena Labs e quero conversar sobre meu negócio.',
      'Quero apresentar meu negócio e atender melhor. Meu negócio ainda não tem um site. Quero receber contatos pelo WhatsApp.',
      'Gostaria da sua ajuda para entender o melhor caminho.',
    ].join('\n\n'),
  )
})

test('gera uma orientação própria para quem ainda não sabe por onde começar', () => {
  const message = buildProjectGuideMessage({
    needId: 'unsure',
    situationId: 'unclear-problem',
    goalId: 'initial-guidance',
  })

  assert.match(message, /Ainda não sei por onde começar\./)
  assert.match(message, /Não consigo identificar o principal problema\./)
  assert.match(message, /Quero receber uma orientação inicial\./)
})

test('rejeita escolhas incompletas ou resultado pertencente a outra situação', () => {
  const incomplete = { needId: 'sales', situationId: 'no-site', goalId: null }
  const incompatible = { needId: 'sales', situationId: 'no-site', goalId: 'structure-crm' }

  assert.equal(resolveProjectGuideSelection(incomplete), null)
  assert.equal(resolveProjectGuideSelection(incompatible), null)
  assert.equal(buildProjectGuideMessage(incompatible), null)
  assert.equal(buildProjectGuideHref(incomplete), null)
  assert.equal(buildProjectGuideHref(incompatible), null)
})

test('codifica as 81 combinações válidas para o número oficial', () => {
  const hrefs = []

  projectGuidePaths.forEach((path) => {
    path.situations.forEach((situation) => {
      situation.goals.forEach((goal) => {
        const href = buildProjectGuideHref({ needId: path.id, situationId: situation.id, goalId: goal.id })
        const url = new URL(href)

        assert.equal(`${url.origin}${url.pathname}`, 'https://wa.me/5511918218635')
        assert.match(url.searchParams.get('text'), new RegExp(goal.sentence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
        hrefs.push(href)
      })
    })
  })

  assert.equal(hrefs.length, 81)
  assert.equal(new Set(hrefs).size, 81)
})
