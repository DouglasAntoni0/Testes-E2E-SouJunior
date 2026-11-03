const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { areasHome } = require('../../shared/areas.data');
const { validarImagem, validarLimitesHorizontais } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Áreas de atuação: cards e carrossel', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-ARE-001] Deve apresentar os dez cards na ordem definida', () => {
    inicio
      .areas()
      .findByRole('heading', { name: 'Áreas de atuação', exact: true })
      .should('be.visible');
    inicio.areas().find('a[href^="/area/"]').should('have.length', 10);
    areasHome.forEach((area, indice) => {
      inicio
        .areas()
        .find('a[href^="/area/"]')
        .eq(indice)
        .should('have.attr', 'href', area.rota)
        .findByRole('heading', { name: area.nome, exact: true })
        .should('exist');
    });
  });

  it('[CT-ARE-002] Deve indicar o limite inicial do carrossel', () => {
    inicio
      .areas()
      .findByRole('button', { name: 'Ver itens anteriores', exact: true })
      .should('be.disabled');
    inicio
      .areas()
      .findByRole('button', { name: 'Ver próximos itens', exact: true })
      .should('be.enabled');
  });

  it('[CT-ARE-003] Deve avançar até o último conjunto de áreas', () => {
    inicio.areas().scrollIntoView();
    inicio.areas().findByRole('button', { name: 'Ver próximos itens', exact: true }).click();
    inicio
      .areas()
      .findByRole('button', { name: 'Ver próximos itens', exact: true })
      .should('be.disabled');
    inicio.areas().find('a[href="/area/tech-recruiter"]').should('be.visible');
  });

  it('[CT-ARE-004] Deve retornar ao primeiro conjunto de áreas', () => {
    inicio.areas().findByRole('button', { name: 'Ver próximos itens', exact: true }).click();
    inicio
      .areas()
      .findByRole('button', { name: 'Ver itens anteriores', exact: true })
      .should('be.enabled')
      .click();
    inicio
      .areas()
      .findByRole('button', { name: 'Ver itens anteriores', exact: true })
      .should('be.disabled');
    inicio.areas().find('a[href="/area/agilidade"]').should('be.visible');
  });

  it('[CT-ARE-005] Deve exibir dois indicadores com a primeira página selecionada', () => {
    inicio
      .areas()
      .findAllByRole('button', { name: /^Ir para página/ })
      .should('have.length', 2);
    inicio
      .areas()
      .findByRole('button', { name: 'Ir para página 1', exact: true })
      .should('have.attr', 'aria-current', 'true');
    inicio
      .areas()
      .findByRole('button', { name: 'Ir para página 2', exact: true })
      .should('not.have.attr', 'aria-current');
  });

  it('[CT-ARE-006] Deve navegar entre os conjuntos pelos indicadores', () => {
    inicio
      .areas()
      .findByRole('button', { name: 'Ir para página 2', exact: true })
      .click()
      .should('have.attr', 'aria-current', 'true');
    inicio.areas().find('a[href="/area/tech-recruiter"]').should('be.visible');
    inicio
      .areas()
      .findByRole('button', { name: 'Ir para página 1', exact: true })
      .click()
      .should('have.attr', 'aria-current', 'true');
    inicio.areas().find('a[href="/area/agilidade"]').should('be.visible');
  });

  it('[CT-ARE-007] Deve mostrar cinco cards completos e uma indicação do próximo', () => {
    inicio.areas().scrollIntoView();
    inicio
      .areas()
      .find('a[href^="/area/"]')
      .then(($cards) => {
        const faixa = $cards[0].parentElement.parentElement.getBoundingClientRect();
        $cards.slice(0, 5).each((_, card) => {
          const caixa = card.getBoundingClientRect();
          expect(caixa.left).to.be.at.least(faixa.left - 1);
          expect(caixa.right).to.be.at.most(faixa.right + 1);
        });
        const sexto = $cards[5].getBoundingClientRect();
        expect(sexto.left).to.be.lessThan(faixa.right);
        expect(sexto.right).to.be.greaterThan(faixa.right);
      });
  });

  it('[CT-ARE-008] Deve manter o último conjunto alinhado depois da rolagem', () => {
    inicio.areas().findByRole('button', { name: 'Ver próximos itens', exact: true }).click();
    inicio
      .areas()
      .find('a[href^="/area/"]')
      .should(($cards) => {
        const faixa = $cards[0].parentElement.parentElement.getBoundingClientRect();
        $cards.slice(5).each((_, card) => {
          const caixa = card.getBoundingClientRect();
          expect(caixa.left).to.be.at.least(faixa.left - 1);
          expect(caixa.right).to.be.at.most(faixa.right + 1);
        });
      });
  });

  it('[CT-ARE-009] Deve disponibilizar todas as áreas no layout mobile', () => {
    cy.viewport(375, 812);
    areasHome.forEach((area) => {
      const card = () => inicio.areas().find('a[href="' + area.rota + '"]');
      card().scrollIntoView();
      validarImagem(card().findByRole('img', { name: area.nome, exact: true }));
      validarLimitesHorizontais(card());
    });
  });

  areasHome.forEach((area, indice) => {
    it('[CT-ARE-010] Deve abrir a página pelo card de ' + area.nome, () => {
      inicio.areas().scrollIntoView();
      if (indice >= 5) {
        inicio.areas().findByRole('button', { name: 'Ver próximos itens', exact: true }).click();
      }
      inicio
        .areas()
        .find('a[href="' + area.rota + '"]')
        .click();
      cy.location('pathname').should('eq', area.rota);
      cy.findByRole('heading', { name: area.titulo, exact: true }).should('be.visible');
    });
  });

  it('[CT-ARE-011] Deve acessar uma área pelos cards no celular', () => {
    cy.viewport(375, 812);
    inicio.areas().find('a[href="/area/qa"]').click();
    cy.location('pathname').should('eq', '/area/qa');
    cy.findByRole('heading', { name: 'Quality Assurance (QA)', exact: true }).should('be.visible');
  });
});
