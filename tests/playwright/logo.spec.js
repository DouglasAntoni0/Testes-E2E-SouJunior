const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { areasInternas } = require('../../shared/areas.data');
const { DESCRICAO_LOGO, largurasMobile } = require('../../shared/interface.data');
const { validarImagem, validarLimitesHorizontais } = require('./apoio/validacoes');

test.describe('Identidade visual: logo', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-LOG-001] Deve carregar a identidade da marca no cabeçalho e no rodapé', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await validarImagem(inicio.cabecalho.getByRole('img', { name: DESCRICAO_LOGO, exact: true }));
    await expect(
      inicio.cabecalho.getByRole('img', { name: DESCRICAO_LOGO, exact: true }),
    ).toHaveAttribute('src', /\.svg(?:\?|$)/);
    await inicio.rodape.scrollIntoViewIfNeeded();
    await validarImagem(inicio.rodape.getByRole('img', { name: DESCRICAO_LOGO, exact: true }));
  });

  test('[CT-LOG-002] Deve disponibilizar um favicon que possa ser carregado', async ({
    page: pagina,
  }) => {
    const endereco = await pagina.locator('link[rel~="icon"]').first().getAttribute('href');
    expect(endereco).toBeTruthy();
    const resposta = await pagina.request.get(new URL(endereco, pagina.url()).href);
    expect(resposta.ok()).toBe(true);
    expect(resposta.headers()['content-type']).toContain('image');
  });

  test('[CT-LOG-003] Deve usar a logo do cabeçalho como atalho para a Home', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.goto('/area/qa');
    await inicio.logo(inicio.cabecalho).click();
    expect(new URL(pagina.url()).pathname).toBe('/');
    await expect(pagina.locator('#home-heading')).toBeVisible();
  });

  test('[CT-LOG-004] Deve usar a logo do rodapé como atalho para a Home', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.goto('/area/qa');
    await inicio.logo(inicio.rodape).click();
    expect(new URL(pagina.url()).pathname).toBe('/');
    await expect(pagina.locator('#home-heading')).toBeVisible();
  });

  for (const area of areasInternas) {
    test(
      '[CT-LOG-005] Deve aplicar a marca na página de ' + area.titulo,
      async ({ page: pagina }) => {
        const inicio = new PaginaInicial(pagina);
        await pagina.goto(area.rota);
        await validarImagem(
          inicio.cabecalho.getByRole('img', { name: DESCRICAO_LOGO, exact: true }),
        );
        await inicio.rodape.scrollIntoViewIfNeeded();
        await validarImagem(inicio.rodape.getByRole('img', { name: DESCRICAO_LOGO, exact: true }));
      },
    );
  }

  test('[CT-LOG-006] Deve manter as logos acessíveis nas larguras mobile', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    for (const largura of largurasMobile) {
      await pagina.setViewportSize({ width: largura, height: 812 });
      await validarImagem(inicio.cabecalho.getByRole('img', { name: DESCRICAO_LOGO, exact: true }));
      await validarLimitesHorizontais(
        inicio.cabecalho.getByRole('img', { name: DESCRICAO_LOGO, exact: true }),
      );
      await inicio.rodape.scrollIntoViewIfNeeded();
      await validarImagem(inicio.rodape.getByRole('img', { name: DESCRICAO_LOGO, exact: true }));
      await validarLimitesHorizontais(
        inicio.rodape.getByRole('img', { name: DESCRICAO_LOGO, exact: true }),
      );
    }
  });
});
