class FaqSection {
  scrollToSection() {
    cy.contains('h2', 'Perguntas Frequentes').scrollIntoView();
  }

  selectTab(tabName) {
    cy.contains('button', tabName).click();
  }

  question(questionText) {
    return cy.contains(questionText).parent();
  }

  arrow(questionText) {
    return this.question(questionText).find('img[src*="arrow"]');
  }

  openQuestion(questionText) {
    cy.contains(questionText).should('be.visible');
    this.arrow(questionText).click();
  }

  shouldShowOpenQuestion(item) {
    this.openQuestion(item.pergunta);

    this.arrow(item.pergunta)
      .should('have.attr', 'style')
      .and('include', 'rotate(180deg)');

    this.question(item.pergunta).should('have.attr', 'aria-expanded', 'true');
    cy.contains(item.resposta).should('be.visible');
  }

  shouldShowOpenQuestions(items) {
    items.forEach((item) => this.shouldShowOpenQuestion(item));
  }

  shouldShowOuvidoriaLink() {
    cy.contains('p', 'Não encontrou a sua dúvida?')
      .scrollIntoView()
      .should('be.visible');

    cy.contains('a', 'Pergunte aqui!')
      .should('be.visible')
      .and('have.attr', 'href', '/FAQ')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');
  }

  shouldShowMobileTabs() {
    cy.contains('button', 'Instituição').should('be.visible');
    cy.contains('button', 'Voluntário').should('be.visible');
    cy.contains('button', 'Mentor | Head | Apoiador').should('be.visible');
  }
}

module.exports = { FaqSection };
