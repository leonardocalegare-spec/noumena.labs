import { whatsappBase } from './contact.js'

const opening = 'Olá, Leonardo! Encontrei a Noumena Labs e quero conversar sobre meu negócio.'
const closing = 'Gostaria da sua ajuda para entender o melhor caminho.'

const goal = (id, label, sentence) => ({ id, label, sentence })

export const projectGuidePaths = [
  {
    id: 'sales',
    label: 'Quero apresentar meu negócio e atender melhor',
    needSentence: 'Quero apresentar meu negócio e atender melhor.',
    situationPrompt: 'O que mais precisa melhorar hoje?',
    situations: [
      {
        id: 'no-site',
        label: 'Meu negócio ainda não tem um site',
        sentence: 'Meu negócio ainda não tem um site.',
        goalPrompt: 'O que você quer alcançar primeiro?',
        goals: [
          goal(
            'professional-presentation',
            'Apresentar meu negócio de forma profissional',
            'Quero apresentar meu negócio de forma profissional.',
          ),
          goal('clear-offer', 'Explicar minha oferta com clareza', 'Quero explicar minha oferta com clareza.'),
          goal('whatsapp-contacts', 'Receber contatos pelo WhatsApp', 'Quero receber contatos pelo WhatsApp.'),
        ],
      },
      {
        id: 'unclear-site',
        label: 'Meu site não apresenta bem o que eu ofereço',
        sentence: 'Meu site não apresenta bem o que eu ofereço.',
        goalPrompt: 'O que você quer alcançar primeiro?',
        goals: [
          goal('improve-message', 'Melhorar a mensagem da minha oferta', 'Quero melhorar a mensagem da minha oferta.'),
          goal(
            'strengthen-identity',
            'Fortalecer a identidade visual e a confiança',
            'Quero fortalecer a identidade visual e a confiança.',
          ),
          goal(
            'facilitate-contact',
            'Facilitar o contato de novos clientes',
            'Quero facilitar o contato de novos clientes.',
          ),
        ],
      },
      {
        id: 'whatsapp-setup',
        label: 'Meu WhatsApp precisa de mais organização',
        sentence: 'Meu WhatsApp precisa de mais organização.',
        goalPrompt: 'O que você quer alcançar primeiro?',
        goals: [
          goal('business-profile', 'Configurar meu perfil comercial', 'Quero configurar meu perfil comercial.'),
          goal('quick-replies', 'Organizar respostas e etiquetas', 'Quero organizar respostas e etiquetas.'),
          goal('whatsapp-catalog', 'Apresentar produtos no catálogo', 'Quero apresentar produtos no catálogo.'),
        ],
      },
      {
        id: 'google-profile',
        label: 'As informações do meu negócio no Google estão incompletas',
        sentence: 'As informações do meu negócio no Google estão incompletas.',
        goalPrompt: 'O que você quer organizar primeiro?',
        goals: [
          goal('business-information', 'Organizar endereço e horários', 'Quero organizar endereço e horários.'),
          goal('business-photos', 'Apresentar fotos e serviços', 'Quero apresentar fotos e serviços.'),
          goal(
            'profile-verification',
            'Entender a configuração e verificação do perfil',
            'Quero entender a configuração e verificação do perfil.',
          ),
        ],
      },
      {
        id: 'online-catalog',
        label: 'Envio fotos e preços um por um aos clientes',
        sentence: 'Envio fotos e preços um por um aos clientes.',
        goalPrompt: 'O que você quer facilitar primeiro?',
        goals: [
          goal('share-catalog', 'Compartilhar um catálogo online', 'Quero compartilhar um catálogo online.'),
          goal(
            'organize-products',
            'Organizar os produtos por categoria',
            'Quero organizar os produtos por categoria.',
          ),
          goal('catalog-orders', 'Receber pedidos pelo WhatsApp', 'Quero receber pedidos pelo WhatsApp.'),
        ],
      },
      {
        id: 'lost-opportunities',
        label: 'Perco o acompanhamento das oportunidades de venda',
        sentence: 'Perco o acompanhamento das oportunidades de venda.',
        goalPrompt: 'O que você quer alcançar primeiro?',
        goals: [
          goal(
            'organize-sales-steps',
            'Organizar as etapas do processo de vendas',
            'Quero organizar as etapas do processo de vendas.',
          ),
          goal(
            'structure-crm',
            'Estruturar o acompanhamento em um CRM',
            'Quero estruturar o acompanhamento em um CRM.',
          ),
          goal(
            'track-quotes',
            'Acompanhar orçamentos e próximos retornos',
            'Quero acompanhar orçamentos e próximos retornos.',
          ),
        ],
      },
    ],
  },
  {
    id: 'operations',
    label: 'Quero organizar tarefas e controles do negócio',
    needSentence: 'Quero organizar tarefas e controles do negócio.',
    situationPrompt: 'Como esse controle funciona hoje?',
    situations: [
      {
        id: 'paper-records',
        label: 'Faço registros em papel',
        sentence: 'Faço registros em papel.',
        goalPrompt: 'O que você quer melhorar primeiro?',
        goals: [
          goal('centralize-information', 'Centralizar as informações', 'Quero centralizar as informações.'),
          goal('reduce-record-errors', 'Reduzir erros nos registros', 'Quero reduzir erros nos registros.'),
          goal('easy-consultation', 'Consultar os dados com facilidade', 'Quero consultar os dados com facilidade.'),
        ],
      },
      {
        id: 'scattered-sheets',
        label: 'As informações estão espalhadas em planilhas',
        sentence: 'As informações estão espalhadas em planilhas.',
        goalPrompt: 'O que você quer melhorar primeiro?',
        goals: [
          goal('single-place', 'Reunir tudo em um único lugar', 'Quero reunir tudo em um único lugar.'),
          goal('organize-updates', 'Organizar as atualizações', 'Quero organizar as atualizações.'),
          goal(
            'clear-current-status',
            'Acompanhar a situação atual com clareza',
            'Quero acompanhar a situação atual com clareza.',
          ),
        ],
      },
      {
        id: 'repetitive-task',
        label: 'Uma tarefa repetitiva consome muito tempo',
        sentence: 'Uma tarefa repetitiva consome muito tempo.',
        goalPrompt: 'O que você quer melhorar primeiro?',
        goals: [
          goal('automate-steps', 'Automatizar etapas da tarefa', 'Quero automatizar etapas da tarefa.'),
          goal('reduce-manual-work', 'Reduzir o trabalho manual', 'Quero reduzir o trabalho manual.'),
          goal('standardize-process', 'Padronizar o processo', 'Quero padronizar o processo.'),
        ],
      },
      {
        id: 'unclear-routine',
        label: 'Não consigo acompanhar uma rotina importante com clareza',
        sentence: 'Não consigo acompanhar uma rotina importante com clareza.',
        goalPrompt: 'O que você quer melhorar primeiro?',
        goals: [
          goal('track-movements', 'Acompanhar as movimentações', 'Quero acompanhar as movimentações.'),
          goal('organized-history', 'Manter um histórico organizado', 'Quero manter um histórico organizado.'),
          goal('attention-view', 'Visualizar o que precisa de atenção', 'Quero visualizar o que precisa de atenção.'),
        ],
      },
    ],
  },
  {
    id: 'support',
    label: 'Preciso resolver um problema em computadores',
    needSentence: 'Preciso resolver um problema em computadores.',
    situationPrompt: 'O que está acontecendo?',
    situations: [
      {
        id: 'slow-computer',
        label: 'O computador está lento ou travando',
        sentence: 'O computador está lento ou travando.',
        goalPrompt: 'O que você precisa resolver primeiro?',
        goals: [
          goal('identify-slowness', 'Identificar a causa da lentidão', 'Quero identificar a causa da lentidão.'),
          goal(
            'improve-computer',
            'Melhorar o funcionamento do computador',
            'Quero melhorar o funcionamento do computador.',
          ),
          goal(
            'assess-replacement',
            'Avaliar se alguma troca é necessária',
            'Quero avaliar se alguma troca é necessária.',
          ),
        ],
      },
      {
        id: 'software-problem',
        label: 'Um programa ou o sistema não funciona corretamente',
        sentence: 'Um programa ou o sistema não funciona corretamente.',
        goalPrompt: 'O que você precisa resolver primeiro?',
        goals: [
          goal('fix-error', 'Corrigir o erro apresentado', 'Quero corrigir o erro apresentado.'),
          goal(
            'reinstall-configure',
            'Reinstalar ou configurar o programa',
            'Quero reinstalar ou configurar o programa.',
          ),
          goal('restore-operation', 'Recuperar o funcionamento normal', 'Quero recuperar o funcionamento normal.'),
        ],
      },
      {
        id: 'peripheral-problem',
        label: 'Um periférico ou conexão não está funcionando',
        sentence: 'Um periférico ou conexão não está funcionando.',
        goalPrompt: 'O que você precisa resolver primeiro?',
        goals: [
          goal('diagnose-connection', 'Diagnosticar a conexão', 'Quero diagnosticar a conexão.'),
          goal('configure-device', 'Configurar o dispositivo', 'Quero configurar o dispositivo.'),
          goal('check-ports', 'Verificar entradas e saídas', 'Quero verificar entradas e saídas.'),
        ],
      },
      {
        id: 'format-configure',
        label: 'Preciso formatar ou configurar o computador',
        sentence: 'Preciso formatar ou configurar o computador.',
        goalPrompt: 'O que você precisa resolver primeiro?',
        goals: [
          goal('reinstall-system', 'Reinstalar o sistema', 'Quero reinstalar o sistema.'),
          goal('configure-software-drivers', 'Configurar programas e drivers', 'Quero configurar programas e drivers.'),
          goal('prepare-computer', 'Preparar o computador para uso', 'Quero preparar o computador para uso.'),
        ],
      },
    ],
  },
  {
    id: 'data',
    label: 'Quero entender melhor os dados do negócio',
    needSentence: 'Quero entender melhor os dados do negócio.',
    situationPrompt: 'Como estão essas informações hoje?',
    situations: [
      {
        id: 'historical-data',
        label: 'Tenho vendas registradas, mas não acompanho os resultados',
        sentence: 'Tenho vendas registradas, mas não acompanho os resultados.',
        goalPrompt: 'O que você quer descobrir primeiro?',
        goals: [
          goal('identify-patterns', 'Acompanhar as vendas por período', 'Quero acompanhar as vendas por período.'),
          goal('notice-changes', 'Perceber mudanças importantes', 'Quero perceber mudanças importantes.'),
          goal('find-opportunities', 'Encontrar oportunidades', 'Quero encontrar oportunidades.'),
        ],
      },
      {
        id: 'scattered-data',
        label: 'As informações estão espalhadas em arquivos e planilhas',
        sentence: 'As informações estão espalhadas em arquivos e planilhas.',
        goalPrompt: 'O que você quer descobrir primeiro?',
        goals: [
          goal('organize-important-data', 'Organizar os dados importantes', 'Quero organizar os dados importantes.'),
          goal(
            'validate-information',
            'Validar a qualidade das informações',
            'Quero validar a qualidade das informações.',
          ),
          goal('gather-data', 'Reunir os dados necessários', 'Quero reunir os dados necessários.'),
        ],
      },
      {
        id: 'unclear-reports',
        label: 'Tenho relatórios, mas não consigo entender o que eles mostram',
        sentence: 'Tenho relatórios, mas não consigo entender o que eles mostram.',
        goalPrompt: 'O que você quer descobrir primeiro?',
        goals: [
          goal('define-indicators', 'Definir indicadores relevantes', 'Quero definir indicadores relevantes.'),
          goal('compare-periods', 'Comparar diferentes períodos', 'Quero comparar diferentes períodos.'),
          goal(
            'understand-results',
            'Entender o que influencia os resultados',
            'Quero entender o que influencia os resultados.',
          ),
        ],
      },
      {
        id: 'data-decision',
        label: 'Preciso usar os dados para avaliar uma decisão',
        sentence: 'Preciso usar os dados para avaliar uma decisão.',
        goalPrompt: 'O que você quer descobrir primeiro?',
        goals: [
          goal('assess-scenario', 'Avaliar o cenário atual', 'Quero avaliar o cenário atual.'),
          goal('compare-possibilities', 'Comparar possibilidades', 'Quero comparar possibilidades.'),
          goal(
            'set-priorities',
            'Definir prioridades com mais segurança',
            'Quero definir prioridades com mais segurança.',
          ),
        ],
      },
    ],
  },
  {
    id: 'other',
    label: 'Tenho outro problema para resolver',
    needSentence: 'Tenho outro problema para resolver.',
    situationPrompt: 'Que tipo de desafio você reconhece?',
    situations: [
      {
        id: 'custom-system',
        label: 'Preciso avaliar um sistema específico para minha rotina',
        sentence: 'Preciso avaliar um sistema específico para minha rotina.',
        goalPrompt: 'Qual próximo passo seria mais útil?',
        goals: [
          goal('assess-solutions', 'Avaliar quais soluções são viáveis', 'Quero avaliar quais soluções são viáveis.'),
          goal(
            'define-system-scope',
            'Definir uma primeira versão do sistema',
            'Quero definir uma primeira versão do sistema.',
          ),
          goal('estimate-project', 'Entender o escopo e o investimento', 'Quero entender o escopo e o investimento.'),
        ],
      },
      {
        id: 'digital-tool',
        label: 'Preciso criar ou melhorar uma ferramenta digital',
        sentence: 'Preciso criar ou melhorar uma ferramenta digital.',
        goalPrompt: 'Qual próximo passo seria mais útil?',
        goals: [
          goal('assess-solutions', 'Avaliar quais soluções são viáveis', 'Quero avaliar quais soluções são viáveis.'),
          goal('define-first-version', 'Definir uma primeira versão', 'Quero definir uma primeira versão.'),
          goal('understand-start', 'Entender como começar', 'Quero entender como começar.'),
        ],
      },
      {
        id: 'connect-tools',
        label: 'Quero conectar informações ou ferramentas que hoje estão separadas',
        sentence: 'Quero conectar informações ou ferramentas que hoje estão separadas.',
        goalPrompt: 'Qual próximo passo seria mais útil?',
        goals: [
          goal('assess-connections', 'Avaliar quais conexões são viáveis', 'Quero avaliar quais conexões são viáveis.'),
          goal('organize-priority', 'Organizar a prioridade', 'Quero organizar a prioridade.'),
          goal('define-first-step', 'Definir uma primeira etapa', 'Quero definir uma primeira etapa.'),
        ],
      },
      {
        id: 'specific-difficulty',
        label: 'Tenho uma dificuldade específica que não apareceu nas opções',
        sentence: 'Tenho uma dificuldade específica que não apareceu nas opções.',
        goalPrompt: 'Qual próximo passo seria mais útil?',
        goals: [
          goal('explain-problem', 'Explicar melhor o problema', 'Quero explicar melhor o problema.'),
          goal('organize-priority', 'Organizar a prioridade', 'Quero organizar a prioridade.'),
          goal('initial-guidance', 'Receber uma orientação inicial', 'Quero receber uma orientação inicial.'),
        ],
      },
    ],
  },
  {
    id: 'unsure',
    label: 'Ainda não sei por onde começar',
    needSentence: 'Ainda não sei por onde começar.',
    situationPrompt: 'O que mais incomoda no negócio hoje?',
    situations: [
      {
        id: 'sales-discomfort',
        label: 'Tenho dificuldade para vender ou conquistar clientes',
        sentence: 'Tenho dificuldade para vender ou conquistar clientes.',
        goalPrompt: 'Que ajuda seria mais útil agora?',
        goals: [
          goal('understand-paths', 'Entender quais caminhos existem', 'Quero entender quais caminhos existem.'),
          goal(
            'discover-main-problem',
            'Descobrir o problema mais importante',
            'Quero descobrir o problema mais importante.',
          ),
          goal('first-priority', 'Definir a primeira prioridade', 'Quero definir a primeira prioridade.'),
        ],
      },
      {
        id: 'disorganized-work',
        label: 'Tarefas e informações estão desorganizadas',
        sentence: 'Tarefas e informações estão desorganizadas.',
        goalPrompt: 'Que ajuda seria mais útil agora?',
        goals: [
          goal('understand-paths', 'Entender quais caminhos existem', 'Quero entender quais caminhos existem.'),
          goal(
            'discover-main-problem',
            'Descobrir o problema mais importante',
            'Quero descobrir o problema mais importante.',
          ),
          goal('first-priority', 'Definir a primeira prioridade', 'Quero definir a primeira prioridade.'),
        ],
      },
      {
        id: 'computer-discomfort',
        label: 'Tenho problemas frequentes com computadores',
        sentence: 'Tenho problemas frequentes com computadores.',
        goalPrompt: 'Que ajuda seria mais útil agora?',
        goals: [
          goal('understand-checks', 'Entender o que deve ser verificado', 'Quero entender o que deve ser verificado.'),
          goal(
            'discover-main-problem',
            'Descobrir o problema mais importante',
            'Quero descobrir o problema mais importante.',
          ),
          goal('initial-guidance', 'Receber uma orientação inicial', 'Quero receber uma orientação inicial.'),
        ],
      },
      {
        id: 'unused-data',
        label: 'Tenho dados, mas não sei como utilizá-los',
        sentence: 'Tenho dados, mas não sei como utilizá-los.',
        goalPrompt: 'Que ajuda seria mais útil agora?',
        goals: [
          goal(
            'understand-analysis',
            'Entender quais análises são possíveis',
            'Quero entender quais análises são possíveis.',
          ),
          goal('discover-priority', 'Descobrir o que vale priorizar', 'Quero descobrir o que vale priorizar.'),
          goal('initial-guidance', 'Receber uma orientação inicial', 'Quero receber uma orientação inicial.'),
        ],
      },
      {
        id: 'unclear-problem',
        label: 'Não consigo identificar o principal problema',
        sentence: 'Não consigo identificar o principal problema.',
        goalPrompt: 'Que ajuda seria mais útil agora?',
        goals: [
          goal('understand-paths', 'Entender quais caminhos existem', 'Quero entender quais caminhos existem.'),
          goal(
            'discover-main-problem',
            'Descobrir o problema mais importante',
            'Quero descobrir o problema mais importante.',
          ),
          goal('initial-guidance', 'Receber uma orientação inicial', 'Quero receber uma orientação inicial.'),
        ],
      },
    ],
  },
]

export function getProjectGuidePath(needId) {
  return projectGuidePaths.find(({ id }) => id === needId) ?? null
}

export function getProjectGuideSituation(path, situationId) {
  return path?.situations.find(({ id }) => id === situationId) ?? null
}

export function resolveProjectGuideSelection({ needId, situationId, goalId }) {
  const path = getProjectGuidePath(needId)
  const situation = getProjectGuideSituation(path, situationId)
  const selectedGoal = situation?.goals.find(({ id }) => id === goalId)

  if (!path || !situation || !selectedGoal) return null
  return { path, situation, goal: selectedGoal }
}

export function buildProjectGuideMessage(selectionIds) {
  const resolved = resolveProjectGuideSelection(selectionIds)
  if (!resolved) return null

  const { path, situation, goal: selectedGoal } = resolved
  const context = [path.needSentence, situation.sentence, selectedGoal.sentence].join(' ')
  return [opening, context, closing].join('\n\n')
}

export function buildProjectGuideHref(selectionIds) {
  const message = buildProjectGuideMessage(selectionIds)
  return message ? `${whatsappBase}${encodeURIComponent(message)}` : null
}
