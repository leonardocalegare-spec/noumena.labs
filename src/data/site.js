import { generalProjectLink, whatsappBase } from './contact.js'
import { formatServicePrice } from '../utils/serviceOffers.js'

export { contactLinks, generalProjectLink, whatsappBase } from './contact.js'

const baseUrl = import.meta.env?.BASE_URL || '/'
const assetUrl = (path) => `${baseUrl}${path.replace(/^\//, '')}`

const offer = (details) => ({
  ...details,
  href: `${whatsappBase}${encodeURIComponent(
    `Olá, Leonardo! Tenho interesse em ${details.title} (${formatServicePrice(details.price)}). Quero confirmar o escopo para o meu negócio.`,
  )}`,
})

const webCosts = 'Domínio e hospedagem pagos separadamente, em contas do cliente. Manutenção é opcional.'
const webConditions =
  'Conteúdo e imagens fornecidos pelo cliente; até duas rodadas de ajustes no escopo combinado. Novas páginas e funções são orçadas à parte.'

export const services = [
  {
    id: 'sites',
    code: '01',
    icon: 'code',
    eyebrow: 'APRESENTAR + RECEBER CONTATOS',
    title: 'Sites e catálogos',
    description: 'Seu negócio, seus serviços e seus produtos em um link fácil de compartilhar.',
    variant: 'service-accent',
    offers: [
      offer({
        id: 'pagina-profissional',
        title: 'Página profissional',
        description: 'Apresente seu negócio e facilite o contato de quem quer contratar você.',
        price: { type: 'from', amount: 890 },
        includes: [
          'Até cinco seções em uma página',
          'Layout responsivo com sua identidade e conteúdo',
          'WhatsApp, localização e publicação',
        ],
        conditions: webConditions,
        externalCosts: webCosts,
        cta: 'Quero minha página',
      }),
      offer({
        id: 'catalogo-online',
        title: 'Catálogo online',
        description: 'Mostre produtos e preços para o cliente iniciar um pedido pelo WhatsApp.',
        price: { type: 'from', amount: 1490 },
        includes: [
          'Até 20 itens em três categorias',
          'Fotos, descrições e preços fornecidos por você',
          'Mensagem de pedido pelo WhatsApp em cada item',
        ],
        conditions: `${webConditions} Pagamento online, estoque sincronizado e painel de edição não fazem parte do catálogo base.`,
        externalCosts: webCosts,
        cta: 'Quero meu catálogo',
      }),
      offer({
        id: 'site-institucional',
        title: 'Site institucional',
        description: 'Organize a apresentação da empresa e de suas diferentes áreas ou serviços.',
        price: { type: 'from', amount: 2490 },
        includes: [
          'Até cinco páginas simples',
          'Layout responsivo com conteúdo fornecido por você',
          'Contato pelo WhatsApp e publicação',
        ],
        conditions: `${webConditions} Loja virtual, área de login e painel administrativo são projetos separados.`,
        externalCosts: webCosts,
        cta: 'Quero meu site',
      }),
    ],
  },
  {
    id: 'atendimento',
    code: '02',
    icon: 'trend',
    eyebrow: 'SER ENCONTRADO + ATENDER',
    title: 'Presença local e atendimento',
    description: 'Informações organizadas para quem procura seu negócio e para quem já conversa com você.',
    variant: 'service-neutral',
    offers: [
      offer({
        id: 'whatsapp-business',
        title: 'WhatsApp Business configurado',
        description: 'Organize seu perfil, catálogo e respostas usadas no atendimento.',
        price: { type: 'fixed', amount: 290 },
        includes: [
          'Um número, perfil e até 10 itens no catálogo',
          'Cinco respostas rápidas, etiquetas e saudação/ausência',
          'Orientação de uso e uma rodada de ajustes',
        ],
        conditions:
          'Você fornece fotos, preços e informações. Respostas rápidas são enviadas pelo atendente. Chatbot, disparos e atendimento por terceiros não estão incluídos.',
        externalCosts:
          'O aplicativo básico é gratuito. O valor é pela configuração e orientação; eventuais serviços pagos são contratados separadamente.',
        cta: 'Quero organizar meu WhatsApp',
      }),
      offer({
        id: 'perfil-google',
        title: 'Perfil da Empresa no Google',
        description: 'Organize endereço, horários, fotos e contato para quem busca seu negócio.',
        price: { type: 'fixed', amount: 290 },
        includes: [
          'Uma unidade elegível, com acesso autorizado',
          'Dados, categorias, horários e até 10 fotos fornecidas',
          'Orientação para verificação e uma rodada de ajustes',
        ],
        conditions:
          'A contratação depende de elegibilidade e acesso ao perfil. Aprovação e prazo de verificação dependem do Google. Não inclui recuperação de perfil suspenso nem garantia de posição nas buscas.',
        externalCosts:
          'O perfil é gratuito. Você paga pela configuração e orientação, não por uma taxa do Google. Anúncios não estão incluídos.',
        cta: 'Quero organizar meu perfil no Google',
      }),
      offer({
        id: 'clientes-crm',
        title: 'Organização de clientes e orçamentos',
        description: 'Acompanhe contatos, propostas e próximos retornos em uma ferramenta de CRM existente.',
        price: { type: 'from', amount: 1290 },
        includes: [
          'Um funil de acompanhamento para até três usuários',
          'Importação de até 200 contatos já organizados',
          'Orientação de uso e até duas rodadas de ajustes',
        ],
        conditions:
          'Escolhemos uma ferramenta compatível com a rotina. Limpeza de bases, integrações, prospecção e negociação em seu nome ficam fora do escopo base.',
        externalCosts:
          'Licença do CRM, usuários adicionais e integrações pagas são contratados pelo cliente, quando necessários.',
        cta: 'Quero acompanhar meus clientes',
      }),
    ],
  },
  {
    id: 'controles',
    code: '03',
    icon: 'system',
    eyebrow: 'ORGANIZAR + ECONOMIZAR TEMPO',
    title: 'Planilhas e automações',
    description: 'Controles claros para acompanhar o negócio e reduzir tarefas repetitivas.',
    variant: 'service-accent',
    offers: [
      offer({
        id: 'planilha-controle',
        title: 'Planilha de controle do negócio',
        description: 'Reúna pedidos, registros ou movimentações em um controle fácil de atualizar.',
        price: { type: 'from', amount: 990 },
        includes: [
          'Um processo em até três abas',
          'Fórmulas e validações para uma base de até 500 linhas',
          'Orientação e até duas rodadas de ajustes',
        ],
        conditions:
          'A base inicial deve estar organizada. Limpeza extensa, novas regras e integrações são orçadas à parte.',
        externalCosts: 'Licença da ferramenta de planilhas, se necessária, é paga pelo cliente.',
        cta: 'Quero organizar meu controle',
      }),
      offer({
        id: 'automacao-tarefa',
        title: 'Automação de uma tarefa',
        description: 'Conecte uma etapa repetitiva entre as ferramentas que você já usa.',
        price: { type: 'from', amount: 2190 },
        includes: [
          'Um gatilho e um fluxo entre duas ferramentas',
          'Registro de falhas e instrução de recuperação',
          'Testes, orientação e até duas rodadas de ajustes',
        ],
        conditions:
          'Confirmamos a viabilidade e os acessos antes de contratar. O preço base exige integração disponível. Novos fluxos e monitoramento contínuo são orçados separadamente.',
        externalCosts:
          'APIs, assinaturas, hospedagem e consumo de mensagens ou execuções são pagos separadamente, com limites combinados.',
        cta: 'Quero automatizar uma tarefa',
      }),
      offer({
        id: 'painel-indicadores',
        title: 'Painel de vendas ou operação',
        description: 'Veja os indicadores que ajudam a acompanhar a rotina e os resultados do negócio.',
        price: { type: 'from', amount: 2490 },
        includes: [
          'Uma fonte de dados já organizada',
          'Até cinco indicadores com atualização manual',
          'Orientação documentada e até duas rodadas de ajustes',
        ],
        conditions:
          'Validamos a fonte antes de contratar. Tratamento extenso de dados, atualização automática e análises recorrentes exigem outro escopo.',
        externalCosts:
          'Licenças, armazenamento, hospedagem e conectores pagos, quando necessários, ficam a cargo do cliente.',
        cta: 'Quero acompanhar meus indicadores',
      }),
    ],
  },
  {
    id: 'suporte',
    code: '04',
    icon: 'support',
    eyebrow: 'SUPORTE + CONTINUIDADE',
    title: 'Suporte e manutenção',
    description: 'Ajuda para problemas de computador e cuidado contínuo com o site do seu negócio.',
    variant: 'service-neutral',
    offers: [
      offer({
        id: 'suporte-remoto',
        title: 'Suporte remoto',
        description: 'Investigue um problema de computador ou programa e receba ajuda para resolver.',
        price: { type: 'fixed', amount: 150, unit: 'por sessão de até 1 hora' },
        includes: [
          'Triagem para verificar se o acesso remoto é viável',
          'Uma sessão de até 60 minutos em um computador',
          'Diagnóstico, atuação e orientação sobre o próximo passo',
        ],
        conditions:
          'Atendimento agendado. A sessão não garante a solução de qualquer problema em uma hora. Tempo adicional depende de novo acordo; reparo de hardware e recuperação de dados ficam fora.',
        externalCosts: 'Licenças e serviços pagos necessários ao computador são de responsabilidade do cliente.',
        cta: 'Quero agendar um suporte',
      }),
      offer({
        id: 'formatacao',
        title: 'Formatação e configuração',
        description: 'Prepare um computador para uso com sistema, drivers e programas combinados.',
        price: { type: 'from', amount: 390 },
        includes: [
          'Um computador com armazenamento saudável',
          'Backup definido de até 20 GB, verificado antes da formatação',
          'Sistema, drivers e programas acordados, com orientação',
        ],
        conditions:
          'Avaliamos equipamento, backup e modalidade antes de contratar. Atendimento presencial depende da região e disponibilidade. Recuperação de dados e troca de peças ficam fora.',
        externalCosts: 'Licenças, peças, mídia de backup e deslocamento são cobrados separadamente quando necessários.',
        cta: 'Quero preparar meu computador',
      }),
      offer({
        id: 'manutencao-site',
        title: 'Manutenção de site',
        description: 'Mantenha as informações atualizadas e tenha acompanhamento técnico do seu site.',
        price: { type: 'monthly', amount: 190 },
        includes: [
          'Um site simples, após avaliação técnica',
          'Checagem mensal de funcionamento',
          'Até 45 minutos de alterações de conteúdo por mês',
        ],
        conditions:
          'Contratação opcional. Franquia mensal não cumulativa e atendimento agendado, sem plantão 24h. Páginas novas, reformulação e funções adicionais são orçadas à parte. Correções de defeitos da entrega não dependem deste plano.',
        externalCosts:
          'Domínio e hospedagem pagos separadamente. Licenças e serviços externos não fazem parte da mensalidade.',
        cta: 'Quero cuidar do meu site',
      }),
    ],
  },
]

export const otherChallengesService = {
  code: '∞',
  icon: 'spark',
  eyebrow: 'OUTROS DESAFIOS',
  title: 'Precisa de um sistema ou integração específica?',
  description:
    'Me conte o que precisa mudar. Analiso o cenário e explico quais caminhos fazem sentido para o seu negócio.',
  features: ['Entendimento da necessidade', 'Possibilidades viáveis', 'Próximo passo claro'],
  cta: 'Apresentar meu desafio',
  href: generalProjectLink,
  variant: 'service-neutral',
  isFuture: true,
  price: { type: 'quote' },
}

export const servicePackages = [
  offer({
    id: 'presenca-digital',
    title: 'Presença Digital',
    description: 'Para autônomos e prestadores que precisam apresentar o negócio e organizar o atendimento.',
    price: { type: 'fixed', amount: 1090 },
    includes: [
      'Página profissional com até cinco seções',
      'WhatsApp Business com até 10 itens e cinco respostas rápidas',
      'Publicação, configuração e orientação de uso',
    ],
    conditions: `${webConditions} Combina os escopos base da página e do WhatsApp Business.`,
    externalCosts: webCosts,
    cta: 'Quero o pacote Presença Digital',
  }),
  offer({
    id: 'negocio-online',
    title: 'Negócio Online',
    description: 'Para lojas e empresas que precisam reunir apresentação, produtos e informações locais.',
    price: { type: 'from', amount: 3490 },
    includes: [
      'Até cinco páginas com catálogo integrado de até 20 itens',
      'WhatsApp para contato e pedidos por item',
      'Configuração de uma unidade elegível no Google',
    ],
    conditions: `${webConditions} Catálogo com até três categorias e sem pagamento ou estoque integrado. Google exige acesso autorizado; inclui até 10 fotos fornecidas e orientação de verificação, sem garantia de aprovação, prazo ou posição nas buscas.`,
    externalCosts: `${webCosts} O Perfil da Empresa no Google é gratuito; a configuração está incluída no pacote.`,
    cta: 'Quero o pacote Negócio Online',
  }),
]

export const projects = [
  {
    code: 'CASE 01',
    category: 'PRODUTO DIGITAL · FRONT-END',
    title: 'Rede Credenciada Parkaz',
    description:
      'Fluxo digital em seis etapas para organizar o cadastro de empresas interessadas em integrar a rede credenciada Parkaz, com validação dos dados ao longo da jornada.',
    story: [
      {
        label: 'Desafio',
        value:
          'Organizar uma coleta extensa de dados empresariais sem transformar o cadastro em uma experiência confusa.',
      },
      {
        label: 'Estratégia',
        value: 'Dividir a jornada em seis etapas, mostrar o progresso e validar as informações no momento adequado.',
      },
      {
        label: 'Entrega',
        value:
          'Interface responsiva publicada, integração com Google Sheets e uma experiência guiada do início ao envio.',
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
    question: 'Como funciona o primeiro contato?',
    answer:
      'Você apresenta o contexto pelo WhatsApp. A partir disso, entendemos o objetivo, as prioridades e se existe um caminho em que a Noumena Labs possa ajudar.',
  },
  {
    question: 'Já preciso ter um escopo pronto?',
    answer:
      'Não. Podemos começar por uma necessidade, uma ideia ou um problema. A definição do caminho e do escopo faz parte da etapa inicial.',
  },
  {
    question: 'O que está incluído no preço?',
    answer:
      'Cada serviço mostra a entrega base, os limites e as condições. Os valores “a partir de” dependem do escopo. Confirmamos as entregas e o valor total antes da contratação; pedidos adicionais são combinados separadamente.',
  },
  {
    question: 'Domínio, hospedagem e ferramentas estão incluídos?',
    answer:
      'Esses custos são separados e informados antes da contratação, conforme a necessidade. As contas ficam com o cliente. WhatsApp Business básico e Perfil da Empresa no Google são gratuitos; o valor cobrado é pelo trabalho de configuração e orientação.',
  },
  {
    question: 'Preciso contratar uma mensalidade?',
    answer:
      'A manutenção de site é opcional e custa R$ 190/mês para o escopo indicado. Inclui checagem mensal e até 45 minutos de alterações de conteúdo, sem acúmulo. Domínio e hospedagem ficam separados. Correções de defeitos da entrega não dependem desse plano.',
  },
  {
    question: 'E se eu precisar de um sistema personalizado?',
    answer:
      'Avaliamos a rotina, as integrações e a viabilidade antes de propor um projeto sob orçamento. Sistemas personalizados e análises mais amplas têm escopo próprio; não são produtos prontos incluídos nas ofertas base.',
  },
  {
    question: 'O atendimento é remoto?',
    answer:
      'Os projetos digitais podem ser atendidos remotamente em todo o Brasil. O suporte é agendado e depende de avaliação do problema. Atendimento presencial depende da região e da disponibilidade, com deslocamento combinado à parte.',
  },
  {
    question: 'O que significa o nome Noumena?',
    answer:
      'O nome Noumena nasceu do meu gosto pela leitura de Immanuel Kant. Ele se inspira na ideia de olhar além da forma como as coisas aparecem à primeira vista. Essa referência combina com a maneira como penso tecnologia: antes de construir uma solução, procuro compreender o problema com mais profundidade.',
  },
]
