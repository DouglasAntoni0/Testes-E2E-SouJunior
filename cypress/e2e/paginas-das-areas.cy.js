const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { areasInternas } = require('../../shared/areas.data');
const { ENDERECO_STARS, telas } = require('../../shared/interface.data');
const { validarLimitesHorizontais } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Páginas internas das áreas', () => {
  beforeEach(() => inicio.abrir());

  Object.entries(telas).forEach(([nomeTela, tamanho]) => {
    describe(nomeTela, () => {
      areasInternas.forEach((area) => {
        it(
          '[' +
            area.id +
            '] Deve apresentar a página de ' +
            area.titulo +
            ' e seus convites para participar',
          () => {
            cy.viewport(tamanho.width, tamanho.height);
            inicio.abrir(area.rota);
            cy.findByRole('heading', { name: area.titulo, exact: true }).should('be.visible');
            cy.contains('p', area.trecho).should('be.visible');
            validarLimitesHorizontais(cy.findByRole('heading', { name: area.titulo, exact: true }));
            cy.findAllByRole('link', { name: /^Faça parte!?$/i })
              .should('have.length', 2)
              .each(($convite) => {
                cy.wrap($convite).should('be.visible').and('have.attr', 'href', ENDERECO_STARS);
              });
          },
        );
      });
    });
  });

  it('[CT-PAG-012] Deve trocar de área pelo submenu interno', () => {
    inicio.abrir('/area/agilidade');
    inicio
      .cabecalho()
      .findByRole('navigation', { name: 'Navegação secundaria', exact: true })
      .findByRole('menuitem', { name: 'Navegar para a página qa', exact: true })
      .click();
    cy.location('pathname').should('eq', '/area/qa');
    cy.findByRole('heading', { name: 'Quality Assurance (QA)', exact: true }).should('be.visible');
  });

  it('[CT-PAG-013] Deve manter a grafia Front-end e Back-end no submenu', () => {
    inicio.abrir('/area/qa');
    inicio
      .cabecalho()
      .findByRole('navigation', { name: 'Navegação secundaria', exact: true })
      .findByRole('menuitem', { name: /página front-end/i })
      .should('have.text', 'Front-end');
    inicio
      .cabecalho()
      .findByRole('navigation', { name: 'Navegação secundaria', exact: true })
      .findByRole('menuitem', { name: /página back-end/i })
      .should('have.text', 'Back-end');
  });

  it('[CT-PAG-014] Deve informar quando a área solicitada não existe', () => {
    inicio.abrir('/area/area-inexistente');
    cy.findByRole('heading', { name: 'Área não encontrada', exact: true }).should('be.visible');
    cy.findByText('A área "area-inexistente" não foi localizada.', { exact: true }).should(
      'be.visible',
    );
    cy.findByRole('heading', { name: 'Quality Assurance (QA)', exact: true }).should('not.exist');
  });
});
