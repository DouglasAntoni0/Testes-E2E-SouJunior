const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { eventos } = require('../../shared/eventos.data');
const {
  validarImagem,
  prepararNovaAba,
  validarNovaAba,
  validarLimitesHorizontais,
} = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Notícias e Eventos', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-NOT-001] Deve apresentar as informações dos quatro dias do evento', () => {
    cy.get('#noticias-eventos')
      .findByRole('heading', { name: 'Notícias e Eventos', exact: true })
      .should('be.visible');
    cy.get('#noticias-eventos')
      .findAllByRole('img', { name: 'SouJunior 3.0: A Experiência que Transforma', exact: true })
      .should('have.length', 4);
    cy.get('#noticias-eventos')
      .findAllByRole('button', { name: 'Confira', exact: true })
      .should('have.length', 4);
    eventos.forEach((evento) =>
      cy.get('#noticias-eventos').findByText(evento.data, { exact: true }).should('exist'),
    );
  });

  it('[CT-NOT-002] Deve exibir os três primeiros eventos na entrada do desktop', () => {
    cy.get('#noticias-eventos').scrollIntoView();
    cy.get('#noticias-eventos')
      .findAllByRole('img', { name: 'SouJunior 3.0: A Experiência que Transforma', exact: true })
      .should('have.length', 4)
      .each(($imagem, indice) => {
        if (indice < 3) validarImagem(cy.wrap($imagem));
      });
  });

  it('[CT-NOT-003] Deve percorrer as notícias pelos controles de navegação', () => {
    cy.get('#noticias-eventos')
      .findByRole('button', { name: 'Ver itens anteriores', exact: true })
      .should('be.disabled');
    cy.get('#noticias-eventos')
      .findByRole('button', { name: 'Ver próximos itens', exact: true })
      .click()
      .should('be.disabled');
    cy.get('#noticias-eventos').findByText(eventos[3].data, { exact: true }).should('be.visible');
    cy.get('#noticias-eventos')
      .findByRole('button', { name: 'Ver itens anteriores', exact: true })
      .click()
      .should('be.disabled');
    cy.get('#noticias-eventos').findByText(eventos[0].data, { exact: true }).should('be.visible');
  });

  eventos.forEach((evento, indice) => {
    it('[' + evento.id + '] Deve abrir o vídeo do evento de ' + evento.data, () => {
      prepararNovaAba();
      cy.get('#noticias-eventos').scrollIntoView();
      if (indice === 3) {
        cy.get('#noticias-eventos')
          .findByRole('button', { name: 'Ver próximos itens', exact: true })
          .click();
      }
      validarNovaAba(
        cy
          .get('#noticias-eventos')
          .findAllByRole('button', { name: 'Confira', exact: true })
          .eq(indice),
        evento.endereco,
      );
      cy.location('pathname').should('eq', '/');
    });
  });

  it('[CT-NOT-008] Deve navegar pelos quatro indicadores de eventos no mobile', () => {
    cy.viewport(375, 812);
    cy.get('#noticias-eventos').scrollIntoView();
    cy.get('#noticias-eventos')
      .findAllByRole('button', { name: /^Ir para página/ })
      .should('have.length', 4);
    cy.get('#noticias-eventos')
      .findByRole('button', { name: 'Ir para página 4', exact: true })
      .click()
      .should('have.attr', 'aria-current', 'true');
    cy.get('#noticias-eventos').findByText(eventos[3].data, { exact: true }).should('be.visible');
    cy.get('#noticias-eventos')
      .findByRole('button', { name: 'Ir para página 1', exact: true })
      .click();
    cy.get('#noticias-eventos').findByText(eventos[0].data, { exact: true }).should('be.visible');
  });

  it('[CT-NOT-009] Deve manter o conteúdo de um evento dentro da tela mobile', () => {
    cy.viewport(375, 812);
    cy.get('#noticias-eventos').scrollIntoView();
    validarLimitesHorizontais(
      cy.get('#noticias-eventos').findByText(eventos[0].data, { exact: true }),
    );
    validarLimitesHorizontais(
      cy.get('#noticias-eventos').findAllByRole('button', { name: 'Confira', exact: true }).first(),
    );
  });
});
