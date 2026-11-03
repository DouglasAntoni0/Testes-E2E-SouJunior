const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { areasInternas, areasHome } = require('../../shared/areas.data');
const { AZUL_PRINCIPAL, TITULO_HERO, telas } = require('../../shared/interface.data');
const { validarCorDeFundo } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Identidade visual: paleta de cores', () => {
  beforeEach(() => inicio.abrir());

  Object.entries(telas).forEach(([nomeTela, tamanho]) => {
    describe(nomeTela, () => {
      beforeEach(() => cy.viewport(tamanho.width, tamanho.height));
      it('[CT-COR-001] Deve aplicar o azul principal ao cabeçalho', () => {
        validarCorDeFundo(inicio.cabecalho(), AZUL_PRINCIPAL);
      });

      it('[CT-COR-002] Deve aplicar o azul principal ao rodapé', () => {
        inicio.rodape().scrollIntoView();
        validarCorDeFundo(inicio.rodape(), AZUL_PRINCIPAL);
      });

      it('[CT-COR-003] Deve aplicar o azul principal ao fundo do banner', () => {
        validarCorDeFundo(
          cy.findByRole('heading', { name: TITULO_HERO, exact: true }),
          AZUL_PRINCIPAL,
        );
      });

      it('[CT-COR-004] Deve aplicar o azul principal aos dez cards das áreas', () => {
        areasHome.forEach((area) => {
          validarCorDeFundo(
            inicio.areas().findByRole('heading', { name: area.nome, exact: true }),
            AZUL_PRINCIPAL,
          );
        });
      });

      it('[CT-COR-005] Deve aplicar o azul principal aos painéis de depoimento', () => {
        cy.get('#depoimentos article p')
          .should('have.length', 8)
          .each(($texto) => {
            validarCorDeFundo(cy.wrap($texto), AZUL_PRINCIPAL);
          });
      });

      it('[CT-COR-006] Deve aplicar o azul principal ao botão Participar', () => {
        validarCorDeFundo(cy.findByRole('link', { name: /^Participar!?$/ }), AZUL_PRINCIPAL);
      });

      areasInternas.forEach((area) => {
        it('[CT-COR-007] Deve replicar a paleta na página de ' + area.titulo, () => {
          inicio.abrir(area.rota);
          validarCorDeFundo(inicio.cabecalho(), AZUL_PRINCIPAL);
          validarCorDeFundo(inicio.rodape(), AZUL_PRINCIPAL);
        });
      });
    });
  });
});
