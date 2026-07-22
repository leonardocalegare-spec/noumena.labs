# Noumena Labs

Site institucional da **Noumena Labs**, criado para apresentar serviços de desenvolvimento web, consultoria em TI, projetos realizados e formas de contato.

🔗 **Site publicado:**  
https://leonardocalegare-spec.github.io/noumena.labs/

## Sobre o projeto

A Noumena Labs ajuda pequenas empresas a transformar necessidades e ideias em soluções digitais claras, úteis e bem construídas.

O site apresenta:

- Landing pages;
- Consultoria em TI;
- Projetos e cases;
- Processo de trabalho;
- Perguntas frequentes;
- Informações sobre o fundador;
- Contato direto pelo WhatsApp.

## Tecnologias

- React 19;
- Vite;
- JavaScript;
- CSS responsivo;
- GitHub Actions;
- GitHub Pages;
- Node.js Test Runner;
- Playwright;
- ESLint.

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
│   ├── data/
│   ├── lib/
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

Enquanto o projeto estiver publicado no endereço padrão do GitHub Pages, o build utiliza:

```text
/noumena.labs/
```

Essa configuração está definida no workflow de publicação por meio da variável:

```text
VITE_BASE_PATH
```

Quando um domínio próprio for conectado, essa base deverá ser alterada para:

```text
/
```

As URLs canônicas, sociais e do sitemap também deverão ser atualizadas nessa ocasião.

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

## Autor

**Leonardo Henrique Calegare**  
Fundador da Noumena Labs e estudante de Ciência da Computação.

## Contato

Entre em contato pelo site:

https://leonardocalegare-spec.github.io/noumena.labs/

## Licença e uso

Este é um projeto institucional da Noumena Labs.

O conteúdo, a identidade visual, os textos e os materiais de apresentação não devem ser reutilizados comercialmente sem autorização.
