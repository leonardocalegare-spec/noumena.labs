---
title: "Da necessidade ao teste: como projetar interfaces para pessoas"
slug: "da-necessidade-ao-teste"
summary: "Um caminho prático para transformar necessidades reais em interfaces compreensíveis, acessíveis e avaliadas com pessoas."
type: "study"
sequence: 1
cover: "interaction-map"
topics:
  - IHC
  - UX
  - design de interação
  - acessibilidade
publishedAt: "2026-07-27"
updatedAt: "2026-07-27"
status: "published"
featured: true
---

## Uma interface não começa na tela

Quando comecei a estudar desenvolvimento front-end, era fácil imaginar que uma boa interface nascia da combinação entre código organizado, cores, tipografia e componentes bem distribuídos. Esses elementos importam, mas os estudos de Interação Humano-Computador, ou IHC, ampliaram bastante essa visão.

Uma interface começa antes do layout. Ela começa quando tentamos compreender quem vai usar o sistema, o que essa pessoa deseja alcançar, em qual contexto a interação acontece e quais dificuldades podem surgir pelo caminho.

Isso muda o papel de quem projeta e desenvolve. O objetivo deixa de ser apenas construir uma tela que funcione tecnicamente. Passa a ser construir uma interação que faça sentido para outra pessoa.

Neste texto, organizo o principal aprendizado dessa etapa dos estudos: um caminho que parte das necessidades dos usuários, passa pela modelagem e pela prototipação e chega à avaliação da interface.

## Interface, interação e affordance não são a mesma coisa

Esses três conceitos aparecem juntos, mas descrevem partes diferentes da experiência.

A **interface** é o ponto de contato entre a pessoa e o artefato. Em um sistema digital, ela inclui textos, botões, campos, menus, imagens, mensagens e outros elementos pelos quais o usuário percebe e controla o sistema.

A **interação** é aquilo que acontece durante o uso. A pessoa interpreta o que está vendo, toma uma decisão, executa uma ação e observa a resposta do sistema. Depois disso, ela decide o próximo passo. Portanto, a interação não está somente no clique: ela envolve intenção, interpretação, ação e retorno.

A **affordance** é a capacidade de um elemento sugerir como pode ser utilizado. Um botão com aparência de botão convida ao clique. Um campo com rótulo claro indica qual informação deve ser inserida. Um ícone conhecido pode representar uma ação por associação.

Quando essa indicação é fraca, o usuário precisa parar e adivinhar. Quando é clara, a própria interface ajuda a explicar o uso.

Esse ponto se conecta à ideia de comunicabilidade: toda interface comunica uma visão sobre quem é o usuário, o que ele deseja fazer e como o sistema pode ajudá-lo. Uma mensagem confusa, um botão ambíguo ou uma resposta ausente interrompem essa conversa.

## Primeiro passo: entender pessoas, objetivos e contexto

Projetar com foco no usuário não significa perguntar apenas o que ele quer. O levantamento precisa considerar diferentes pessoas e fontes de informação.

Os usuários finais podem ser primários, quando utilizam o sistema com frequência, ou secundários, quando o utilizam ocasionalmente. Além deles, existem outros envolvidos: clientes, gestores, equipes de atendimento, suporte técnico, fornecedores e pessoas afetadas pelo funcionamento do produto.

Cada grupo enxerga uma parte do problema. Por isso, um levantamento pode combinar:

- entrevistas e conversas com usuários;
- observação das tarefas no contexto real;
- questionários;
- análise de feedbacks;
- registros de uso e arquivos de log;
- processos, normas e regras de negócio;
- estudo de soluções já existentes.

O método deve ser escolhido de acordo com o que se precisa descobrir. Uma entrevista pode revelar motivações e dificuldades. A observação pode mostrar atalhos, interrupções e hábitos que a própria pessoa não mencionaria. Os dados de uso podem indicar onde muitos usuários abandonam um fluxo.

Também existe uma responsabilidade ética. Se a pesquisa envolve pessoas, é preciso explicar o objetivo, pedir consentimento, proteger a identidade dos participantes e coletar apenas os dados necessários. Conhecer o usuário não significa invadir sua privacidade.

### Um exemplo simples

Imagine um sistema para agendar atendimento em uma clínica.

Se começarmos diretamente pela tela, provavelmente criaremos um formulário com nome, documento, especialidade, profissional, data e horário. Mas algumas perguntas aparecem quando observamos o contexto:

- A pessoa já sabe qual especialidade procurar?
- Ela pode precisar marcar para um familiar?
- Há usuários idosos ou com pouca familiaridade digital?
- O horário disponível depende do convênio?
- O usuário precisa cancelar ou reagendar depois?
- O que acontece quando não existe horário próximo?

As respostas mudam o fluxo. O problema não é apenas “preencher um formulário”. O problema é ajudar alguém a encontrar um atendimento adequado, entender as opções e concluir o agendamento com segurança.

## Modelar antes de detalhar a tela

Depois de levantar informações, é necessário organizá-las. Modelar não é burocratizar o projeto. É tornar visíveis as decisões antes que elas fiquem escondidas no código ou no layout.

Algumas representações ajudam nesse processo.

### Personas e cenários

Uma persona representa características relevantes de um grupo de usuários. Ela não deve ser um personagem decorativo com nome e fotografia. Precisa registrar objetivos, conhecimentos, comportamentos e limitações que influenciam a interação.

Os cenários descrevem situações de uso. Apresentam um ator, um contexto, um objetivo, as ações realizadas e as mudanças provocadas pelo sistema. Eles ajudam a equipe a discutir a experiência como uma história, e não como uma coleção isolada de telas.

No exemplo da clínica, um cenário poderia acompanhar uma pessoa que precisa encontrar atendimento para a mãe, comparar horários e confirmar se o convênio é aceito. Essa narrativa mostra dependências que um desenho solto talvez não revele.

### Tarefas e caminhos alternativos

A modelagem de tarefas descreve o que o usuário precisa fazer para alcançar um objetivo. Algumas ações seguem uma sequência; outras podem ocorrer em qualquer ordem, repetir-se ou depender de uma escolha.

Esse exercício também revela exceções:

- o dado informado pode estar inválido;
- o usuário pode voltar para corrigir uma escolha;
- o processamento pode demorar;
- uma opção pode deixar de estar disponível;
- o usuário pode abandonar e retornar depois.

Projetar apenas o caminho ideal produz interfaces frágeis. A experiência real também inclui dúvidas, erros, mudanças de ideia e recuperação.

### A interação como conversa

A linguagem MoLIC propõe modelar a interação como uma conversa entre o usuário e o sistema, entendido como representante de quem projetou a interface.

Nessa visão, uma cena representa um assunto da conversa. As transições mostram mudanças de assunto ou de etapa. As falas indicam o que o usuário informa e o que o sistema responde. Também podem ser representadas rupturas, como dados inválidos, e os caminhos para recuperação.

Não é necessário usar toda a notação em qualquer projeto. O aprendizado mais importante está na pergunta que ela provoca: **o que o sistema está dizendo ao usuário em cada momento, e como a conversa continua quando algo sai do esperado?**

## Prototipar é escolher o que aprender

Um protótipo não serve apenas para apresentar uma ideia pronta. Ele serve para descobrir problemas enquanto mudar ainda é barato.

O nível de fidelidade deve acompanhar a pergunta que queremos responder.

Um protótipo de baixa fidelidade pode ser feito com papel, quadros simples ou wireframes. Ele é útil para discutir estrutura, sequência, conteúdo e navegação sem gastar tempo com acabamento.

Um protótipo de média fidelidade aproxima a proposta da interface final. Pode incluir componentes mais definidos, hierarquia visual e alguma interação. Ajuda a testar o fluxo com mais contexto.

Um protótipo de alta fidelidade apresenta aparência e comportamento próximos do produto. É útil para avaliar detalhes de interação, conteúdo, responsividade e percepção visual, mas custa mais para ser produzido e alterado.

Mais fidelidade não significa automaticamente mais qualidade. Se a dúvida é sobre a ordem das etapas, um protótipo simples pode gerar respostas melhores. Quando o protótipo parece pronto demais, participantes podem se concentrar nas cores e ignorar um problema estrutural.

Storyboards também ajudam. Ao representar a experiência como uma sequência de cenas, eles mostram onde o sistema entra na rotina, o que acontece antes e depois da tela e quais emoções aparecem ao longo da jornada.

## Usabilidade e experiência do usuário são relacionadas, mas diferentes

Usabilidade trata da capacidade de uma pessoa alcançar objetivos com eficácia, eficiência e satisfação em determinado contexto.

Na prática, isso envolve perguntas como:

- A pessoa consegue concluir a tarefa?
- Quanto esforço e tempo são necessários?
- O sistema é fácil de aprender?
- Depois de algum tempo, é possível lembrar como utilizá-lo?
- Os erros são prevenidos e podem ser corrigidos?
- A pessoa entende onde está e o que acontece depois de cada ação?

Experiência do usuário é mais ampla. Ela também envolve expectativas, emoções, confiança, motivação e a percepção formada antes, durante e depois do uso.

Uma interface pode permitir que a tarefa seja concluída e ainda assim gerar insegurança. Um formulário pode funcionar, mas usar mensagens agressivas. Um processo pode ser rápido, mas não explicar se os dados foram salvos. A tarefa terminou, porém a experiência permaneceu ruim.

Por isso, feedback é essencial. Se uma ação demora, o sistema deve informar que está processando. Se ocorre um erro, a mensagem precisa explicar o problema e indicar uma saída. Se uma operação tem consequências importantes, a interface deve permitir confirmação ou reversão quando possível.

## Acessibilidade não é uma etapa extra

Acessibilidade significa permitir que pessoas com diferentes capacidades consigam perceber, compreender, navegar e utilizar a interface.

Isso inclui pessoas com deficiências visuais, auditivas, motoras ou cognitivas, mas não se limita a condições permanentes. Uma pessoa pode estar com um braço imobilizado, usar o celular sob luz intensa, estar em um ambiente barulhento ou enfrentar uma conexão instável. Limitações também podem ser temporárias e situacionais.

Alguns cuidados básicos ajudam a construir uma base mais inclusiva:

- usar HTML semântico e uma ordem de leitura coerente;
- permitir navegação por teclado;
- oferecer foco visível;
- associar rótulos aos campos;
- não depender apenas de cor para transmitir significado;
- manter contraste suficiente;
- fornecer texto alternativo para imagens relevantes;
- disponibilizar legendas e alternativas para conteúdos em áudio e vídeo;
- criar mensagens claras para erros e mudanças de estado;
- testar ampliação, leitores de tela e diferentes formas de entrada.

A acessibilidade também melhora a comunicabilidade. Quando a estrutura é clara, as ações são identificáveis e as respostas do sistema são compreensíveis, mais pessoas conseguem manter a “conversa” com a interface.

O ponto central é envolver a diversidade desde o levantamento e durante os testes. Não é possível validar todas as experiências apenas imaginando como outra pessoa usaria o sistema.

## Avaliar faz parte do design

A avaliação não deve acontecer somente quando o produto está pronto. Avaliações formativas acompanham o desenvolvimento e ajudam a corrigir o projeto. Avaliações somativas observam o resultado alcançado ao final de uma etapa ou produto.

Também é possível avaliar em ambientes controlados, no contexto natural de uso ou sem participação direta de usuários, por meio de inspeções e análises realizadas por especialistas. A escolha depende do objetivo e do estágio do projeto.

O framework DECIDE organiza o planejamento em seis atividades:

1. **Determinar os objetivos** da avaliação.
2. **Explorar as perguntas** que precisam ser respondidas.
3. **Escolher os métodos** adequados.
4. **Identificar questões práticas**, como participantes, ambiente, equipamentos e tempo.
5. **Decidir como tratar as questões éticas**.
6. **Avaliar, interpretar e apresentar os dados** coletados.

O framework é iterativo. Uma decisão pode obrigar a equipe a revisar outra. Se não é possível observar usuários no ambiente real, por exemplo, talvez seja necessário adaptar as perguntas e o método.

Outra possibilidade é avaliar a comunicabilidade. O Método de Avaliação da Comunicabilidade observa a interação de pessoas com a interface, identifica momentos em que a comunicação se rompe e analisa o que o sistema não conseguiu explicar adequadamente. O resultado não é apenas uma lista de erros: é um diagnóstico sobre a conversa projetada.

Avaliar bem exige uma pergunta clara. “O usuário gostou?” costuma ser pouco específico. “A pessoa consegue reagendar sem ajuda e entende a consequência da mudança?” produz uma observação mais útil.

## Um caminho prático para o front-end

Organizando os conceitos estudados, cheguei a um processo simples que pode orientar projetos de interface:

1. **Compreender:** identificar usuários, objetivos, contexto, restrições e riscos.
2. **Representar:** criar cenários, tarefas e fluxos que incluam caminhos alternativos.
3. **Conversar:** definir o que a interface comunica em cada etapa e como responde às ações.
4. **Prototipar:** escolher a fidelidade de acordo com aquilo que precisa ser aprendido.
5. **Construir:** transformar as decisões em estrutura semântica, componentes, conteúdo e comportamento responsivo.
6. **Incluir:** considerar acessibilidade desde a estrutura inicial.
7. **Avaliar:** observar a interação, interpretar evidências e melhorar o projeto.

Esse processo não precisa ser rígido. Muitas vezes será necessário voltar, revisar requisitos, alterar o fluxo e testar novamente. Essa iteração não representa fracasso. Ela é parte do design.

## O que mudou no meu entendimento

O principal aprendizado foi perceber que desenvolver uma interface não é apenas implementar uma solução visual. Cada escolha comunica alguma coisa.

Um campo sem rótulo comunica que a pessoa deveria adivinhar. Uma mensagem genérica transfere o problema para o usuário. Um carregamento sem retorno cria incerteza. Um fluxo que considera apenas o caminho perfeito ignora como as pessoas realmente usam sistemas.

Também ficou mais claro que front-end, UX e UI não são áreas isoladas. A estrutura do HTML influencia a acessibilidade. O conteúdo influencia a comunicabilidade. O estado de um componente influencia a confiança. A arquitetura de navegação influencia a carga cognitiva. O código materializa decisões de interação.

Uma interface melhor não é a que mostra mais recursos. É a que ajuda pessoas reais a compreender o que podem fazer, agir com segurança e alcançar seus objetivos com o menor atrito possível.

## Materiais de estudo

Esta publicação foi estruturada a partir dos materiais da disciplina de Desenvolvimento Front-end UX/UI:

- *Interface, interação e affordance*;
- *Fatores humanos e ergonomia*;
- *Requisitos e coletas de dados*;
- *Modelagem de interfaces*;
- *Design da Interação Humano-Computador com MoLIC*;
- *Storyboarding e prototipação de interfaces*;
- *Estilos e paradigmas de interação humano-computador*;
- *Usabilidade e experiência do usuário*;
- *Avaliação em IHC*;
- *Acessibilidade e comunicabilidade*;
- *Interação social e emocional*.
