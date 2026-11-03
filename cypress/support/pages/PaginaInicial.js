const { DESCRICAO_LOGO, TITULO_HERO } = require('../../../shared/interface.data');

class PaginaInicial {
  abrir(caminho = '/') {
    cy.visit(caminho);
  }
  cabecalho() {
    return cy.findByRole('banner');
  }
  rodape() {
    return cy.get('footer');
  }
  sobre() {
    return cy.get('#sobre-nos');
  }
  areas() {
    return cy.contains('section', 'Aqui na SouJunior, atuam profissionais iniciantes');
  }
  apoio() {
    return cy.get('#seja-um-apoiador');
  }

  logo(local) {
    const regiao = local === 'contentinfo' ? this.rodape() : cy.findByRole(local);
    return regiao.findByRole('link', { name: DESCRICAO_LOGO, exact: true });
  }

  itemDoMenu(nome) {
    return this.cabecalho().findByRole('menuitem', { name: nome });
  }

  botaoHero() {
    return cy
      .findByRole('heading', { name: TITULO_HERO, exact: true })
      .parent()
      .findByRole('link', { name: 'Faça Parte', exact: true });
  }

  controleDeApoio() {
    return this.apoio().find('a:has(img[alt="Coração"])');
  }
}
module.exports = { PaginaInicial };
