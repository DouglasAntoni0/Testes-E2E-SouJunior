const { expect } = require('@playwright/test');

class DepoimentosSection {
    constructor(page) {
        this.page = page;
        this.root = page.locator('#depoimentos');
        this.previousButton = page.locator('#depoimentos button[aria-label="Ver item anterior"]');
        this.nextButton = page.locator('#depoimentos button[aria-label="Ver próximo item"]');
    }

    cardByName(name) {
        return this.root.locator(`p:has-text("${name}")`).locator('..').locator('..');
    }

    async shouldShowBaseStructure() {
        await expect(this.root).toBeVisible();
        await expect(this.page.locator('p:has-text("O que falam sobre a SouJunior")')).toBeVisible();
    }

    async shouldShowCard(dados) {
        const card = this.cardByName(dados.nome);

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
    }

    async shouldShowCards(cards) {
        for (const card of cards) {
            await this.shouldShowCard(card);
        }
    }

    async goToNextPage() {
        await this.nextButton.click();
    }

    async goToPreviousPage() {
        await this.previousButton.click();
    }

    async shouldShowPerson(name) {
        await expect(this.root.locator(`p:has-text("${name}")`).first()).toBeVisible();
    }

    async shouldStartWithExpectedArrowState() {
        await expect(this.previousButton).toBeDisabled();
        await expect(this.nextButton).toBeEnabled();
    }

    async clickNextUntilTheEnd() {
        while (await this.nextButton.isEnabled()) {
            await this.nextButton.click();
            await this.page.waitForTimeout(800); // Aguarda a rolagem do carrossel estabilizar.
        }
    }

    async shouldFinishWithExpectedArrowState() {
        await expect(this.nextButton).toBeDisabled();
        await expect(this.previousButton).toBeEnabled();
    }
}

module.exports = { DepoimentosSection };
