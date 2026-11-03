class SecaoFaq {
  constructor(pagina) {
    this.pagina = pagina;
    this.secao = pagina.locator('section').filter({
      has: pagina.getByRole('heading', { name: 'Perguntas Frequentes', exact: true }),
    });
  }

  async selecionarCategoria(nome) {
    await this.secao.getByRole('button', { name: nome, exact: true }).click();
  }

  pergunta(texto) {
    return this.secao.getByRole('button', { name: texto, exact: true });
  }
  resposta(texto) {
    return this.secao.getByText(texto, { exact: true });
  }
}
module.exports = { SecaoFaq };
