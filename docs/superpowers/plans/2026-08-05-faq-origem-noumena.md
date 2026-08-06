# FAQ sobre a origem da Noumena Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Acrescentar à FAQ uma explicação pessoal e breve sobre a inspiração kantiana do nome Noumena e publicar a mudança no GitHub Pages.

**Architecture:** Manter a estrutura atual orientada por dados. A nova entrada será adicionada no início de `faqItems`, enquanto `HomePage` continuará apenas renderizando a coleção e abrirá automaticamente o primeiro item. O texto introdutório será atualizado para representar o novo conteúdo, sem criar componentes ou estilos.

**Tech Stack:** React 19, Vite, JavaScript, Node.js Test Runner e Playwright.

## Global Constraints

- Usar primeira pessoa na explicação da origem do nome.
- Preservar as quatro perguntas atuais e sua ordem relativa.
- Não apresentar a Noumena como empresa formal, equipe ou CNPJ ativo.
- Não alterar estilos, componentes, rotas, dependências ou integrações.
- Preservar todas as mudanças locais preexistentes e manter o commit restrito a esta FAQ e sua documentação.
- Validar desktop, tablet, 390 px e 320 px; em 320 px, verificar overflow e alvos de interação.

---

### Task 1: Adicionar a origem pessoal do nome à FAQ

**Files:**
- Modify: `test/site-data.test.js:28-32`
- Modify: `src/data/site.js:88-107`
- Modify: `src/pages/HomePage.jsx:274-286`
- Verify: `docs/superpowers/specs/2026-08-05-faq-origem-noumena-design.md`

**Interfaces:**
- Consumes: `faqItems: Array<{ question: string, answer: string }>` exportado por `src/data/site.js`.
- Produces: cinco itens de FAQ, com “O que significa o nome Noumena?” na posição `0` e renderização aberta inicialmente pelo comportamento `open={index === 0}` já existente.

- [ ] **Step 1: Escrever o teste que representa o conteúdo aprovado**

Adicionar a `test/site-data.test.js`:

```js
test('FAQ apresenta a origem pessoal do nome Noumena antes das dúvidas comerciais', () => {
  assert.equal(faqItems.length, 5)
  assert.equal(faqItems[0].question, 'O que significa o nome Noumena?')
  assert.match(faqItems[0].answer, /meu gosto pela leitura de Immanuel Kant/)
  assert.match(faqItems[0].answer, /antes de construir uma solução/)
})
```

- [ ] **Step 2: Executar o teste e confirmar a falha esperada**

Run: `node --test test/site-data.test.js`

Expected: FAIL porque `faqItems` ainda possui quatro itens e a primeira pergunta atual é comercial.

- [ ] **Step 3: Adicionar a nova entrada no início de `faqItems`**

Adicionar a `src/data/site.js` antes das quatro perguntas existentes:

```js
{
  question: 'O que significa o nome Noumena?',
  answer: 'O nome Noumena nasceu do meu gosto pela leitura de Immanuel Kant. Ele se inspira na ideia de olhar além da forma como as coisas aparecem à primeira vista. Essa referência combina com a maneira como penso tecnologia: antes de construir uma solução, procuro compreender o problema com mais profundidade.',
},
```

- [ ] **Step 4: Atualizar apenas a introdução da FAQ em `HomePage`**

Substituir o parágrafo atual por:

```jsx
<p>Você não precisa chegar com um escopo pronto. As respostas abaixo explicam a origem da Noumena, como funciona o primeiro contato e quais projetos podemos avaliar.</p>
```

- [ ] **Step 5: Executar o teste e confirmar que passou**

Run: `node --test test/site-data.test.js`

Expected: todos os testes do arquivo passam.

- [ ] **Step 6: Executar a validação automatizada completa**

Run:

```powershell
npm run lint
npm test
npm run build
npm run test:e2e -- --workers=1
git diff --check
```

Expected: lint, testes, build e E2E passam; `git diff --check` não encontra erros de whitespace.

- [ ] **Step 7: Revisar a interface nos viewports exigidos**

Abrir a Home em 1440 px, 768 px, 390 px e 320 px. Confirmar:

- cinco perguntas numeradas de `01` a `05`;
- nova pergunta aberta inicialmente;
- resposta completa e legível;
- ausência de overflow horizontal;
- controles com pelo menos 44 px em 320 px.

- [ ] **Step 8: Criar um commit isolado**

Selecionar somente:

```text
src/data/site.js
src/pages/HomePage.jsx (somente o trecho da introdução da FAQ)
test/site-data.test.js
docs/superpowers/specs/2026-08-05-faq-origem-noumena-design.md
docs/superpowers/plans/2026-08-05-faq-origem-noumena.md
```

Run:

```powershell
git commit -m "Explica a origem do nome Noumena na FAQ"
git push origin main
```

Expected: o commit não inclui as outras alterações locais e `origin/main` aponta para o novo commit.

- [ ] **Step 9: Confirmar a publicação**

Acompanhar o workflow `Deploy GitHub Pages` e abrir `https://leonardocalegare-spec.github.io/noumena.labs/#faq`.

Expected: deploy concluído com sucesso e nova FAQ visível em produção.
