# Qualidade na prática — SouJunior

<p>
  <img src="https://img.shields.io/badge/Cypress-14.5-17202C?logo=cypress&logoColor=white" alt="Cypress 14.5" />
  <img src="https://img.shields.io/badge/Playwright-1.59-2EAD33?logo=playwright&logoColor=white" alt="Playwright 1.59" />
  <img src="https://img.shields.io/badge/JavaScript-E2E-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" />
</p>

Sou **Douglas Antonio**, QA voluntário na SouJunior. Este repositório reúne a automação que desenvolvo a partir do meu trabalho no produto: analisar histórias, consultar protótipos, escrever cenários, investigar comportamentos e acompanhar os ajustes com o time.

Uso **Cypress e Playwright** para cobrir a experiência de quem chega ao site, conhece a iniciativa, explora as áreas e procura uma forma de participar. Os cenários partem de demandas reais do projeto, com referências que permitem voltar ao requisito e entender o motivo de cada validação.

[Consultar os casos de teste](docs/casos-de-teste.md) · [Executar o projeto](#como-executar) · [Conhecer a organização](#organização-do-repositório)

## Minha contribuição no projeto

Meu trabalho conecta análise de produto e automação. Aqui, isso aparece em decisões concretas:

- **Cenários com contexto:** pré-condições, passos e resultados esperados organizados por funcionalidade, em português e com referência às histórias.
- **Cobertura nos dois frameworks:** os mesmos contratos de negócio são exercitados em Cypress e Playwright, com dados compartilhados e implementações próprias de cada ferramenta.
- **Atenção à experiência de uso:** navegação, teclado, estados do accordion, imagens carregadas, limites dos carrosséis e comportamento em telas menores.
- **Acompanhamento da evolução do produto:** mudanças de escopo entram na suíte, como a ocultação das iniciativas, as dez áreas da Home e as onze páginas internas.
- **Manutenção sem perder a intenção:** seletores por nome acessível, papel, texto e destino; Page Objects pequenos para reunir apenas o que se repete.

Os [registros no projeto da SouJunior](https://github.com/orgs/SouJunior/projects/9/views/1) dão contexto a esse trabalho. A documentação de casos liga as histórias à automação e mantém as revisões visuais que precisam de comparação humana com o protótipo.

## O que a suíte cobre

| Frente                | Principais verificações                                         |
| --------------------- | --------------------------------------------------------------- |
| Cabeçalho             | Menu, âncoras, cadastro no Stars e navegação mobile             |
| Banner principal      | Conteúdo, chamada para participação e adaptação ao celular      |
| Sobre e Nosso Impacto | Textos, indicadores, margens e leitura em mobile                |
| Áreas de atuação      | Dez cards, setas, indicadores e limites do carrossel            |
| Páginas internas      | Conteúdo e convites para participação nas onze rotas            |
| Depoimentos           | Oito relatos, fotos, cargos, textos e navegação entre lotes     |
| Iniciativas           | Ocultação da seção e dos atalhos durante a pausa dos programas  |
| Comunidade            | Papéis de Júnior, Mentor e Head, além do acesso ao cadastro     |
| Notícias e Eventos    | Quatro eventos, vídeos, indicadores mobile e mudança de resolução |
| Apoio                 | Seção, mascote no desktop, faixa mobile e transições de rolagem |
| FAQ e Ouvidoria       | Categorias, respostas, expansão, teclado e acesso à Ouvidoria   |
| Identidade visual     | Logos, favicon e contratos da paleta de cores                   |
| Rodapé                | Convite para participação, destino e indicação de interação     |

O catálogo completo está em **[docs/casos-de-teste.md](docs/casos-de-teste.md)**. O identificador no título de cada teste ajuda a localizar o roteiro correspondente, inclusive quando o mesmo caso usa várias rotas ou resoluções.

## Como organizei a automação

Cada arquivo cuida de uma parte do site. Os testes descrevem a ação e a regra esperada; os auxiliares concentram navegação e verificações recorrentes, como integridade de imagens, links externos e limites horizontais.

Os dados de áreas, papéis, eventos, perguntas e depoimentos ficam em **shared/**. São expectativas independentes, mantidas neste repositório: a suíte não importa componentes ou dados diretamente da aplicação.

Nos links acionados por JavaScript, verifico o destino da nova aba sem depender da disponibilidade do serviço externo. Nos links HTML, verifico o endereço e, quando previsto no caso, a abertura em outra aba e os atributos de proteção. A documentação distingue esses contratos da validação do conteúdo de sites terceiros.

Para acessibilidade, cubro interações práticas de teclado, nomes acessíveis e estados ARIA. Para fidelidade ao Figma, os roteiros de revisão visual complementam a automação.

As verificações de largura consideram a área útil do navegador, inclusive quando há barra de rolagem. No carrossel de eventos, o acesso pelo celular e a mudança de resolução são cenários separados.

## Como executar

É necessário ter **Node.js 22 ou superior**, npm e a aplicação SouJunior em execução. O código do site fica em outro repositório: [SouJunior/site-webapp-v2](https://github.com/SouJunior/site-webapp-v2).

```bash
git clone https://github.com/DouglasAntoni0/Testes-E2E-SouJunior.git
cd Testes-E2E-SouJunior
npm ci
npx playwright install chromium
```

Copie **.env.example** para **.env** e configure a URL da aplicação:

```env
BASE_URL=http://localhost:3000
```

| Comando                   | Uso                                         |
| ------------------------- | ------------------------------------------- |
| npm run cypress:open      | Abrir o Cypress em modo interativo          |
| npm run cypress:run       | Executar a suíte Cypress                    |
| npm run playwright:test   | Executar a suíte Playwright                 |
| npm run playwright:headed | Executar o Playwright com navegador visível |
| npm run playwright:list   | Consultar os cenários disponíveis           |
| npm run test:e2e          | Executar as duas suítes em sequência        |

Mantenha o site em um terminal e execute os testes em outro. Todos os cenários usam a URL da configuração, sem precisar editar os specs ao trocar de ambiente.

## Organização do repositório

```text
cypress/
  e2e/                   Cenários por funcionalidade
  support/
    pages/               Navegação e seletores recorrentes
    validacoes.js        Verificações compartilhadas no Cypress
tests/playwright/
  *.spec.js              Cenários por funcionalidade
  pages/                 Navegação e seletores recorrentes
  apoio/validacoes.js    Verificações compartilhadas no Playwright
shared/                  Dados esperados e medidas de layout
docs/casos-de-teste.md    Catálogo BDD e rastreabilidade
scripts/                 Execução conjunta das suítes
```

## Cuidados que mantenho na suíte

Prefiro um teste que explique uma regra a um fluxo enorme que tente conferir o site inteiro. Cada cenário começa em um estado conhecido e usa as esperas da própria ferramenta para observar a interface.

Quando um requisito muda, reviso o caso, os dados e a implementação juntos. Uma mudança observada na tela, por si só, não redefine o resultado esperado.

## Sobre mim

**Douglas Antonio — QA e voluntário na SouJunior**

Tenho dedicado meu trabalho ao entendimento dos requisitos, à elaboração de cenários e à construção de uma automação que o time consiga ler e manter. Este projeto reúne minha prática com testes funcionais, interface, responsividade e investigação de problemas em um produto que continua evoluindo.

[LinkedIn](https://www.linkedin.com/in/douglas-antonio-qa/) · [GitHub](https://github.com/DouglasAntoni0) · [Portfólio](https://douglasqa.netlify.app)
