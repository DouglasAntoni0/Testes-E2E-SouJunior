import { test, expect } from '@playwright/test';

test.describe('Seção Seja um Apoiador', () => {

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto('/');
    });

    test('Deve validar a exibição inicial e o comportamento de scroll do mascote flutuante', async ({ page }) => {
        const mascote = page.locator('img[src*="btn-suporter"]');

        await expect(mascote).toBeVisible();

        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(300);
        await expect(mascote).toBeVisible();

        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(300);
        await expect(mascote).toBeVisible();

        await page.locator('div#seja-um-apoiador').scrollIntoViewIfNeeded();
        await expect(mascote).toBeVisible();
    });

    test('Deve validar a presença da seção, os textos explicativos e o ícone da mãozinha', async ({ page }) => {
        const section = page.locator('div#seja-um-apoiador');
        await section.scrollIntoViewIfNeeded();

        await expect(section.locator('h2', { hasText: 'Seja um apoiador!' })).toBeVisible();

        await expect(section.locator('p', { hasText: 'Com o seu apoio, ampliamos as oportunidades para quem está dando os primeiros passos na área de tecnologia.' })).toBeVisible();

        const linkMaozinha = section.locator('a[href="/seja-um-apoiador"]').first();
        await expect(linkMaozinha).toBeVisible();
        await expect(linkMaozinha).toHaveAttribute('target', '_blank');
    });

    test.describe('Redirecionamento dos links', () => {

        // Bug documentado: o link do Header ainda não aponta para a rota esperada.
        test('Deve conter o link correto para redirecionamento externo no botão do Header', async ({ page }) => {
            const btnHeader = page.locator('a[aria-label="Navegar para a página Seja um Apoiador"]');

            await expect(btnHeader).toBeVisible();
            await expect(btnHeader).toHaveAttribute('href', '/seja-um-apoiador');
            await expect(btnHeader).toHaveAttribute('target', '_blank');
        });

        test('Deve redirecionar para link externo ao clicar na mãozinha com coração', async ({ page }) => {
            const linkMaozinha = page.locator('a', { has: page.locator('img[src*="icon-suporter"]') });

            await expect(linkMaozinha).toBeVisible();
            await expect(linkMaozinha).toHaveAttribute('href', '/seja-um-apoiador');
            await expect(linkMaozinha).toHaveAttribute('target', '_blank');
        });

        test('Deve redirecionar para link externo ao clicar no Mascote Flutuante', async ({ page }) => {
            const linkMascote = page.locator('a', { has: page.locator('img[src*="btn-suporter"]') });

            await expect(linkMascote).toBeVisible();
            await expect(linkMascote).toHaveAttribute('href', '/seja-um-apoiador');
            await expect(linkMascote).toHaveAttribute('target', '_blank');
        });
    });

    test.describe('Experiência mobile', () => {

        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto('/');
        });

        test('NÃO deve exibir o mascote flutuante na versão mobile', async ({ page }) => {
            const mascote = page.locator('img[src*="btn-suporter"]');
            await expect(mascote).toBeHidden();
        });

        test('Deve manter a seção de apoio e o botão Mãozinha visíveis no mobile', async ({ page }) => {
            const section = page.locator('div#seja-um-apoiador');
            await section.scrollIntoViewIfNeeded();

            await expect(section.locator('h2', { hasText: 'Seja um apoiador!' })).toBeVisible();
            await expect(page.locator('img[src*="icon-suporter"]')).toBeVisible();
        });
    });

});
