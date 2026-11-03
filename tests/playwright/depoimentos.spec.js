const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { SecaoDepoimentos } = require('./pages/SecaoDepoimentos');
const { depoimentos } = require('../../shared/depoimentos.data');
const { validarImagem, validarLimitesHorizontais } = require('./apoio/validacoes');

test.describe('Depoimentos', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-DEP-001] Deve apresentar o título e a introdução dos depoimentos', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await expect(
      inicio.depoimentos.getByRole('heading', { name: 'Depoimentos', exact: true }),
    ).toBeVisible();
    await expect(
      inicio.depoimentos.getByText('O que falam sobre a SouJunior', { exact: true }),
    ).toBeVisible();
  });

  for (const pessoa of depoimentos) {
    test(
      '[' + pessoa.id + '] Deve apresentar o depoimento completo de ' + pessoa.nome,
      async ({ page: pagina }) => {
        const secao = new SecaoDepoimentos(pagina);
        await secao.secao.scrollIntoViewIfNeeded();
        await secao.irParaPagina(pessoa.pagina);
        const card = secao.card(pessoa.nome);
        await expect(card.getByText(pessoa.nome, { exact: true })).toBeInViewport();
        await expect(card.getByText(pessoa.cargo, { exact: true })).toBeVisible();
        await expect(card.getByText(pessoa.texto, { exact: true })).toBeVisible();
        await validarImagem(card.getByRole('img', { name: pessoa.fotoAlt, exact: true }));
      },
    );
  }

  test('[CT-DEP-010] Deve indicar o início do carrossel de depoimentos', async ({
    page: pagina,
  }) => {
    const secao = new SecaoDepoimentos(pagina);
    await expect(secao.anterior).toBeDisabled();
    await expect(secao.proximo).toBeEnabled();
  });

  test('[CT-DEP-011] Deve avançar os depoimentos e retornar ao primeiro lote', async ({
    page: pagina,
  }) => {
    const secao = new SecaoDepoimentos(pagina);
    await secao.secao.scrollIntoViewIfNeeded();
    await secao.irParaPagina(2);
    await expect(secao.card('Ana Santos')).toBeInViewport();
    await secao.anterior.click();
    await expect(secao.card('Priscilla Souza')).toBeInViewport({ ratio: 1 });
    await expect(secao.anterior).toBeDisabled();
  });

  test('[CT-DEP-012] Deve impedir o avanço depois do último lote', async ({ page: pagina }) => {
    const secao = new SecaoDepoimentos(pagina);
    await secao.secao.scrollIntoViewIfNeeded();
    await secao.irParaPagina(3);
    await expect(secao.card('Talita Bitencourt')).toBeInViewport();
    await expect(secao.card('Eduardo Bezerra')).toBeInViewport();
    await expect(secao.proximo).toBeDisabled();
    await expect(secao.anterior).toBeEnabled();
  });

  test('[CT-DEP-013] Deve preservar as bordas do texto do depoimento', async ({ page: pagina }) => {
    const secao = new SecaoDepoimentos(pagina);
    const pessoa = depoimentos.find((item) => item.nome === 'Caique Fonseca');
    const texto = secao.card(pessoa.nome).getByText(pessoa.texto, { exact: true });
    await texto.scrollIntoViewIfNeeded();
    expect(await texto.evaluate((elemento) => elemento.scrollWidth <= elemento.clientWidth)).toBe(
      true,
    );
    const caixa = await texto.boundingBox();
    const painel = await texto.locator('..').boundingBox();
    expect(caixa.x).toBeGreaterThanOrEqual(painel.x);
    expect(caixa.x + caixa.width).toBeLessThanOrEqual(painel.x + painel.width);
  });

  test('[CT-DEP-014] Deve manter um depoimento legível no celular', async ({ page: pagina }) => {
    await pagina.setViewportSize({ width: 375, height: 812 });
    const secao = new SecaoDepoimentos(pagina);
    const texto = secao.card(depoimentos[0].nome).getByText(depoimentos[0].texto, { exact: true });
    await texto.scrollIntoViewIfNeeded();
    await validarLimitesHorizontais(texto);
    await validarImagem(
      secao
        .card(depoimentos[0].nome)
        .getByRole('img', { name: depoimentos[0].fotoAlt, exact: true }),
    );
  });
});
