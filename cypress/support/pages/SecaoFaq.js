class SecaoFaq {
  secao() {
    return cy.contains('section', 'Perguntas Frequentes');
  }

  selecionarCategoria(nome) {
    this.secao().findByRole('button', { name: nome, exact: true }).click();
  }

  pergunta(texto) {
    return this.secao().findByRole('button', { name: texto, exact: true });
  }
  resposta(texto) {
    return this.secao().findByText(texto, { exact: true });
  }
}
module.exports = { SecaoFaq };
