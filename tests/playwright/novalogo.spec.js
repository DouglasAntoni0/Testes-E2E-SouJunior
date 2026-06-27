import { test, expect } from '@playwright/test';

test.describe('Nova identidade visual - logo', () => {
    const altTextLogo = 'Sou Junior - Logo da organização que impulsiona carreiras em tecnologia';

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Deve exibir a logo atual no Header em SVG e no Footer em base64', async ({ page }) => {
        const headerLogo = page.getByAltText(altTextLogo).first();
        const footerLogo = page.getByAltText(altTextLogo).last();

        await expect(headerLogo).toBeVisible();
        await expect(headerLogo).toHaveAttribute('src', /\.svg/);

        await expect(footerLogo).toBeVisible();
        await expect(footerLogo).toHaveAttribute('src', /data:image\/png;base64/);
    });

    test('Deve manter um favicon configurado no documento', async ({ page }) => {
        const favicon = page.locator('link[rel="icon"], link[rel="shortcut icon"]').first();

        await expect(favicon).toBeAttached();

        const href = await favicon.getAttribute('href');
        expect(href).toBeTruthy();
    });

    test('Deve documentar que as logos do Header e Footer precisam apontar para a Home', async ({ page }) => {
        const headerLogo = page.getByAltText(altTextLogo).first();
        const footerLogo = page.getByAltText(altTextLogo).last();

        const headerLink = headerLogo.locator('xpath=ancestor::a[1]');
        await expect(headerLink).toBeAttached();
        await expect(headerLink).toHaveAttribute('href', '/');

        // Bug documentado: a logo do Footer ainda precisa estar dentro de um link para a Home.
        await footerLogo.scrollIntoViewIfNeeded();
        const footerLink = footerLogo.locator('xpath=ancestor::a[1]');
        await expect(footerLink).toBeAttached();
        await expect(footerLink).toHaveAttribute('href', '/');
    });

    test('Deve manter a logo visível em desktop, tablet e mobile', async ({ page }) => {
        const headerLogo = page.getByAltText(altTextLogo).first();
        const footerLogo = page.getByAltText(altTextLogo).last();

        const viewports = [
            { name: 'macbook-15', width: 1440, height: 900 },
            { name: 'ipad-2', width: 768, height: 1024 },
            { name: 'iphone-x', width: 375, height: 812 },
        ];

        for (const viewport of viewports) {
            await page.setViewportSize({ width: viewport.width, height: viewport.height });

            await expect(headerLogo).toBeVisible();
            await expect(footerLogo).toBeVisible();
        }
    });
});
