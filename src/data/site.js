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

const webCosts = 'Domínio e hospedagem pagos separadamente, em contas do cliente. Domínio é o endereço do site; hospedagem é o serviço que o mantém disponível na internet. Manutenção é opcional.'
const webConditions =
  'Textos e imagens são fornecidos por você. Inclui até duas rodadas de ajustes no que foi combinado; em cada rodada, você reúne os pedidos de revisão. Criação de conteúdo, novas páginas, seções e funções são orçadas à parte.'

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
        description: 'Uma página para apresentar seu negócio, mostrar seus serviços e facilitar o contato pelo WhatsApp.',
        price: { type: 'fixed', amount: 597 },
        includes: [
          'Até cinco seções em uma página, como apresentação, serviços e contato',
          'Design responsivo para celular e computador, com sua identidade visual e conteúdo',
          'Botão de WhatsApp, localização e publicação do site',
        ],
        conditions: webConditions,
        externalCosts: webCosts,
        cta: 'Quero minha página',
      }),
      offer({
        id: 'catalogo-online',
        title: 'Catálogo online',
        description: 'Seus produtos com fotos e preços em um link, para o cliente consultar e iniciar um pedido pelo WhatsApp.',
        price: { type: 'from', amount: 897 },
        includes: [
          'Até 20 itens em três categorias',
          'Fotos, descrições e preços fornecidos por você',
          'Mensagem de pedido pelo WhatsApp em cada item',
        ],
        conditions: `${webConditions} Não inclui pagamento online, atualização automática de estoque nem painel de edição para você cadastrar ou alterar produtos por conta própria.`,
        externalCosts: webCosts,
        cta: 'Quero meu catálogo',
      }),
      offer({
        id: 'site-institucional',
        title: 'Site institucional',
        description: 'Um site com páginas para apresentar sua empresa, seus serviços e suas formas de contato.',
        price: { type: 'from', amount: 1297 },
        includes: [
          'Até cinco páginas de apresentação, com até cinco seções de conteúdo em cada uma',
          'Um padrão visual compartilhado, com design responsivo para celular e computador',
          'Contato pelo WhatsApp e publicação',
        ],
        conditions: `${webConditions} Seções são blocos como apresentação, serviços e contato. As páginas, os materiais e o valor final são confirmados antes da contratação. Blog, loja virtual, área de login e painel administrativo são projetos separados.`,
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
        description: 'Perfil, catálogo e respostas prontas organizados para facilitar seu atendimento pelo WhatsApp.',
        price: { type: 'fixed', amount: 247 },
        includes: [
          'Um número, perfil e até 10 itens no catálogo',
          'Cinco respostas rápidas, etiquetas para organizar conversas e mensagens de saudação e ausência',
          'Orientação de uso e uma rodada de ajustes',
        ],
        conditions:
          'Você fornece fotos, preços e informações. Respostas rápidas são mensagens prontas que o atendente seleciona e envia. Não inclui chatbot (robô de conversa), envio de mensagens em massa nem atendimento aos seus clientes.',
        externalCosts:
          'O aplicativo básico é gratuito. O valor é pela configuração e orientação; eventuais serviços pagos são contratados separadamente.',
        cta: 'Quero organizar meu WhatsApp',
      }),
      offer({
        id: 'perfil-google',
        title: 'Perfil da Empresa no Google',
        description: 'Configuração das informações do seu negócio no Google, como endereço, horários, fotos e telefone.',
        price: { type: 'fixed', amount: 247 },
        includes: [
          'Um estabelecimento que atenda às regras do Google, com acesso autorizado por você',
          'Dados, categorias, horários e até 10 fotos fornecidas',
          'Orientação para verificação e uma rodada de ajustes',
        ],
        conditions:
          'Antes de contratar, verificamos se o negócio atende às regras do Google e se há acesso ao perfil. A aprovação e o prazo de verificação dependem do Google. Não inclui recuperação de perfil suspenso nem garantia de posição nas buscas.',
        externalCosts:
          'O perfil é gratuito. Você paga pela configuração e orientação, não por uma taxa do Google. Anúncios não estão incluídos.',
        cta: 'Quero organizar meu perfil no Google',
      }),
      offer({
        id: 'clientes-crm',
        title: 'Organização de clientes e orçamentos',
        description: 'Configuração de um CRM, uma ferramenta para organizar clientes, acompanhar orçamentos e saber quando retomar cada contato.',
        price: { type: 'from', amount: 797 },
        includes: [
          'Um funil de acompanhamento: etapas para organizar cada contato, em uma ferramenta usada por até três pessoas',
          'Importação de até 200 contatos já organizados',
          'Orientação de uso e até duas rodadas de ajustes',
        ],
        conditions:
          'Configuramos uma ferramenta pronta compatível com sua rotina. Não inclui desenvolver um sistema próprio, corrigir uma base de contatos desorganizada, conectar outras ferramentas, buscar clientes ou negociar em seu nome.',
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
        description: 'Uma planilha para organizar uma rotina do negócio, como pedidos, despesas ou vendas.',
        price: { type: 'from', amount: 497 },
        includes: [
          'Uma rotina do negócio organizada em até três abas da planilha',
          'Fórmulas para cálculos e validações para ajudar no preenchimento correto, com até 500 linhas de dados',
          'Orientação e até duas rodadas de ajustes',
        ],
        conditions:
          'Os dados devem ser fornecidos em uma estrutura combinada, com as colunas identificadas. Correção extensa de informações, novas regras de cálculo e conexão com outros sistemas são orçadas à parte.',
        externalCosts: 'Licença da ferramenta de planilhas, se necessária, é paga pelo cliente.',
        cta: 'Quero organizar meu controle',
      }),
      offer({
        id: 'automacao-tarefa',
        title: 'Automação de uma tarefa',
        description: 'Integração entre duas ferramentas para executar uma tarefa automaticamente e reduzir o trabalho manual repetitivo.',
        price: { type: 'from', amount: 997 },
        includes: [
          'Um gatilho (evento inicial) e até três ações em uma única sequência entre duas ferramentas',
          'Registro de falhas e instruções para retomar o funcionamento',
          'Testes, orientação e até duas rodadas de ajustes',
        ],
        conditions:
          'Antes de contratar, verificamos os acessos e se as ferramentas já permitem a conexão necessária. A proposta define o evento inicial, as ações, o volume esperado e o que acontece em caso de falha. Caminhos alternativos, regras complexas, outras ferramentas, conexões personalizadas e acompanhamento contínuo são orçados à parte.',
        externalCosts:
          'APIs são recursos que permitem a comunicação entre sistemas e podem ter cobrança de uso. Esses custos, assinaturas, hospedagem e cobranças por mensagens ou execuções são pagos separadamente, com limites combinados.',
        cta: 'Quero automatizar uma tarefa',
      }),
      offer({
        id: 'painel-indicadores',
        title: 'Painel de vendas ou operação',
        description: 'Um dashboard, ou painel de indicadores, para visualizar os principais números do negócio, com atualização manual dos dados.',
        price: { type: 'from', amount: 897 },
        includes: [
          'Uma tabela organizada em Excel, CSV ou Google Sheets, com até 500 linhas iniciais e 20 colunas',
          'Até cinco indicadores com atualização manual',
          'Instruções de uso por escrito e até duas rodadas de ajustes',
        ],
        conditions:
          'Antes de contratar, conferimos um arquivo de exemplo e definimos os cinco indicadores. CSV é um formato de arquivo que guarda dados em tabela. As colunas devem estar identificadas. Combinar tabelas ou arquivos, corrigir muitos registros, conectar sistemas, atualizar dados automaticamente e fazer análises recorrentes são serviços separados.',
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
        description: 'Ajuda à distância para identificar problemas no computador ou em programas e tentar resolvê-los.',
        price: { type: 'fixed', amount: 120, unit: 'por sessão de até 1 hora' },
        includes: [
          'Avaliação inicial para verificar se o atendimento pode ser feito à distância',
          'Uma sessão de até 60 minutos em um computador',
          'Identificação do problema, procedimentos possíveis e orientação sobre os próximos passos',
        ],
        conditions:
          'Atendimento agendado. Nem todo problema pode ser resolvido em uma hora. Tempo adicional é combinado antes de continuar. Reparos de hardware (peças do computador) e recuperação de dados não estão incluídos.',
        externalCosts: 'Licenças e serviços pagos necessários ao computador são de responsabilidade do cliente.',
        cta: 'Quero agendar um suporte',
      }),
      offer({
        id: 'formatacao',
        title: 'Formatação e configuração',
        description: 'Reinstalação do sistema e configuração dos programas combinados, com backup dos arquivos definidos antes do serviço.',
        price: { type: 'from', amount: 297 },
        includes: [
          'Um computador com HD ou SSD em boas condições de funcionamento',
          'Backup de até 20 GB: cópia dos arquivos combinados, conferida antes da formatação',
          'Sistema, programas acordados e drivers para o funcionamento dos componentes, com orientação',
        ],
        conditions:
          'Antes de contratar, avaliamos o equipamento, os arquivos que serão copiados e a forma de atendimento. O serviço presencial depende da região e da disponibilidade. Recuperação de dados e troca de peças não estão incluídas.',
        externalCosts: 'Licenças, peças, mídia de backup e deslocamento são cobrados separadamente quando necessários.',
        cta: 'Quero preparar meu computador',
      }),
      offer({
        id: 'manutencao-site',
        title: 'Manutenção de site',
        description: 'Manutenção mensal com checagem de funcionamento e pequenas atualizações de conteúdo, como textos, fotos e informações.',
        price: { type: 'monthly', amount: 129 },
        includes: [
          'Um site simples, após avaliação técnica',
          'Checagem mensal de funcionamento',
          'Até 45 minutos de alterações de conteúdo por mês',
        ],
        conditions:
          'Contratação opcional. Os 45 minutos são válidos para cada mês; o tempo não utilizado não passa para o mês seguinte. Atendimento agendado, sem plantão 24 horas. Novas páginas, mudanças no visual e funções adicionais são orçadas à parte. Correções de defeitos da entrega não dependem deste plano.',
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
    'Avaliação da necessidade do seu negócio e das possibilidades técnicas. As funcionalidades, os limites da entrega e o valor são definidos em uma proposta própria.',
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
    description: 'Uma página para apresentar seu negócio e o WhatsApp Business configurado para facilitar o atendimento.',
    price: { type: 'fixed', amount: 797 },
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
    description: 'Site com apresentação da empresa, catálogo de produtos e configuração das informações do negócio no Google.',
    price: { type: 'from', amount: 1997 },
    includes: [
      'Até cinco páginas, com até cinco seções em cada uma, e catálogo integrado de até 20 itens',
      'WhatsApp para contato e pedidos por item',
      'Configuração de um estabelecimento que atenda às regras do Google, com acesso autorizado',
    ],
    conditions: `${webConditions} As páginas compartilham um padrão visual responsivo, adaptado ao celular e ao computador. Seções são blocos como apresentação, serviços e contato. O conteúdo e o valor final são confirmados antes de contratar. Catálogo com até três categorias, sem pagamento online, atualização automática de estoque ou painel para editar produtos. Blog, login e painel administrativo são projetos separados. Google inclui até 10 fotos fornecidas e orientação de verificação, sem garantia de aprovação, prazo ou posição nas buscas.`,
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
      'Envie uma mensagem pelo WhatsApp contando qual é o seu negócio e o que precisa melhorar. Se tiver um site, exemplos ou referências, pode compartilhar os links. A conversa inicial ajuda a entender a necessidade; as entregas e as condições são definidas na proposta.',
  },
  {
    question: 'Preciso saber exatamente o que contratar?',
    answer:
      'Não. Você pode começar contando uma dificuldade ou uma ideia. A partir disso, avaliamos qual serviço faz sentido. O escopo, ou seja, o que será entregue e seus limites, fica registrado na proposta.',
  },
  {
    question: 'O que está incluído no preço?',
    answer:
      'Cada serviço informa o que está incluído, os limites e os custos separados. “A partir de” indica o valor inicial para a entrega descrita. O preço final é confirmado após avaliar sua necessidade, antes da contratação. Pedidos adicionais são orçados antes de serem executados.',
  },
  {
    question: 'O que preciso enviar para começar?',
    answer:
      'Depende do serviço. Para sites e catálogos, você fornece textos, imagens e informações do negócio. Para planilhas e painéis, os dados devem estar organizados no formato combinado. Configurações e integrações podem exigir acessos autorizados. A lista de materiais e a forma de conceder acesso são combinadas antes do início.',
  },
  {
    question: 'Qual é o prazo de entrega?',
    answer:
      'O prazo depende do serviço, da quantidade de conteúdo e das funções necessárias. A proposta informa o prazo e as condições para iniciar sua contagem, incluindo os materiais e acessos necessários. Mudanças no pedido ou atrasos no envio de informações podem exigir um novo prazo, combinado com você.',
  },
  {
    question: 'Posso pedir alterações?',
    answer:
      'Sim. Cada serviço informa quantas rodadas de ajustes estão incluídas. Em cada rodada, você reúne os pedidos de revisão do que foi combinado. Novas páginas, funções ou outras mudanças fora da proposta são orçadas separadamente. Correções de defeitos da entrega não dependem da contratação de manutenção.',
  },
  {
    question: 'Domínio, hospedagem e ferramentas estão incluídos?',
    answer:
      'Esses custos são separados e informados antes da contratação. Domínio é o endereço do site; hospedagem é o serviço que o mantém disponível na internet. As contas ficam com você. O WhatsApp Business básico e o Perfil da Empresa no Google são gratuitos: a cobrança é pela configuração e orientação. Ferramentas pagas são contratadas separadamente, quando necessárias.',
  },
  {
    question: 'Preciso contratar uma mensalidade?',
    answer:
      'A manutenção da Noumena Labs é opcional. O plano de R$ 129/mês inclui checagem mensal do site e até 45 minutos para alterações de conteúdo; o tempo não usado não passa para o mês seguinte. Domínio, hospedagem e ferramentas podem ter cobranças recorrentes próprias, mesmo sem esse plano. Correções de defeitos da entrega não dependem da mensalidade.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer:
      'O valor total, as formas de pagamento e os vencimentos são informados na proposta antes da contratação. Se houver entrada ou parcelamento, os valores e as condições também estarão descritos. Custos de ferramentas e outros serviços externos são apresentados separadamente.',
  },
  {
    question: 'E se eu precisar de um sistema personalizado?',
    answer:
      'Primeiro avaliamos o que o sistema precisa fazer e se deve se conectar a outras ferramentas. As funcionalidades, os limites, o prazo e o preço são definidos em uma proposta específica. O desenvolvimento de um sistema personalizado não está incluído nos serviços de configuração de ferramentas prontas.',
  },
  {
    question: 'O atendimento é remoto?',
    answer:
      'Sim. Os projetos digitais podem ser atendidos à distância em todo o Brasil. O suporte remoto é agendado, após avaliar se o problema pode ser atendido dessa forma. Em Ourinhos e região, o atendimento presencial depende da localidade e da disponibilidade, com deslocamento combinado à parte.',
  },
  {
    question: 'O que significa o nome Noumena?',
    answer:
      'O nome Noumena nasceu do meu gosto pela leitura de Immanuel Kant e da ideia de olhar além das primeiras aparências. Essa inspiração orienta o trabalho: antes de construir uma solução, compreender o problema.',
  },
]
