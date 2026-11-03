const { depoimentos } = require('../../../shared/depoimentos.data');

class SecaoDepoimentos {
  secao() {
    return cy.get('#depoimentos');
  }
  anterior() {
    return this.secao().findByRole('button', { name: 'Ver item anterior', exact: true });
  }
  proximo() {
    return this.secao().findByRole('button', { name: 'Ver próximo item', exact: true });
  }
  card(nome) {
    return cy.contains('#depoimentos [role="list"] > div', nome);
  }

  irParaPagina(numero) {
    for (let atual = 1; atual < numero; atual += 1) {
      this.proximo().click();
      this.secao()
        .find('[role="list"]')
        .should(($lista) => {
          const lista = $lista[0];
          const destino = Math.min(
            lista.children[atual * 3].offsetLeft - lista.children[0].offsetLeft,
            lista.scrollWidth - lista.clientWidth,
          );
          expect(Math.abs(lista.scrollLeft - destino), 'posição do lote').to.be.at.most(1);
        });
      const primeiroNome = depoimentos.find((item) => item.pagina === atual + 1).nome;
      this.secao().findByText(primeiroNome, { exact: true }).should('be.visible');
    }
  }
}
module.exports = { SecaoDepoimentos };
