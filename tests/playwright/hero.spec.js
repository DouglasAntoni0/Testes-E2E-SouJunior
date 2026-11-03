const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { ENDERECO_STARS, TITULO_HERO } = require('../../shared/interface.data');
const {
  validarImagem,
  validarLinkExterno,
  validarLimitesHorizontais,
} = require('./apoio/validacoes');

test.describe('Banner principal', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-HER-001] Deve apresentar a proposta da SouJunior logo na entrada', async ({
    page: pagina,
  }) => {
    await expect(pagina.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(pagina.getByRole('heading', { name: TITULO_HERO, exact: true })).toBeVisible();
    await expect(
      pagina.getByText(
        'Da tecnologia ao recrutamento, do design à agilidade, do social media ao produto:',
        { exact: true },
      ),
    ).toBeVisible();
    await expect(pagina.getByText(/Na SouJunior, você vivencia experiências reais/)).toBeVisible();
  });

  test('[CT-HER-002] Deve oferecer a inscrição no Stars pelo banner', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await expect(inicio.botaoHero()).toBeVisible();
    await validarLinkExterno(inicio.botaoHero(), ENDERECO_STARS);
  });

  test('[CT-HER-003] Deve posicionar o mascote ao lado do texto no desktop', async ({
    page: pagina,
  }) => {
    const imagem = pagina.getByRole('img', { name: 'Mascote do Soujunior', exact: true });
    await validarImagem(imagem);
    const titulo = await pagina
      .getByRole('heading', { name: TITULO_HERO, exact: true })
      .boundingBox();
    const mascote = await imagem.boundingBox();
    expect(mascote.x).toBeGreaterThan(titulo.x + titulo.width);
  });

  test('[CT-HER-004] Deve adaptar o banner ao celular sem cortar o conteúdo', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await validarLimitesHorizontais(
      pagina.getByRole('heading', { name: TITULO_HERO, exact: true }),
    );
    await validarLimitesHorizontais(inicio.botaoHero());
    await expect(
      pagina.getByRole('img', { name: 'Mascote do Soujunior', exact: true }),
    ).toBeHidden();
  });
});
