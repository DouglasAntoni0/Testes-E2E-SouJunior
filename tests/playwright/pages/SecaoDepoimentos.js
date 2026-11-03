const { expect } = require('@playwright/test');
const { depoimentos } = require('../../../shared/depoimentos.data');

class SecaoDepoimentos {
  constructor(pagina) {
    this.pagina = pagina;
    this.secao = pagina.locator('#depoimentos');
    this.anterior = this.secao.getByRole('button', { name: 'Ver item anterior', exact: true });
    this.proximo = this.secao.getByRole('button', { name: 'Ver próximo item', exact: true });
  }

  card(nome) {
    return this.secao.locator('[role="list"] > div').filter({
      has: this.pagina.getByText(nome, { exact: true }),
    });
  }

  async irParaPagina(numero) {
    for (let atual = 1; atual < numero; atual += 1) {
      await this.proximo.click();
      const lista = this.secao.getByRole('list');
      const destino = await lista.evaluate(
        (elemento, indice) =>
          Math.min(
            elemento.children[indice * 3].offsetLeft - elemento.children[0].offsetLeft,
            elemento.scrollWidth - elemento.clientWidth,
          ),
        atual,
      );
      await expect
        .poll(() => lista.evaluate((elemento) => elemento.scrollLeft))
        .toBeCloseTo(destino, 0);
      const primeiroNome = depoimentos.find((item) => item.pagina === atual + 1).nome;
      await expect(this.secao.getByText(primeiroNome, { exact: true })).toBeInViewport();
    }
  }
}
module.exports = { SecaoDepoimentos };
