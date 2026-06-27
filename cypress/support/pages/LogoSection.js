class LogoSection {
  constructor() {
    this.altTextLogo = 'Sou Junior - Logo da organização que impulsiona carreiras em tecnologia';
    this.logoImgSelector = `img[alt="${this.altTextLogo}"]`;
  }

  headerLogo() {
    return cy.get(this.logoImgSelector).first();
  }

  footerLogo() {
    return cy.get(this.logoImgSelector).last();
  }

  shouldShowHeaderSvgAndFooterBase64() {
    this.headerLogo()
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', '.svg');

    this.footerLogo()
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'data:image/png;base64');
  }

  shouldHaveFavicon() {
    cy.document()
      .its('head')
      .find('link[rel="icon"], link[rel="shortcut icon"]')
      .should('have.attr', 'href')
      .and('not.be.empty');
  }

  shouldLinkHeaderAndFooterToHome() {
    this.headerLogo()
      .closest('a')
      .should('exist')
      .and('have.attr', 'href', '/');

    // Bug documentado: a logo do Footer ainda precisa estar dentro de um link para a Home.
    this.footerLogo()
      .scrollIntoView()
      .closest('a')
      .should('exist')
      .and('have.attr', 'href', '/');
  }

  shouldStayVisibleAcross(viewports) {
    viewports.forEach((size) => {
      cy.viewport(size);

      this.headerLogo().should('be.visible');
      this.footerLogo().should('be.visible');
    });
  }
}

module.exports = { LogoSection };
