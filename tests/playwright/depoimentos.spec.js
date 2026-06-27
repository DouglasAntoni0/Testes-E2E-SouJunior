const { test } = require('@playwright/test');
const { pagina1, pagina2, pagina3 } = require('../../shared/depoimentos.data');
const { HomePage } = require('./pages/HomePage');
const { DepoimentosSection } = require('./pages/DepoimentosSection');

test.describe('Seção de Depoimentos', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.visit('http://localhost:3000');
  });

  test('Deve exibir a estrutura base e títulos da seção', async ({ page }) => {
    const depoimentos = new DepoimentosSection(page);

    await depoimentos.shouldShowBaseStructure();
  });

  test('Deve validar a integridade de todos os dados nos cards e a transição de páginas', async ({ page }) => {
    const depoimentos = new DepoimentosSection(page);

    await depoimentos.shouldShowCards(pagina1);

    await depoimentos.goToNextPage();
    await depoimentos.shouldShowCards(pagina2);

    await depoimentos.goToNextPage();
    await depoimentos.shouldShowCards(pagina3);

    await depoimentos.goToPreviousPage();
    await depoimentos.shouldShowPerson('Ana Santos');
  });

  test('Deve validar o estado habilitado/desabilitado das setas através de navegação automatizada', async ({ page }) => {
    const depoimentos = new DepoimentosSection(page);

    await depoimentos.shouldStartWithExpectedArrowState();
    await depoimentos.clickNextUntilTheEnd();
    await depoimentos.shouldFinishWithExpectedArrowState();
  });
});
