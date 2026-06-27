class DepoimentosSection {
  constructor() {
    this.rootSelector = '#depoimentos';
    this.previousButtonSelector = 'button[aria-label="Ver item anterior"]';
    this.nextButtonSelector = 'button[aria-label="Ver próximo item"]';
  }

  root() {
    return cy.get(this.rootSelector);
  }

  nextButton() {
    return cy.get(`${this.rootSelector} ${this.nextButtonSelector}`);
  }

  previousButton() {
    return cy.get(`${this.rootSelector} ${this.previousButtonSelector}`);
  }

  shouldShowBaseStructure() {
    this.root().should('be.visible');
    cy.contains('p', 'O que falam sobre a SouJunior').should('be.visible');
  }

  shouldShowCard(dados) {
    this.root().contains('p', dados.nome).parent().parent().within(() => {
      cy.contains('p', dados.nome).should('be.visible');
      cy.contains('p', dados.cargo).should('be.visible');

      cy.get(`img[alt="${dados.fotoAlt}"]`)
        .should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });

      cy.get('article p')
        .should('be.visible')
        .invoke('text')
        .and('include', dados.inicioTexto)
        .and('include', dados.fimTexto);
    });
  }

  shouldShowCards(cards) {
    cards.forEach((card) => this.shouldShowCard(card));
  }

  goToNextPage() {
    this.nextButton().click();
  }

  goToPreviousPage() {
    this.previousButton().click();
  }

  shouldShowPerson(name) {
    this.root().contains('p', name).should('be.visible');
  }

  shouldStartWithExpectedArrowState() {
    this.root().within(() => {
      cy.get(this.previousButtonSelector).should('be.disabled');
      cy.get(this.nextButtonSelector).should('not.be.disabled');
    });
  }

  clickNextUntilTheEnd() {
    this.root().within(() => {
      const clicarAteOFinal = () => {
        cy.get(this.nextButtonSelector).then(($btn) => {
          if ($btn.is(':disabled')) {
            return;
          }

          cy.wrap($btn).click();
          cy.wait(800); // Aguarda a rolagem do carrossel estabilizar.
          clicarAteOFinal();
        });
      };

      clicarAteOFinal();
    });
  }

  shouldFinishWithExpectedArrowState() {
    this.root().within(() => {
      cy.get(this.nextButtonSelector).should('be.disabled');
      cy.get(this.previousButtonSelector).should('not.be.disabled');
    });
  }
}

module.exports = { DepoimentosSection };
