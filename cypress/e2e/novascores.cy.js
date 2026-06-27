const HOME_URL = 'http://localhost:3000/';
const TARGET_BLUE = 'rgb(60, 126, 249)';

const viewports = [
    { name: 'Desktop', width: 1366, height: 768 },
    { name: 'Mobile', width: 390, height: 844 },
];

const backgroundColorOf = (element) =>
    element.ownerDocument.defaultView.getComputedStyle(element).backgroundColor;

describe('Nova identidade visual - cores aprovadas', () => {
    viewports.forEach(({ name, width, height }) => {
        describe(`${name}`, () => {
            beforeEach(() => {
                cy.viewport(width, height);
                cy.visit(HOME_URL);
            });

            it('Deve exibir o Footer com o azul principal da marca', () => {
                cy.get('footer').scrollIntoView().should('be.visible');

                cy.get('footer')
                    .parent()
                    .then(($footerWrapper) => {
                        expect(backgroundColorOf($footerWrapper[0])).to.eq(TARGET_BLUE);
                    });
            });

            it('Deve exibir a seção Hero com o azul principal da marca', () => {
                cy.contains('h1', 'Transformando potencial em experiência real.')
                    .should('be.visible')
                    .then(($title) => {
                        const heroWithBlueBackground = $title
                            .parents()
                            .toArray()
                            .find((element) => backgroundColorOf(element) === TARGET_BLUE);

                        expect(heroWithBlueBackground).to.exist;
                    });

                cy.get('img[alt="Mascote do Soujunior"]').should('be.visible');
            });

            it('Deve exibir os 11 cards de Áreas de Atuação com o azul principal', () => {
                cy.contains('Áreas de atuação').scrollIntoView().should('be.visible');

                cy.get('a[href^="/area/"]').should('have.length', 11);

                cy.get('a[href^="/area/"]').each(($link) => {
                    const cardWithBlueBackground = Array.from($link[0].children).find(
                        (element) => backgroundColorOf(element) === TARGET_BLUE,
                    );

                    expect(cardWithBlueBackground, $link.text().trim()).to.exist;
                    expect(backgroundColorOf(cardWithBlueBackground)).to.eq(TARGET_BLUE);
                });
            });

            it('Deve exibir os cards de Depoimentos com o azul principal', () => {
                cy.get('[aria-label="Depoimentos"]')
                    .scrollIntoView()
                    .should('be.visible')
                    .within(() => {
                        cy.get('article').should('have.length', 8);

                        cy.get('article').each(($card) => {
                            expect(backgroundColorOf($card[0])).to.eq(TARGET_BLUE);
                        });
                    });
            });
        });
    });
});
