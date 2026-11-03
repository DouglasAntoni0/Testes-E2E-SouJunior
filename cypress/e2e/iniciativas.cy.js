const { PaginaInicial } = require('../support/pages/PaginaInicial');

const inicio = new PaginaInicial();

describe('Iniciativas temporariamente ocultas', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-INI-001] Deve ocultar a seção de iniciativas enquanto não há programas ativos', () => {
    cy.get('#nossas-iniciativas').should('not.exist');
    cy.findByRole('heading', { name: 'SouJunior Labs', exact: true }).should('not.exist');
    cy.findByRole('heading', { name: 'SouJunior Talk', exact: true }).should('not.exist');
  });

  it('[CT-INI-002] Deve retirar o acesso às iniciativas do cabeçalho', () => {
    inicio
      .cabecalho()
      .findByRole('menuitem', { name: /Nossas Iniciativas/i })
      .should('not.exist');
  });

  it('[CT-INI-003] Deve retirar o acesso às iniciativas do rodapé', () => {
    inicio.rodape().findByText('Nossas iniciativas', { exact: true }).should('not.exist');
  });

  it('[CT-INI-004] Deve evitar âncoras órfãs para iniciativas ocultas', () => {
    cy.get('a[href$="#nossas-iniciativas"]').should('not.exist');
  });
});
