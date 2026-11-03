const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { ENDERECO_STARS } = require('../../shared/interface.data');
const { validarLinkExterno, validarLimitesHorizontais } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Atalhos do rodapé', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-ROD-001] Deve oferecer o cadastro no Stars pelo rodapé', () => {
    inicio.rodape().scrollIntoView();
    inicio
      .rodape()
      .contains('a', /^Faça parte$/i)
      .should('be.visible');
    validarLinkExterno(inicio.rodape().contains('a', /^Faça parte$/i), ENDERECO_STARS);
  });

  it('[CT-ROD-002] Deve sinalizar a interação no convite do rodapé', () => {
    inicio
      .rodape()
      .contains('a', /^Faça parte$/i)
      .scrollIntoView()
      .should('have.css', 'cursor', 'pointer')
      .and('have.attr', 'href', ENDERECO_STARS);
  });

  it('[CT-ROD-003] Deve manter o convite do rodapé acessível no celular', () => {
    cy.viewport(375, 812);
    inicio
      .rodape()
      .contains('a', /^Faça parte$/i)
      .scrollIntoView();
    validarLimitesHorizontais(inicio.rodape().contains('a', /^Faça parte$/i));
    validarLinkExterno(inicio.rodape().contains('a', /^Faça parte$/i), ENDERECO_STARS);
  });
});
