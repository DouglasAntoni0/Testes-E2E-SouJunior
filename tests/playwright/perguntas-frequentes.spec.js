const { test, expect } = require('@playwright/test');
const { SecaoFaq } = require('./pages/SecaoFaq');
const { categorias } = require('../../shared/faq.data');
const { validarLinkExterno, validarLimitesHorizontais } = require('./apoio/validacoes');

test.describe('Perguntas Frequentes e Ouvidoria', () => {
  test.beforeEach(async ({ page: pagina }) => {
    await pagina.goto('/');
  });

  test('[CT-FAQ-001] Deve apresentar a FAQ com Instituição selecionada inicialmente', async ({
    page: pagina,
  }) => {
    const faq = new SecaoFaq(pagina);
    await expect(
      faq.secao.getByRole('heading', { name: 'Perguntas Frequentes', exact: true }),
    ).toBeVisible();
    await expect(
      faq.secao.getByText('Olá! Como podemos te ajudar?', { exact: true }),
    ).toBeVisible();
    await expect(faq.secao.locator('[role="button"][aria-expanded]')).toHaveCount(4);
    await expect(faq.pergunta(categorias[0].perguntas[0].pergunta)).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    await expect(faq.pergunta(categorias[1].perguntas[0].pergunta)).toHaveCount(0);
  });

  test('[CT-FAQ-002] Deve trocar as perguntas ao escolher outra categoria', async ({
    page: pagina,
  }) => {
    const faq = new SecaoFaq(pagina);
    for (const categoria of categorias) {
      await faq.selecionarCategoria(categoria.nome);
      await expect(faq.secao.locator('[role="button"][aria-expanded]')).toHaveCount(
        categoria.perguntas.length,
      );
      await expect(faq.pergunta(categoria.perguntas[0].pergunta)).toBeVisible();
    }
  });

  for (const categoria of categorias) {
    for (const item of categoria.perguntas) {
      test(
        '[' + item.id + '] Deve abrir e recolher a resposta: ' + item.pergunta,
        async ({ page: pagina }) => {
          const faq = new SecaoFaq(pagina);
          await faq.selecionarCategoria(categoria.nome);
          await faq.pergunta(item.pergunta).click();
          await expect(faq.pergunta(item.pergunta)).toHaveAttribute('aria-expanded', 'true');
          await expect(faq.resposta(item.resposta)).toBeVisible();
          await faq.pergunta(item.pergunta).click();
          await expect(faq.pergunta(item.pergunta)).toHaveAttribute('aria-expanded', 'false');
          await expect(faq.resposta(item.resposta)).toBeHidden();
        },
      );
    }
  }

  test('[CT-FAQ-015] Deve manter respostas independentes abertas ao mesmo tempo', async ({
    page: pagina,
  }) => {
    const faq = new SecaoFaq(pagina);
    const [primeira, segunda] = categorias[0].perguntas;
    await faq.pergunta(primeira.pergunta).click();
    await faq.pergunta(segunda.pergunta).click();
    await faq.pergunta(primeira.pergunta).click();
    await expect(faq.pergunta(primeira.pergunta)).toHaveAttribute('aria-expanded', 'false');
    await expect(faq.resposta(primeira.resposta)).toBeHidden();
    await expect(faq.pergunta(segunda.pergunta)).toHaveAttribute('aria-expanded', 'true');
    await expect(faq.resposta(segunda.resposta)).toBeVisible();
  });

  test('[CT-FAQ-016] Deve operar uma pergunta com Enter e Espaço', async ({ page: pagina }) => {
    const faq = new SecaoFaq(pagina);
    const item = categorias[0].perguntas[0];
    await faq.pergunta(item.pergunta).focus();
    await pagina.keyboard.press('Enter');
    await expect(faq.pergunta(item.pergunta)).toHaveAttribute('aria-expanded', 'true');
    await expect(faq.resposta(item.resposta)).toBeVisible();
    await pagina.keyboard.press('Space');
    await expect(faq.pergunta(item.pergunta)).toHaveAttribute('aria-expanded', 'false');
    await expect(faq.resposta(item.resposta)).toBeHidden();
  });

  test('[CT-FAQ-017] Deve manter o acesso à Ouvidoria disponível na FAQ', async ({
    page: pagina,
  }) => {
    const faq = new SecaoFaq(pagina);
    await expect(faq.secao.getByText(/Não encontrou a sua dúvida\?/)).toBeVisible();
    await validarLinkExterno(
      faq.secao.getByRole('link', { name: 'Pergunte Aqui!', exact: true }),
      '/FAQ',
    );
  });

  test('[CT-FAQ-018] Deve trocar categorias e ler respostas no celular', async ({
    page: pagina,
  }) => {
    await pagina.setViewportSize({ width: 375, height: 812 });
    const faq = new SecaoFaq(pagina);
    for (const categoria of categorias) {
      await faq.selecionarCategoria(categoria.nome);
      const item = categoria.perguntas[0];
      await faq.pergunta(item.pergunta).click();
      await expect(faq.resposta(item.resposta)).toBeVisible();
      await validarLimitesHorizontais(faq.pergunta(item.pergunta));
    }
  });
});
