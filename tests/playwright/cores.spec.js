const { test, expect } = require('@playwright/test');
const { PaginaInicial } = require('./pages/PaginaInicial');
const { areasInternas, areasHome } = require('../../shared/areas.data');
const { AZUL_PRINCIPAL, TITULO_HERO, telas } = require('../../shared/interface.data');
const { validarCorDeFundo } = require('./apoio/validacoes');

test.describe('Identidade visual: paleta de cores', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  for (const [nomeTela, tamanho] of Object.entries(telas)) {
    test.describe(nomeTela, () => {
      test.beforeEach(async ({ page: pagina }) => {
        await pagina.setViewportSize(tamanho);
      });
      test('[CT-COR-001] Deve aplicar o azul principal ao cabeçalho', async ({ page: pagina }) => {
        const inicio = new PaginaInicial(pagina);
        await validarCorDeFundo(inicio.cabecalho, AZUL_PRINCIPAL);
      });

      test('[CT-COR-002] Deve aplicar o azul principal ao rodapé', async ({ page: pagina }) => {
        const inicio = new PaginaInicial(pagina);
        await inicio.rodape.scrollIntoViewIfNeeded();
        await validarCorDeFundo(inicio.rodape, AZUL_PRINCIPAL);
      });

      test('[CT-COR-003] Deve aplicar o azul principal ao fundo do banner', async ({
        page: pagina,
      }) => {
        await validarCorDeFundo(
          pagina.getByRole('heading', { name: TITULO_HERO, exact: true }),
          AZUL_PRINCIPAL,
        );
      });

      test('[CT-COR-004] Deve aplicar o azul principal aos dez cards das áreas', async ({
        page: pagina,
      }) => {
        const inicio = new PaginaInicial(pagina);
        const secao = inicio.secao('Áreas de atuação');
        for (const area of areasHome) {
          await validarCorDeFundo(
            secao.getByRole('heading', { name: area.nome, exact: true }),
            AZUL_PRINCIPAL,
          );
        }
      });

      test('[CT-COR-005] Deve aplicar o azul principal aos painéis de depoimento', async ({
        page: pagina,
      }) => {
        const inicio = new PaginaInicial(pagina);
        const textos = inicio.depoimentos.locator('[role="list"] > div > div:first-child p');
        await expect(textos).toHaveCount(8);
        for (const texto of await textos.all()) await validarCorDeFundo(texto, AZUL_PRINCIPAL);
      });

      test('[CT-COR-006] Deve aplicar o azul principal ao botão Participar', async ({
        page: pagina,
      }) => {
        await validarCorDeFundo(
          pagina.getByRole('link', { name: /^Participar!?$/ }),
          AZUL_PRINCIPAL,
        );
      });

      for (const area of areasInternas) {
        test(
          '[CT-COR-007] Deve replicar a paleta na página de ' + area.titulo,
          async ({ page: pagina }) => {
            const inicio = new PaginaInicial(pagina);
            await pagina.goto(area.rota);
            await validarCorDeFundo(inicio.cabecalho, AZUL_PRINCIPAL);
            await validarCorDeFundo(inicio.rodape, AZUL_PRINCIPAL);
          },
        );
      }
    });
  }
});
