const { expect } = require('@playwright/test');

class ColorPaletteSection {
    constructor(page, targetBlue = 'rgb(60, 126, 249)') {
        this.page = page;
        this.targetBlue = targetBlue;
    }

    async shouldShowBlueFooter() {
        const footer = this.page.locator('footer');

        await footer.scrollIntoViewIfNeeded();
        await expect(footer).toBeVisible();

        const footerWrapperColor = await footer.evaluate((footerElement) =>
            getComputedStyle(footerElement.parentElement).backgroundColor,
        );

        expect(footerWrapperColor).toBe(this.targetBlue);
    }

    async shouldShowBlueHero() {
        const heroTitle = this.page.getByRole('heading', {
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
            this.targetBlue,
        );

        expect(hasBlueHeroBackground).toBe(true);
        await expect(this.page.locator('img[alt="Mascote do Soujunior"]')).toBeVisible();
    }

    async shouldShowBlueAreaCards() {
        const areasTitle = this.page.getByRole('heading', {
            name: 'Áreas de atuação',
        });

        await areasTitle.scrollIntoViewIfNeeded();
        await expect(areasTitle).toBeVisible();

        const areaCards = this.page.locator('a[href^="/area/"]');

        await expect(areaCards).toHaveCount(11);

        const allCardsHaveBlueBackground = await areaCards.evaluateAll(
            (links, targetBlue) =>
                links.every((link) =>
                    Array.from(link.children).some(
                        (child) => getComputedStyle(child).backgroundColor === targetBlue,
                    ),
                ),
            this.targetBlue,
        );

        expect(allCardsHaveBlueBackground).toBe(true);
    }

    async shouldShowBlueTestimonials() {
        const testimonialsSection = this.page.locator('[aria-label="Depoimentos"]');

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
                this.targetBlue,
            );

        expect(allTestimonialsHaveBlueBackground).toBe(true);
    }
}

module.exports = { ColorPaletteSection };
