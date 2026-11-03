const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { indicadores, AZUL_CLARO } = require('../../shared/interface.data');
const { validarLimitesHorizontais, validarSemRolagemHorizontal } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Sobre a SouJunior e Nosso Impacto', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-SOB-001] Deve apresentar a origem e a proposta da iniciativa', () => {
    inicio
      .sobre()
      .findByRole('heading', { name: 'Sobre a SouJunior', exact: true })
      .should('be.visible');
    inicio.sobre().find('p').should('have.length', 3);
    inicio
      .sobre()
      .findByText(/criado em 1º de julho de 2022/)
      .should('be.visible');
    inicio
      .sobre()
      .findByText(/prática real, construção de produtos/)
      .should('be.visible');
  });

  it('[CT-SOB-002] Deve manter cada indicador de impacto junto do seu valor', () => {
    indicadores.forEach((indicador) => {
      inicio
        .sobre()
        .findByText(indicador.descricao, { exact: true })
        .parent()
        .findByText(indicador.valor, { exact: true })
        .should('be.visible');
    });
  });

  it('[CT-SOB-003] Deve centralizar o título institucional no mobile', () => {
    cy.viewport(375, 812);
    validarLimitesHorizontais(
      inicio.sobre().findByRole('heading', { name: 'Sobre a SouJunior', exact: true }),
    );
    inicio
      .sobre()
      .findByRole('heading', { name: 'Sobre a SouJunior', exact: true })
      .should(($titulo) => {
        const caixa = $titulo[0].getBoundingClientRect();
        expect(Math.abs(caixa.left + caixa.width / 2 - 375 / 2)).to.be.at.most(8);
      });
  });

  it('[CT-SOB-004] Deve exibir os parágrafos completos na largura do celular', () => {
    cy.viewport(375, 812);
    inicio
      .sobre()
      .find('p')
      .should('have.length', 3)
      .each(($paragrafo) => {
        validarLimitesHorizontais(cy.wrap($paragrafo));
      });
  });

  it('[CT-SOB-005] Deve permitir a leitura da seção sem rolagem horizontal', () => {
    cy.viewport(375, 812);
    inicio.sobre().scrollIntoView();
    validarSemRolagemHorizontal();
  });

  it('[CT-SOB-006] Deve empilhar os indicadores de impacto no mobile', () => {
    cy.viewport(375, 812);
    let limiteAnterior = 0;
    indicadores.forEach((indicador) => {
      const card = () => inicio.sobre().findByText(indicador.descricao, { exact: true }).parent();
      validarLimitesHorizontais(card());
      card()
        .should(($card) => {
          const caixa = $card[0].getBoundingClientRect();
          expect(caixa.top).to.be.at.least(limiteAnterior);
        })
        .then(($card) => {
          limiteAnterior = $card[0].getBoundingClientRect().bottom;
        });
    });
  });

  it('[CT-SOB-007] Deve respeitar o destaque visual dos cards de impacto', () => {
    cy.viewport(375, 812);
    indicadores.forEach((indicador) => {
      const card = () => inicio.sobre().findByText(indicador.descricao, { exact: true }).parent();
      card()
        .should('have.css', 'background-color', AZUL_CLARO)
        .and('not.have.css', 'border-radius', '0px');
      validarLimitesHorizontais(card());
    });
  });
});
