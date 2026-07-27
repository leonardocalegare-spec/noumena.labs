export const contactLinks = [
  {
    label: 'WhatsApp',
    value: '+55 11 91821-8635',
    href: 'https://wa.me/5511918218635?text=Ol%C3%A1%2C%20Leonardo%21%20Encontrei%20a%20Noumena%20Labs%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.',
  },
]

const whatsappBase = 'https://wa.me/5511918218635?text='
const baseUrl = import.meta.env?.BASE_URL || '/'
const assetUrl = (path) => `${baseUrl}${path.replace(/^\//, '')}`

export const generalProjectLink = `${whatsappBase}${encodeURIComponent('Olá, Leonardo! Encontrei a Noumena Labs e quero conversar sobre um projeto de tecnologia.')}`

export const services = [
  {
    code: '01',
    icon: 'code',
    eyebrow: 'PRESENÇA + CONVERSÃO',
    title: 'Landing pages',
    description: 'Páginas rápidas e responsivas para apresentar sua oferta com clareza e transformar interesse em conversas.',
    features: ['Mensagem e estrutura de conversão', 'Experiência responsiva', 'WhatsApp e publicação técnica'],
    cta: 'Quero uma landing page',
    href: `${whatsappBase}${encodeURIComponent('Olá, Leonardo! Encontrei a Noumena Labs e quero conversar sobre uma landing page.')}`,
    variant: 'service-accent',
  },
  {
    code: '02',
    icon: 'consulting',
    eyebrow: 'DECISÕES + DIREÇÃO',
    title: 'Consultoria em TI',
    description: 'Analisamos seu cenário para transformar dúvidas técnicas em prioridades e próximos passos viáveis.',
    features: ['Diagnóstico do cenário atual', 'Prioridades e alternativas', 'Plano de ação claro'],
    cta: 'Quero orientação em TI',
    href: `${whatsappBase}${encodeURIComponent('Olá, Leonardo! Encontrei a Noumena Labs e quero conversar sobre consultoria em TI.')}`,
    variant: 'service-neutral',
  },
]

export const projects = [
  {
    code: 'CASE 01',
    category: 'PRODUTO DIGITAL · FRONT-END',
    title: 'Rede Credenciada Parkaz',
    description: 'Fluxo digital em seis etapas para organizar o cadastro de empresas interessadas em integrar a rede credenciada Parkaz, com validação dos dados ao longo da jornada.',
    story: [
      {
        label: 'Desafio',
        value: 'Organizar uma coleta extensa de dados empresariais sem transformar o cadastro em uma experiência confusa.',
      },
      {
        label: 'Estratégia',
        value: 'Dividir a jornada em seis etapas, mostrar o progresso e validar as informações no momento adequado.',
      },
      {
        label: 'Entrega',
        value: 'Interface responsiva publicada, integração com Google Sheets e uma experiência guiada do início ao envio.',
      },
    ],
    details: ['React + TypeScript', 'Formulário progressivo validado', 'Integração com Google Sheets'],
    liveUrl: 'https://redecredenciadaparkaz.vercel.app/',
    slides: [
      {
        image: assetUrl('/cases/parkaz/01-hero.png'),
        width: 1265,
        height: 712,
        label: 'Apresentação da oferta',
        description: 'Hero com proposta direcionada a lava-rápidos, acesso aos aplicativos e benefícios principais.',
      },
      {
        image: assetUrl('/cases/parkaz/02-formulario.png'),
        width: 1265,
        height: 712,
        label: 'Cadastro progressivo',
        description: 'Primeira etapa do formulário, com progresso visível, campos organizados e validação orientada.',
      },
      {
        image: assetUrl('/cases/parkaz/03-parceiros.png'),
        width: 1265,
        height: 712,
        label: 'Prova institucional',
        description: 'Seção de parceiros e reconhecimento Top 100 Open Startups integrada à experiência.',
      },
    ],
  },
]

export const faqItems = [
  {
    question: 'A Noumena Labs atende apenas landing pages e consultoria?',
    answer: 'Não. Essas são as ofertas iniciais, mas avaliamos automações, produtos digitais, sistemas e outros desafios que usem tecnologia para resolver um problema real.',
  },
  {
    question: 'Como funciona o primeiro contato?',
    answer: 'Você apresenta o contexto pelo WhatsApp. A partir disso, entendemos o objetivo, as prioridades e se existe um caminho em que a Noumena Labs possa ajudar.',
  },
  {
    question: 'Já preciso ter um escopo pronto?',
    answer: 'Não. Podemos começar por uma necessidade, uma ideia ou um problema. A definição do caminho e do escopo faz parte da etapa inicial.',
  },
  {
    question: 'O atendimento é remoto?',
    answer: 'Sim. O atendimento pode ser feito remotamente para empresas de qualquer região do Brasil, com comunicação e validações ao longo do projeto.',
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Entender',
    description: 'Você apresenta o contexto, o problema e o resultado esperado.',
  },
  {
    number: '02',
    title: 'Direcionar',
    description: 'Definimos prioridades, escopo e o caminho mais adequado.',
  },
  {
    number: '03',
    title: 'Construir',
    description: 'Desenvolvemos a solução com comunicação e validações frequentes.',
  },
  {
    number: '04',
    title: 'Entregar e evoluir',
    description: 'Validamos o resultado e orientamos os próximos passos.',
  },
]
