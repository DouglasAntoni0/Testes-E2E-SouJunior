const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { SecaoDepoimentos } = require('../support/pages/SecaoDepoimentos');
const { depoimentos } = require('../../shared/depoimentos.data');
const { validarImagem, validarLimitesHorizontais } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Depoimentos', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-DEP-001] Deve apresentar o título e a introdução dos depoimentos', () => {
    cy.get('#depoimentos')
      .findByRole('heading', { name: 'Depoimentos', exact: true })
      .should('be.visible');
    cy.get('#depoimentos')
      .findByText('O que falam sobre a SouJunior', { exact: true })
      .should('be.visible');
  });

  depoimentos.forEach((pessoa) => {
    it('[' + pessoa.id + '] Deve apresentar o depoimento completo de ' + pessoa.nome, () => {
      const secao = new SecaoDepoimentos();
      secao.secao().scrollIntoView();
      secao.irParaPagina(pessoa.pagina);
      secao.card(pessoa.nome).findByText(pessoa.nome, { exact: true }).should('be.visible');
      secao.card(pessoa.nome).findByText(pessoa.cargo, { exact: true }).should('be.visible');
      secao.card(pessoa.nome).findByText(pessoa.texto, { exact: true }).should('be.visible');
      validarImagem(
        secao.card(pessoa.nome).findByRole('img', { name: pessoa.fotoAlt, exact: true }),
      );
    });
  });

  it('[CT-DEP-010] Deve indicar o início do carrossel de depoimentos', () => {
    const secao = new SecaoDepoimentos();
    secao.anterior().should('be.disabled');
    secao.proximo().should('be.enabled');
  });

  it('[CT-DEP-011] Deve avançar os depoimentos e retornar ao primeiro lote', () => {
    const secao = new SecaoDepoimentos();
    secao.secao().scrollIntoView();
    secao.irParaPagina(2);
    secao.card('Ana Santos').should('be.visible');
    secao.anterior().click();
    secao.anterior().should('be.disabled');
    secao.card('Priscilla Souza').should('be.visible');
  });

  it('[CT-DEP-012] Deve impedir o avanço depois do último lote', () => {
    const secao = new SecaoDepoimentos();
    secao.secao().scrollIntoView();
    secao.irParaPagina(3);
    secao.card('Talita Bitencourt').should('be.visible');
    secao.card('Eduardo Bezerra').should('be.visible');
    secao.proximo().should('be.disabled');
    secao.anterior().should('be.enabled');
  });

  it('[CT-DEP-013] Deve preservar as bordas do texto do depoimento', () => {
    const secao = new SecaoDepoimentos();
    const pessoa = depoimentos.find((item) => item.nome === 'Caique Fonseca');
    secao
      .card(pessoa.nome)
      .findByText(pessoa.texto, { exact: true })
      .scrollIntoView()
      .should(($texto) => {
        const texto = $texto[0];
        const caixa = texto.getBoundingClientRect();
        const painel = texto.parentElement.getBoundingClientRect();
        expect(texto.scrollWidth).to.be.at.most(texto.clientWidth);
        expect(caixa.left).to.be.at.least(painel.left);
        expect(caixa.right).to.be.at.most(painel.right);
      });
  });

  it('[CT-DEP-014] Deve manter um depoimento legível no celular', () => {
    cy.viewport(375, 812);
    const secao = new SecaoDepoimentos();
    const texto = () =>
      secao.card(depoimentos[0].nome).findByText(depoimentos[0].texto, { exact: true });
    texto().scrollIntoView();
    validarLimitesHorizontais(texto());
    validarImagem(
      secao
        .card(depoimentos[0].nome)
        .findByRole('img', { name: depoimentos[0].fotoAlt, exact: true }),
    );
  });
});
