describe('Nova identidade visual - logo', () => {
    const altTextLogo = 'Sou Junior - Logo da organização que impulsiona carreiras em tecnologia';
    const logoImgSelector = `img[alt="${altTextLogo}"]`;

    beforeEach(() => {
        cy.visit('/');
    });

    it('Deve exibir a logo atual no Header em SVG e no Footer em base64', () => {
        cy.get(logoImgSelector).first()
            .should('be.visible')
            .and('have.attr', 'src')
            .and('include', '.svg');

        cy.get(logoImgSelector).last()
            .should('be.visible')
            .and('have.attr', 'src')
            .and('include', 'data:image/png;base64');
    });

    it('Deve manter um favicon configurado no documento', () => {
        cy.document()
            .its('head')
            .find('link[rel="icon"], link[rel="shortcut icon"]')
            .should('have.attr', 'href')
            .and('not.be.empty');
    });

    it('Deve documentar que as logos do Header e Footer precisam apontar para a Home', () => {
        cy.get(logoImgSelector).first()
            .closest('a')
            .should('exist')
            .and('have.attr', 'href', '/');

        // Bug documentado: a logo do Footer ainda precisa estar dentro de um link para a Home.
        cy.get(logoImgSelector).last()
            .scrollIntoView()
            .closest('a')
            .should('exist')
            .and('have.attr', 'href', '/');
    });

    it('Deve manter a logo visível em desktop, tablet e mobile', () => {
        const viewports = ['macbook-15', 'ipad-2', 'iphone-x'];

        viewports.forEach((size) => {
            cy.viewport(size);

            cy.get(logoImgSelector).first().should('be.visible');
            cy.get(logoImgSelector).last().should('be.visible');
        });
    });
});
