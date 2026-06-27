const { test } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { ColorPaletteSection } = require('./pages/ColorPaletteSection');

const HOME_URL = 'http://localhost:3000/';

const viewports = [
    { name: 'Desktop', width: 1366, height: 768 },
    { name: 'Mobile', width: 390, height: 844 },
];

test.describe('Nova identidade visual - cores aprovadas', () => {
    for (const { name, width, height } of viewports) {
        test.describe(name, () => {
            test.beforeEach(async ({ page }) => {
                const home = new HomePage(page);

                await page.setViewportSize({ width, height });
                await home.visit(HOME_URL);
            });

            test('Deve exibir o Footer com o azul principal da marca', async ({ page }) => {
                const palette = new ColorPaletteSection(page);

                await palette.shouldShowBlueFooter();
            });

            test('Deve exibir a seção Hero com o azul principal da marca', async ({ page }) => {
                const palette = new ColorPaletteSection(page);

                await palette.shouldShowBlueHero();
            });

            test('Deve exibir os 11 cards de Áreas de Atuação com o azul principal', async ({ page }) => {
                const palette = new ColorPaletteSection(page);

                await palette.shouldShowBlueAreaCards();
            });

            test('Deve exibir os cards de Depoimentos com o azul principal', async ({ page }) => {
                const palette = new ColorPaletteSection(page);

                await palette.shouldShowBlueTestimonials();
            });
        });
    }
});
