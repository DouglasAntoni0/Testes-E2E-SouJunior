<p align="center">
  <img src="https://soujunior.tech/assets/logoPrincipal-BiqxuLdz.svg" alt="SouJunior Logo" width="230" />
</p>

<h1 align="center">QA E2E Test Suite - SouJunior WebApp</h1>

<p align="center">
  <strong>Uma suíte autoral de testes End-to-End criada para transformar risco de regressão em evidência técnica.</strong><br/>
  Cypress + Playwright · 73 cenários · 17 specs · Bugs reais documentados · Arquitetura pronta para CI
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Cypress-14.5.4-04C38E?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress 14.5.4" />
  <img src="https://img.shields.io/badge/Playwright-1.59.1-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright 1.59.1" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 18+" />
  <img src="https://img.shields.io/badge/JavaScript-E2E-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Cenários-73-blue?style=for-the-badge" alt="73 cenários" />
  <img src="https://img.shields.io/badge/Specs-17-blueviolet?style=for-the-badge" alt="17 specs" />
</p>

<p align="center">
  <a href="#quick-start"><img src="https://img.shields.io/badge/Quick_Start-000?style=flat-square" alt="Quick Start" /></a>
  <a href="#cobertura"><img src="https://img.shields.io/badge/Cobertura-000?style=flat-square" alt="Cobertura" /></a>
  <a href="#como-interpretar-a-suíte"><img src="https://img.shields.io/badge/Leitura_da_suíte-000?style=flat-square" alt="Como interpretar" /></a>
  <a href="#sobre-o-autor"><img src="https://img.shields.io/badge/Autor-000?style=flat-square" alt="Autor" /></a>
</p>

---

## Visão Geral

Este repositório reúne uma suíte independente de testes End-to-End para a plataforma [SouJunior](https://soujunior.tech). Ele foi criado para validar fluxos críticos da Home, identidade visual, navegação, responsividade, acessibilidade prática e integridade visual usando dois dos frameworks mais fortes do mercado: Cypress e Playwright.

O projeto nasceu de uma iniciativa voluntária e autônoma: enxergar uma oportunidade de aumentar a confiança da plataforma, desenhar uma estratégia de QA E2E do zero e entregar uma base que qualquer time poderia evoluir sem depender do código-fonte da aplicação.

> 73 cenários · 17 arquivos de spec · 9 frentes funcionais/visuais · 2 frameworks · 1 repositório focado em qualidade de produto

## Sobre o Autor

**Douglas Antonio** - QA Engineer e voluntário na SouJunior.

Eu construí este projeto de ponta a ponta: estratégia, estrutura, escrita dos cenários, documentação, análise de bugs e organização para execução local. A ideia não foi apenas “ter testes”, mas criar uma suíte que mostra raciocínio de QA: entender risco, validar comportamento real do usuário, registrar evidências e deixar claro o que está pronto, o que falha e por quê.

Este repositório mostra mais do que sintaxe de Cypress ou Playwright. Ele mostra iniciativa, senso de produto, cuidado com acessibilidade, visão de manutenção e coragem de documentar problemas reais em vez de esconder falhas para deixar o relatório bonito.

## Diferenciais Técnicos

| Diferencial | O que isso demonstra |
|---|---|
| **Dual-framework real** | Domínio prático de Cypress e Playwright, com cenários equivalentes em grande parte da suíte |
| **Repositório desacoplado** | Testes apontam para a aplicação via URL, sem depender de imports internos do front-end |
| **Cobertura funcional e visual** | Valida fluxo, texto, links, imagens carregadas, cores, viewport e estados de UI |
| **Bugs como evidência** | Falhas existentes permanecem visíveis para servir como documentação executável dos problemas |
| **Estrutura simples de evoluir** | Specs por seção, Page Objects leves, dados compartilhados e configuração por `.env` |
| **Mentalidade de produto** | Os testes priorizam impacto no usuário: navegação, responsividade, confiança visual e acessibilidade básica |

## Cobertura

| Frente testada | Cypress | Playwright | Cenários | O que é validado |
|---|:---:|:---:|:---:|---|
| **FAQ / Perguntas Frequentes** | Sim | Sim | 12 | Abas, accordion, respostas, estado ARIA, mobile e ouvidoria |
| **Depoimentos** | Sim | Sim | 6 | Carrossel, dados dos cards, imagens carregadas e setas |
| **Nossas Iniciativas** | Sim | Sim | 4 | Cards SouJunior Labs/Talk, textos, imagens e redirecionamentos |
| **Faça Parte** | Sim | Sim | 4 | Papéis da comunidade e link para o Stars |
| **Menu Principal** | Sim | Sim | 2 | Scroll até a seção de iniciativas |
| **Header da Home** | Sim | Não | 7 | Scroll, rede, mobile, sticky, teclado e hover |
| **Seja um Apoiador** | Sim | Sim | 14 | Mascote, seção, links, header e comportamento mobile |
| **Nova Logo** | Sim | Sim | 8 | Header, Footer, favicon, responsividade e link estrutural |
| **Novas Cores** | Sim | Sim | 16 | Footer, Hero, áreas de atuação e depoimentos em desktop/mobile |
| **Total** | **40** | **33** | **73** | **Cobertura E2E distribuída entre comportamento, UI e identidade visual** |

## Como Interpretar a Suíte

Esta suíte não foi feita para maquiar resultado. Alguns testes falham no baseline atual porque apontam bugs ou pendências reais da aplicação testada. Isso é intencionalmente transparente: um teste vermelho aqui pode ser um achado de QA, não um erro de automação.

Baseline local observado com a aplicação em `http://localhost:3000`:

| Framework | Cenários | Passando | Falhando | Leitura correta |
|---|---:|---:|---:|---|
| **Cypress** | 40 | 27 | 13 | Falhas registram bugs de UI, acessibilidade, dependências de comandos e divergências visuais |
| **Playwright** | 33 | 26 | 7 | Falhas preservam os mesmos achados sem silenciar comportamento incorreto |
| **Total** | **73** | **53** | **20** | **A suíte entrega cobertura e evidência, não falso positivo** |

## Bugs e Riscos Documentados

Durante a escrita dos testes, a suíte identificou pontos que merecem atenção do produto:

| Área | Evidência capturada pelos testes | Impacto |
|---|---|---|
| **Header mobile** | Botão hambúrguer esperado não está disponível/visível no cenário testado | Acessibilidade e navegação mobile |
| **Header sticky** | Header não permanece `fixed` ou `sticky` após scroll até o rodapé | Consistência de navegação |
| **Header - Seja um Apoiador** | Link do header não possui `href`/`target` esperados | Redirecionamento quebrado ou incompleto |
| **Logo do Footer** | Logo do rodapé não está envolvida por link para a Home | Navegação estrutural e consistência |
| **FAQ** | Ícone de seta não reflete rotação esperada em alguns fluxos | Feedback visual de estado |
| **Depoimentos / Faça Parte / Apoiador** | Algumas validações expõem divergências de conteúdo ou visibilidade | Integridade visual e textual |

## Arquitetura do Projeto

```text
qa-e2e-tests/
├── cypress/
│   ├── e2e/
│   │   ├── depoimentos.cy.js
│   │   ├── façaparte.cy.js
│   │   ├── headerdahome.cy.js
│   │   ├── iniciativas.cy.js
│   │   ├── nossainiciativas.cy.js
│   │   ├── novalogo.cy.js
│   │   ├── novascores.cy.js
│   │   ├── perguntasfrequentes.cy.js
│   │   └── sejaumapoiador.cy.js
│   └── support/
│       ├── pages/                  # Page Objects leves usados pelos specs Cypress
│       ├── commands.js
│       └── e2e.js
├── tests/
│   └── playwright/
│       ├── pages/                  # Page Objects leves usados pelos specs Playwright
│       ├── depoimentos.spec.js
│       ├── façaparte.spec.js
│       ├── iniciativas.spec.js
│       ├── nossainiciativas.spec.js
│       ├── novalogo.spec.js
│       ├── novascores.spec.js
│       ├── perguntasfrequentes.spec.js
│       └── sejaumapoiador.spec.js
├── shared/
│   └── depoimentos.data.js
├── cypress.config.js
├── playwright.config.js
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

## Page Objects Leves

A suíte usa Page Objects de forma intencional: só onde existe repetição real, sem esconder a leitura dos cenários. A regra é simples: o spec continua contando o comportamento esperado; o Page Object concentra navegação, seletores e ações recorrentes.

| Camada | Responsabilidade |
|---|---|
| `HomePage` | Centraliza navegação inicial da aplicação |
| `DepoimentosSection` | Valida cards, imagens, textos e navegação do carrossel |
| `FaqSection` | Agrupa ações de accordion, abas, perguntas, respostas e ouvidoria |
| `LogoSection` | Valida logo, favicon, links estruturais e responsividade |
| `ColorPaletteSection` | Valida aplicação da nova paleta em Hero, Footer, áreas e depoimentos |

Essa arquitetura melhora manutenção sem transformar o projeto em um framework pesado. Se um seletor mudar, o ajuste fica concentrado; se um recrutador ou QA abrir um spec, ainda consegue entender o fluxo de negócio rapidamente.

## Decisões de QA

| Decisão | Motivo |
|---|---|
| **Dois frameworks na mesma estratégia** | Comparar abordagens, aumentar repertório técnico e validar comportamento por motores diferentes |
| **Specs por seção da aplicação** | Facilitar manutenção, leitura e expansão por qualquer pessoa do time |
| **Page Objects leves** | Centralizar ações/seletores repetidos sem esconder a intenção dos cenários |
| **Configuração via `.env`** | Trocar ambiente sem alterar código |
| **Worker único no Playwright** | Priorizar estabilidade em uma suíte DOM-heavy |
| **Validação de imagem real** | Evitar falso positivo de imagem presente no DOM mas quebrada no carregamento |
| **Falhas mantidas visíveis** | Transformar bug em evidência, sem pular teste nem enfraquecer assert |

## Quick Start

### Pré-requisitos

| Requisito | Versão recomendada |
|---|---|
| Node.js | 18 ou superior |
| npm | 9 ou superior |
| Aplicação SouJunior | Rodando localmente ou disponível por URL |

### Instalação

```bash
git clone https://github.com/douglasantoni0/Testes-E2E-SouJunior.git
cd Testes-E2E-SouJunior
npm install
npx playwright install
```

### Configuração

```bash
cp .env.example .env
```

Exemplo de `.env`:

```env
BASE_URL=http://localhost:3000
```

### Execução

| Comando | Uso |
|---|---|
| `npm run cypress:open` | Abre o Cypress em modo interativo |
| `npm run cypress:run` | Executa Cypress em modo headless |
| `npm run playwright:test` | Executa Playwright em modo headless |
| `npm run playwright:headed` | Executa Playwright com navegador visível |
| `npm run test:e2e` | Executa Cypress e Playwright em sequência |

Fluxo recomendado:

```text
Terminal 1: subir a aplicação SouJunior em http://localhost:3000
Terminal 2: executar npm run cypress:run ou npm run playwright:test
```

## Tech Stack

| Pacote | Versão | Papel no projeto |
|---|---:|---|
| `cypress` | ^14.5.4 | Automação E2E com execução in-browser |
| `@playwright/test` | ^1.59.1 | Automação E2E moderna, rápida e com traces/videos em falha |
| `dotenv` | ^16.6.1 | Configuração de ambiente via `.env` |

## Roadmap

- [x] Cobertura da FAQ com abas, accordion e responsividade
- [x] Cobertura do carrossel de depoimentos
- [x] Cobertura de Nossas Iniciativas
- [x] Cobertura de Faça Parte
- [x] Cobertura de navegação do menu principal
- [x] Cobertura do Header da Home no Cypress
- [x] Cobertura de Seja um Apoiador nos dois frameworks
- [x] Cobertura da nova logo nos dois frameworks
- [x] Cobertura da nova paleta de cores nos dois frameworks
- [x] Organização dos fluxos repetidos com Page Objects leves
- [ ] Espelhar Header da Home no Playwright
- [ ] Integrar GitHub Actions para execução automatizada
- [ ] Adicionar axe-core para acessibilidade automatizada
- [ ] Adicionar relatório Allure ou HTML consolidado
- [ ] Evoluir para regressão visual com screenshots comparativos

## Contribuindo

Se você for evoluir esta suíte, mantenha a proposta do projeto:

1. Escreva cenários em português claro.
2. Preserve seletores semânticos sempre que possível.
3. Não enfraqueça asserts para “ficar verde”.
4. Documente falhas reais com nomes de teste objetivos.
5. Rode ao menos o framework afetado antes de abrir PR.

## Contato

**Douglas Antonio** - QA Engineer

<p align="center">
  <a href="https://www.linkedin.com/in/douglas-antonio-qa/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/douglasantoni0">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://douglasqa.netlify.app">
    <img src="https://img.shields.io/badge/Portfólio-000?style=for-the-badge&logo=netlify&logoColor=white" alt="Portfólio" />
  </a>
</p>

---

<p align="center">
  <img src="https://soujunior.tech/assets/logoPrincipal-BiqxuLdz.svg" alt="SouJunior" width="80" />
  <br/>
  <sub>Projeto desenvolvido de forma voluntária por <strong>Douglas Antonio</strong> para fortalecer qualidade, confiança e evolução da plataforma SouJunior.</sub>
</p>
