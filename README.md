# Noumena Labs

Site institucional da **Noumena Labs**, criado para apresentar serviços, preços e escopos de tecnologia para pequenos negócios, projetos realizados e formas de contato.

🔗 **Site publicado:**  
https://noumenalabs.com.br/

## Sobre o projeto

A Noumena Labs ajuda pequenas empresas a transformar necessidades e ideias em soluções digitais claras, úteis e bem construídas.

O site apresenta:

- Sites e catálogos;
- Presença local e atendimento;
- Planilhas e automações;
- Suporte e manutenção;
- Pacotes Presença Digital e Negócio Online;
- Sistemas e integrações específicas sob orçamento;
- Projetos e cases;
- Cadernos com vídeos autorais, estudos e aprendizados;
- Perguntas frequentes;
- Contato direto pelo WhatsApp.

## Catálogo comercial

Cada card apresenta uma categoria, três serviços e seus preços. Ao abrir uma categoria, o visitante encontra entregas, condições, custos externos e um contato específico pelo WhatsApp. O retorno preserva a categoria e o foco do teclado, inclusive após redimensionar a tela.

Os dados públicos ficam em `src/data/site.js`; `src/utils/serviceOffers.js` formata o mesmo preço para a interface e a mensagem de contato. Valores internos de custo, margem e negociação não fazem parte do catálogo público.

| Categoria | Ofertas base |
|---|---|
| Sites e catálogos | Página a partir de R$ 890; catálogo a partir de R$ 1.490; site institucional a partir de R$ 2.490 |
| Presença local e atendimento | WhatsApp Business R$ 290; Perfil da Empresa no Google R$ 290; organização de clientes em CRM a partir de R$ 1.290 |
| Planilhas e automações | Planilha a partir de R$ 990; automação a partir de R$ 2.190; painel a partir de R$ 2.490 |
| Suporte e manutenção | Suporte remoto R$ 150 por sessão de até 1h; formatação a partir de R$ 390; manutenção de site R$ 190/mês |

Os pacotes combinam escopos base: Presença Digital por R$ 1.090 e Negócio Online a partir de R$ 3.490. Domínio, hospedagem, licenças e consumo de terceiros são separados quando aplicáveis. A manutenção é opcional; não há checkout, cobrança automática, CRM operacional ou sistema personalizado implementado neste site.

## Tecnologias

- React 19;
- Vite;
- JavaScript;
- CSS responsivo;
- GitHub Actions;
- GitHub Pages;
- Node.js Test Runner;
- Playwright;
- ESLint;
- React Router;
- Markdown editorial.

## Executando localmente

### Requisitos

- Node.js 22 ou superior;
- npm.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/leonardocalegare-spec/noumena.labs.git
```

Entre na pasta:

```bash
cd noumena.labs
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite mostrará no terminal o endereço local do projeto.

## Comandos disponíveis

```bash
npm run dev
```

Inicia o ambiente de desenvolvimento.

```bash
npm run lint
```

Analisa a qualidade e a consistência do código.

```bash
npm test
```

Executa os testes automatizados de lógica, dados e configuração.

```bash
npm run test:e2e
```

Executa os testes reais de interface em perfis desktop e mobile.

```bash
npm run content:new
```

Cria um rascunho dos Cadernos por meio de perguntas no terminal.

```bash
npm run content:check
```

Valida metadados, slugs, códigos e requisitos de publicação.

```bash
npm run content:list
```

Lista os conteúdos e seus estados editoriais.

```bash
npm run content:publish -- slug-da-publicacao
```

Publica um rascunho válido e preenche as datas editoriais.

```bash
npm run content:archive -- slug-da-publicacao
```

Retira uma publicação das listagens sem apagar seu histórico.

```bash
npm run build
```

Gera a versão de produção na pasta `dist`.

```bash
npm run preview
```

Executa localmente a versão gerada para produção.

```bash
npm run security:check
```

Consulta vulnerabilidades conhecidas nas dependências.

## Estrutura principal

```text
noumena.labs/
├── .github/
│   ├── workflows/
│   │   ├── deploy-pages.yml
│   │   └── security.yml
│   └── dependabot.yml
├── e2e/
├── scripts/
├── public/
│   ├── cases/
│   ├── fonts/
│   ├── 404.html
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og-image.png
├── src/
│   ├── components/
│   ├── content/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── test/
├── index.html
├── package.json
├── playwright.config.js
├── vercel.json
└── vite.config.js
```

## Publicação

O projeto é publicado automaticamente no GitHub Pages.

O build também cria caminhos estáticos para `/cadernos/` e para cada publicação com `status: published`, permitindo acesso direto às páginas editoriais.

Quando uma alteração é enviada para a branch `main`, o workflow:

1. Instala as dependências;
2. Executa o lint;
3. Executa os testes automatizados;
4. Executa os testes de interface;
5. Gera o build de produção;
6. Envia a pasta `dist`;
7. Publica a nova versão no GitHub Pages.

O andamento pode ser acompanhado na aba **Actions** do repositório.

## URL base

O domínio principal é servido a partir da raiz:

```text
/
```

O `vite.config.js` usa essa raiz como padrão. O workflow de publicação não precisa definir um subdiretório por meio de:

```text
VITE_BASE_PATH
```

`VITE_BASE_PATH` continua disponível para algum build que precise explicitamente de outra base.

## Qualidade e segurança

O projeto inclui:

- Navegação acessível por teclado;
- Suporte a redução de movimento;
- Layout responsivo;
- Fontes hospedadas localmente;
- Links externos protegidos;
- Testes automatizados e de navegador;
- ESLint;
- Auditoria de dependências;
- Dependabot;
- Workflow periódico de segurança;
- HTTPS no GitHub Pages.

> Alguns headers presentes em `vercel.json` e `public/_headers` são específicos de plataformas que permitem configuração personalizada de respostas HTTP. O GitHub Pages não aplica esses arquivos como headers de segurança.

## Projeto em destaque

### Rede Credenciada Parkaz

Fluxo digital progressivo para cadastro de empresas interessadas em integrar a rede credenciada Parkaz.

Tecnologias e características apresentadas:

- React;
- TypeScript;
- Formulário progressivo;
- Validação dos dados;
- Integração com Google Sheets;
- Experiência responsiva.

## Cadernos Noumena

As publicações ficam em `src/content/cadernos` no formato Markdown. Cada arquivo contém título, slug, resumo, tipo, temas, estado editorial e o conteúdo completo.

Primeira publicação:

- [Da necessidade ao teste: como projetar interfaces para pessoas](https://noumenalabs.com.br/cadernos/da-necessidade-ao-teste/)

Os estados disponíveis são:

- `draft`: aparece somente no desenvolvimento local;
- `published`: entra no site e no sitemap;
- `archived`: permanece no histórico, mas sai das listagens.

Vídeos são hospedados no YouTube e reproduzidos no site por meio do domínio `youtube-nocookie.com`. O player é carregado somente depois da interação do visitante, não usa autoplay e sempre mantém um link alternativo para o YouTube.

O rascunho `primeiro-video.md` é apenas um ponto de partida local e não entra no build público.

## Autor

**Leonardo Henrique Calegare**  
Fundador da Noumena Labs e estudante de Ciência da Computação.

## Contato

Entre em contato pelo site:

https://noumenalabs.com.br/

## Licença e uso

Este é um projeto institucional e proprietário da Noumena Labs.

A consulta pública deste repositório não concede permissão para copiar, modificar, distribuir ou explorar comercialmente o código, o conteúdo, a identidade visual, os textos ou os materiais de apresentação. Consulte o arquivo [LICENSE](LICENSE).
