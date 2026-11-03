const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { eventos } = require('../../shared/eventos.data');
const { validarImagem, validarNovaAba, validarLimitesHorizontais } = require('./apoio/validacoes');

test.describe('Notícias e Eventos', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-NOT-001] Deve apresentar as informações dos quatro dias do evento', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await expect(
      inicio.noticias.getByRole('heading', { name: 'Notícias e Eventos', exact: true }),
    ).toBeVisible();
    await expect(
      inicio.noticias.getByRole('img', {
        name: 'SouJunior 3.0: A Experiência que Transforma',
        exact: true,
      }),
    ).toHaveCount(4);
    await expect(inicio.noticias.getByRole('button', { name: 'Confira', exact: true })).toHaveCount(
      4,
    );
    for (const evento of eventos) {
      await expect(inicio.noticias.getByText(evento.data, { exact: true })).toHaveCount(1);
    }
  });

  test('[CT-NOT-002] Deve exibir os três primeiros eventos na entrada do desktop', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await inicio.noticias.scrollIntoViewIfNeeded();
    const imagens = inicio.noticias.getByRole('img', {
      name: 'SouJunior 3.0: A Experiência que Transforma',
      exact: true,
    });
    for (let indice = 0; indice < 3; indice += 1) {
      await validarImagem(imagens.nth(indice));
      await expect(imagens.nth(indice)).toBeInViewport({ ratio: 1 });
    }
  });

  test('[CT-NOT-003] Deve percorrer as notícias pelos controles de navegação', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await inicio.noticias.scrollIntoViewIfNeeded();
    const anterior = inicio.noticias.getByRole('button', {
      name: 'Ver itens anteriores',
      exact: true,
    });
    const proximo = inicio.noticias.getByRole('button', {
      name: 'Ver próximos itens',
      exact: true,
    });
    await expect(anterior).toBeDisabled();
    await proximo.click();
    await expect(inicio.noticias.getByText(eventos[3].data, { exact: true })).toBeInViewport();
    await expect(proximo).toBeDisabled();
    await anterior.click();
    await expect(inicio.noticias.getByText(eventos[0].data, { exact: true })).toBeInViewport();
    await expect(anterior).toBeDisabled();
  });

  for (const [indice, evento] of eventos.entries()) {
    test(
      '[' + evento.id + '] Deve abrir o vídeo do evento de ' + evento.data,
      async ({ page: pagina }) => {
        const inicio = new PaginaInicial(pagina);
        await inicio.noticias.scrollIntoViewIfNeeded();
        if (indice === 3) {
          await inicio.noticias
            .getByRole('button', { name: 'Ver próximos itens', exact: true })
            .click();
          await expect(inicio.noticias.getByText(evento.data, { exact: true })).toBeInViewport();
        }
        await validarNovaAba(
          pagina,
          inicio.noticias.getByRole('button', { name: 'Confira', exact: true }).nth(indice),
          evento.endereco,
        );
      },
    );
  }

  test('[CT-NOT-008] Deve navegar pelos quatro indicadores de eventos no mobile', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await inicio.noticias.scrollIntoViewIfNeeded();
    await expect(inicio.noticias.getByRole('button', { name: /^Ir para página/ })).toHaveCount(4);
    await inicio.noticias.getByRole('button', { name: 'Ir para página 4', exact: true }).click();
    await expect(
      inicio.noticias.getByRole('button', { name: 'Ir para página 4', exact: true }),
    ).toHaveAttribute('aria-current', 'true');
    await expect(inicio.noticias.getByText(eventos[3].data, { exact: true })).toBeInViewport();
    await inicio.noticias.getByRole('button', { name: 'Ir para página 1', exact: true }).click();
    await expect(inicio.noticias.getByText(eventos[0].data, { exact: true })).toBeInViewport();
  });

  test('[CT-NOT-009] Deve manter o conteúdo de um evento dentro da tela mobile', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await inicio.noticias.scrollIntoViewIfNeeded();
    await validarLimitesHorizontais(inicio.noticias.getByText(eventos[0].data, { exact: true }));
    await validarLimitesHorizontais(
      inicio.noticias.getByRole('button', { name: 'Confira', exact: true }).first(),
    );
  });
});
