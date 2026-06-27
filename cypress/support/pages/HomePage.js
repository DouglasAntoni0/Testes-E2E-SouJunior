class HomePage {
  visit(path = '/') {
    cy.visit(path);
  }

  scrollToSection(selector) {
    cy.get(selector).scrollIntoView().should('be.visible');
  }
}

module.exports = { HomePage };
