const { test } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { LogoSection } = require('./pages/LogoSection');

test.describe('Nova identidade visual - logo', () => {
    test.beforeEach(async ({ page }) => {
        const home = new HomePage(page);
        await home.visit('/');
    });

    test('Deve exibir a logo atual no Header em SVG e no Footer em base64', async ({ page }) => {
        const logo = new LogoSection(page);

        await logo.shouldShowHeaderSvgAndFooterBase64();
    });

    test('Deve manter um favicon configurado no documento', async ({ page }) => {
        const logo = new LogoSection(page);

        await logo.shouldHaveFavicon();
    });

    test('Deve documentar que as logos do Header e Footer precisam apontar para a Home', async ({ page }) => {
        const logo = new LogoSection(page);

        await logo.shouldLinkHeaderAndFooterToHome();
    });

    test('Deve manter a logo visível em desktop, tablet e mobile', async ({ page }) => {
        const logo = new LogoSection(page);
        const viewports = [
            { name: 'macbook-15', width: 1440, height: 900 },
            { name: 'ipad-2', width: 768, height: 1024 },
            { name: 'iphone-x', width: 375, height: 812 },
        ];

        await logo.shouldStayVisibleAcross(viewports);
    });
});
