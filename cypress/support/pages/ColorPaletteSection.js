class ColorPaletteSection {
  constructor(targetBlue = 'rgb(60, 126, 249)') {
    this.targetBlue = targetBlue;
  }

  backgroundColorOf(element) {
    return element.ownerDocument.defaultView.getComputedStyle(element).backgroundColor;
  }

  shouldShowBlueFooter() {
    cy.get('footer').scrollIntoView().should('be.visible');

    cy.get('footer')
      .parent()
      .then(($footerWrapper) => {
        expect(this.backgroundColorOf($footerWrapper[0])).to.eq(this.targetBlue);
      });
  }

  shouldShowBlueHero() {
    cy.contains('h1', 'Transformando potencial em experiência real.')
      .should('be.visible')
      .then(($title) => {
        const heroWithBlueBackground = $title
          .parents()
          .toArray()
          .find((element) => this.backgroundColorOf(element) === this.targetBlue);

        expect(heroWithBlueBackground).to.exist;
      });

    cy.get('img[alt="Mascote do Soujunior"]').should('be.visible');
  }

  shouldShowBlueAreaCards() {
    cy.contains('Áreas de atuação').scrollIntoView().should('be.visible');

    cy.get('a[href^="/area/"]').should('have.length', 11);

    cy.get('a[href^="/area/"]').each(($link) => {
      const cardWithBlueBackground = Array.from($link[0].children).find(
        (element) => this.backgroundColorOf(element) === this.targetBlue,
      );

      expect(cardWithBlueBackground, $link.text().trim()).to.exist;
      expect(this.backgroundColorOf(cardWithBlueBackground)).to.eq(this.targetBlue);
    });
  }

  shouldShowBlueTestimonials() {
    cy.get('[aria-label="Depoimentos"]')
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.get('article').should('have.length', 8);

        cy.get('article').each(($card) => {
          expect(this.backgroundColorOf($card[0])).to.eq(this.targetBlue);
        });
      });
  }
}

module.exports = { ColorPaletteSection };
