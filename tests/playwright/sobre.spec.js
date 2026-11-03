const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { indicadores, AZUL_CLARO } = require('../../shared/interface.data');
const { validarLimitesHorizontais, validarSemRolagemHorizontal } = require('./apoio/validacoes');

test.describe('Sobre a SouJunior e Nosso Impacto', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-SOB-001] Deve apresentar a origem e a proposta da iniciativa', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await expect(
      inicio.sobre.getByRole('heading', { name: 'Sobre a SouJunior', exact: true }),
    ).toBeVisible();
    await expect(inicio.sobre.locator('p')).toHaveCount(3);
    await expect(inicio.sobre.getByText(/criado em 1º de julho de 2022/)).toBeVisible();
    await expect(inicio.sobre.getByText(/prática real, construção de produtos/)).toBeVisible();
  });

  test('[CT-SOB-002] Deve manter cada indicador de impacto junto do seu valor', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    for (const indicador of indicadores) {
      const card = inicio.sobre.getByText(indicador.descricao, { exact: true }).locator('..');
      await expect(card.getByText(indicador.valor, { exact: true })).toBeVisible();
    }
  });

  test('[CT-SOB-003] Deve centralizar o título institucional no mobile', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    const titulo = inicio.sobre.getByRole('heading', { name: 'Sobre a SouJunior', exact: true });
    await validarLimitesHorizontais(titulo);
    const caixa = await titulo.boundingBox();
    expect(Math.abs(caixa.x + caixa.width / 2 - 375 / 2)).toBeLessThanOrEqual(8);
  });

  test('[CT-SOB-004] Deve exibir os parágrafos completos na largura do celular', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    for (const paragrafo of await inicio.sobre.locator('p').all()) {
      await validarLimitesHorizontais(paragrafo);
    }
  });

  test('[CT-SOB-005] Deve permitir a leitura da seção sem rolagem horizontal', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await inicio.sobre.scrollIntoViewIfNeeded();
    await validarSemRolagemHorizontal(pagina);
  });

  test('[CT-SOB-006] Deve empilhar os indicadores de impacto no mobile', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    let limiteAnterior = 0;
    for (const indicador of indicadores) {
      const card = inicio.sobre.getByText(indicador.descricao, { exact: true }).locator('..');
      await validarLimitesHorizontais(card);
      const caixa = await card.boundingBox();
      expect(caixa.y).toBeGreaterThanOrEqual(limiteAnterior);
      limiteAnterior = caixa.y + caixa.height;
    }
  });

  test('[CT-SOB-007] Deve respeitar o destaque visual dos cards de impacto', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    for (const indicador of indicadores) {
      const card = inicio.sobre.getByText(indicador.descricao, { exact: true }).locator('..');
      await expect(card).toHaveCSS('background-color', AZUL_CLARO);
      await expect(card).not.toHaveCSS('border-radius', '0px');
      await validarLimitesHorizontais(card);
    }
  });
});
