const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');

test.describe('Iniciativas temporariamente ocultas', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-INI-001] Deve ocultar a seção de iniciativas enquanto não há programas ativos', async ({
    page: pagina,
  }) => {
    await expect(pagina.locator('#nossas-iniciativas')).toHaveCount(0);
    await expect(pagina.getByRole('heading', { name: 'SouJunior Labs', exact: true })).toHaveCount(
      0,
    );
    await expect(pagina.getByRole('heading', { name: 'SouJunior Talk', exact: true })).toHaveCount(
      0,
    );
  });

  test('[CT-INI-002] Deve retirar o acesso às iniciativas do cabeçalho', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await expect(
      inicio.cabecalho.getByRole('menuitem', { name: /Nossas Iniciativas/i }),
    ).toHaveCount(0);
  });

  test('[CT-INI-003] Deve retirar o acesso às iniciativas do rodapé', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await expect(inicio.rodape.getByText('Nossas iniciativas', { exact: true })).toHaveCount(0);
  });

  test('[CT-INI-004] Deve evitar âncoras órfãs para iniciativas ocultas', async ({
    page: pagina,
  }) => {
    await expect(pagina.locator('a[href$="#nossas-iniciativas"]')).toHaveCount(0);
  });
});
