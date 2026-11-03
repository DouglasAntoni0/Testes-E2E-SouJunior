function imagemCarregada(imagem) {
  return imagem.complete && imagem.naturalWidth > 0;
}

function limitesHorizontais(elemento) {
  const retangulo = elemento.getBoundingClientRect();
  return {
    esquerda: retangulo.left,
    direita: retangulo.right,
    largura: retangulo.width,
    larguraTela: elemento.ownerDocument.documentElement.clientWidth,
  };
}

function semRolagemHorizontal(documento = document) {
  return (
    Math.max(documento.body.scrollWidth, documento.documentElement.scrollWidth) <=
    documento.documentElement.clientWidth + 1
  );
}

function corDeFundo(elemento) {
  // O painel colorido pode ter wrappers transparentes entre ele e o texto.
  for (let atual = elemento; atual; atual = atual.parentElement) {
    const cor = atual.ownerDocument.defaultView.getComputedStyle(atual).backgroundColor;
    if (cor !== 'transparent' && cor !== 'rgba(0, 0, 0, 0)') return cor;
  }
  return 'transparent';
}
module.exports = { imagemCarregada, limitesHorizontais, semRolagemHorizontal, corDeFundo };
