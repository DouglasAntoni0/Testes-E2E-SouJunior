const { DESCRICAO_LOGO, TITULO_HERO } = require('../../../shared/interface.data');

class PaginaInicial {
  constructor(pagina) {
    this.pagina = pagina;
    this.cabecalho = pagina.getByRole('banner');
    this.rodape = pagina.getByRole('contentinfo');
    this.sobre = pagina.locator('#sobre-nos');
    this.depoimentos = pagina.locator('#depoimentos');
    this.noticias = pagina.locator('#noticias-eventos');
    this.apoio = pagina.locator('#seja-um-apoiador');
  }

  async abrir(caminho = '/') {
    await this.pagina.goto(caminho);
  }

  secao(titulo) {
    return this.pagina.locator('section').filter({
      has: this.pagina.getByRole('heading', { name: titulo, exact: true }),
    });
  }

  logo(local) {
    return local.getByRole('link', { name: DESCRICAO_LOGO, exact: true });
  }
  itemDoMenu(nome) {
    return this.cabecalho.getByRole('menuitem', { name: nome });
  }

  botaoHero() {
    return this.pagina
      .getByRole('heading', { name: TITULO_HERO, exact: true })
      .locator('..')
      .getByRole('link', { name: 'Faça Parte', exact: true });
  }

  controleDeApoio() {
    return this.apoio
      .locator('a')
      .filter({ has: this.pagina.getByAltText('Coração', { exact: true }) });
  }
}
module.exports = { PaginaInicial };
