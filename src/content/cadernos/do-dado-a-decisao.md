---
title: "Do dado à decisão: o que aprendi sobre análise de dados"
slug: do-dado-a-decisao
summary: Um registro sobre como passei a compreender estruturas, bancos de
  dados, análise, visualização e Big Data como partes do mesmo processo de
  construção de conhecimento.
type: study
sequence: 3
cover: data-pipeline
topics:
  - análise de dados
  - visualização
  - bancos de dados
  - big data
publishedAt: 2026-09-08
updatedAt: 2026-09-08
status: published
featured: false
---

## Meu entendimento sobre análise de dados começou a mudar

Antes deste estudo, eu associava análise de dados principalmente a planilhas, cálculos e gráficos. Eu imaginava que o trabalho começava quando uma base já estava pronta e alguém precisava encontrar tendências ou apresentar resultados. Essa visão não estava totalmente errada, mas começava tarde demais.

Ao reunir os conteúdos sobre estruturas de dados, bancos de dados, Big Data, descoberta de conhecimento e visualização, passei a entender que uma análise começa antes de qualquer gráfico. Ela começa com uma pergunta. Depois, depende da forma como os dados são coletados, organizados, armazenados, preparados e interpretados. Se uma dessas etapas for frágil, uma apresentação visual bem construída ainda poderá comunicar uma conclusão equivocada.

Também ficou mais clara para mim a diferença entre dado, informação e conhecimento. Um dado é um registro: um valor de venda, uma data, um produto, uma medição ou uma ação realizada. Quando esses registros recebem contexto e são relacionados, eles podem produzir informação. O conhecimento aparece quando conseguimos interpretar essa informação e usá-la para compreender um problema ou orientar uma decisão.

Isso mudou a pergunta que guia meu estudo. Em vez de pensar apenas em “qual gráfico devo criar?”, comecei a perguntar: “que decisão precisa ser tomada, quais dados podem ajudar e o que preciso verificar antes de confiar neles?”.

## Organizar os dados já faz parte da análise

O estudo de estruturas de dados mostrou que a maneira de organizar elementos influencia diretamente o que conseguimos fazer com eles. Uma lista, uma pilha, uma fila ou uma árvore não é apenas um formato técnico. Cada estrutura estabelece uma forma de inserir, remover, percorrer e localizar informações.

Uma fila, por exemplo, representa bem situações em que a ordem de chegada precisa ser preservada. Uma pilha trabalha com o elemento adicionado mais recentemente, como acontece em históricos de ações que podem ser desfeitas. Árvores ajudam a representar hierarquias e relações de dependência. A escolha não deve acontecer porque uma estrutura parece sofisticada, mas porque suas operações combinam com o problema.

Os tipos abstratos de dados aprofundaram essa ideia. Um TAD descreve um conjunto de dados e as operações permitidas sobre ele, separando o que a estrutura oferece de como ela foi implementada. Essa abstração reduz a quantidade de detalhes que outras partes de um sistema precisam conhecer e favorece componentes mais modulares.

Para mim, a conexão com análise de dados está no fato de que nenhum conjunto é neutro em relação à sua organização. Se os registros são difíceis de consultar, estão duplicados ou foram guardados sem considerar o uso futuro, o trabalho analítico se torna mais lento e inseguro. Preparar uma análise também é decidir quais relações precisam ser preservadas e quais operações serão frequentes.

## A pergunta vem antes da ferramenta

Os materiais sobre analytics reforçaram que a ferramenta não deve definir o problema. Antes de escolher uma tecnologia, é necessário compreender o domínio, o objetivo e a decisão que a organização pretende apoiar.

Uma empresa pode perguntar quanto vendeu no último mês, por que uma categoria perdeu vendas, quais clientes apresentam maior probabilidade de retornar ou qual ação deveria testar. Embora todas essas perguntas envolvam dados, elas não pedem o mesmo tipo de análise.

A análise descritiva ajuda a entender o que aconteceu. A diagnóstica procura fatores relacionados e tenta explicar por que aconteceu. A preditiva estima o que poderá acontecer com base em padrões e premissas. A prescritiva compara possibilidades e procura orientar uma ação. Esses níveis não formam uma escada que toda empresa precisa subir. Muitas decisões importantes podem ser apoiadas por uma análise descritiva simples e confiável.

Também aprendi a diferenciar, sem criar uma divisão absoluta, Business Intelligence e ciência de dados. O BI costuma trabalhar com indicadores, relatórios e acompanhamento de operações já definidas. A ciência de dados tende a explorar questões menos estruturadas, combinar diferentes fontes e construir modelos. Na prática, as duas abordagens podem se complementar. O ponto central continua sendo a pergunta e a qualidade da evidência necessária para respondê-la.

## O caminho do dado até o conhecimento

O processo de descoberta de conhecimento em bancos de dados, conhecido como KDD, organizou vários conceitos que eu havia estudado separadamente. Ele mostra que encontrar um padrão não é um ato isolado, mas parte de um processo iterativo em que pessoas e computadores têm responsabilidades diferentes.

O ponto de partida é compreender o domínio e definir o objetivo. Sem isso, é possível processar uma grande quantidade de dados e ainda produzir algo sem utilidade. Depois vem a seleção dos registros relevantes. Nem toda informação disponível precisa entrar na análise, e incluir dados apenas porque existem pode aumentar ruído, custo e risco.

No pré-processamento, a base é examinada e limpa. Duplicidades, valores ausentes, formatos incompatíveis e registros inconsistentes precisam ser identificados. Essa etapa não é uma correção estética: ela muda a confiança que podemos depositar no resultado.

A transformação prepara os dados para o método escolhido. Datas podem ser decompostas, categorias podem ser padronizadas e diferentes fontes podem precisar de integração. Somente depois disso ocorre a mineração de dados, quando algoritmos procuram padrões, grupos, associações ou previsões.

Por fim, os resultados são interpretados e avaliados. Um padrão matematicamente presente pode não ter relevância para o problema. Pode ser consequência de uma coleta enviesada, de uma relação acidental ou de uma variável que não foi considerada. Por isso, mineração de dados não é sinônimo de KDD: ela é uma etapa dentro de um processo maior, que começa com intenção e termina com avaliação humana.

## Nem todo dado precisa ser armazenado da mesma forma

Estudar bancos relacionais e não relacionais me ajudou a abandonar a ideia de que existe um banco de dados ideal para qualquer situação. O modelo relacional organiza informações em tabelas conectadas por chaves e oferece uma base sólida para integridade, consistência e consultas estruturadas. Ele continua adequado para muitos sistemas administrativos, comerciais e financeiros.

Os bancos NoSQL cresceram junto de necessidades que nem sempre se encaixavam bem nesse modelo: grandes volumes, distribuição entre máquinas, mudanças frequentes de estrutura e dados semiestruturados ou não estruturados. O termo apareceu em contextos diferentes ao longo do tempo e hoje costuma ser interpretado como “não apenas SQL”, não como uma regra de que bancos relacionais devem ser abandonados.

Nos bancos de chave-valor, uma chave identifica diretamente um valor, o que pode favorecer consultas simples e rápidas. Bancos orientados a documentos armazenam estruturas como documentos JSON e permitem que registros relacionados fiquem próximos. Famílias de colunas são usadas em cenários distribuídos e organizam atributos de forma flexível. Bancos de grafos priorizam relações entre entidades e são úteis quando os vínculos são parte central da pergunta.

O aprendizado mais prático foi começar a modelagem pelo fluxo da aplicação e pelas consultas que ela precisa responder. Depois vêm as decisões sobre chaves, tipos, duplicação controlada e algoritmos de acesso. Escolher uma tecnologia apenas por popularidade pode transferir complexidade para o restante do sistema.

## O que mudou com o Big Data

Big Data não significa apenas uma base com muitas linhas. Os materiais apresentam principalmente volume, velocidade e variedade: uma quantidade que desafia uma única máquina, dados produzidos rapidamente e fontes com formatos diferentes. Outros modelos também acrescentam veracidade e valor, lembrando que quantidade sem confiabilidade ou finalidade não cria conhecimento automaticamente.

A Internet das Coisas amplia esse cenário. Sensores, relógios, veículos e equipamentos podem produzir dados continuamente. Essa coleta permite monitoramento e automação, mas também aumenta as responsabilidades relacionadas a qualidade, segurança e privacidade. Se o dado chega em tempo real, a organização precisa decidir o que realmente precisa ser processado naquele momento e o que pode ser armazenado para análise posterior.

Frameworks como Hadoop e Spark surgem nesse contexto. O Hadoop ajudou a popularizar o armazenamento e o processamento distribuídos, dividindo trabalho entre diferentes nós. O Spark trabalha fortemente com processamento em memória e pode reduzir a latência de certas cargas. Isso não significa que toda empresa precise de um cluster. Para conjuntos menores, uma solução simples costuma ser mais barata, compreensível e fácil de manter.

Essa foi uma das lições mais úteis: arquitetura deve acompanhar a escala real do problema. Usar uma tecnologia de Big Data em uma base pequena pode aumentar custo operacional sem melhorar a decisão. Da mesma forma, insistir em uma única máquina quando volume e velocidade já ultrapassaram seus limites pode impedir a análise.

## Visualizar é escolher o que tornar visível

A história da visualização mostra que representar dados graficamente não é uma prática recente. William Playfair é associado à criação ou popularização de diferentes gráficos estatísticos. Charles Joseph Minard combinou variáveis em uma mesma composição para construir narrativas visuais complexas. Mais tarde, autores como Edward Tufte aprofundaram a discussão sobre clareza, comparação e uso responsável dos elementos gráficos.

O que mais me interessou foi perceber que um gráfico não é escolhido pelo formato que parece mais bonito. Ele é escolhido pela pergunta. Um histograma ajuda a observar a distribuição de uma variável numérica. Um gráfico de dispersão coloca duas variáveis em relação e pode revelar agrupamentos ou tendências, mas correlação visual não prova causalidade. Barras facilitam rankings e comparações entre categorias. Coordenadas paralelas permitem examinar várias dimensões, embora possam ficar carregadas quando existem muitas observações. Treemaps representam hierarquias e partes de um todo. Mapas coropléticos associam valores a regiões geográficas, mas exigem cuidado com escalas, áreas e normalização.

Grandes conjuntos trazem ainda o problema do excesso de informação. Muitos pontos podem se sobrepor, padrões pequenos podem desaparecer e uma visualização em tempo real pode exigir grande capacidade computacional. Às vezes, filtrar, agregar ou permitir exploração progressiva comunica melhor do que tentar mostrar tudo de uma vez.

Uma boa visualização, portanto, não substitui a análise. Ela faz parte dela. Ao escolher variáveis, escalas, cores e níveis de detalhe, também escolhemos o que receberá atenção. Essa responsabilidade exige clareza sobre aquilo que o gráfico mostra e, principalmente, sobre aquilo que ele não mostra.

## Pessoas e tecnologias construíram esse caminho

Os materiais também me ajudaram a ligar conceitos a momentos históricos. As contribuições de Playfair e Minard mostram como novas representações mudaram a leitura de fenômenos. O processo de KDD foi sistematizado por Usama Fayyad e colaboradores nos anos 1990, aproximando preparação, mineração e interpretação.

Na história do NoSQL, Carlo Strozzi utilizou o termo em 1998 para um banco relacional que não empregava SQL. Em 2009, Eric Evans e Johan Oskarsson ajudaram a popularizá-lo com o sentido contemporâneo associado a bancos não relacionais. No processamento distribuído, Doug Cutting desenvolveu o Hadoop a partir do trabalho no projeto Nutch e de ideias publicadas sobre sistemas de arquivos e MapReduce.

Esses nomes são importantes, mas a história não aconteceu por uma sequência de invenções isoladas. Avanços em armazenamento, redes, processamento, estatística, interfaces e disponibilidade de dados se combinaram. A análise de dados atual é resultado dessa construção coletiva e multidisciplinar.

## Como eu aplicaria esse processo em uma empresa

Para transformar o conteúdo em um exemplo, imaginei uma pequena empresa que percebe uma redução na recorrência de clientes. O objetivo não seria “usar Big Data”, mas entender o que está acontecendo e decidir qual ação vale a pena testar.

Primeiro eu procuraria tornar a pergunta mensurável. O que significa recorrência nesse negócio? Qual período será comparado? A queda ocorre em toda a operação ou em produtos, unidades ou canais específicos? Sem essas definições, duas pessoas podem calcular o mesmo indicador de formas diferentes.

Depois levantaria as fontes disponíveis: vendas, produtos, datas, canais e identificadores que possam ser utilizados de forma legítima. Antes de analisar, verificaria duplicidades, cancelamentos, campos vazios, mudanças no cadastro e períodos sem coleta. Também registraria quais dados não existem, pois ausência de evidência não deve ser escondida.

Com uma base consistente, começaria por uma análise descritiva. Uma linha poderia mostrar a recorrência ao longo do tempo; barras poderiam comparar categorias; uma distribuição ajudaria a observar intervalos entre compras. Se surgisse uma relação relevante, a investigação poderia avançar para hipóteses diagnósticas.

A conclusão não deveria ser apresentada como certeza quando os dados sustentam apenas uma associação. Em vez de afirmar que uma mudança causou a queda, eu registraria a hipótese, os indícios, as limitações e um teste possível. A empresa poderia experimentar uma ação em escala controlada, definir antecipadamente como avaliar o resultado e comparar o comportamento sem alterar várias condições ao mesmo tempo.

Esse exemplo me mostrou que aplicar análise de dados em uma empresa é criar um ciclo: perguntar, coletar, preparar, analisar, comunicar, agir e medir novamente. O valor não está no relatório isolado, mas na melhoria da qualidade das decisões.

## Dados não falam sozinhos

Uma frase repetida em discussões sobre dados é que eles “falam por si”. Depois deste estudo, passei a desconfiar dessa ideia. Dados são produzidos por sistemas, pessoas e processos. A forma de coleta define quem aparece, o que é medido e o que fica de fora. A preparação modifica representações. A escolha do método e da visualização influencia a interpretação.

Qualidade também vai além de remover duplicidades. É necessário avaliar completude, precisão, consistência, atualidade e adequação ao objetivo. Uma base pode estar tecnicamente limpa e ainda ser inadequada para responder à pergunta proposta.

Privacidade e segurança precisam participar do planejamento desde o começo. Coletar tudo “para usar no futuro” amplia riscos e responsabilidades. O acesso deve ser limitado, a finalidade precisa ser compreensível e dados pessoais não devem aparecer em análises ou publicações sem necessidade e base apropriada.

Há ainda o risco de transformar padrões históricos em regras para o futuro. Se uma base registra desigualdades ou decisões enviesadas, um modelo pode reproduzi-las. Por isso, resultados automatizados precisam de avaliação, contexto e possibilidade de contestação. Capacidade de processamento não substitui responsabilidade.

## O que mudou no meu entendimento

O principal aprendizado foi perceber que análise de dados não é uma ferramenta isolada. É um processo que conecta Ciência da Computação, estatística, gestão, comunicação visual e conhecimento do domínio.

Estruturas de dados ajudam a organizar operações. Bancos preservam e relacionam registros. O KDD organiza o caminho até a descoberta. Técnicas analíticas procuram padrões. A visualização torna comparações compreensíveis. Tecnologias de Big Data ampliam a capacidade quando a escala realmente exige. Nenhuma dessas partes, sozinha, garante uma boa decisão.

Também entendi que começar simples não significa trabalhar de forma superficial. Definir bem uma pergunta, verificar uma base pequena e comunicar limites pode produzir mais valor do que adotar uma arquitetura complexa sem objetivo claro.

Nos Cadernos, este texto registra exatamente essa mudança. Não é um relato de resultados profissionais que eu não executei nem uma afirmação de domínio completo sobre todas as tecnologias citadas. É a síntese de um estudo que organizou meu repertório e criou um método para continuar aprendendo: compreender o problema, cuidar dos dados, testar interpretações e tratar cada conclusão como algo que precisa de evidência.

## Materiais de estudo

Esta publicação foi estruturada a partir dos materiais enviados durante as disciplinas de Análise de Dados e Banco de Dados. Entre os conteúdos principais estão:

- **Introdução aos tipos abstratos de dados**, de Lucas Plautz Prestes, e o material **Tipos Abstratos de Dados**, de Daniel Duarte Abdala;
- **Introdução à visualização de dados** e **Visualização de dados em Big Data**, de Alessandra Maciel Paz Milani;
- **Analytics para Big Data**, com conceitos de Big Data analytics, Business Intelligence e ciência de dados;
- **Descoberta de conhecimento com Big Data**, de Ramiro Córdova Júnior, com o processo de KDD;
- **Frameworks de Big Data: uma visão geral**, de Fabiano Berlinck Neumann, abordando Hadoop e Spark;
- **Integrando Big Data e IoT**, de Izabelly Soares de Morais;
- os materiais de Banco de Dados Não Relacional sobre história do NoSQL, chave-valor, documentos e famílias de colunas;
- a tese **Abordagens heterogêneas para a exploração interativa de grafos multivariados**, de Ricardo Andrade Cava;
- a dissertação **O papel da capacidade de gestão da informação e da monetização de dados no desempenho corporativo**, de Cláudia Rodrigues Maia;
- a dissertação **Big Data Analytics como ferramenta de adaptação do Total Quality Management na Indústria 4.0**, de Fabiane Florencio de Souza;
- o artigo **Big data: moldando o conhecimento, moldando a vida cotidiana**, de Ralph Schroeder;
- o estudo **Um dispositivo vestível e confiável para detectar quedas**, de João Carlos Britto Filho, como exemplo de dados, sensores e aplicação.

Alguns arquivos apresentavam o mesmo conteúdo com nomes diferentes, e as imagens anexadas resumiam etapas de KDD, visualizações, modelagem NoSQL, Hadoop, Spark e integração entre Big Data e IoT. Em vez de reproduzir esses materiais, reorganizei os conceitos em uma narrativa própria e mantive afirmações dependentes de tecnologia ou contexto no nível necessário para explicar o aprendizado.
