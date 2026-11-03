const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { areasInternas } = require('../../shared/areas.data');
const { ENDERECO_STARS, telas } = require('../../shared/interface.data');
const { validarLimitesHorizontais } = require('./apoio/validacoes');

test.describe('Páginas internas das áreas', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  for (const [nomeTela, tamanho] of Object.entries(telas)) {
    test.describe(nomeTela, () => {
      for (const area of areasInternas) {
        test(
          '[' +
            area.id +
            '] Deve apresentar a página de ' +
            area.titulo +
            ' e seus convites para participar',
          async ({ page: pagina }) => {
            await pagina.setViewportSize(tamanho);
            await pagina.goto(area.rota);
            const titulo = pagina.getByRole('heading', { name: area.titulo, exact: true });
            await expect(titulo).toBeVisible();
            await expect(pagina.locator('p').filter({ hasText: area.trecho })).toBeVisible();
            await validarLimitesHorizontais(titulo);
            const convites = pagina.getByRole('link', { name: /^Faça parte!?$/i });
            await expect(convites).toHaveCount(2);
            for (const convite of await convites.all()) {
              await expect(convite).toBeVisible();
              await expect(convite).toHaveAttribute('href', ENDERECO_STARS);
            }
          },
        );
      }
    });
  }

  test('[CT-PAG-012] Deve trocar de área pelo submenu interno', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.goto('/area/agilidade');
    const submenu = inicio.cabecalho.getByRole('navigation', {
      name: 'Navegação secundaria',
      exact: true,
    });
    await submenu.getByRole('menuitem', { name: 'Navegar para a página qa', exact: true }).click();
    await expect(pagina).toHaveURL(/\/area\/qa$/);
    await expect(
      pagina.getByRole('heading', { name: 'Quality Assurance (QA)', exact: true }),
    ).toBeVisible();
  });

  test('[CT-PAG-013] Deve manter a grafia Front-end e Back-end no submenu', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.goto('/area/qa');
    const submenu = inicio.cabecalho.getByRole('navigation', {
      name: 'Navegação secundaria',
      exact: true,
    });
    await expect(submenu.getByRole('menuitem', { name: /página front-end/i })).toHaveText(
      'Front-end',
    );
    await expect(submenu.getByRole('menuitem', { name: /página back-end/i })).toHaveText(
      'Back-end',
    );
  });

  test('[CT-PAG-014] Deve informar quando a área solicitada não existe', async ({
    page: pagina,
  }) => {
    await pagina.goto('/area/area-inexistente');
    await expect(
      pagina.getByRole('heading', { name: 'Área não encontrada', exact: true }),
    ).toBeVisible();
    await expect(
      pagina.getByText('A área "area-inexistente" não foi localizada.', { exact: true }),
    ).toBeVisible();
    await expect(
      pagina.getByRole('heading', { name: 'Quality Assurance (QA)', exact: true }),
    ).toHaveCount(0);
  });
});
