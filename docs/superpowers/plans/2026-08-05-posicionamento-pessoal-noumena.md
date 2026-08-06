# Posicionamento pessoal da Noumena Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exibir na seção “Sobre o fundador” a definição da Noumena Labs como marca pessoal e laboratório de tecnologia de Leonardo.

**Architecture:** Alterar somente o conteúdo do parágrafo `founder-philosophy` já existente em `HomePage.jsx`. A estrutura React, o CSS e o comportamento da página serão preservados; a integração ocorrerá pelo mesmo componente e pela mesma classe já usados em produção.

**Tech Stack:** React 19, Vite, JavaScript, Node.js Test Runner e Playwright.

## Global Constraints

- Usar exatamente o texto aprovado na especificação.
- Não apresentar CNPJ, equipe ou operação futura como realidade atual.
- Não modificar estilos, componentes, rotas, dependências ou integrações.
- Preservar alterações locais preexistentes e selecionar somente o trecho desta entrega no Git.
- Validar desktop, tablet, 390 px e 320 px.

---

### Task 1: Exibir o posicionamento pessoal na seção do fundador

**Files:**
- Modify: `src/pages/HomePage.jsx:323`
- Create: `docs/superpowers/specs/2026-08-05-posicionamento-pessoal-noumena-design.md`
- Create: `docs/superpowers/plans/2026-08-05-posicionamento-pessoal-noumena.md`

**Interfaces:**
- Consumes: parágrafo React com a classe `founder-philosophy`.
- Produces: posicionamento pessoal visível na Home sem alterar a interface do componente.

- [ ] **Step 1: Substituir o texto do parágrafo existente**

Usar:

```jsx
<p className="founder-philosophy">A Noumena Labs é minha marca pessoal e meu laboratório de tecnologia — um espaço onde reúno projetos, estudos e soluções construídas a partir de problemas reais. Ela nasce desse movimento: compreender o problema com profundidade antes de decidir o que construir.</p>
```

- [ ] **Step 2: Executar as verificações automatizadas**

Run:

```powershell
npm run lint
npm test
npm run build
npm run test:e2e -- --workers=1
git diff --check
```

Expected: todos os comandos concluem sem falhas; os E2E mantêm 22 testes aprovados e 6 ignorados conforme a configuração atual.

- [ ] **Step 3: Revisar a renderização**

Abrir a seção “Sobre o fundador” em 1440 px, 768 px, 390 px e 320 px. Confirmar:

- texto completo e legível;
- ausência de overflow horizontal;
- preservação da assinatura e da composição visual;
- nenhum conteúdo empresarial não comprovado.

- [ ] **Step 4: Criar um commit isolado**

Selecionar somente o novo parágrafo e os dois documentos desta entrega. Criar o commit:

```powershell
git commit -m "Apresenta a Noumena como marca pessoal"
git push origin main
```

Expected: o commit não inclui alterações responsivas preexistentes em `HomePage.jsx`, `styles.css` ou `e2e/site.spec.js`.

- [ ] **Step 5: Confirmar a publicação**

Acompanhar `Deploy GitHub Pages` e verificar `https://leonardocalegare-spec.github.io/noumena.labs/#sobre`.

Expected: deploy concluído com sucesso e posicionamento presente no módulo servido em produção.
