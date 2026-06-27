const { HomePage } = require('../support/pages/HomePage');
const { LogoSection } = require('../support/pages/LogoSection');

const home = new HomePage();
const logo = new LogoSection();

describe('Nova identidade visual - logo', () => {
    beforeEach(() => {
        home.visit('/');
    });

    it('Deve exibir a logo atual no Header em SVG e no Footer em base64', () => {
        logo.shouldShowHeaderSvgAndFooterBase64();
    });

    it('Deve manter um favicon configurado no documento', () => {
        logo.shouldHaveFavicon();
    });

    it('Deve documentar que as logos do Header e Footer precisam apontar para a Home', () => {
        logo.shouldLinkHeaderAndFooterToHome();
    });

    it('Deve manter a logo visível em desktop, tablet e mobile', () => {
        const viewports = ['macbook-15', 'ipad-2', 'iphone-x'];

        logo.shouldStayVisibleAcross(viewports);
    });
});
