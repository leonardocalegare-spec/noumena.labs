import { whatsappBase } from './site.js'

export const projectGuidePaths = [
  {
    id: 'presence',
    label: 'Quero apresentar melhor meu negócio',
    opening: 'Olá, Leonardo! Encontrei a Noumena Labs e gostaria de conversar sobre um projeto.',
    needSentence: 'Preciso apresentar melhor meu negócio.',
    situationPrompt: 'Como está a situação hoje?',
    situations: [
      { id: 'no-page', label: 'Não tenho uma página', sentence: 'Hoje ainda não tenho uma página.' },
      {
        id: 'unclear-page',
        label: 'Minha página não explica bem a oferta',
        sentence: 'Minha página atual não explica bem a oferta.',
      },
      {
        id: 'social-only',
        label: 'Dependo apenas das redes sociais',
        sentence: 'Hoje dependo apenas das redes sociais.',
      },
    ],
    goalPrompt: 'O que espera alcançar?',
    goals: [
      {
        id: 'clear-offer',
        label: 'Apresentar minha oferta com clareza',
        sentence: 'Quero apresentar minha oferta com clareza.',
      },
      {
        id: 'whatsapp-contacts',
        label: 'Receber contatos pelo WhatsApp',
        sentence: 'Quero começar a receber contatos pelo WhatsApp.',
      },
      {
        id: 'professional-presence',
        label: 'Criar uma presença digital mais profissional',
        sentence: 'Quero criar uma presença digital mais profissional.',
      },
    ],
    closing: 'Gostaria de entender qual caminho faz mais sentido.',
  },
  {
    id: 'consulting',
    label: 'Preciso de orientação em tecnologia',
    opening: 'Olá, Leonardo! Encontrei a Noumena Labs e gostaria de conversar sobre um projeto.',
    needSentence: 'Preciso de orientação em tecnologia.',
    situationPrompt: 'Como está a situação hoje?',
    situations: [
      {
        id: 'unclear-solution',
        label: 'Não sei qual solução escolher',
        sentence: 'Ainda não sei qual solução escolher.',
      },
      {
        id: 'assess-existing',
        label: 'Preciso avaliar uma solução que já existe',
        sentence: 'Preciso avaliar uma solução que já existe.',
      },
      {
        id: 'technical-decision',
        label: 'Tenho uma decisão técnica ou de processo para tomar',
        sentence: 'Tenho uma decisão técnica ou de processo para tomar.',
      },
    ],
    goalPrompt: 'O que espera alcançar?',
    goals: [
      {
        id: 'compare-options',
        label: 'Comparar caminhos possíveis',
        sentence: 'Quero comparar os caminhos possíveis.',
      },
      { id: 'set-priorities', label: 'Definir prioridades', sentence: 'Quero definir prioridades.' },
      {
        id: 'clear-next-steps',
        label: 'Sair com próximos passos claros',
        sentence: 'Quero sair com próximos passos claros.',
      },
    ],
    closing: 'Gostaria de entender qual caminho faz mais sentido.',
  },
  {
    id: 'other',
    label: 'Tenho outro problema para resolver',
    opening: 'Olá, Leonardo! Encontrei a Noumena Labs e gostaria de conversar sobre um projeto.',
    needSentence: 'Tenho outro problema que gostaria de resolver com tecnologia.',
    situationPrompt: 'Que tipo de desafio você reconhece?',
    situations: [
      {
        id: 'automate-task',
        label: 'Automatizar uma tarefa repetitiva',
        sentence: 'Quero automatizar uma tarefa repetitiva.',
      },
      {
        id: 'build-tool',
        label: 'Criar uma ferramenta ou sistema',
        sentence: 'Quero criar uma ferramenta ou sistema.',
      },
      {
        id: 'improve-existing',
        label: 'Melhorar uma solução que já existe',
        sentence: 'Quero melhorar uma solução que já existe.',
      },
    ],
    goalPrompt: 'O que espera alcançar?',
    goals: [
      {
        id: 'assess-feasibility',
        label: 'Avaliar se a ideia é viável',
        sentence: 'Quero avaliar se a ideia é viável.',
      },
      {
        id: 'define-first-version',
        label: 'Definir uma primeira versão',
        sentence: 'Quero definir uma primeira versão.',
      },
      {
        id: 'solve-bottleneck',
        label: 'Resolver um gargalo específico',
        sentence: 'Quero resolver um gargalo específico.',
      },
    ],
    closing: 'Gostaria de entender qual caminho faz mais sentido.',
  },
  {
    id: 'unsure',
    label: 'Ainda não sei do que preciso',
    opening: 'Olá, Leonardo! Encontrei a Noumena Labs, mas ainda não sei qual solução preciso.',
    needSentence: null,
    situationPrompt: 'O que mais incomoda hoje?',
    situations: [
      {
        id: 'hard-to-present',
        label: 'Tenho dificuldade para apresentar meu negócio',
        sentence: 'Tenho dificuldade para apresentar meu negócio.',
      },
      {
        id: 'manual-time',
        label: 'Tarefas manuais estão consumindo muito tempo',
        sentence: 'Tarefas manuais estão consumindo muito tempo.',
      },
      {
        id: 'technology-decision',
        label: 'Preciso tomar uma decisão sobre tecnologia',
        sentence: 'Preciso tomar uma decisão sobre tecnologia.',
      },
      {
        id: 'unclear-problem',
        label: 'Não consigo identificar o problema principal',
        sentence: 'Não consigo identificar o problema principal.',
      },
    ],
    goalPrompt: 'Que tipo de ajuda seria mais útil?',
    goals: [
      {
        id: 'understand-paths',
        label: 'Entender quais caminhos existem',
        sentence: 'Quero entender quais caminhos existem.',
      },
      {
        id: 'first-priority',
        label: 'Descobrir a primeira prioridade',
        sentence: 'Quero descobrir a primeira prioridade.',
      },
      {
        id: 'initial-guidance',
        label: 'Receber uma orientação inicial',
        sentence: 'Quero receber uma orientação inicial.',
      },
    ],
    closing: 'Gostaria de receber uma orientação inicial.',
  },
]

export function getProjectGuidePath(needId) {
  return projectGuidePaths.find(({ id }) => id === needId) ?? null
}

export function resolveProjectGuideSelection({ needId, situationId, goalId }) {
  const path = getProjectGuidePath(needId)
  const situation = path?.situations.find(({ id }) => id === situationId)
  const goal = path?.goals.find(({ id }) => id === goalId)
  if (!path || !situation || !goal) return null
  return { path, situation, goal }
}

export function buildProjectGuideMessage(selectionIds) {
  const resolved = resolveProjectGuideSelection(selectionIds)
  if (!resolved) return null

  const { path, situation, goal } = resolved
  const context = [path.needSentence, situation.sentence, goal.sentence].filter(Boolean).join(' ')
  return [path.opening, context, path.closing].join('\n\n')
}

export function buildProjectGuideHref(selectionIds) {
  const message = buildProjectGuideMessage(selectionIds)
  return message ? `${whatsappBase}${encodeURIComponent(message)}` : null
}
