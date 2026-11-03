const {
  imagemCarregada,
  limitesHorizontais,
  semRolagemHorizontal,
  corDeFundo,
} = require('../../shared/medidas');

function validarImagem(imagem) {
  imagem.should('be.visible').should(($imagem) => {
    expect(imagemCarregada($imagem[0]), 'imagem carregada').to.eq(true);
  });
}

function validarLinkExterno(link, endereco) {
  link.should(($link) => {
    expect($link).to.have.attr('href', endereco);
    expect($link).to.have.attr('target', '_blank');
    expect($link.attr('rel')).to.include('noopener').and.include('noreferrer');
  });
}

function validarLimitesHorizontais(elemento) {
  elemento.should(($elemento) => {
    const medidas = limitesHorizontais($elemento[0]);
    expect(medidas.largura, 'largura do elemento').to.be.greaterThan(0);
    expect(medidas.esquerda, 'margem esquerda').to.be.at.least(-1);
    expect(medidas.direita, 'limite direito').to.be.at.most(medidas.larguraTela + 1);
  });
}

function validarSemRolagemHorizontal() {
  cy.document().should((documento) => {
    expect(semRolagemHorizontal(documento), 'página sem rolagem horizontal').to.eq(true);
  });
}

function validarCorDeFundo(elemento, cor) {
  elemento.should(($elemento) => expect(corDeFundo($elemento[0]), 'cor de fundo').to.eq(cor));
}

function prepararNovaAba() {
  cy.window().then((janela) => cy.stub(janela, 'open').as('abrirNovaAba'));
}

function validarNovaAba(elemento, endereco) {
  elemento.click();
  cy.get('@abrirNovaAba')
    .should('have.been.calledOnce')
    .then((abrir) => {
      expect(abrir.firstCall.args[0].split('?')[0]).to.eq(endereco);
      expect(abrir.firstCall.args[1]).to.eq('_blank');
      expect(abrir.firstCall.args[2]).to.include('noopener').and.include('noreferrer');
    });
}
module.exports = {
  validarImagem,
  validarLinkExterno,
  validarLimitesHorizontais,
  validarSemRolagemHorizontal,
  validarCorDeFundo,
  prepararNovaAba,
  validarNovaAba,
};
