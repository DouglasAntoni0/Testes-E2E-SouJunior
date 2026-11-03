const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { ENDERECO_STARS } = require('../../shared/interface.data');
const { validarLinkExterno, validarLimitesHorizontais } = require('./apoio/validacoes');

test.describe('Atalhos do rodapé', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-ROD-001] Deve oferecer o cadastro no Stars pelo rodapé', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    const link = inicio.rodape.locator('a').filter({ hasText: /^Faça parte$/i });
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
    await validarLinkExterno(link, ENDERECO_STARS);
  });

  test('[CT-ROD-002] Deve sinalizar a interação no convite do rodapé', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    const link = inicio.rodape.locator('a').filter({ hasText: /^Faça parte$/i });
    await link.scrollIntoViewIfNeeded();
    await link.hover();
    await expect(link).toHaveCSS('cursor', 'pointer');
    await expect(link).toHaveAttribute('href', ENDERECO_STARS);
  });

  test('[CT-ROD-003] Deve manter o convite do rodapé acessível no celular', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    const link = inicio.rodape.locator('a').filter({ hasText: /^Faça parte$/i });
    await link.scrollIntoViewIfNeeded();
    await validarLimitesHorizontais(link);
    await validarLinkExterno(link, ENDERECO_STARS);
  });
});
