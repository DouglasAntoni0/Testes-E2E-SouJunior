const { expect } = require('@playwright/test');

class LogoSection {
    constructor(page) {
        this.page = page;
        this.altTextLogo = 'Sou Junior - Logo da organização que impulsiona carreiras em tecnologia';
    }

    headerLogo() {
        return this.page.getByAltText(this.altTextLogo).first();
    }

    footerLogo() {
        return this.page.getByAltText(this.altTextLogo).last();
    }

    async shouldShowHeaderSvgAndFooterBase64() {
        await expect(this.headerLogo()).toBeVisible();
        await expect(this.headerLogo()).toHaveAttribute('src', /\.svg/);

        await expect(this.footerLogo()).toBeVisible();
        await expect(this.footerLogo()).toHaveAttribute('src', /data:image\/png;base64/);
    }

    async shouldHaveFavicon() {
        const favicon = this.page.locator('link[rel="icon"], link[rel="shortcut icon"]').first();

        await expect(favicon).toBeAttached();

        const href = await favicon.getAttribute('href');
        expect(href).toBeTruthy();
    }

    async shouldLinkHeaderAndFooterToHome() {
        const headerLink = this.headerLogo().locator('xpath=ancestor::a[1]');
        await expect(headerLink).toBeAttached();
        await expect(headerLink).toHaveAttribute('href', '/');

        // Bug documentado: a logo do Footer ainda precisa estar dentro de um link para a Home.
        await this.footerLogo().scrollIntoViewIfNeeded();
        const footerLink = this.footerLogo().locator('xpath=ancestor::a[1]');
        await expect(footerLink).toBeAttached();
        await expect(footerLink).toHaveAttribute('href', '/');
    }

    async shouldStayVisibleAcross(viewports) {
        for (const viewport of viewports) {
            await this.page.setViewportSize({ width: viewport.width, height: viewport.height });

            await expect(this.headerLogo()).toBeVisible();
            await expect(this.footerLogo()).toBeVisible();
        }
    }
}

module.exports = { LogoSection };
