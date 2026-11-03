const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { CAMINHO_APOIO } = require('../../shared/interface.data');
const {
  validarImagem,
  validarLinkExterno,
  validarLimitesHorizontais,
  validarSemRolagemHorizontal,
} = require('./apoio/validacoes');

test.describe('Apoio, mascote e faixa mobile', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-APO-001] Deve apresentar a proposta da seção de apoio', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await expect(
      inicio.apoio.getByRole('heading', { name: 'Seja um Apoiador!', exact: true }),
    ).toBeVisible();
    await expect(
      inicio.apoio.getByText(
        'Com o seu apoio, ampliamos as oportunidades para quem está dando os primeiros passos na área de tecnologia.',
        { exact: true },
      ),
    ).toBeVisible();
    await validarImagem(
      inicio.apoio
        .locator('a')
        .filter({ hasNot: pagina.getByAltText('Coração', { exact: true }) })
        .getByRole('img', { name: 'Seja um apoiador', exact: true }),
    );
  });

  test('[CT-APO-002] Deve oferecer o acesso à página de apoio pela mão com coração', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    const mao = inicio.apoio
      .locator('a')
      .filter({ hasNot: pagina.getByAltText('Coração', { exact: true }) });
    await validarLinkExterno(mao, CAMINHO_APOIO);
  });

  test('[CT-APO-003] Deve acompanhar a rolagem com o mascote no desktop', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    const controle = inicio.controleDeApoio();
    await expect(controle).toHaveCSS('position', 'fixed');
    await inicio.sobre.scrollIntoViewIfNeeded();
    await expect(controle).toHaveCSS('position', 'fixed');
    await expect(controle.locator('img[alt="Seja um apoiador"]')).toBeVisible();
    await expect(controle).toBeInViewport();
  });

  test('[CT-APO-004] Deve vincular o mascote à seção de apoio ao alcançá-la', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await inicio.apoio.scrollIntoViewIfNeeded();
    await pagina
      .getByRole('heading', { name: 'Perguntas Frequentes', exact: true })
      .scrollIntoViewIfNeeded();
    await expect(inicio.controleDeApoio()).toHaveCSS('position', 'absolute');
  });

  test('[CT-APO-005] Deve retomar o mascote flutuante ao voltar para o topo', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina
      .getByRole('heading', { name: 'Perguntas Frequentes', exact: true })
      .scrollIntoViewIfNeeded();
    await expect(inicio.controleDeApoio()).toHaveCSS('position', 'absolute');
    await pagina.locator('#home-heading').scrollIntoViewIfNeeded();
    await expect(inicio.controleDeApoio()).toHaveCSS('position', 'fixed');
    await expect(inicio.controleDeApoio()).toBeInViewport();
  });

  test('[CT-APO-006] Deve preservar o destino do mascote nos dois estados', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await validarLinkExterno(inicio.controleDeApoio(), CAMINHO_APOIO);
    await pagina
      .getByRole('heading', { name: 'Perguntas Frequentes', exact: true })
      .scrollIntoViewIfNeeded();
    await expect(inicio.controleDeApoio()).toHaveCSS('position', 'absolute');
    await validarLinkExterno(inicio.controleDeApoio(), CAMINHO_APOIO);
  });

  test('[CT-APO-007] Deve substituir o mascote pela faixa inferior no celular', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    const faixa = inicio.controleDeApoio();
    await expect(faixa).toHaveCSS('position', 'fixed');
    await expect(faixa.getByText('Seja um Apoiador', { exact: true })).toBeVisible();
    await expect(faixa.getByAltText('Coração', { exact: true })).toBeVisible();
    await expect(faixa.locator('img[alt="Seja um apoiador"]')).toBeHidden();
    await expect(faixa).toHaveCSS('bottom', '0px');
  });

  test('[CT-APO-008] Deve vincular a faixa à seção de apoio no mobile', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await pagina
      .getByRole('heading', { name: 'Perguntas Frequentes', exact: true })
      .scrollIntoViewIfNeeded();
    await expect(inicio.controleDeApoio()).toHaveCSS('position', 'absolute');
  });

  test('[CT-APO-009] Deve trazer a faixa de volta ao subir a página', async ({ page: pagina }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await pagina
      .getByRole('heading', { name: 'Perguntas Frequentes', exact: true })
      .scrollIntoViewIfNeeded();
    await expect(inicio.controleDeApoio()).toHaveCSS('position', 'absolute');
    await inicio.sobre
      .getByRole('heading', { name: 'Sobre a SouJunior', exact: true })
      .scrollIntoViewIfNeeded();
    await expect(inicio.controleDeApoio()).toHaveCSS('position', 'fixed');
    await expect(inicio.controleDeApoio()).toBeInViewport({ ratio: 1 });
  });

  test('[CT-APO-010] Deve mostrar somente a apresentação adequada ao dispositivo', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    const controle = inicio.controleDeApoio();
    await expect(controle.locator('img[alt="Seja um apoiador"]')).toBeVisible();
    await expect(controle.getByText('Seja um Apoiador', { exact: true })).toBeHidden();
    await pagina.setViewportSize({ width: 375, height: 812 });
    await expect(controle.locator('img[alt="Seja um apoiador"]')).toBeHidden();
    await expect(controle.getByText('Seja um Apoiador', { exact: true })).toBeVisible();
  });

  test('[CT-APO-011] Deve ocupar toda a largura útil com a faixa mobile', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    const faixa = inicio.controleDeApoio();
    await expect(faixa).toBeVisible();
    const caixa = await faixa.boundingBox();
    expect(Math.abs(caixa.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(caixa.width - 375)).toBeLessThanOrEqual(1);
    await validarSemRolagemHorizontal(pagina);
  });

  test('[CT-APO-012] Deve centralizar o conjunto de texto e coração na faixa', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    const faixa = inicio.controleDeApoio();
    await expect(faixa.getByText('Seja um Apoiador', { exact: true })).toBeVisible();
    const caixa = await faixa.boundingBox();
    const texto = await faixa.getByText('Seja um Apoiador', { exact: true }).boundingBox();
    const coracao = await faixa.getByAltText('Coração', { exact: true }).boundingBox();
    const centroDoConteudo = (texto.x + coracao.x + coracao.width) / 2;
    expect(Math.abs(centroDoConteudo - (caixa.x + caixa.width / 2))).toBeLessThanOrEqual(8);
    await validarLimitesHorizontais(faixa);
  });

  test('[CT-APO-013] Deve preservar o acesso ao apoio na faixa móvel e vinculada', async ({
    page: pagina,
  }) => {
    const inicio = new PaginaInicial(pagina);
    await pagina.setViewportSize({ width: 375, height: 812 });
    await validarLinkExterno(inicio.controleDeApoio(), CAMINHO_APOIO);
    await pagina
      .getByRole('heading', { name: 'Perguntas Frequentes', exact: true })
      .scrollIntoViewIfNeeded();
    await expect(inicio.controleDeApoio()).toHaveCSS('position', 'absolute');
    await validarLinkExterno(inicio.controleDeApoio(), CAMINHO_APOIO);
  });
});
