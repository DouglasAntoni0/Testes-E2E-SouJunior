const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { areasHome } = require('../../shared/areas.data');
const { validarImagem, validarLimitesHorizontais } = require('./apoio/validacoes');

test.describe('Áreas de atuação: cards e carrossel', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-ARE-001] Deve apresentar os dez cards na ordem definida', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    const secao = inicio.secao('Áreas de atuação');
    await expect(
      secao.getByRole('heading', { name: 'Áreas de atuação', exact: true }),
    ).toBeVisible();
    await expect(secao.locator('a[href^="/area/"]')).toHaveCount(10);
    for (const [indice, area] of areasHome.entries()) {
      const card = secao.locator('a[href^="/area/"]').nth(indice);
      await expect(card).toHaveAttribute('href', area.rota);
      await expect(card.getByRole('heading', { name: area.nome, exact: true })).toBeVisible();
    }
  });

  test('[CT-ARE-002] Deve indicar o limite inicial do carrossel', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    const secao = inicio.secao('Áreas de atuação');
    await expect(
      secao.getByRole('button', { name: 'Ver itens anteriores', exact: true }),
    ).toBeDisabled();
    await expect(
      secao.getByRole('button', { name: 'Ver próximos itens', exact: true }),
    ).toBeEnabled();
  });

  test('[CT-ARE-003] Deve avançar até o último conjunto de áreas', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    const secao = inicio.secao('Áreas de atuação');
    await secao.scrollIntoViewIfNeeded();
    await secao.getByRole('button', { name: 'Ver próximos itens', exact: true }).click();
    await expect(secao.locator('a[href="/area/tech-recruiter"]')).toBeInViewport({ ratio: 1 });
    await expect(
      secao.getByRole('button', { name: 'Ver próximos itens', exact: true }),
    ).toBeDisabled();
  });

  test('[CT-ARE-004] Deve retornar ao primeiro conjunto de áreas', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    const secao = inicio.secao('Áreas de atuação');
    await secao.scrollIntoViewIfNeeded();
    await secao.getByRole('button', { name: 'Ver próximos itens', exact: true }).click();
    await expect(secao.locator('a[href="/area/tech-recruiter"]')).toBeInViewport({ ratio: 1 });
    await secao.getByRole('button', { name: 'Ver itens anteriores', exact: true }).click();
    await expect(secao.locator('a[href="/area/agilidade"]')).toBeInViewport({ ratio: 1 });
    await expect(
      secao.getByRole('button', { name: 'Ver itens anteriores', exact: true }),
    ).toBeDisabled();
  });

  test('[CT-ARE-005] Deve exibir dois indicadores com a primeira página selecionada', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    const secao = inicio.secao('Áreas de atuação');
    await expect(secao.getByRole('button', { name: /^Ir para página/ })).toHaveCount(2);
    await expect(
      secao.getByRole('button', { name: 'Ir para página 1', exact: true }),
    ).toHaveAttribute('aria-current', 'true');
    await expect(
      secao.getByRole('button', { name: 'Ir para página 2', exact: true }),
    ).not.toHaveAttribute('aria-current', 'true');
  });

  test('[CT-ARE-006] Deve navegar entre os conjuntos pelos indicadores', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    const secao = inicio.secao('Áreas de atuação');
    await secao.scrollIntoViewIfNeeded();
    await secao.getByRole('button', { name: 'Ir para página 2', exact: true }).click();
    await expect(
      secao.getByRole('button', { name: 'Ir para página 2', exact: true }),
    ).toHaveAttribute('aria-current', 'true');
    await expect(secao.locator('a[href="/area/tech-recruiter"]')).toBeInViewport({ ratio: 1 });
    await secao.getByRole('button', { name: 'Ir para página 1', exact: true }).click();
    await expect(
      secao.getByRole('button', { name: 'Ir para página 1', exact: true }),
    ).toHaveAttribute('aria-current', 'true');
    await expect(secao.locator('a[href="/area/agilidade"]')).toBeInViewport({ ratio: 1 });
  });

  test('[CT-ARE-007] Deve mostrar cinco cards completos e uma indicação do próximo', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    const secao = inicio.secao('Áreas de atuação');
    await secao.scrollIntoViewIfNeeded();
    for (const area of areasHome.slice(0, 5)) {
      await expect(secao.locator('a[href="' + area.rota + '"]')).toBeInViewport({ ratio: 1 });
    }
    const sexto = secao.locator('a[href="' + areasHome[5].rota + '"]');
    await expect(sexto).toBeInViewport();
    await expect(sexto).not.toBeInViewport({ ratio: 1 });
  });

  test('[CT-ARE-008] Deve manter o último conjunto alinhado depois da rolagem', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    const secao = inicio.secao('Áreas de atuação');
    await secao.scrollIntoViewIfNeeded();
    await secao.getByRole('button', { name: 'Ver próximos itens', exact: true }).click();
    for (const area of areasHome.slice(5)) {
      await expect(secao.locator('a[href="' + area.rota + '"]')).toBeInViewport({ ratio: 1 });
    }
  });

  test('[CT-ARE-009] Deve disponibilizar todas as áreas no layout mobile', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    const secao = inicio.secao('Áreas de atuação');
    for (const area of areasHome) {
      const card = secao.locator('a[href="' + area.rota + '"]');
      await card.scrollIntoViewIfNeeded();
      await validarImagem(card.getByRole('img', { name: area.nome, exact: true }));
      await validarLimitesHorizontais(card);
    }
  });

  for (const [indice, area] of areasHome.entries()) {
    test('[CT-ARE-010] Deve abrir a página pelo card de ' + area.nome, async ({ page: pagina }) => {
      const inicio = new PaginaInicial(pagina);
      const secao = inicio.secao('Áreas de atuação');
      await secao.scrollIntoViewIfNeeded();
      if (indice >= 5) {
        await secao.getByRole('button', { name: 'Ver próximos itens', exact: true }).click();
      }
      await secao.locator('a[href="' + area.rota + '"]').click();
      expect(new URL(pagina.url()).pathname).toBe(area.rota);
      await expect(pagina.getByRole('heading', { name: area.titulo, exact: true })).toBeVisible();
    });
  }

  test('[CT-ARE-011] Deve acessar uma área pelos cards no celular', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await inicio.secao('Áreas de atuação').locator('a[href="/area/qa"]').click();
    await expect(pagina).toHaveURL(/\/area\/qa$/);
    await expect(
      pagina.getByRole('heading', { name: 'Quality Assurance (QA)', exact: true }),
    ).toBeVisible();
  });
});
