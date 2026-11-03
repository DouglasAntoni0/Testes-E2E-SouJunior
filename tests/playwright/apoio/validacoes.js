const { expect } = require('@playwright/test');
const {
  imagemCarregada,
  limitesHorizontais,
  semRolagemHorizontal,
  corDeFundo,
} = require('../../../shared/medidas');

async function validarImagem(imagem) {
  await expect(imagem).toBeVisible();
  await expect(imagem).toHaveJSProperty('complete', true);
  expect(await imagem.evaluate(imagemCarregada)).toBe(true);
}

async function validarLinkExterno(link, endereco) {
  await expect(link).toHaveAttribute('href', endereco);
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
  await expect(link).toHaveAttribute('rel', /noreferrer/);
}

async function validarLimitesHorizontais(elemento) {
  const medidas = await elemento.evaluate(limitesHorizontais);
  expect(medidas.largura).toBeGreaterThan(0);
  expect(medidas.esquerda).toBeGreaterThanOrEqual(-1);
  expect(medidas.direita).toBeLessThanOrEqual(medidas.larguraTela + 1);
}

async function validarSemRolagemHorizontal(pagina) {
  await expect.poll(() => pagina.evaluate(semRolagemHorizontal)).toBe(true);
}

async function validarCorDeFundo(elemento, cor) {
  await expect.poll(() => elemento.evaluate(corDeFundo)).toBe(cor);
}

async function validarNovaAba(pagina, elemento, endereco) {
  // O destino é simulado para cobrir o clique sem depender do serviço externo.
  await pagina
    .context()
    .route(new URL(endereco).origin + '/**', (rota) =>
      rota.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html lang="pt-BR"><title>Destino do link</title></html>',
      }),
    );
  const enderecoInicial = pagina.url();
  const novaAba = pagina.waitForEvent('popup');
  await elemento.click();
  const destino = await novaAba;
  await destino.waitForLoadState('domcontentloaded');
  expect(destino.url().split('?')[0]).toBe(endereco);
  await expect(pagina).toHaveURL(enderecoInicial);
  await destino.close();
}
module.exports = {
  validarImagem,
  validarLinkExterno,
  validarLimitesHorizontais,
  validarSemRolagemHorizontal,
  validarCorDeFundo,
  validarNovaAba,
};
