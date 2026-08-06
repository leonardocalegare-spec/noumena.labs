# FAQ sobre a origem da Noumena — Especificação

## Objetivo

Tornar a Noumena Labs mais pessoal ao explicar, na seção de perguntas frequentes, por que a leitura de Immanuel Kant inspirou o nome da marca.

Esta etapa não reposiciona todo o site. Ela introduz a origem pessoal do nome e estabelece como direção futura que a Noumena seja apresentada como a marca pessoal e o laboratório de tecnologia de Leonardo, capazes de evoluir gradualmente para uma operação formal.

## Conteúdo aprovado

**Pergunta:** O que significa o nome Noumena?

**Resposta:** O nome Noumena nasceu do meu gosto pela leitura de Immanuel Kant. Ele se inspira na ideia de olhar além da forma como as coisas aparecem à primeira vista. Essa referência combina com a maneira como penso tecnologia: antes de construir uma solução, procuro compreender o problema com mais profundidade.

## Posicionamento

A nova resposta deve:

- usar primeira pessoa, pois apresenta uma origem pessoal;
- relacionar a referência filosófica ao modo de pensar tecnologia;
- evitar apresentar uma definição acadêmica extensa da filosofia de Kant;
- não sugerir que a Noumena já possui equipe, CNPJ ou uma estrutura que ainda não existe;
- preservar a possibilidade de crescimento futuro da marca.

Como princípio para trabalhos posteriores, a Noumena Labs será tratada como a marca pessoal e o laboratório de tecnologia de Leonardo: um espaço para projetos, estudos e soluções construídas a partir de problemas reais.

## Integração com a FAQ

A pergunta sobre o nome será o primeiro item da lista e ficará aberta inicialmente, seguindo o comportamento atual da página. Essa posição prioriza a identidade da marca antes das dúvidas comerciais.

O texto introdutório da seção será ajustado para mencionar que a FAQ também explica a origem da Noumena. A sugestão é:

> Você não precisa chegar com um escopo pronto. As respostas abaixo explicam a origem da Noumena, como funciona o primeiro contato e quais projetos podemos avaliar.

As quatro perguntas atuais serão preservadas na mesma ordem após a nova entrada.

## Implementação prevista

- `src/data/site.js`: adicionar a nova pergunta e resposta no início de `faqItems`.
- `src/pages/HomePage.jsx`: ajustar somente o parágrafo introdutório da FAQ.
- `test/site-data.test.js`: acrescentar uma verificação para a presença da pergunta e da referência pessoal a Kant.

Não haverá alteração de componentes, estilos, dependências, rotas ou integrações.

## Validação

- Executar lint, testes e build.
- Confirmar que os cinco itens da FAQ aparecem e mantêm a numeração automática.
- Revisar a seção em desktop, tablet, 390 px e 320 px.
- Em 320 px, verificar ausência de overflow e manutenção dos alvos de interação.
- Confirmar que apenas a nova pergunta permanece aberta inicialmente.

## Fora do escopo

- Reescrever toda a comunicação institucional.
- Anunciar CNPJ, equipe, serviços futuros ou experiência ainda não comprovada.
- Alterar a identidade visual ou a estrutura da página.
- Publicar, criar commit ou enviar mudanças ao GitHub sem autorização específica.
