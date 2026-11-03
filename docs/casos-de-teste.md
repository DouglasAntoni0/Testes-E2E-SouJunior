# Casos de teste — SouJunior

Este catálogo reúne os cenários do meu trabalho voluntário de QA e seus desdobramentos na automação. Cada caso registra a regra esperada e a história que deu origem à análise.

Os identificadores aparecem nos títulos dos testes de Cypress e Playwright. Um mesmo identificador pode ser exercitado em mais de uma rota ou resolução; essas variações não representam novos requisitos.

## Como usar

1. Consulte a história e o protótipo da funcionalidade.
2. Prepare a aplicação e os dados indicados no caso.
3. Execute o roteiro ou localize seu identificador nos specs.
4. Ao mudar um requisito, revise o caso, a massa e os dois frameworks juntos.

Os contratos automatizados estão nos arquivos indicados em cada grupo. Os casos identificados como **revisão manual** complementam a automação em aspectos visuais ou interações que exigem observação humana.

Nos links HTML, a automação verifica o destino e, quando o caso prevê nova aba, os atributos de abertura e proteção. Nos botões e menus que usam JavaScript, também verifica a chamada ou abertura da nova aba. O conteúdo do Stars, YouTube e demais serviços externos fica fora do escopo.

## Referências e decisões de escopo

- [Quadro Web Wizards](https://github.com/orgs/SouJunior/projects/9/views/1).
- Os protótipos estão vinculados às histórias. A referência de versão é a história da funcionalidade, não uma cópia de tela sem contexto.
- **Áreas:** a Home apresenta dez cards conforme [#1364](https://github.com/SouJunior/products/issues/1364). As onze páginas internas, incluindo Business, continuam no conjunto de rotas coberto por [#1307](https://github.com/SouJunior/products/issues/1307).
- **Iniciativas:** os antigos roteiros de Labs, Talk e âncora do menu foram atualizados para a ocultação determinada em [#1345](https://github.com/SouJunior/products/issues/1345). A automação não exige a presença de programas temporariamente inativos.
- **Apoio:** a história [#1375](https://github.com/SouJunior/products/issues/1375) admite uma página provisória em branco como destino. O caso verifica o acesso, sem exigir um conteúdo ainda não contratado.
- **Ouvidoria:** a mensagem segue a redação atual do caso de texto [#1309](https://github.com/SouJunior/products/issues/1309). O acesso é verificado pelo contrato do link.
- **Paleta:** os valores esperados vêm de [#1322](https://github.com/SouJunior/products/issues/1322). Se o design for alterado, a revisão deve partir do requisito vigente, sem copiar automaticamente a cor encontrada no site.
- **Sobre/Impacto mobile:** os antigos cenários de presença dos indicadores foram reunidos no mesmo contrato; margens, empilhamento, estilo e largura continuam com verificações próprias.

## Dados de referência

### Resoluções

A referência desktop é 1440 × 900. A referência mobile é 375 × 812. As logos também são verificadas em larguras de 390 e 430 pixels. Carrosséis com recorte de continuidade são tratados separadamente da rolagem horizontal indevida da página inteira.

### Páginas internas

| Caso       | Área                     | Rota                 | Título esperado        |
| ---------- | ------------------------ | -------------------- | ---------------------- |
| CT-PAG-001 | Business                 | /area/business       | Business               |
| CT-PAG-002 | Tech Recruiter           | /area/tech-recruiter | Tech Recruiter         |
| CT-PAG-003 | Produtos                 | /area/produto        | Produto                |
| CT-PAG-004 | Agilidade                | /area/agilidade      | Agilidade              |
| CT-PAG-005 | Social Media             | /area/social-media   | Social Media           |
| CT-PAG-006 | Design                   | /area/design         | Design                 |
| CT-PAG-007 | Desenvolvimento Frontend | /area/front-end      | Front-end              |
| CT-PAG-008 | Desenvolvimento Backend  | /area/back-end       | Back-end               |
| CT-PAG-009 | Dados                    | /area/dados          | Dados                  |
| CT-PAG-010 | QA                       | /area/qa             | Quality Assurance (QA) |
| CT-PAG-011 | DevOps                   | /area/dev-ops        | DevOps                 |

A massa independente está em [shared/areas.data.js](../shared/areas.data.js). Ela contém os trechos de apresentação esperados de cada área e a ordem dos dez cards da Home.

### Conteúdo

- [Papéis e indicadores](../shared/interface.data.js).
- [Depoimentos: nome, cargo, foto e texto](../shared/depoimentos.data.js).
- [Perguntas e respostas por categoria](../shared/faq.data.js).
- [Datas e destinos dos eventos](../shared/eventos.data.js).

## Rastreabilidade das análises

| História ou frente                      | Identificadores atuais |
| --------------------------------------- | ---------------------- |
| #1260 — Header da Home                  | CT-CAB e CT-VIS-004    |
| #1320 / #1261 — Hero                    | CT-HER                 |
| #1262 / #1326 — Sobre e Nosso Impacto   | CT-SOB                 |
| #1264 / #1364 / #1352 — Áreas           | CT-ARE e CT-PAG        |
| #1307 — Faça parte nas páginas e rodapé | CT-PAG e CT-ROD        |
| #1263 — Depoimentos                     | CT-DEP e CT-VIS-006    |
| #1276 / #1345 — Iniciativas             | CT-INI                 |
| #1282 — Papéis na SouJunior             | CT-COM                 |
| #1268 / #1370 — Notícias e Eventos      | CT-NOT                 |
| #1271 / #1375 — Apoio                   | CT-APO                 |
| #1300 — FAQ                             | CT-FAQ                 |
| #1321 — Nova logo                       | CT-LOG e CT-VIS-002    |
| #1322 — Cores                           | CT-COR                 |

## Roteiros por funcionalidade

## Cabeçalho e navegação

Implementações: [Cypress](../cypress/e2e/cabecalho.cy.js) · [Playwright](../tests/playwright/cabecalho.spec.js).

### CT-CAB-001 — apresentar as opções principais de navegação

**Pré-condição:** O usuário está na Home em desktop.

**Dado que** o usuário está na Home em desktop

**Quando** visualizar o cabeçalho

**Então** os itens Sobre nós, Notícias & Eventos, Faça parte e Seja um apoiador devem estar disponíveis.

**Variações:** Desktop.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-CAB-002 — voltar para a Home pela logo do cabeçalho

**Pré-condição:** O usuário está em uma página interna.

**Dado que** o usuário está em uma página interna

**Quando** clicar na logo do cabeçalho

**Então** a URL deve voltar à raiz e o título principal da Home deve ser exibido.

**Variações:** Desktop.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-CAB-003 — rolar até a seção de Sobre Nós

**Pré-condição:** O usuário está no início da Home.

**Dado que** o usuário está no início da Home

**Quando** acionar Sobre Nós no menu

**Então** a seção de destino deve entrar na área visível sem abrir outra página.

**Variações:** Desktop.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-CAB-004 — rolar até a seção de Notícias & Eventos

**Pré-condição:** O usuário está no início da Home.

**Dado que** o usuário está no início da Home

**Quando** acionar Notícias & Eventos no menu

**Então** a seção de destino deve entrar na área visível sem abrir outra página.

**Variações:** Desktop.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-CAB-005 — abrir o Stars ao usar Faça parte no menu

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** clicar em Faça parte no cabeçalho

**Então** o site deve abrir o endereço oficial do Stars em outra aba.

**Variações:** Desktop.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-CAB-006 — rolar até a seção de Seja um Apoiador

**Pré-condição:** O usuário está no início da Home.

**Dado que** o usuário está no início da Home

**Quando** acionar Seja um Apoiador no menu

**Então** a seção de destino deve entrar na área visível sem abrir outra página.

**Variações:** Desktop.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-CAB-007 — seguir a ordem do menu ao navegar com Tab

**Pré-condição:** O usuário posicionou o foco na logo do cabeçalho.

**Dado que** o usuário posicionou o foco na logo do cabeçalho

**Quando** pressionar Tab até percorrer os itens principais

**Então** o foco deve passar por Sobre nós, Notícias & Eventos, Faça parte e Seja um apoiador, nessa ordem.

**Variações:** Desktop.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

**Revisão manual:** Verificação manual de navegação por Tab nos dois navegadores; os cenários automatizados de teclado cobrem Enter e Espaço na FAQ.

### CT-CAB-008 — indicar que os itens do menu são clicáveis

**Pré-condição:** O usuário acessa a Home pelo desktop.

**Dado que** o usuário acessa a Home pelo desktop

**Quando** observar a área de interação de cada item

**Então** os itens devem apresentar cursor de interação.

**Variações:** Desktop.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-CAB-009 — abrir e fechar o menu no celular

**Pré-condição:** A Home está em uma tela mobile.

**Dado que** a Home está em uma tela mobile

**Quando** acionar Abrir menu e depois Fechar menu

**Então** a navegação deve aparecer e desaparecer, acompanhada do estado aria-expanded.

**Variações:** Mobile.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-CAB-010 — recolher o menu mobile depois de escolher uma seção

**Pré-condição:** O menu mobile está aberto.

**Dado que** o menu mobile está aberto

**Quando** selecionar Sobre nós

**Então** o menu deve fechar e o conteúdo Sobre a SouJunior deve ficar acessível.

**Variações:** Mobile.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1318](https://github.com/SouJunior/products/issues/1318), [#1319](https://github.com/SouJunior/products/issues/1319), [#1345](https://github.com/SouJunior/products/issues/1345).

## Banner principal

Implementações: [Cypress](../cypress/e2e/hero.cy.js) · [Playwright](../tests/playwright/hero.spec.js).

### CT-HER-001 — apresentar a proposta da SouJunior logo na entrada

**Pré-condição:** O usuário acessa a Home.

**Dado que** o usuário acessa a Home

**Quando** ler o banner principal

**Então** o título principal deve ser único e os textos de apresentação devem estar visíveis.

**Variações:** Desktop.

**Referências:** [#1320](https://github.com/SouJunior/products/issues/1320), [#1261](https://github.com/SouJunior/products/issues/1261).

### CT-HER-002 — oferecer a inscrição no Stars pelo banner

**Pré-condição:** O usuário visualiza o banner.

**Dado que** o usuário visualiza o banner

**Quando** localizar Faça Parte

**Então** o link deve estar disponível com endereço do Stars, abertura em nova aba e proteção de contexto.

**Variações:** Desktop.

**Referências:** [#1320](https://github.com/SouJunior/products/issues/1320), [#1261](https://github.com/SouJunior/products/issues/1261).

### CT-HER-003 — posicionar o mascote ao lado do texto no desktop

**Pré-condição:** O usuário acessa a Home pelo desktop.

**Dado que** o usuário acessa a Home pelo desktop

**Quando** visualizar o texto e a imagem do banner

**Então** a imagem deve carregar e permanecer à direita do título.

**Variações:** Desktop.

**Referências:** [#1320](https://github.com/SouJunior/products/issues/1320), [#1261](https://github.com/SouJunior/products/issues/1261).

### CT-HER-004 — adaptar o banner ao celular sem cortar o conteúdo

**Pré-condição:** O usuário acessa a Home em mobile.

**Dado que** o usuário acessa a Home em mobile

**Quando** visualizar o título e Faça Parte

**Então** os textos e a ação devem caber na tela e o mascote do banner não deve aparecer.

**Variações:** Mobile.

**Referências:** [#1320](https://github.com/SouJunior/products/issues/1320), [#1261](https://github.com/SouJunior/products/issues/1261).

## Sobre a SouJunior e Nosso Impacto

Implementações: [Cypress](../cypress/e2e/sobre.cy.js) · [Playwright](../tests/playwright/sobre.spec.js).

### CT-SOB-001 — apresentar a origem e a proposta da iniciativa

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** acessar Sobre a SouJunior

**Então** o título e os três parágrafos institucionais devem estar disponíveis.

**Variações:** Desktop.

**Referências:** [#1262](https://github.com/SouJunior/products/issues/1262), [#1326](https://github.com/SouJunior/products/issues/1326), [#1422](https://github.com/SouJunior/products/issues/1422), [#1423](https://github.com/SouJunior/products/issues/1423), [#1424](https://github.com/SouJunior/products/issues/1424).

### CT-SOB-002 — manter cada indicador de impacto junto do seu valor

**Pré-condição:** O usuário visualiza Nosso Impacto.

**Dado que** o usuário visualiza Nosso Impacto

**Quando** ler os indicadores da seção

**Então** 10 Squads Atuantes, +100 Voluntários Ativos e +30 Apoiadores do Projeto devem aparecer como pares.

**Variações:** Desktop.

**Referências:** [#1262](https://github.com/SouJunior/products/issues/1262), [#1326](https://github.com/SouJunior/products/issues/1326), [#1422](https://github.com/SouJunior/products/issues/1422), [#1423](https://github.com/SouJunior/products/issues/1423), [#1424](https://github.com/SouJunior/products/issues/1424).

### CT-SOB-003 — centralizar o título institucional no mobile

**Pré-condição:** O usuário está em uma tela mobile.

**Dado que** o usuário está em uma tela mobile

**Quando** visualizar Sobre a SouJunior

**Então** o centro do título deve acompanhar o centro da tela.

**Variações:** Mobile.

**Referências:** [#1262](https://github.com/SouJunior/products/issues/1262), [#1326](https://github.com/SouJunior/products/issues/1326), [#1422](https://github.com/SouJunior/products/issues/1422), [#1423](https://github.com/SouJunior/products/issues/1423), [#1424](https://github.com/SouJunior/products/issues/1424).

### CT-SOB-004 — exibir os parágrafos completos na largura do celular

**Pré-condição:** O usuário acessa a seção institucional em mobile.

**Dado que** o usuário acessa a seção institucional em mobile

**Quando** ler os três parágrafos

**Então** as caixas de texto devem respeitar os limites esquerdo e direito da tela.

**Variações:** Mobile.

**Referências:** [#1262](https://github.com/SouJunior/products/issues/1262), [#1326](https://github.com/SouJunior/products/issues/1326), [#1422](https://github.com/SouJunior/products/issues/1422), [#1423](https://github.com/SouJunior/products/issues/1423), [#1424](https://github.com/SouJunior/products/issues/1424).

### CT-SOB-005 — permitir a leitura da seção sem rolagem horizontal

**Pré-condição:** O usuário usa um celular.

**Dado que** o usuário usa um celular

**Quando** navegar até Sobre a SouJunior

**Então** a largura do documento não deve ultrapassar a largura útil da tela.

**Variações:** Mobile.

**Referências:** [#1262](https://github.com/SouJunior/products/issues/1262), [#1326](https://github.com/SouJunior/products/issues/1326), [#1422](https://github.com/SouJunior/products/issues/1422), [#1423](https://github.com/SouJunior/products/issues/1423), [#1424](https://github.com/SouJunior/products/issues/1424).

### CT-SOB-006 — empilhar os indicadores de impacto no mobile

**Pré-condição:** O usuário acessa Nosso Impacto pelo celular.

**Dado que** o usuário acessa Nosso Impacto pelo celular

**Quando** observar a ordem dos indicadores

**Então** os três blocos devem ficar um abaixo do outro e caber na largura da tela.

**Variações:** Mobile.

**Referências:** [#1262](https://github.com/SouJunior/products/issues/1262), [#1326](https://github.com/SouJunior/products/issues/1326), [#1422](https://github.com/SouJunior/products/issues/1422), [#1423](https://github.com/SouJunior/products/issues/1423), [#1424](https://github.com/SouJunior/products/issues/1424).

### CT-SOB-007 — respeitar o destaque visual dos cards de impacto

**Pré-condição:** O usuário está em Nosso Impacto no mobile.

**Dado que** o usuário está em Nosso Impacto no mobile

**Quando** visualizar os três indicadores

**Então** cada card deve ter fundo azul claro, cantos arredondados e margens que permitam vê-lo inteiro.

**Variações:** Mobile.

**Referências:** [#1262](https://github.com/SouJunior/products/issues/1262), [#1326](https://github.com/SouJunior/products/issues/1326), [#1422](https://github.com/SouJunior/products/issues/1422), [#1423](https://github.com/SouJunior/products/issues/1423), [#1424](https://github.com/SouJunior/products/issues/1424).

## Áreas de atuação: cards e carrossel

Implementações: [Cypress](../cypress/e2e/areas-de-atuacao.cy.js) · [Playwright](../tests/playwright/areas-de-atuacao.spec.js).

### CT-ARE-001 — apresentar os dez cards na ordem definida

**Pré-condição:** O usuário acessa Áreas de atuação.

**Dado que** o usuário acessa Áreas de atuação

**Quando** conferir o título, a introdução e os cards

**Então** as dez áreas devem ter nome, imagem e rota correspondentes, na ordem do catálogo.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-002 — indicar o limite inicial do carrossel

**Pré-condição:** O carrossel está na posição inicial.

**Dado que** o carrossel está na posição inicial

**Quando** observar as setas de navegação

**Então** a seta anterior deve estar desabilitada e a próxima deve permitir avançar.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-003 — avançar até o último conjunto de áreas

**Pré-condição:** O carrossel está no início.

**Dado que** o carrossel está no início

**Quando** acionar a seta de avanço

**Então** o último card deve entrar na área visível e a seta de avanço deve ficar desabilitada.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-004 — retornar ao primeiro conjunto de áreas

**Pré-condição:** O usuário já avançou uma página do carrossel.

**Dado que** o usuário já avançou uma página do carrossel

**Quando** acionar a seta de retorno

**Então** o primeiro card deve voltar à área visível e o limite inicial deve ser restabelecido.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-005 — exibir dois indicadores com a primeira página selecionada

**Pré-condição:** O usuário está no início das áreas.

**Dado que** o usuário está no início das áreas

**Quando** visualizar os indicadores de paginação

**Então** dois botões de página devem existir e somente o primeiro deve indicar o estado atual.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-006 — navegar entre os conjuntos pelos indicadores

**Pré-condição:** Os indicadores de paginação estão visíveis.

**Dado que** os indicadores de paginação estão visíveis

**Quando** selecionar a segunda página e depois a primeira

**Então** o indicador ativo e os cards visíveis devem acompanhar cada seleção.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-007 — mostrar cinco cards completos e uma indicação do próximo

**Pré-condição:** O carrossel está no estado inicial em desktop.

**Dado que** o carrossel está no estado inicial em desktop

**Quando** visualizar o primeiro conjunto

**Então** os cinco primeiros cards devem estar inteiros e parte do sexto deve indicar continuidade.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-008 — manter o último conjunto alinhado depois da rolagem

**Pré-condição:** O usuário está em Áreas de atuação no desktop.

**Dado que** o usuário está em Áreas de atuação no desktop

**Quando** avançar para o segundo conjunto

**Então** os cinco cards restantes devem ficar inteiramente visíveis, sem corte nos cards em foco.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-009 — disponibilizar todas as áreas no layout mobile

**Pré-condição:** O usuário acessa a Home pelo celular.

**Dado que** o usuário acessa a Home pelo celular

**Quando** percorrer as áreas apresentadas

**Então** os dez links e suas imagens devem continuar acessíveis e caber na largura da tela.

**Variações:** Mobile.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-010 — abrir a página correspondente a cada card da Home

**Pré-condição:** O usuário está em Áreas de atuação no desktop.

**Dado que** o usuário está em Áreas de atuação no desktop

**Quando** usar o carrossel e clicar no card escolhido

**Então** a rota e o título devem corresponder à área selecionada.

**Variações:** Uma execução independente para cada um dos dez cards.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

### CT-ARE-011 — acessar uma área pelos cards no celular

**Pré-condição:** O usuário navega pela grade de áreas no mobile.

**Dado que** o usuário navega pela grade de áreas no mobile

**Quando** clicar no card QA

**Então** a página de Quality Assurance deve ser carregada na rota /area/qa.

**Variações:** Mobile.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1352](https://github.com/SouJunior/products/issues/1352), [#1364](https://github.com/SouJunior/products/issues/1364), [#1409](https://github.com/SouJunior/products/issues/1409), [#1410](https://github.com/SouJunior/products/issues/1410), [#1411](https://github.com/SouJunior/products/issues/1411).

## Páginas internas das áreas

Implementações: [Cypress](../cypress/e2e/paginas-das-areas.cy.js) · [Playwright](../tests/playwright/paginas-das-areas.spec.js).

### CT-PAG-001 — apresentar a página de Business e seus convites para participar

**Pré-condição:** O usuário acessa /area/business.

**Dado que** o usuário acessa /area/business

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/business. Título: Business.

Trecho esperado na apresentação: A área de Business é responsável por conectar o projeto ao mundo externo.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-002 — apresentar a página de Tech Recruiter e seus convites para participar

**Pré-condição:** O usuário acessa /area/tech-recruiter.

**Dado que** o usuário acessa /area/tech-recruiter

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/tech-recruiter. Título: Tech Recruiter.

Trecho esperado na apresentação: O Tech Recruiter é a pessoa responsável por conectar talentos com oportunidades dentro do projeto.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-003 — apresentar a página de Produto e seus convites para participar

**Pré-condição:** O usuário acessa /area/produto.

**Dado que** o usuário acessa /area/produto

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/produto. Título: Produto.

Trecho esperado na apresentação: A área de Produto é o coração estratégico de muitos times.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-004 — apresentar a página de Agilidade e seus convites para participar

**Pré-condição:** O usuário acessa /area/agilidade.

**Dado que** o usuário acessa /area/agilidade

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/agilidade. Título: Agilidade.

Trecho esperado na apresentação: A área de Agilidade é responsável por garantir que os times consigam trabalhar de forma colaborativa

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-005 — apresentar a página de Social Media e seus convites para participar

**Pré-condição:** O usuário acessa /area/social-media.

**Dado que** o usuário acessa /area/social-media

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/social-media. Título: Social Media.

Trecho esperado na apresentação: A área de Social Media é responsável por dar voz ao projeto nas redes sociais

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-006 — apresentar a página de Design e seus convites para participar

**Pré-condição:** O usuário acessa /area/design.

**Dado que** o usuário acessa /area/design

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/design. Título: Design.

Trecho esperado na apresentação: Na área de Design, o foco está em criar experiências que sejam bonitas, intuitivas e centradas nas pessoas.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-007 — apresentar a página de Front-end e seus convites para participar

**Pré-condição:** O usuário acessa /area/front-end.

**Dado que** o usuário acessa /area/front-end

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/front-end. Título: Front-end.

Trecho esperado na apresentação: A área de Front-end é responsável por transformar ideias e designs em telas reais

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-008 — apresentar a página de Back-end e seus convites para participar

**Pré-condição:** O usuário acessa /area/back-end.

**Dado que** o usuário acessa /area/back-end

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/back-end. Título: Back-end.

Trecho esperado na apresentação: Na área de Back-end, você cuida da lógica por trás do que aparece na tela.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-009 — apresentar a página de Dados e seus convites para participar

**Pré-condição:** O usuário acessa /area/dados.

**Dado que** o usuário acessa /area/dados

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/dados. Título: Dados.

Trecho esperado na apresentação: Na área de Dados, nosso foco é transformar informações em decisões estratégicas.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-010 — apresentar a página de Quality Assurance (QA) e seus convites para participar

**Pré-condição:** O usuário acessa /area/qa.

**Dado que** o usuário acessa /area/qa

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/qa. Título: Quality Assurance (QA).

Trecho esperado na apresentação: A área de QA (Quality Assurance) é essencial para garantir que tudo o que é desenvolvido funcione bem

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-011 — apresentar a página de DevOps e seus convites para participar

**Pré-condição:** O usuário acessa /area/dev-ops.

**Dado que** o usuário acessa /area/dev-ops

**Quando** ler a apresentação e localizar os dois botões Faça parte

**Então** o título e o texto da área devem corresponder ao catálogo; os dois convites devem apontar para o Stars.

**Variações:** Desktop e mobile; uma execução por área e resolução.

**Dados de teste**

Rota: /area/dev-ops. Título: DevOps.

Trecho esperado na apresentação: A área de DevOps é o elo entre o desenvolvimento de software e a operação dos sistemas.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-012 — trocar de área pelo submenu interno

**Pré-condição:** O usuário está na página de Agilidade.

**Dado que** o usuário está na página de Agilidade

**Quando** selecionar QA na navegação secundária

**Então** a rota e o título da página devem mudar para Quality Assurance.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-013 — manter a grafia Front-end e Back-end no submenu

**Pré-condição:** O usuário está em uma página interna.

**Dado que** o usuário está em uma página interna

**Quando** ler os nomes das áreas de desenvolvimento

**Então** as nomenclaturas devem seguir a capitalização definida no caso de origem.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

### CT-PAG-014 — informar quando a área solicitada não existe

**Pré-condição:** O usuário informa uma rota de área inexistente.

**Dado que** o usuário informa uma rota de área inexistente

**Quando** acessar /area/area-inexistente

**Então** uma mensagem clara deve indicar que a área não foi localizada, sem exibir o conteúdo de outra área.

**Variações:** Desktop.

**Referências:** [#1264](https://github.com/SouJunior/products/issues/1264), [#1307](https://github.com/SouJunior/products/issues/1307), [#1311](https://github.com/SouJunior/products/issues/1311).

## Depoimentos

Implementações: [Cypress](../cypress/e2e/depoimentos.cy.js) · [Playwright](../tests/playwright/depoimentos.spec.js).

### CT-DEP-001 — apresentar o título e a introdução dos depoimentos

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** acessar Depoimentos

**Então** o título Depoimentos e o subtítulo O que falam sobre a SouJunior devem estar visíveis.

**Variações:** Desktop.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-002 — apresentar o depoimento completo de Priscilla Souza

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** navegar até o lote 1 dos depoimentos

**Então** o card deve apresentar foto carregada, nome, cargo e texto de Priscilla Souza conforme a massa de conteúdo.

**Variações:** Desktop.

**Dados de teste**

Nome: Priscilla Souza; cargo: UI & UX Designer; descrição da foto: Priscilla Souza; lote: 1.

Texto esperado: Oi, sou a Priscila, UX/UI aqui na SouJunior e poder contribuir com a iniciativa é incrível!! Além de aprender muito com os desenvolvimentos de projetos, tenho a oportunidade de fazer networking e, com isso, trocar muitas experiências.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-003 — apresentar o depoimento completo de Anderson Nunes

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** navegar até o lote 1 dos depoimentos

**Então** o card deve apresentar foto carregada, nome, cargo e texto de Anderson Nunes conforme a massa de conteúdo.

**Variações:** Desktop.

**Dados de teste**

Nome: Anderson Nunes; cargo: Front-end; descrição da foto: Anderson Nunes; lote: 1.

Texto esperado: Fui voluntário na Sou Junior e pude aprender sobre diversos aspectos da área de desenvolvimento e empregabilidade, o que acabou me auxiliando em processos seletivos, construção do perfil profissional e como ser encontrado pelos tech recruiters, até que após 6 meses de participação meu "sim" chegou.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-004 — apresentar o depoimento completo de Caique Fonseca

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** navegar até o lote 1 dos depoimentos

**Então** o card deve apresentar foto carregada, nome, cargo e texto de Caique Fonseca conforme a massa de conteúdo.

**Variações:** Desktop.

**Dados de teste**

Nome: Caique Fonseca; cargo: Agile; descrição da foto: Caique Fonseca; lote: 1.

Texto esperado: Ambientes controlados, como salas de aula de cursos, são distantes da realidade de trabalho, repletos de variáveis desconhecidas. Isso gera um vácuo para os aprendizes, dificultando o progresso, sem que os estágios possam preenchê-lo. A SouJunior resolve esse problema, sendo aberta para todos.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-005 — apresentar o depoimento completo de Ana Santos

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** navegar até o lote 2 dos depoimentos

**Então** o card deve apresentar foto carregada, nome, cargo e texto de Ana Santos conforme a massa de conteúdo.

**Variações:** Desktop.

**Dados de teste**

Nome: Ana Santos; cargo: Front-end; descrição da foto: Ana Santos; lote: 2.

Texto esperado: Atuar como Dev Front-end nesse projeto tem sido algo prazeroso em minha vida. Aqui tenho colocado em prática não só as minhas capacidades técnicas, estou fazendo amigos, estou tendo a oportunidade de criar laços, de crescer. Estamos sendo mentorados em diversas áreas, nós capacitando, não só nas hards skils, mas como também nas soft skils. Acredito que poucos projetos são tão imersivos como esse.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-006 — apresentar o depoimento completo de Anna Claudia Andrade

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** navegar até o lote 2 dos depoimentos

**Então** o card deve apresentar foto carregada, nome, cargo e texto de Anna Claudia Andrade conforme a massa de conteúdo.

**Variações:** Desktop.

**Dados de teste**

Nome: Anna Claudia Andrade; cargo: UI & UX Designer; descrição da foto: Anna Claudia Andrade; lote: 2.

Texto esperado: A SouJunior está me proporcionando ter uma vivência de trabalho como UX/UI Designer. Aplicar o conteúdo estudado em cursos, de forma prática, trabalhar em equipe com metodologias ágeis e me desenvolver profissionalmente, ao mesmo tempo que esse projeto está sendo construído.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-007 — apresentar o depoimento completo de Priscylla A. Ribeiro

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** navegar até o lote 2 dos depoimentos

**Então** o card deve apresentar foto carregada, nome, cargo e texto de Priscylla A. Ribeiro conforme a massa de conteúdo.

**Variações:** Desktop.

**Dados de teste**

Nome: Priscylla A. Ribeiro; cargo: Mentora UI & UX Designer; descrição da foto: Priscylla A. Ribeiro; lote: 2.

Texto esperado: A Sou Junior me desafia todos os dias com experiencias reais de trabalho: através da mentoria e do compromisso com o trabalho

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-008 — apresentar o depoimento completo de Talita Bitencourt

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** navegar até o lote 3 dos depoimentos

**Então** o card deve apresentar foto carregada, nome, cargo e texto de Talita Bitencourt conforme a massa de conteúdo.

**Variações:** Desktop.

**Dados de teste**

Nome: Talita Bitencourt; cargo: APM; descrição da foto: Talita Bitencourt; lote: 3.

Texto esperado: Para mim, a teoria só faz sentido quando consigo aplicá-la na prática. Na SouJunior, temos a oportunidade de fazer isso diariamente, o que torna nosso aprendizado muito mais efetivo.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-009 — apresentar o depoimento completo de Eduardo Bezerra

**Pré-condição:** O usuário está na Home.

**Dado que** o usuário está na Home

**Quando** navegar até o lote 3 dos depoimentos

**Então** o card deve apresentar foto carregada, nome, cargo e texto de Eduardo Bezerra conforme a massa de conteúdo.

**Variações:** Desktop.

**Dados de teste**

Nome: Eduardo Bezerra; cargo: UI & UX Designer; descrição da foto: Eduardo Bezerra; lote: 3.

Texto esperado: É uma honra poder fazer parte da Sou Junior e colocar em prática o que venho estudando, tenho certeza que a cada dia ganho mais experiência e me torno um UX Designer melhor, e logo logo irei conquistar meu lugar no mercado de trabalho. Tudo isso graças a Sou Junior.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-010 — indicar o início do carrossel de depoimentos

**Pré-condição:** A seção acabou de ser carregada.

**Dado que** a seção acabou de ser carregada

**Quando** observar os controles de navegação

**Então** a seta anterior deve estar desabilitada e a próxima deve estar disponível.

**Variações:** Desktop.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-011 — avançar os depoimentos e retornar ao primeiro lote

**Pré-condição:** O usuário está no primeiro lote.

**Dado que** o usuário está no primeiro lote

**Quando** avançar uma vez e depois voltar

**Então** Ana Santos deve entrar na área visível e o retorno deve trazer Priscilla Souza novamente.

**Variações:** Desktop.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-012 — impedir o avanço depois do último lote

**Pré-condição:** O usuário percorre os depoimentos.

**Dado que** o usuário percorre os depoimentos

**Quando** chegar ao terceiro lote

**Então** Talita e Eduardo devem estar disponíveis e a seta de próximo deve estar desabilitada.

**Variações:** Desktop.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-013 — preservar as bordas do texto do depoimento

**Pré-condição:** O usuário visualiza o card de Caique Fonseca.

**Dado que** o usuário visualiza o card de Caique Fonseca

**Quando** ler o texto completo do card

**Então** o parágrafo deve caber no seu painel, sem ultrapassar a largura do conteúdo.

**Variações:** Desktop.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

### CT-DEP-014 — manter um depoimento legível no celular

**Pré-condição:** O usuário está em uma tela mobile.

**Dado que** o usuário está em uma tela mobile

**Quando** acessar o primeiro depoimento

**Então** a imagem deve carregar e o texto deve caber na largura do card.

**Variações:** Mobile.

**Referências:** [#1263](https://github.com/SouJunior/products/issues/1263), [#1333](https://github.com/SouJunior/products/issues/1333).

## Iniciativas temporariamente ocultas

Implementações: [Cypress](../cypress/e2e/iniciativas.cy.js) · [Playwright](../tests/playwright/iniciativas.spec.js).

### CT-INI-001 — ocultar a seção de iniciativas enquanto não há programas ativos

**Pré-condição:** Labs e Talk estão congelados conforme a história 1345.

**Dado que** Labs e Talk estão congelados conforme a história 1345

**Quando** acessar a Home

**Então** a seção de iniciativas e os títulos dos programas não devem ser exibidos.

**Variações:** Desktop.

**Referências:** [#1276](https://github.com/SouJunior/products/issues/1276), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-INI-002 — retirar o acesso às iniciativas do cabeçalho

**Pré-condição:** Não há iniciativas ativas.

**Dado que** não há iniciativas ativas

**Quando** visualizar o menu principal

**Então** o item Nossas iniciativas não deve aparecer.

**Variações:** Desktop.

**Referências:** [#1276](https://github.com/SouJunior/products/issues/1276), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-INI-003 — retirar o acesso às iniciativas do rodapé

**Pré-condição:** Não há iniciativas ativas.

**Dado que** não há iniciativas ativas

**Quando** consultar os atalhos do rodapé

**Então** o rodapé não deve oferecer a seção temporariamente indisponível.

**Variações:** Desktop.

**Referências:** [#1276](https://github.com/SouJunior/products/issues/1276), [#1345](https://github.com/SouJunior/products/issues/1345).

### CT-INI-004 — evitar âncoras órfãs para iniciativas ocultas

**Pré-condição:** A seção de iniciativas está oculta.

**Dado que** a seção de iniciativas está oculta

**Quando** inspecionar os destinos dos links internos

**Então** não deve restar um link apontando para a seção removida.

**Variações:** Desktop.

**Referências:** [#1276](https://github.com/SouJunior/products/issues/1276), [#1345](https://github.com/SouJunior/products/issues/1345).

## Papéis na comunidade

Implementações: [Cypress](../cypress/e2e/comunidade.cy.js) · [Playwright](../tests/playwright/comunidade.spec.js).

### CT-COM-001 — convidar o visitante a fazer parte da comunidade

**Pré-condição:** O usuário navega pela Home.

**Dado que** o usuário navega pela Home

**Quando** chegar à seção da comunidade

**Então** o convite e o texto de introdução devem estar disponíveis.

**Variações:** Desktop.

**Referências:** [#1282](https://github.com/SouJunior/products/issues/1282).

### CT-COM-002 — explicar a atuação de Júnior

**Pré-condição:** O usuário visualiza os papéis da comunidade.

**Dado que** o usuário visualiza os papéis da comunidade

**Quando** ler a descrição de Júnior

**Então** o nome do papel deve acompanhar a descrição: Júnior executa tarefas do projeto enquanto aprende na prática e desenvolve habilidades, sempre sob orientação de mentores e heads..

**Variações:** Desktop.

**Referências:** [#1282](https://github.com/SouJunior/products/issues/1282).

### CT-COM-003 — explicar a atuação de Mentor

**Pré-condição:** O usuário visualiza os papéis da comunidade.

**Dado que** o usuário visualiza os papéis da comunidade

**Quando** ler a descrição de Mentor

**Então** o nome do papel deve acompanhar a descrição: Mentor orienta, tira dúvidas e apoia o crescimento dos juniores dentro de cada área de atuação..

**Variações:** Desktop.

**Referências:** [#1282](https://github.com/SouJunior/products/issues/1282).

### CT-COM-004 — explicar a atuação de Head

**Pré-condição:** O usuário visualiza os papéis da comunidade.

**Dado que** o usuário visualiza os papéis da comunidade

**Quando** ler a descrição de Head

**Então** o nome do papel deve acompanhar a descrição: Head organiza e lidera equipes, toma decisões e garante que tudo funcione bem dentro do projeto..

**Variações:** Desktop.

**Referências:** [#1282](https://github.com/SouJunior/products/issues/1282).

### CT-COM-005 — oferecer o cadastro pelo botão Participar

**Pré-condição:** O usuário visualiza a comunidade.

**Dado que** o usuário visualiza a comunidade

**Quando** localizar Participar

**Então** o link deve apontar para o Stars em nova aba com os atributos de proteção.

**Variações:** Desktop.

**Referências:** [#1282](https://github.com/SouJunior/products/issues/1282).

### CT-COM-006 — preservar a leitura dos papéis no mobile

**Pré-condição:** O usuário acessa a comunidade pelo celular.

**Dado que** o usuário acessa a comunidade pelo celular

**Quando** ler as descrições e localizar Participar

**Então** os três textos e o botão devem permanecer dentro da largura disponível.

**Variações:** Mobile.

**Referências:** [#1282](https://github.com/SouJunior/products/issues/1282).

## Notícias e Eventos

Implementações: [Cypress](../cypress/e2e/noticias-e-eventos.cy.js) · [Playwright](../tests/playwright/noticias-e-eventos.spec.js).

### CT-NOT-001 — apresentar as informações dos quatro dias do evento

**Pré-condição:** O usuário acessa Notícias e Eventos.

**Dado que** o usuário acessa Notícias e Eventos

**Quando** conferir os cartões do evento

**Então** o título, quatro imagens, as datas e os quatro botões Confira devem estar presentes.

**Variações:** Desktop.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

### CT-NOT-002 — exibir os três primeiros eventos na entrada do desktop

**Pré-condição:** O usuário está no início do carrossel de notícias.

**Dado que** o usuário está no início do carrossel de notícias

**Quando** visualizar os cartões iniciais

**Então** as três primeiras imagens devem estar carregadas e inteiras na área visível.

**Variações:** Desktop.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

### CT-NOT-003 — percorrer as notícias pelos controles de navegação

**Pré-condição:** O usuário está no início do carrossel.

**Dado que** o usuário está no início do carrossel

**Quando** avançar e depois retornar

**Então** o último evento deve ficar acessível e os controles devem refletir os limites de navegação.

**Variações:** Desktop.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

### CT-NOT-004 — abrir o vídeo do evento de 04 de agosto de 2025

**Pré-condição:** O usuário visualiza os eventos.

**Dado que** o usuário visualiza os eventos

**Quando** clicar em Confira no cartão de 04 de agosto de 2025

**Então** uma nova aba deve apontar para https://www.youtube.com/live/HxXPHNXX-T0 e a Home deve continuar aberta.

**Variações:** Desktop.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

### CT-NOT-005 — abrir o vídeo do evento de 05 de agosto de 2025

**Pré-condição:** O usuário visualiza os eventos.

**Dado que** o usuário visualiza os eventos

**Quando** clicar em Confira no cartão de 05 de agosto de 2025

**Então** uma nova aba deve apontar para https://www.youtube.com/live/YI_QhYYB2a8 e a Home deve continuar aberta.

**Variações:** Desktop.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

### CT-NOT-006 — abrir o vídeo do evento de 06 de agosto de 2025

**Pré-condição:** O usuário visualiza os eventos.

**Dado que** o usuário visualiza os eventos

**Quando** clicar em Confira no cartão de 06 de agosto de 2025

**Então** uma nova aba deve apontar para https://www.youtube.com/live/tJ3DJvRlL-Q e a Home deve continuar aberta.

**Variações:** Desktop.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

### CT-NOT-007 — abrir o vídeo do evento de 07 de agosto de 2025

**Pré-condição:** O usuário visualiza os eventos.

**Dado que** o usuário visualiza os eventos

**Quando** clicar em Confira no cartão de 07 de agosto de 2025

**Então** uma nova aba deve apontar para https://www.youtube.com/live/hdbOPmegXnA e a Home deve continuar aberta.

**Variações:** Desktop.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

### CT-NOT-008 — navegar pelos quatro indicadores de eventos no mobile

**Pré-condição:** O usuário acessa Notícias e Eventos pelo celular.

**Dado que** o usuário acessa Notícias e Eventos pelo celular

**Quando** selecionar o último indicador e depois o primeiro

**Então** o indicador ativo e o evento correspondente devem acompanhar a seleção.

**Variações:** Mobile.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

### CT-NOT-009 — manter o conteúdo de um evento dentro da tela mobile

**Pré-condição:** O usuário está no primeiro evento em mobile.

**Dado que** o usuário está no primeiro evento em mobile

**Quando** ler a data e localizar Confira

**Então** a data e o botão devem caber na largura útil sem perder acesso à ação.

**Variações:** Mobile.

**Referências:** [#1268](https://github.com/SouJunior/products/issues/1268), [#1318](https://github.com/SouJunior/products/issues/1318), [#1370](https://github.com/SouJunior/products/issues/1370).

## Apoio, mascote e faixa mobile

Implementações: [Cypress](../cypress/e2e/apoio.cy.js) · [Playwright](../tests/playwright/apoio.spec.js).

### CT-APO-001 — apresentar a proposta da seção de apoio

**Pré-condição:** O usuário navega até Seja um Apoiador.

**Dado que** o usuário navega até Seja um Apoiador

**Quando** ler o conteúdo da seção

**Então** o título, a explicação sobre apoio e o ícone da mão com coração devem estar disponíveis.

**Variações:** Desktop.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-002 — oferecer o acesso à página de apoio pela mão com coração

**Pré-condição:** O usuário visualiza a seção de apoio.

**Dado que** o usuário visualiza a seção de apoio

**Quando** localizar a ação ilustrada pela mão

**Então** o link deve apontar para a página de apoio em nova aba; a página provisória pode estar em branco conforme a história.

**Variações:** Desktop.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-003 — acompanhar a rolagem com o mascote no desktop

**Pré-condição:** O usuário está acima da seção de apoio.

**Dado que** o usuário está acima da seção de apoio

**Quando** rolar até Sobre a SouJunior

**Então** o mascote deve continuar visível e fixo em relação à tela.

**Variações:** Desktop.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-004 — vincular o mascote à seção de apoio ao alcançá-la

**Pré-condição:** O mascote acompanha a navegação no desktop.

**Dado que** o mascote acompanha a navegação no desktop

**Quando** rolar até a seção de apoio entrar por inteiro na tela

**Então** o controle deve deixar a posição fixa e permanecer vinculado à seção.

**Variações:** Desktop.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-005 — retomar o mascote flutuante ao voltar para o topo

**Pré-condição:** O mascote está vinculado à seção de apoio.

**Dado que** o mascote está vinculado à seção de apoio

**Quando** rolar a página de baixo para cima até o banner

**Então** o mascote deve voltar a acompanhar a tela e permanecer visível.

**Variações:** Desktop.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-006 — preservar o destino do mascote nos dois estados

**Pré-condição:** O usuário usa o controle de apoio no desktop.

**Dado que** o usuário usa o controle de apoio no desktop

**Quando** conferir o link antes e depois de alcançar a seção

**Então** tanto flutuante quanto vinculado à seção, o controle deve apontar para a mesma página de apoio em nova aba.

**Variações:** Desktop.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-007 — substituir o mascote pela faixa inferior no celular

**Pré-condição:** O usuário acessa a Home em mobile.

**Dado que** o usuário acessa a Home em mobile

**Quando** navegar acima da seção de apoio

**Então** a faixa com texto e coração deve ficar fixa na parte inferior e o mascote do controle deve ficar oculto.

**Variações:** Mobile.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-008 — vincular a faixa à seção de apoio no mobile

**Pré-condição:** A faixa acompanha a tela do celular.

**Dado que** a faixa acompanha a tela do celular

**Quando** rolar até alcançar a seção de apoio

**Então** a faixa deve deixar a posição fixa inferior e permanecer vinculada ao bloco de apoio.

**Variações:** Mobile.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-009 — trazer a faixa de volta ao subir a página

**Pré-condição:** A faixa já está vinculada à seção de apoio no mobile.

**Dado que** a faixa já está vinculada à seção de apoio no mobile

**Quando** rolar para cima até ultrapassar a seção

**Então** a faixa deve voltar imediatamente à posição fixa inferior, sem exigir uma nova rolagem para baixo.

**Variações:** Mobile.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-010 — mostrar somente a apresentação adequada ao dispositivo

**Pré-condição:** O usuário alterna entre desktop e mobile.

**Dado que** o usuário alterna entre desktop e mobile

**Quando** redimensionar a tela

**Então** o desktop deve apresentar o mascote e o celular deve apresentar a faixa, sem exibição simultânea.

**Variações:** Desktop e mobile.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-011 — ocupar toda a largura útil com a faixa mobile

**Pré-condição:** O usuário navega com a faixa inferior no celular.

**Dado que** o usuário navega com a faixa inferior no celular

**Quando** observar o enquadramento do controle

**Então** a faixa deve começar na borda esquerda, terminar na direita e não criar rolagem horizontal.

**Variações:** Mobile.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-012 — centralizar o conjunto de texto e coração na faixa

**Pré-condição:** O usuário visualiza a faixa no celular.

**Dado que** o usuário visualiza a faixa no celular

**Quando** observar a posição do texto e do ícone

**Então** os dois elementos devem formar um conjunto centralizado dentro da faixa.

**Variações:** Mobile.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

### CT-APO-013 — preservar o acesso ao apoio na faixa móvel e vinculada

**Pré-condição:** O usuário usa a faixa em um celular.

**Dado que** o usuário usa a faixa em um celular

**Quando** conferir o destino acima da seção e depois de alcançá-la

**Então** o link deve permanecer disponível para a mesma página de apoio nos dois estados.

**Variações:** Mobile.

**Referências:** [#1271](https://github.com/SouJunior/products/issues/1271), [#1375](https://github.com/SouJunior/products/issues/1375), [#1425](https://github.com/SouJunior/products/issues/1425), [#1426](https://github.com/SouJunior/products/issues/1426).

## Perguntas Frequentes e Ouvidoria

Implementações: [Cypress](../cypress/e2e/perguntas-frequentes.cy.js) · [Playwright](../tests/playwright/perguntas-frequentes.spec.js).

### CT-FAQ-001 — apresentar a FAQ com Instituição selecionada inicialmente

**Pré-condição:** O usuário acaba de abrir a Home.

**Dado que** o usuário acaba de abrir a Home

**Quando** chegar à FAQ

**Então** o título, o subtítulo e as quatro perguntas de Instituição devem aparecer sem selecionar uma categoria.

**Variações:** Desktop.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-002 — trocar as perguntas ao escolher outra categoria

**Pré-condição:** O usuário está na FAQ.

**Dado que** o usuário está na FAQ

**Quando** selecionar Instituição, Voluntário e Mentor | Head | Apoiador

**Então** cada categoria deve mostrar somente suas perguntas e a quantidade prevista no catálogo.

**Variações:** Desktop.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-003 — abrir e recolher a resposta: Qual o objetivo do SouJunior?

**Pré-condição:** O usuário selecionou Instituição na FAQ.

**Dado que** o usuário selecionou Instituição na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Instituição.

Pergunta: Qual o objetivo do SouJunior?

Resposta esperada: A SouJunior tem como missão apoiar e preparar profissionais juniores para o mercado de tecnologia por meio do voluntariado, promovendo aprendizado, conexão e desenvolvimento na prática.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-004 — abrir e recolher a resposta: Como posso participar da Comunidade SouJunior?

**Pré-condição:** O usuário selecionou Instituição na FAQ.

**Dado que** o usuário selecionou Instituição na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Instituição.

Pergunta: Como posso participar da Comunidade SouJunior?

Resposta esperada: Você pode entrar na nossa comunidade acessando o servidor do SouJunior no Discord e no GitHub. Para se tornar membro oficialmente, é só ir no menu "Nossas Iniciativas" no site, clicar em "Conheça outras iniciativas" e preencher o formulário de candidatura. Depois disso, nosso time entra em contato com você!

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-005 — abrir e recolher a resposta: A SouJunior oferece ajuda de custo para voluntários?

**Pré-condição:** O usuário selecionou Instituição na FAQ.

**Dado que** o usuário selecionou Instituição na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Instituição.

Pergunta: A SouJunior oferece ajuda de custo para voluntários?

Resposta esperada: Não. Todas as atividades no SouJunior são voluntárias e realizadas de forma remota (home office).

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-006 — abrir e recolher a resposta: A SouJunior ajuda os juniores a entrarem no mercado de trabalho?

**Pré-condição:** O usuário selecionou Instituição na FAQ.

**Dado que** o usuário selecionou Instituição na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Instituição.

Pergunta: A SouJunior ajuda os juniores a entrarem no mercado de trabalho?

Resposta esperada: Sim. A SouJunior contribui para a inserção de profissionais juniores no mercado de trabalho ao promover o desenvolvimento de competências técnicas e comportamentais por meio de vivências práticas em um ambiente colaborativo. Nossa atuação é focada na formação integral do júnior, incentivando o protagonismo, a responsabilidade e a construção de repertório profissional relevante para os desafios do início de carreira.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-007 — abrir e recolher a resposta: Como ser voluntário no SouJunior?

**Pré-condição:** O usuário selecionou Voluntário na FAQ.

**Dado que** o usuário selecionou Voluntário na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Voluntário.

Pergunta: Como ser voluntário no SouJunior?

Resposta esperada: É simples! Acesse o menu “Faça Parte” em nosso site, você será redirecionado para o formulário de candidatura. Após o envio, seu perfil será avaliado e entraremos em contato quando surgir uma oportunidade com seu perfil.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-008 — abrir e recolher a resposta: Quanto tempo preciso me dedicar por semana?

**Pré-condição:** O usuário selecionou Voluntário na FAQ.

**Dado que** o usuário selecionou Voluntário na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Voluntário.

Pergunta: Quanto tempo preciso me dedicar por semana?

Resposta esperada: As atividades são majoritariamente assíncronas, o que permite mais flexibilidade. Cada vez possui metas e alguns encontros pontuais. Durante o processo seletivo, alinhe com o Head da área o tempo médio esperado e veja possibilidades de adaptação.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-009 — abrir e recolher a resposta: O que acontece depois que eu enviei minha candidatura?

**Pré-condição:** O usuário selecionou Voluntário na FAQ.

**Dado que** o usuário selecionou Voluntário na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Voluntário.

Pergunta: O que acontece depois que eu enviei minha candidatura?

Resposta esperada: Seu perfil entra em nosso banco de talentos. Assim que surgir uma vaga compatível, a equipe de recrutamento entrará em contato, geralmente pelo LinkedIn.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-010 — abrir e recolher a resposta: Posso ser voluntário mesmo trabalhando em outra empresa ou iniciativa?

**Pré-condição:** O usuário selecionou Voluntário na FAQ.

**Dado que** o usuário selecionou Voluntário na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Voluntário.

Pergunta: Posso ser voluntário mesmo trabalhando em outra empresa ou iniciativa?

Resposta esperada: Sim! Você pode conciliar ou voluntariar-se com outras atividades profissionais ou voluntárias.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-011 — abrir e recolher a resposta: Preciso ir até algum lugar para atuar como voluntário?

**Pré-condição:** O usuário selecionou Voluntário na FAQ.

**Dado que** o usuário selecionou Voluntário na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Voluntário.

Pergunta: Preciso ir até algum lugar para atuar como voluntário?

Resposta esperada: Não. Todas as atividades são 100% remotas (home office).

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-012 — abrir e recolher a resposta: Como posso me tornar um mentor no SouJunior?

**Pré-condição:** O usuário selecionou Mentor | Head | Apoiador na FAQ.

**Dado que** o usuário selecionou Mentor | Head | Apoiador na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Mentor | Head | Apoiador.

Pergunta: Como posso me tornar um mentor no SouJunior?

Resposta esperada: Mentores apoiam juniores na execução de atividades, esclarecendo dúvidas e orientando sobre a área de atuação. Para ser mentor, é necessário ter pelo menos 6 meses de experiência e disposição para ensinar. Para se candidatar, acesse o menu “Faça Parte”. Após o envio do formulário, você será avaliado e contatado quando surgir uma oportunidade com seu perfil.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-013 — abrir e recolher a resposta: Como posso me tornar um Head na SouJunior?

**Pré-condição:** O usuário selecionou Mentor | Head | Apoiador na FAQ.

**Dado que** o usuário selecionou Mentor | Head | Apoiador na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Mentor | Head | Apoiador.

Pergunta: Como posso me tornar um Head na SouJunior?

Resposta esperada: Os Heads lideram áreas e projetos na SouJunior, apoiando o tempo na entrega de resultados e desenvolvimento de habilidades. As vagas para Head são abertas conforme necessidade interna. Se tiver interesse, envie a sua candidatura pelo menu “Faça Parte”. Após o envio do formulário, você será avaliado e contatado quando surgir uma oportunidade com seu perfil.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-014 — abrir e recolher a resposta: Como ser um Apoiador ou Parceiro na SouJunior?

**Pré-condição:** O usuário selecionou Mentor | Head | Apoiador na FAQ.

**Dado que** o usuário selecionou Mentor | Head | Apoiador na FAQ

**Quando** abrir a pergunta e acioná-la novamente

**Então** a resposta do catálogo deve aparecer com aria-expanded=true; no segundo acionamento, deve ser recolhida e o estado deve voltar a false.

**Variações:** Desktop.

**Dados de teste**

Categoria: Mentor | Head | Apoiador.

Pergunta: Como ser um Apoiador ou Parceiro na SouJunior?

Resposta esperada: O Apoiador ou Parceiro na SouJunior, poderá incrementar seu portfólio ou envolver-se com alguma ação dentro da SouJunior. Portanto, se você acredita que pode contribuir como Apoiador ou Parceiro no SouJunior, selecione no Menu da Home do Site SouJunior a opção “Seja um apoiador”, leia sobre os tipos de apoio que o SouJunior oferece e clique em “Participar”.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-015 — manter respostas independentes abertas ao mesmo tempo

**Pré-condição:** O usuário está em Instituição.

**Dado que** o usuário está em Instituição

**Quando** abrir duas perguntas e recolher somente a primeira

**Então** a segunda resposta deve continuar aberta e legível.

**Variações:** Desktop.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-016 — operar uma pergunta com Enter e Espaço

**Pré-condição:** O usuário posicionou o foco em uma pergunta da FAQ.

**Dado que** o usuário posicionou o foco em uma pergunta da FAQ

**Quando** pressionar Enter e depois Espaço

**Então** Enter deve abrir a resposta e Espaço deve recolhê-la.

**Variações:** Desktop.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-017 — manter o acesso à Ouvidoria disponível na FAQ

**Pré-condição:** O usuário procura uma dúvida que não encontrou na lista.

**Dado que** o usuário procura uma dúvida que não encontrou na lista

**Quando** localizar o convite Pergunte Aqui

**Então** a mensagem de apoio deve acompanhar um link para /FAQ em nova aba, sem exigir conteúdo da página provisória.

**Variações:** Desktop.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-018 — trocar categorias e ler respostas no celular

**Pré-condição:** O usuário acessa a FAQ pelo mobile.

**Dado que** o usuário acessa a FAQ pelo mobile

**Quando** selecionar cada categoria e abrir sua primeira pergunta

**Então** os controles devem continuar acessíveis e a resposta correta deve ficar legível.

**Variações:** Mobile.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

### CT-FAQ-019 — acompanhar o estado da pergunta pela direção da seta

**Pré-condição:** O usuário visualiza uma pergunta fechada.

**Dado que** o usuário visualiza uma pergunta fechada

**Quando** abrir e recolher a pergunta

**Então** a seta deve apontar para baixo no estado fechado e para cima no estado aberto, conforme o protótipo.

**Variações:** Desktop e mobile.

**Referências:** [#1300](https://github.com/SouJunior/products/issues/1300), [#1309](https://github.com/SouJunior/products/issues/1309), [#1310](https://github.com/SouJunior/products/issues/1310), [#1357](https://github.com/SouJunior/products/issues/1357).

**Revisão manual:** Inspeção visual do ícone. Os testes automatizados verificam expansão, resposta e aria-expanded; não fixam um ângulo CSS que depende do desenho original do SVG.

## Identidade visual: logo

Implementações: [Cypress](../cypress/e2e/logo.cy.js) · [Playwright](../tests/playwright/logo.spec.js).

### CT-LOG-001 — carregar a identidade da marca no cabeçalho e no rodapé

**Pré-condição:** O usuário acessa a Home.

**Dado que** o usuário acessa a Home

**Quando** observar as logos do topo e da base

**Então** as duas imagens devem carregar e a versão do cabeçalho deve ser vetorial.

**Variações:** Desktop.

**Referências:** [#1321](https://github.com/SouJunior/products/issues/1321), [#1363](https://github.com/SouJunior/products/issues/1363).

### CT-LOG-002 — disponibilizar um favicon que possa ser carregado

**Pré-condição:** O usuário abre a aplicação.

**Dado que** o usuário abre a aplicação

**Quando** consultar o ícone declarado no documento

**Então** o favicon deve ter endereço válido e ser servido como imagem.

**Variações:** Desktop.

**Referências:** [#1321](https://github.com/SouJunior/products/issues/1321), [#1363](https://github.com/SouJunior/products/issues/1363).

### CT-LOG-003 — usar a logo do cabeçalho como atalho para a Home

**Pré-condição:** O usuário acessa uma página interna.

**Dado que** o usuário acessa uma página interna

**Quando** clicar na logo do cabeçalho

**Então** a aplicação deve retornar à Home.

**Variações:** Desktop.

**Referências:** [#1321](https://github.com/SouJunior/products/issues/1321), [#1363](https://github.com/SouJunior/products/issues/1363).

### CT-LOG-004 — usar a logo do rodapé como atalho para a Home

**Pré-condição:** O usuário acessa uma página interna.

**Dado que** o usuário acessa uma página interna

**Quando** clicar na logo do rodapé

**Então** a aplicação deve retornar à Home.

**Variações:** Desktop.

**Referências:** [#1321](https://github.com/SouJunior/products/issues/1321), [#1363](https://github.com/SouJunior/products/issues/1363).

### CT-LOG-005 — aplicar a marca nas onze páginas internas

**Pré-condição:** O usuário acessa uma página da tabela de áreas internas.

**Dado que** o usuário acessa uma página da tabela de áreas internas

**Quando** conferir as imagens do cabeçalho e do rodapé

**Então** as duas logos devem carregar com a mesma identificação da marca.

**Variações:** Uma execução independente para cada uma das 11 rotas.

**Referências:** [#1321](https://github.com/SouJunior/products/issues/1321), [#1363](https://github.com/SouJunior/products/issues/1363).

### CT-LOG-006 — manter as logos acessíveis nas larguras mobile

**Pré-condição:** O usuário acessa a Home pelo celular.

**Dado que** o usuário acessa a Home pelo celular

**Quando** alternar entre 375, 390 e 430 pixels de largura

**Então** as imagens devem carregar e permanecer dentro dos limites da tela.

**Variações:** 375, 390 e 430 px.

**Referências:** [#1321](https://github.com/SouJunior/products/issues/1321), [#1363](https://github.com/SouJunior/products/issues/1363).

## Identidade visual: paleta de cores

Implementações: [Cypress](../cypress/e2e/cores.cy.js) · [Playwright](../tests/playwright/cores.spec.js).

### CT-COR-001 — aplicar o azul principal ao cabeçalho

**Pré-condição:** A paleta da história 1322 está em vigor.

**Dado que** a paleta da história 1322 está em vigor

**Quando** visualizar o cabeçalho

**Então** o fundo efetivo do cabeçalho deve usar o azul #3C7EF9.

**Variações:** Desktop e mobile.

**Referências:** [#1322](https://github.com/SouJunior/products/issues/1322).

### CT-COR-002 — aplicar o azul principal ao rodapé

**Pré-condição:** O usuário acessa a Home.

**Dado que** o usuário acessa a Home

**Quando** rolar até o rodapé

**Então** o fundo efetivo do rodapé deve usar o azul #3C7EF9.

**Variações:** Desktop e mobile.

**Referências:** [#1322](https://github.com/SouJunior/products/issues/1322).

### CT-COR-003 — aplicar o azul principal ao fundo do banner

**Pré-condição:** O usuário visualiza o banner.

**Dado que** o usuário visualiza o banner

**Quando** conferir o painel atrás do título

**Então** o fundo efetivo deve seguir o azul #3C7EF9 previsto na paleta.

**Variações:** Desktop e mobile.

**Referências:** [#1322](https://github.com/SouJunior/products/issues/1322).

### CT-COR-004 — aplicar o azul principal aos dez cards das áreas

**Pré-condição:** O usuário visualiza Áreas de atuação.

**Dado que** o usuário visualiza Áreas de atuação

**Quando** conferir o painel de cada card

**Então** cada título de área deve estar sobre o azul #3C7EF9.

**Variações:** Desktop e mobile.

**Referências:** [#1322](https://github.com/SouJunior/products/issues/1322).

### CT-COR-005 — aplicar o azul principal aos painéis de depoimento

**Pré-condição:** O usuário acessa os depoimentos.

**Dado que** o usuário acessa os depoimentos

**Quando** conferir o fundo dos oito textos

**Então** cada painel de relato deve usar o azul #3C7EF9 previsto na história.

**Variações:** Desktop e mobile.

**Referências:** [#1322](https://github.com/SouJunior/products/issues/1322).

### CT-COR-006 — aplicar o azul principal ao botão Participar

**Pré-condição:** O usuário visualiza a seção da comunidade.

**Dado que** o usuário visualiza a seção da comunidade

**Quando** localizar Participar

**Então** o fundo da ação deve acompanhar o azul #3C7EF9.

**Variações:** Desktop e mobile.

**Referências:** [#1322](https://github.com/SouJunior/products/issues/1322).

### CT-COR-007 — replicar a paleta nas páginas internas

**Pré-condição:** O usuário acessa uma rota da tabela de áreas.

**Dado que** o usuário acessa uma rota da tabela de áreas

**Quando** conferir cabeçalho e rodapé

**Então** os pontos da marca previstos na história 1322 devem acompanhar o azul principal.

**Variações:** 11 rotas, em desktop e mobile.

**Referências:** [#1322](https://github.com/SouJunior/products/issues/1322).

## Atalhos do rodapé

Implementações: [Cypress](../cypress/e2e/rodape.cy.js) · [Playwright](../tests/playwright/rodape.spec.js).

### CT-ROD-001 — oferecer o cadastro no Stars pelo rodapé

**Pré-condição:** O usuário chega ao rodapé.

**Dado que** o usuário chega ao rodapé

**Quando** localizar Faça parte

**Então** a ação deve ser clicável e apontar para o Stars em outra aba.

**Variações:** Desktop.

**Referências:** [#1307](https://github.com/SouJunior/products/issues/1307), [#1374](https://github.com/SouJunior/products/issues/1374).

### CT-ROD-002 — sinalizar a interação no convite do rodapé

**Pré-condição:** O usuário visualiza Faça parte no rodapé.

**Dado que** o usuário visualiza Faça parte no rodapé

**Quando** posicionar o cursor sobre o convite

**Então** o elemento deve apresentar cursor de interação e continuar com o destino do Stars.

**Variações:** Desktop.

**Referências:** [#1307](https://github.com/SouJunior/products/issues/1307), [#1374](https://github.com/SouJunior/products/issues/1374).

### CT-ROD-003 — manter o convite do rodapé acessível no celular

**Pré-condição:** O usuário acessa o rodapé pelo mobile.

**Dado que** o usuário acessa o rodapé pelo mobile

**Quando** localizar Faça parte

**Então** o link deve ficar legível, dentro da largura da tela e com o mesmo destino.

**Variações:** Mobile.

**Referências:** [#1307](https://github.com/SouJunior/products/issues/1307), [#1374](https://github.com/SouJunior/products/issues/1374).

## Revisões visuais complementares

### CT-VIS-001 — conferir a composição das seções com o protótipo

**Pré-condição:** O protótipo da história está acessível.

**Dado que** o protótipo da história está acessível

**Quando** comparar desktop e mobile

**Então** tipografia, cores, alinhamento, espaçamentos e hierarquia devem seguir o desenho da história vigente.

**Variações:** Desktop e mobile.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1263](https://github.com/SouJunior/products/issues/1263), [#1264](https://github.com/SouJunior/products/issues/1264), [#1321](https://github.com/SouJunior/products/issues/1321), [#1372](https://github.com/SouJunior/products/issues/1372), [#1300](https://github.com/SouJunior/products/issues/1300).

**Revisão manual:** Revisão humana com o protótipo. A automação associada cobre contratos de conteúdo, navegação, carregamento e limites de layout, sem afirmar equivalência visual completa.

### CT-VIS-002 — preservar a qualidade e a proporção das logos

**Pré-condição:** O usuário acessa Home e uma página interna.

**Dado que** o usuário acessa Home e uma página interna

**Quando** comparar as logos no cabeçalho, rodapé e favicon

**Então** a marca deve seguir os arquivos oficiais, manter proporção e nitidez; conferir o formato vetorial previsto na história de identidade.

**Variações:** Desktop e mobile.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1263](https://github.com/SouJunior/products/issues/1263), [#1264](https://github.com/SouJunior/products/issues/1264), [#1321](https://github.com/SouJunior/products/issues/1321), [#1372](https://github.com/SouJunior/products/issues/1372), [#1300](https://github.com/SouJunior/products/issues/1300).

**Revisão manual:** Revisão humana com o protótipo. A automação associada cobre contratos de conteúdo, navegação, carregamento e limites de layout, sem afirmar equivalência visual completa.

### CT-VIS-003 — manter as setas próximas dos cards das áreas

**Pré-condição:** O usuário acessa o carrossel no desktop.

**Dado que** o usuário acessa o carrossel no desktop

**Quando** comparar a posição das setas com a borda dos cards

**Então** os controles devem compor o carrossel com as margens previstas, sem se afastar até os extremos da tela.

**Variações:** Desktop e mobile.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1263](https://github.com/SouJunior/products/issues/1263), [#1264](https://github.com/SouJunior/products/issues/1264), [#1321](https://github.com/SouJunior/products/issues/1321), [#1372](https://github.com/SouJunior/products/issues/1372), [#1300](https://github.com/SouJunior/products/issues/1300).

**Revisão manual:** Revisão humana com o protótipo. A automação associada cobre contratos de conteúdo, navegação, carregamento e limites de layout, sem afirmar equivalência visual completa.

### CT-VIS-004 — apresentar o feedback de hover no menu

**Pré-condição:** O usuário acessa o cabeçalho com mouse.

**Dado que** o usuário acessa o cabeçalho com mouse

**Quando** passar o cursor sobre cada item sem clicar

**Então** o cursor, o fundo azulado e o sublinhado devem comunicar a interação conforme o protótipo.

**Variações:** Desktop e mobile.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1263](https://github.com/SouJunior/products/issues/1263), [#1264](https://github.com/SouJunior/products/issues/1264), [#1321](https://github.com/SouJunior/products/issues/1321), [#1372](https://github.com/SouJunior/products/issues/1372), [#1300](https://github.com/SouJunior/products/issues/1300).

**Revisão manual:** Revisão humana com o protótipo. A automação associada cobre contratos de conteúdo, navegação, carregamento e limites de layout, sem afirmar equivalência visual completa.

### CT-VIS-005 — destacar a categoria selecionada na FAQ

**Pré-condição:** O usuário visualiza as categorias da FAQ.

**Dado que** o usuário visualiza as categorias da FAQ

**Quando** alternar entre as três categorias

**Então** a categoria atual deve ter destaque visual consistente com as perguntas apresentadas.

**Variações:** Desktop e mobile.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1263](https://github.com/SouJunior/products/issues/1263), [#1264](https://github.com/SouJunior/products/issues/1264), [#1321](https://github.com/SouJunior/products/issues/1321), [#1372](https://github.com/SouJunior/products/issues/1372), [#1300](https://github.com/SouJunior/products/issues/1300).

**Revisão manual:** Revisão humana com o protótipo. A automação associada cobre contratos de conteúdo, navegação, carregamento e limites de layout, sem afirmar equivalência visual completa.

### CT-VIS-006 — conferir a leitura integral dos relatos durante as transições

**Pré-condição:** O usuário acessa Depoimentos em desktop e mobile.

**Dado que** o usuário acessa Depoimentos em desktop e mobile

**Quando** percorrer todos os relatos e observar o movimento

**Então** nenhuma letra ou palavra deve ficar cortada pela borda do próprio card; o recorte de continuidade não deve prejudicar o card em foco.

**Variações:** Desktop e mobile.

**Referências:** [#1260](https://github.com/SouJunior/products/issues/1260), [#1263](https://github.com/SouJunior/products/issues/1263), [#1264](https://github.com/SouJunior/products/issues/1264), [#1321](https://github.com/SouJunior/products/issues/1321), [#1372](https://github.com/SouJunior/products/issues/1372), [#1300](https://github.com/SouJunior/products/issues/1300).

**Revisão manual:** Revisão humana com o protótipo. A automação associada cobre contratos de conteúdo, navegação, carregamento e limites de layout, sem afirmar equivalência visual completa.

## Manutenção

Os casos são expectativas do produto. Eles não devem ser alterados somente porque a implementação mostrou outro comportamento. Antes de ajustar uma expectativa, consulte a história, o protótipo e a decisão de produto que sustentam a mudança.

Dados de conteúdo ficam nos arquivos de referência; ações e seletores repetidos ficam nos auxiliares de cada framework. Mudanças pequenas devem continuar fáceis de localizar nos specs, sem criar um framework dentro do projeto.
