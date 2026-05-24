<p align="center">
  <img src="https://soujunior.tech/assets/logoPrincipal-BiqxuLdz.svg" alt="SouJunior Logo" width="240" />
</p>

<h1 align="center">🛡️ QA E2E Test Suite — SouJunior WebApp</h1>

<p align="center">
  <strong>Automação de testes End-to-End de alta cobertura com arquitetura dual-framework</strong><br/>
  Cypress · Playwright · Repositório independente · Pronto para CI/CD
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Cypress-14.5-04C38E?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
  <img src="https://img.shields.io/badge/Playwright-1.59-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Testes-~49-blue?style=for-the-badge" alt="Total de Testes" />
  <img src="https://img.shields.io/badge/Status-Em%20Expansão-blueviolet?style=for-the-badge" alt="Status" />
</p>

<p align="center">
  <a href="#-quick-start"><img src="https://img.shields.io/badge/▶_Quick_Start-000?style=flat-square" alt="Quick Start" /></a>
  <a href="#-cobertura-de-testes"><img src="https://img.shields.io/badge/📊_Cobertura-000?style=flat-square" alt="Cobertura" /></a>
  <a href="#-arquitetura-do-projeto"><img src="https://img.shields.io/badge/🏗_Arquitetura-000?style=flat-square" alt="Arquitetura" /></a>
  <a href="#-roadmap"><img src="https://img.shields.io/badge/🚀_Roadmap-000?style=flat-square" alt="Roadmap" /></a>
</p>

---

## 📌 Visão Geral

Este repositório contém uma **suíte completa de testes End-to-End** para a plataforma [SouJunior](https://soujunior.tech), implementada com **dual-framework** (Cypress + Playwright) em uma arquitetura **100% desacoplada** do código-fonte da aplicação.

> **~49 cenários de teste** · **13 spec files** · **7 seções cobertas** · **2 frameworks** · **1 visão unificada de qualidade**

### Características-chave

| Aspecto | Detalhe |
|---|---|
| 🏗️ **Arquitetura** | Repositório independente — basta apontar para qualquer URL do site |
| 🔄 **Dual-framework** | Cobertura espelhada em Cypress e Playwright para máxima confiabilidade |
| 📦 **Massa de dados centralizada** | Diretório `shared/` com dados reutilizáveis entre frameworks |
| 🔐 **Configuração por `.env`** | Troca de ambientes (local, staging, prod) sem alterar código |
| 📱 **Responsividade** | Testes validam comportamento em viewports desktop e mobile |
| ♿ **Acessibilidade** | Validações de `aria-expanded`, `aria-label`, foco via teclado |
| 🖼️ **Integridade visual** | Verificação real de carregamento de imagens (`naturalWidth > 0`) |

---

## 👤 Sobre o Autor

> **Douglas Antoni** — QA Engineer · Voluntário ativo na [SouJunior](https://soujunior.tech)

Este projeto foi **concebido, arquitetado e desenvolvido integralmente por mim**, de forma **100% autônoma e voluntária**. Toda a suíte foi construída do zero — desde a definição da estratégia de testes, passando pela escolha da arquitetura dual-framework, até a implementação de cada cenário.

### 💡 Motivação

Ao identificar a **ausência total de cobertura E2E automatizada** na plataforma SouJunior, tomei a iniciativa de projetar e implementar esta infraestrutura com objetivos claros:

- 🎯 **Prevenir regressões** antes que impactem o usuário final
- 📊 **Estabelecer baseline de qualidade** mensurável e auditável
- ⚡ **Acelerar o ciclo de releases** com validações automatizadas e confiáveis
- 🧱 **Criar base escalável** que qualquer membro do time possa expandir
- 🔍 **Documentar bugs reais** encontrados durante o desenvolvimento dos testes

> _"Qualidade não é apenas encontrar bugs — é construir confiança no software antes que ele chegue ao usuário."_

---

## 📊 Cobertura de Testes

### Matriz de Cobertura por Seção

| Seção da Aplicação | Cypress | Playwright | Cenários | Destaques |
|---|:---:|:---:|:---:|---|
| **Perguntas Frequentes (FAQ)** | ✅ | ✅ | 6 | 3 abas (Instituição, Voluntário, Mentor), accordion, ouvidoria |
| **Depoimentos (Carrossel)** | ✅ | ✅ | 3 | Navegação multi-página, validação de dados, estados de botões |
| **Nossas Iniciativas (Cards)** | ✅ | ✅ | 2 | Labs + Talk, redirecionamento via `window.open` |
| **Faça Parte (Comunidade)** | ✅ | ✅ | 2 | Papéis (Júnior, Mentor, Head), link externo |
| **Navegação — Menu Principal** | ✅ | ✅ | 1 | Scroll-to-section, âncoras |
| **Header da Home** | ✅ | 🔜 | 7 | Scroll, mobile, sticky, teclado, hover, resiliência de rede |
| **Seja um Apoiador** | ✅ | ✅ | 7 | Mascote flutuante, redirecionamentos, validação mobile |

<p align="center">
  <strong>7 seções · 13 spec files · ~49 cenários de teste</strong>
</p>

### Categorias de Validação

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PIRÂMIDE DE VALIDAÇÕES E2E                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   🔺 Resiliência                                                      │
│   ├── Interceptação de falhas de rede (cy.intercept)                  │
│   └── Comportamento gracioso em cenários de erro                      │
│                                                                       │
│   🔷 Interação & Navegação                                            │
│   ├── Carrossel: avanço, retorno e estados de botões                  │
│   ├── Accordion/FAQ: expandir, recolher, múltiplos abertos            │
│   ├── Scroll-to-section via menu                                      │
│   ├── Redirecionamentos externos (window.open, target="_blank")       │
│   └── Navegação via teclado (Tab, focus management)                   │
│                                                                       │
│   🔶 Acessibilidade & UX                                              │
│   ├── Atributos aria-expanded, aria-label                             │
│   ├── Rotação de ícones (animação de seta 180°)                       │
│   ├── Feedback visual em hover (cor, sublinhado)                      │
│   └── Header sticky/fixed após scroll                                 │
│                                                                       │
│   🟩 Integridade Visual & Dados                                       │
│   ├── Renderização e visibilidade de elementos                        │
│   ├── Carregamento real de imagens (naturalWidth > 0)                 │
│   ├── Integridade de textos, nomes, cargos, depoimentos              │
│   └── Validação de href, target e rel em links                        │
│                                                                       │
│   📱 Responsividade                                                    │
│   ├── Layout mobile (iPhone X — 375×812)                              │
│   ├── Menu hambúrguer em viewport reduzido                            │
│   └── Visibilidade condicional de elementos por viewport              │
│                                                                       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Arquitetura do Projeto

```
qa-e2e-tests/
│
├── 📁 cypress/                          # Framework 1 — Cypress
│   ├── 📁 e2e/                          # Specs de teste
│   │   ├── depoimentos.cy.js            ─ Carrossel de depoimentos
│   │   ├── façaparte.cy.js              ─ Seção "Faça Parte" / Comunidade
│   │   ├── headerdahome.cy.js           ─ Header: scroll, mobile, a11y, rede
│   │   ├── iniciativas.cy.js            ─ Cards de iniciativas (Labs + Talk)
│   │   ├── nossainiciativas.cy.js       ─ Navegação do menu principal
│   │   ├── perguntasfrequentes.cy.js    ─ FAQ completo (3 abas, 6 cenários)
│   │   └── sejaumapoiador.cy.js         ─ Seção Apoiador + mascote flutuante
│   └── 📁 support/
│       └── e2e.js                       ─ Configuração global do Cypress
│
├── 📁 tests/                            # Framework 2 — Playwright
│   └── 📁 playwright/
│       ├── depoimentos.spec.js
│       ├── façaparte.spec.js
│       ├── iniciativas.spec.js
│       ├── nossainiciativas.spec.js
│       ├── perguntasfrequentes.spec.js
│       └── sejaumapoiador.spec.js
│
├── 📁 shared/                           # Massa de dados compartilhada
│   └── depoimentos.data.js             ─ Dados reutilizáveis entre frameworks
│
├── ⚙️ cypress.config.js                 ─ Configuração do Cypress + dotenv
├── ⚙️ playwright.config.js              ─ Configuração do Playwright + dotenv
├── 📋 package.json                      ─ Scripts, dependências, metadados
├── 🔒 .env.example                      ─ Template de variáveis de ambiente
└── 📖 README.md                         ─ Documentação do projeto
```

### 🧠 Decisões Técnicas

| Decisão | Justificativa | Impacto |
|---|---|---|
| **Dual-framework** | Demonstra domínio de ambos os líderes de mercado; permite comparação de abordagens e trade-offs | Alta confiabilidade |
| **Repositório desacoplado** | Testes independentes do codebase — basta trocar a `BASE_URL` | Flexibilidade total |
| **Massa de dados centralizada** | Arquivo `shared/` elimina duplicação entre frameworks | Manutenção simplificada |
| **Configuração via `.env`** | Suporte a local, staging e produção sem alterar código | Deploy-ready |
| **Worker único (Playwright)** | Execução sequencial evita race conditions em testes DOM-heavy | Estabilidade |
| **Interceptação de rede (Cypress)** | Testa resiliência da UI a falhas de serviços externos | Robustez |
| **Viewport parametrizado** | Validação mobile integrada à suíte principal | Cobertura responsiva |

---

## ⚡ Quick Start

### Pré-requisitos

| Requisito | Versão mínima |
|---|---|
| **Node.js** | ≥ 18 |
| **npm** | ≥ 9 |
| **Aplicação SouJunior** | Rodando localmente ou acessível via URL |

### 1️⃣ Clonar e instalar

```bash
git clone https://github.com/douglasantoni0/Testes-E2E-SouJunior.git
cd Testes-E2E-SouJunior
npm install
npx playwright install
```

### 2️⃣ Configurar ambiente

```bash
cp .env.example .env
```

Edite o `.env` conforme necessário:

```env
# URL base da aplicação sob teste
BASE_URL=http://localhost:3000
```

### 3️⃣ Executar os testes

| Comando | Descrição | Framework |
|---|---|---|
| `npm run cypress:open` | Modo interativo com UI do Cypress | Cypress |
| `npm run cypress:run` | Modo headless (CI-friendly) | Cypress |
| `npm run playwright:test` | Modo headless (CI-friendly) | Playwright |
| `npm run playwright:headed` | Com navegador visível | Playwright |
| `npm run test:e2e` | Executa **ambos** sequencialmente | Ambos |

> 💡 **Dica:** Use `npm run cypress:open` para debugging visual e `npm run test:e2e` para validação completa antes de um merge.

---

## 🔄 Workflow de Execução

```
┌─────────────────────────────────────┐       ┌─────────────────────────────────────┐
│   📂 Terminal 1 — Aplicação         │       │   📂 Terminal 2 — Testes            │
│                                     │       │                                     │
│   cd soujunior-webapp               │       │   cd Testes-E2E-SouJunior           │
│   npm start                         │       │   npm run test:e2e                  │
│                                     │       │                                     │
│   🌐 http://localhost:3000 ─────────┼───────┼── BASE_URL configurada no .env      │
└─────────────────────────────────────┘       └─────────────────────────────────────┘

                              Fluxo de execução:
                     ┌──────────────────────────────────┐
                     │  1. Suba a aplicação (Terminal 1) │
                     │  2. Execute os testes (Terminal 2)│
                     │  3. Analise os resultados ✅/❌   │
                     └──────────────────────────────────┘
```

### Ambientes suportados

| Ambiente | Uso | Configuração |
|---|---|---|
| **Local** | Desenvolvimento diário | `BASE_URL=http://localhost:3000` |
| **Staging** | Validação pré-deploy | `BASE_URL=https://staging.soujunior.tech` |
| **Produção** | Smoke tests pós-deploy | `BASE_URL=https://soujunior.tech` |

---

## 🧪 Filosofia de Testes

### Princípios que guiam este projeto

```
┌──────────────────────────────────────────────────────────┐
│  1. TESTES COMO DOCUMENTAÇÃO VIVA                        │
│     Cada spec descreve o comportamento esperado          │
│     da seção, servindo como fonte de verdade.            │
│                                                          │
│  2. INDEPENDÊNCIA DE IMPLEMENTAÇÃO                       │
│     Os testes interagem com a UI renderizada,            │
│     não com o código-fonte — são agnósticos              │
│     ao framework front-end utilizado.                    │
│                                                          │
│  3. DETERMINISMO SOBRE VELOCIDADE                        │
│     Worker único e waits explícitos garantem             │
│     resultados consistentes em qualquer ambiente.        │
│                                                          │
│  4. MANUTENIBILIDADE PRIMEIRO                            │
│     Massa de dados centralizada, configuração            │
│     via .env, e estrutura previsível de arquivos.        │
│                                                          │
│  5. ACESSIBILIDADE NÃO É PLUS — É BASELINE              │
│     Atributos ARIA, foco via teclado e semântica         │
│     HTML são validados como requisitos obrigatórios.     │
└──────────────────────────────────────────────────────────┘
```

### O que ficou de fora (e por quê)

| Tipo | Razão |
|---|---|
| **Testes unitários** | Acoplados ao `src/` — pertencem ao repositório da aplicação |
| **Testes de componente** | Requerem importação direta de módulos internos |
| **Testes de API** | Foco exclusivo na camada de interface do usuário |

> Esta separação segue o princípio de **responsabilidade única** aplicado à infraestrutura de testes — cada repositório cuida da sua camada.

---

## 🐛 Bugs Documentados

Durante o desenvolvimento da suíte de testes, os seguintes bugs foram identificados e documentados:

| # | Seção | Bug | Severidade |
|---|---|---|---|
| 1 | Header | Ausência de `aria-label` no botão hambúrguer mobile | Média |
| 2 | Header | Botão "Seja um Apoiador" no header aponta rota incorreta | Alta |

> Estes bugs foram **encontrados organicamente** durante a escrita dos testes — demonstrando o valor imediato da automação E2E em detectar problemas reais.

---

## 🚀 Roadmap

- [x] Cobertura da seção **Perguntas Frequentes** (FAQ) — 3 abas
- [x] Cobertura da seção **Depoimentos** — carrossel multi-página
- [x] Cobertura da seção **Nossas Iniciativas** — Cards com redirecionamento
- [x] Cobertura da seção **Faça Parte** — Comunidade e papéis
- [x] Cobertura da seção **Navegação do Menu Principal**
- [x] Cobertura da seção **Header da Home** — UI, a11y, rede, mobile
- [x] Cobertura da seção **Seja um Apoiador** — mascote, links, mobile
- [ ] Espelhamento do **Header** no Playwright
- [ ] Cobertura da seção **Hero / Banner principal**
- [ ] Cobertura do **Footer** e links de redes sociais
- [ ] Testes de **acessibilidade automatizada** com axe-core
- [ ] Testes de **performance** com Lighthouse CI
- [ ] Integração com **GitHub Actions** para CI/CD automatizado
- [ ] Relatórios visuais com **Allure Report**
- [ ] Testes de **regressão visual** com screenshots comparativos

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Cypress-04C38E?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="dotenv" />
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VS Code" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</p>

### Dependências do projeto

| Pacote | Versão | Finalidade |
|---|---|---|
| `cypress` | ^14.5.4 | Framework E2E — arquitetura in-browser |
| `@playwright/test` | ^1.59.1 | Framework E2E — arquitetura out-of-process |
| `dotenv` | ^16.6.1 | Carregamento de variáveis de ambiente |

> **Zero dependências desnecessárias** — cada pacote tem uma justificativa clara.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você é membro do time SouJunior, siga estes passos:

1. Faça um **fork** do repositório
2. Crie uma branch com o padrão: `feat/nome-da-secao` ou `fix/descricao-do-bug`
3. Siga a **estrutura existente** — cada seção tem um arquivo Cypress e um Playwright
4. Garanta que os testes **passam localmente** antes do PR (`npm run test:e2e`)
5. Abra um **Pull Request** com descrição clara do que foi adicionado/corrigido

### Convenções de código

- Descreva os testes em **português** (consistência com o projeto)
- Use **seletores semânticos** (`aria-label`, `role`, IDs) em vez de classes CSS
- Mantenha **massa de dados** no diretório `shared/` quando compartilhada
- Um `describe` por arquivo, nomes claros e autodescritivos

---

## 📫 Contato

**Douglas Antonio** · QA Engineer

<p align="center">
  <a href="https://www.linkedin.com/in/douglas-antonio-qa/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/douglasantoni0">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://douglasqa.netlify.app">
    <img src="https://img.shields.io/badge/Portfólio-000?style=for-the-badge&logo=netlify&logoColor=white" alt="Portfolio" />
  </a>
</p>

---

## 📄 Licença

Este projeto é open-source e desenvolvido como trabalho voluntário para a comunidade [SouJunior](https://www.soujunior.tech/).

---

<p align="center">
  <img src="https://soujunior.tech/assets/logoPrincipal-BiqxuLdz.svg" alt="SouJunior" width="80" />
  <br/>
  <sub>Desenvolvido com ☕ e dedicação por <strong>Douglas Antonio</strong> — Voluntário SouJunior</sub>
  <br/>
  <sub>⭐ Se este projeto te ajudou, deixe uma estrela!</sub>
</p>
