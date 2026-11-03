const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { ENDERECO_STARS, DESCRICAO_LOGO } = require('../../shared/interface.data');
const { validarNovaAba } = require('./apoio/validacoes');

test.describe('Cabeçalho e navegação', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-CAB-001] Deve apresentar as opções principais de navegação', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    for (const nome of [/Sobre Nós/i, /Notícias & Eventos/i, /Faça Parte/i, /Seja um Apoiador/i]) {
      await expect(inicio.itemDoMenu(nome)).toBeVisible();
    }
    await expect(inicio.cabecalho.getByRole('button', { name: 'Abrir menu' })).toHaveCount(0);
  });

  test('[CT-CAB-002] Deve voltar para a Home pela logo do cabeçalho', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.goto('/area/qa');
    await inicio.logo(inicio.cabecalho).click();
    expect(new URL(pagina.url()).pathname).toBe('/');
    await expect(pagina.locator('#home-heading')).toBeVisible();
  });

  test('[CT-CAB-003] Deve rolar até a seção de Sobre Nós', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await inicio.itemDoMenu(/Sobre Nós/i).click();
    await expect(pagina.locator('#sobre-nos')).toBeInViewport();
    expect(new URL(pagina.url()).pathname).toBe('/');
  });

  test('[CT-CAB-004] Deve rolar até a seção de Notícias & Eventos', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await inicio.itemDoMenu(/Notícias & Eventos/i).click();
    await expect(pagina.locator('#noticias-eventos')).toBeInViewport();
    expect(new URL(pagina.url()).pathname).toBe('/');
  });

  test('[CT-CAB-006] Deve rolar até a seção de Seja um Apoiador', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await inicio.itemDoMenu(/Seja um Apoiador/i).click();
    await expect(pagina.locator('#seja-um-apoiador')).toBeInViewport();
    expect(new URL(pagina.url()).pathname).toBe('/');
  });

  test('[CT-CAB-005] Deve abrir o Stars ao usar Faça parte no menu', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await validarNovaAba(pagina, inicio.itemDoMenu(/Faça Parte/i), ENDERECO_STARS);
  });

  test('[CT-CAB-008] Deve indicar que os itens do menu são clicáveis', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    for (const nome of [/Sobre Nós/i, /Notícias & Eventos/i, /Faça Parte/i, /Seja um Apoiador/i]) {
      await expect(inicio.itemDoMenu(nome)).toHaveCSS('cursor', 'pointer');
    }
  });

  test('[CT-CAB-009] Deve abrir e fechar o menu no celular', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await inicio.cabecalho.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    const fechar = inicio.cabecalho.getByRole('button', { name: 'Fechar menu', exact: true });
    await expect(fechar).toHaveAttribute('aria-expanded', 'true');
    await expect(inicio.itemDoMenu(/Sobre Nós/i)).toBeVisible();
    await fechar.click();
    await expect(
      inicio.cabecalho.getByRole('navigation', { name: 'Navegação principal' }),
    ).toHaveCount(0);
  });

  test('[CT-CAB-010] Deve recolher o menu mobile depois de escolher uma seção', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await inicio.cabecalho.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await inicio.itemDoMenu(/Sobre Nós/i).click();
    await expect(
      inicio.cabecalho.getByRole('button', { name: 'Abrir menu', exact: true }),
    ).toHaveAttribute('aria-expanded', 'false');
    await expect(inicio.sobre).toBeInViewport();
  });
});
