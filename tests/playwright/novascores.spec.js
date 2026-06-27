const { test, expect } = require('@playwright/test');

const HOME_URL = 'http://localhost:3000/';
const TARGET_BLUE = 'rgb(60, 126, 249)';

const viewports = [
    { name: 'Desktop', width: 1366, height: 768 },
    { name: 'Mobile', width: 390, height: 844 },
];

test.describe('Nova identidade visual - cores aprovadas', () => {
    for (const { name, width, height } of viewports) {
        test.describe(name, () => {
            test.beforeEach(async ({ page }) => {
                await page.setViewportSize({ width, height });
                await page.goto(HOME_URL);
            });

            test('Deve exibir o Footer com o azul principal da marca', async ({ page }) => {
                const footer = page.locator('footer');

                await footer.scrollIntoViewIfNeeded();
                await expect(footer).toBeVisible();

                const footerWrapperColor = await footer.evaluate((footerElement) =>
                    getComputedStyle(footerElement.parentElement).backgroundColor,
                );

                expect(footerWrapperColor).toBe(TARGET_BLUE);
            });

            test('Deve exibir a seção Hero com o azul principal da marca', async ({ page }) => {
                const heroTitle = page.getByRole('heading', {
                    name: 'Transformando potencial em experiência real.',
                    level: 1,
                });

                await expect(heroTitle).toBeVisible();

                const hasBlueHeroBackground = await heroTitle.evaluate(
                    (titleElement, targetBlue) => {
                        let currentElement = titleElement;

                        while (currentElement) {
                            if (getComputedStyle(currentElement).backgroundColor === targetBlue) {
                                return true;
                            }

                            currentElement = currentElement.parentElement;
                        }

                        return false;
                    },
                    TARGET_BLUE,
                );

                expect(hasBlueHeroBackground).toBe(true);
                await expect(page.locator('img[alt="Mascote do Soujunior"]')).toBeVisible();
            });

            test('Deve exibir os 11 cards de Áreas de Atuação com o azul principal', async ({ page }) => {
                const areasTitle = page.getByRole('heading', {
                    name: 'Áreas de atuação',
                });

                await areasTitle.scrollIntoViewIfNeeded();
                await expect(areasTitle).toBeVisible();

                const areaCards = page.locator('a[href^="/area/"]');

                await expect(areaCards).toHaveCount(11);

                const allCardsHaveBlueBackground = await areaCards.evaluateAll(
                    (links, targetBlue) =>
                        links.every((link) =>
                            Array.from(link.children).some(
                                (child) => getComputedStyle(child).backgroundColor === targetBlue,
                            ),
                        ),
                    TARGET_BLUE,
                );

                expect(allCardsHaveBlueBackground).toBe(true);
            });

            test('Deve exibir os cards de Depoimentos com o azul principal', async ({ page }) => {
                const testimonialsSection = page.locator('[aria-label="Depoimentos"]');

                await testimonialsSection.scrollIntoViewIfNeeded();
                await expect(testimonialsSection).toBeVisible();

                const testimonialCards = testimonialsSection.locator('article');

                await expect(testimonialCards).toHaveCount(8);

                const allTestimonialsHaveBlueBackground =
                    await testimonialCards.evaluateAll(
                        (cards, targetBlue) =>
                            cards.every(
                                (card) => getComputedStyle(card).backgroundColor === targetBlue,
                            ),
                        TARGET_BLUE,
                    );

                expect(allTestimonialsHaveBlueBackground).toBe(true);
            });
        });
    }
});
