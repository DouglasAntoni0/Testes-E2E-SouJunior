const { test, expect } = require('@playwright/test');
const { papeis, ENDERECO_STARS } = require('../../shared/interface.data');
const { validarLinkExterno, validarLimitesHorizontais } = require('./apoio/validacoes');

test.describe('Papéis na comunidade', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-COM-001] Deve convidar o visitante a fazer parte da comunidade', async ({
    page: pagina,
  }) => {
    await expect(
      pagina.getByRole('heading', {
        name: 'Faça você também parte da nossa comunidade!',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      pagina.getByText('Na SouJunior, há diversas maneiras de participar:', { exact: true }),
    ).toBeVisible();
  });

  for (const papel of papeis) {
    test(
      '[' + papel.id + '] Deve explicar a atuação de ' + papel.nome,
      async ({ page: pagina }) => {
        const secao = pagina
          .getByRole('heading', {
            name: 'Faça você também parte da nossa comunidade!',
            exact: true,
          })
          .locator('..');
        await expect(secao.getByText(papel.nome, { exact: true })).toBeVisible();
        await expect(secao.getByText(papel.descricao, { exact: true })).toBeVisible();
      },
    );
  }

  test('[CT-COM-005] Deve oferecer o cadastro pelo botão Participar', async ({ page: pagina }) => {
    const link = pagina.getByRole('link', { name: /^Participar!?$/ });
    await expect(link).toBeVisible();
    await validarLinkExterno(link, ENDERECO_STARS);
  });

  test('[CT-COM-006] Deve preservar a leitura dos papéis no mobile', async ({ page: pagina }) => {
    await pagina.setViewportSize({ width: 375, height: 812 });
    for (const papel of papeis) {
      await validarLimitesHorizontais(pagina.getByText(papel.descricao, { exact: true }));
    }
    await validarLimitesHorizontais(pagina.getByRole('link', { name: /^Participar!?$/ }));
  });
});
