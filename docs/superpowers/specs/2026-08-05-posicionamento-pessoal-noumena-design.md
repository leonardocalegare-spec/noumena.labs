# Posicionamento pessoal da Noumena — Especificação

## Objetivo

Tornar visível no site o posicionamento aprovado da Noumena Labs como marca pessoal e laboratório de tecnologia de Leonardo, sem apresentar uma estrutura empresarial que ainda não existe.

## Conteúdo aprovado

Na seção “Sobre o fundador”, substituir a frase atual por:

> A Noumena Labs é minha marca pessoal e meu laboratório de tecnologia — um espaço onde reúno projetos, estudos e soluções construídas a partir de problemas reais. Ela nasce desse movimento: compreender o problema com profundidade antes de decidir o que construir.

## Integração

- Preservar o título, os demais parágrafos, a assinatura e a composição visual da seção.
- Reutilizar a classe `founder-philosophy` existente.
- Não adicionar uma nova seção nem repetir o posicionamento na FAQ.
- Não alterar serviços, identidade visual, componentes, rotas ou integrações.
- Não anunciar CNPJ, equipe ou atuação futura como se já estivesse disponível.

## Validação

- Executar lint, testes, build e E2E.
- Confirmar a nova definição na Home renderizada.
- Revisar a seção em desktop, tablet, 390 px e 320 px.
- Verificar legibilidade, ausência de overflow e estabilidade da composição.
- Publicar somente após confirmar o diff isolado.
