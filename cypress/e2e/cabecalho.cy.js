const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { ENDERECO_STARS } = require('../../shared/interface.data');
const { prepararNovaAba, validarNovaAba } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Cabeçalho e navegação', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-CAB-001] Deve apresentar as opções principais de navegação', () => {
    [/Sobre Nós/i, /Notícias & Eventos/i, /Faça Parte/i, /Seja um Apoiador/i].forEach((nome) => {
      inicio.itemDoMenu(nome).should('be.visible');
    });
    inicio.cabecalho().findByRole('button', { name: 'Abrir menu' }).should('not.exist');
  });

  it('[CT-CAB-002] Deve voltar para a Home pela logo do cabeçalho', () => {
    inicio.abrir('/area/qa');
    inicio.logo('banner').click();
    cy.location('pathname').should('eq', '/');
    cy.get('#home-heading').should('be.visible');
  });

  it('[CT-CAB-003] Deve rolar até a seção de Sobre Nós', () => {
    inicio.itemDoMenu(/Sobre Nós/i).click();
    cy.get('#sobre-nos').should(($secao) => {
      const posicao = $secao[0].getBoundingClientRect();
      expect(posicao.top).to.be.lessThan(Cypress.config('viewportHeight'));
      expect(posicao.bottom).to.be.greaterThan(0);
    });
    cy.location('pathname').should('eq', '/');
  });

  it('[CT-CAB-004] Deve rolar até a seção de Notícias & Eventos', () => {
    inicio.itemDoMenu(/Notícias & Eventos/i).click();
    cy.get('#noticias-eventos').should(($secao) => {
      const posicao = $secao[0].getBoundingClientRect();
      expect(posicao.top).to.be.lessThan(Cypress.config('viewportHeight'));
      expect(posicao.bottom).to.be.greaterThan(0);
    });
    cy.location('pathname').should('eq', '/');
  });

  it('[CT-CAB-006] Deve rolar até a seção de Seja um Apoiador', () => {
    inicio.itemDoMenu(/Seja um Apoiador/i).click();
    cy.get('#seja-um-apoiador').should(($secao) => {
      const posicao = $secao[0].getBoundingClientRect();
      expect(posicao.top).to.be.lessThan(Cypress.config('viewportHeight'));
      expect(posicao.bottom).to.be.greaterThan(0);
    });
    cy.location('pathname').should('eq', '/');
  });

  it('[CT-CAB-005] Deve abrir o Stars ao usar Faça parte no menu', () => {
    prepararNovaAba();
    validarNovaAba(inicio.itemDoMenu(/Faça Parte/i), ENDERECO_STARS);
  });

  it('[CT-CAB-008] Deve indicar que os itens do menu são clicáveis', () => {
    [/Sobre Nós/i, /Notícias & Eventos/i, /Faça Parte/i, /Seja um Apoiador/i].forEach((nome) => {
      inicio.itemDoMenu(nome).should('have.css', 'cursor', 'pointer');
    });
  });

  it('[CT-CAB-009] Deve abrir e fechar o menu no celular', () => {
    cy.viewport(375, 812);
    inicio.cabecalho().findByRole('button', { name: 'Abrir menu', exact: true }).click();
    inicio
      .cabecalho()
      .findByRole('button', { name: 'Fechar menu', exact: true })
      .should('have.attr', 'aria-expanded', 'true');
    inicio.itemDoMenu(/Sobre Nós/i).should('be.visible');
    inicio.cabecalho().findByRole('button', { name: 'Fechar menu', exact: true }).click();
    inicio
      .cabecalho()
      .findByRole('navigation', { name: 'Navegação principal' })
      .should('not.exist');
  });

  it('[CT-CAB-010] Deve recolher o menu mobile depois de escolher uma seção', () => {
    cy.viewport(375, 812);
    inicio.cabecalho().findByRole('button', { name: 'Abrir menu', exact: true }).click();
    inicio.itemDoMenu(/Sobre Nós/i).click();
    inicio
      .cabecalho()
      .findByRole('button', { name: 'Abrir menu', exact: true })
      .should('have.attr', 'aria-expanded', 'false');
    inicio.sobre().findByRole('heading', { name: 'Sobre a SouJunior' }).should('be.visible');
  });
});
