const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { ENDERECO_STARS, TITULO_HERO } = require('../../shared/interface.data');
const {
  validarImagem,
  validarLinkExterno,
  validarLimitesHorizontais,
} = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Banner principal', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-HER-001] Deve apresentar a proposta da SouJunior logo na entrada', () => {
    cy.findAllByRole('heading', { level: 1 }).should('have.length', 1);
    cy.findByRole('heading', { name: TITULO_HERO, exact: true }).should('be.visible');
    cy.findByText(
      'Da tecnologia ao recrutamento, do design à agilidade, do social media ao produto:',
      { exact: true },
    ).should('be.visible');
    cy.findByText(/Na SouJunior, você vivencia experiências reais/).should('be.visible');
  });

  it('[CT-HER-002] Deve oferecer a inscrição no Stars pelo banner', () => {
    inicio.botaoHero().should('be.visible');
    validarLinkExterno(inicio.botaoHero(), ENDERECO_STARS);
  });

  it('[CT-HER-003] Deve posicionar o mascote ao lado do texto no desktop', () => {
    validarImagem(cy.findByRole('img', { name: 'Mascote do Soujunior', exact: true }));
    cy.findByRole('heading', { name: TITULO_HERO, exact: true }).then(($titulo) => {
      const titulo = $titulo[0].getBoundingClientRect();
      cy.findByRole('img', { name: 'Mascote do Soujunior', exact: true }).should(($imagem) => {
        expect($imagem[0].getBoundingClientRect().left).to.be.greaterThan(titulo.right);
      });
    });
  });

  it('[CT-HER-004] Deve adaptar o banner ao celular sem cortar o conteúdo', () => {
    cy.viewport(375, 812);
    validarLimitesHorizontais(cy.findByRole('heading', { name: TITULO_HERO, exact: true }));
    validarLimitesHorizontais(inicio.botaoHero());
    cy.findByRole('img', { name: 'Mascote do Soujunior', exact: true }).should('not.exist');
  });
});
