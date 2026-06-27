const { expect } = require('@playwright/test');

class FaqSection {
    constructor(page) {
        this.page = page;
    }

    async scrollToSection() {
        await this.page.getByRole('heading', { name: 'Perguntas Frequentes' }).scrollIntoViewIfNeeded();
    }

    async selectTab(tabName) {
        await this.page.getByRole('button', { name: tabName, exact: true }).click();
    }

    question(questionText, options = {}) {
        return this.page.getByText(questionText, options).locator('..');
    }

    arrow(questionText, options = {}) {
        return this.question(questionText, options).locator('img[src*="arrow"]');
    }

    async openQuestion(questionText, options = {}) {
        const question = this.page.getByText(questionText, options);
        await expect(question).toBeVisible();
        await this.arrow(questionText, options).click();
    }

    async shouldShowOpenQuestion(item) {
        await this.openQuestion(item.pergunta, { exact: true });

        const linhaPai = this.question(item.pergunta, { exact: true });
        const setaIcone = this.arrow(item.pergunta, { exact: true });

        await expect(setaIcone).toHaveAttribute('style', /rotate\(180deg\)/);
        await expect(linhaPai).toHaveAttribute('aria-expanded', 'true');
        await expect(this.page.getByText(item.resposta)).toBeVisible();
    }

    async shouldShowOpenQuestions(items) {
        for (const item of items) {
            await this.shouldShowOpenQuestion(item);
        }
    }

    async shouldShowOuvidoriaLink() {
        const textoOuvidoria = this.page.getByText('Não encontrou a sua dúvida?');
        await textoOuvidoria.scrollIntoViewIfNeeded();
        await expect(textoOuvidoria).toBeVisible();

        const linkOuvidoria = this.page.getByRole('link', { name: 'Pergunte aqui!' });
        await expect(linkOuvidoria).toBeVisible();
        await expect(linkOuvidoria).toHaveAttribute('href', '/FAQ');
        await expect(linkOuvidoria).toHaveAttribute('target', '_blank');
        await expect(linkOuvidoria).toHaveAttribute('rel', 'noopener noreferrer');
    }

    async shouldShowMobileTabs() {
        await expect(this.page.getByRole('button', { name: 'Instituição', exact: true })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Voluntário', exact: true })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Mentor | Head | Apoiador', exact: true })).toBeVisible();
    }
}

module.exports = { FaqSection };
