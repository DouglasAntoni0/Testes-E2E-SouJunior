import { test, expect } from '@playwright/test';

test.describe('Seção de Depoimentos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  const validarCard = async (page, dados) => {
    const card = page.locator('#depoimentos').locator(`p:has-text("${dados.nome}")`).locator('..').locator('..');

    await expect(card.getByText(dados.nome, { exact: true }).first()).toBeVisible();
    await expect(card.getByText(dados.cargo, { exact: true }).first()).toBeVisible();

    const img = card.locator(`img[alt="${dados.fotoAlt}"]`);
    await expect(img).toBeVisible();
    const naturalWidth = await img.evaluate((node) => node.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);

    const article = card.locator('article p');
    await expect(article).toBeVisible();
    const articleText = await article.textContent();
    expect(articleText).toContain(dados.inicioTexto);
    expect(articleText).toContain(dados.fimTexto);
  };

  test('Deve exibir a estrutura base e títulos da seção', async ({ page }) => {
    await expect(page.locator('#depoimentos')).toBeVisible();
    await expect(page.locator('p:has-text("O que falam sobre a SouJunior")')).toBeVisible();
  });

  test('Deve validar a integridade de todos os dados nos cards e a transição de páginas', async ({ page }) => {

    const pagina1 = [
      { nome: 'Priscilla Souza', cargo: 'UI & UX Designer', fotoAlt: 'Priscilla Souza', inicioTexto: 'Oi, sou a Priscila', fimTexto: 'trocar muitas experiências.' },
      { nome: 'Anderson Nunes', cargo: 'Front-end', fotoAlt: 'Anderson Nunes', inicioTexto: 'Fui voluntário na Sou Junior', fimTexto: 'meu "sim" chegou.' },
      { nome: 'Caique Fonseca', cargo: 'UI & UX Designer', fotoAlt: 'Caique Fonseca', inicioTexto: 'Ambientes controlados, como salas', fimTexto: 'aberta para todos.' }
    ];

    const pagina2 = [
      { nome: 'Ana Santos', cargo: 'Front-end', fotoAlt: 'Ana Santos', inicioTexto: 'Atuar como Dev Front-end', fimTexto: 'imersivos como esse.' },
      { nome: 'Anna Claudia Andrade', cargo: 'UI & UX Designer', fotoAlt: 'Anna Claudia Andrade', inicioTexto: 'A SouJunior está me proporcionando', fimTexto: 'sendo construído.' },
      { nome: 'Priscylla A. Ribeiro', cargo: 'Mentora UI & UX Designer', fotoAlt: 'Priscylla A. Ribeiro', inicioTexto: 'A Sou Junior me desafia', fimTexto: 'compromisso com o trabalho' }
    ];

    const pagina3 = [
      { nome: 'Talita Bitencourt', cargo: 'APM', fotoAlt: 'Talita Bitencourt', inicioTexto: 'Para mim, a teoria', fimTexto: 'aprendizado muito mais efetivo.' },
      { nome: 'Eduardo Bezerra', cargo: 'UI & UX Designer', fotoAlt: 'Eduardo Bezerra', inicioTexto: 'É uma honra poder', fimTexto: 'graças a Sou Junior.' }
    ];

    for (const pessoa of pagina1) {
      await validarCard(page, pessoa);
    }

    await page.locator('#depoimentos button[aria-label="Ver próximo item"]').click();
    for (const pessoa of pagina2) {
      await validarCard(page, pessoa);
    }

    await page.locator('#depoimentos button[aria-label="Ver próximo item"]').click();
    for (const pessoa of pagina3) {
      await validarCard(page, pessoa);
    }

    await page.locator('#depoimentos button[aria-label="Ver item anterior"]').click();
    await expect(page.locator('#depoimentos').locator('p:has-text("Ana Santos")').first()).toBeVisible();
  });

  test('Deve validar o estado habilitado/desabilitado das setas através de navegação automatizada', async ({ page }) => {
    const btnPrev = page.locator('#depoimentos button[aria-label="Ver item anterior"]');
    const btnNext = page.locator('#depoimentos button[aria-label="Ver próximo item"]');

    await expect(btnPrev).toBeDisabled();
    await expect(btnNext).toBeEnabled();

    while (await btnNext.isEnabled()) {
      await btnNext.click();
      await page.waitForTimeout(800); // Aguarda a rolagem do carrossel estabilizar.
    }

    await expect(btnNext).toBeDisabled();
    await expect(btnPrev).toBeEnabled();
  });
});
