const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { papeis, ENDERECO_STARS } = require('../../shared/interface.data');
const { validarLinkExterno, validarLimitesHorizontais } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Papéis na comunidade', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-COM-001] Deve convidar o visitante a fazer parte da comunidade', () => {
    cy.findByRole('heading', {
      name: 'Faça você também parte da nossa comunidade!',
      exact: true,
    }).should('be.visible');
    cy.findByText('Na SouJunior, há diversas maneiras de participar:', { exact: true }).should(
      'be.visible',
    );
  });

  papeis.forEach((papel) => {
    it('[' + papel.id + '] Deve explicar a atuação de ' + papel.nome, () => {
      const secao = () =>
        cy
          .findByRole('heading', {
            name: 'Faça você também parte da nossa comunidade!',
            exact: true,
          })
          .parent();
      secao().findByText(papel.nome, { exact: true }).should('be.visible');
      secao().findByText(papel.descricao, { exact: true }).should('be.visible');
    });
  });

  it('[CT-COM-005] Deve oferecer o cadastro pelo botão Participar', () => {
    const link = cy.findByRole('link', { name: /^Participar!?$/ });
    link.should('be.visible');
    validarLinkExterno(cy.findByRole('link', { name: /^Participar!?$/ }), ENDERECO_STARS);
  });

  it('[CT-COM-006] Deve preservar a leitura dos papéis no mobile', () => {
    cy.viewport(375, 812);
    papeis.forEach((papel) =>
      validarLimitesHorizontais(cy.findByText(papel.descricao, { exact: true })),
    );
    validarLimitesHorizontais(cy.findByRole('link', { name: /^Participar!?$/ }));
  });
});
