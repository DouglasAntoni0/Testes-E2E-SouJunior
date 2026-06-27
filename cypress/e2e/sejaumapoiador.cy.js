describe('Seção Seja um Apoiador', () => {

    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit('/');
    });

    it('Deve validar a exibição inicial e o comportamento de scroll do mascote flutuante', () => {
        const mascote = 'img[alt="Seja um apoiador"]';

        cy.get(mascote).should('be.visible');

        cy.scrollTo(0, 500);
        cy.wait(300);
        cy.get(mascote).should('be.visible');

        cy.scrollTo('top');
        cy.wait(300);
        cy.get(mascote).should('be.visible');

        cy.get('div#seja-um-apoiador').scrollIntoView();
        cy.get(mascote).should('be.visible');
    });

    it('Deve validar a presença da seção, os textos explicativos e o ícone da mãozinha', () => {
        cy.get('div#seja-um-apoiador').scrollIntoView();

        cy.contains('div#seja-um-apoiador h2', 'Seja um apoiador!')
            .should('be.visible');

        cy.contains('div#seja-um-apoiador p', 'Com o seu apoio, ampliamos as oportunidades para quem está dando os primeiros passos na área de tecnologia.')
            .should('be.visible');

        cy.get('div#seja-um-apoiador a[href="/seja-um-apoiador"]')
            .should('be.visible')
            .and('have.attr', 'target', '_blank');
    });

    describe('Redirecionamento dos links', () => {

        it('Deve conter o link correto para redirecionamento externo no botão do Header', () => {
            cy.get('a[aria-label="Navegar para a página Seja um Apoiador"]')
                .should('be.visible')
                .and('have.attr', 'href', '/seja-um-apoiador')
                .and('have.attr', 'target', '_blank');
        });

        it('Deve redirecionar para link externo ao clicar na mãozinha com coração', () => {
            cy.get('img[src*="icon-suporter"]')
                .should('be.visible')
                .closest('a')
                .should('have.attr', 'href', '/seja-um-apoiador')
                .and('have.attr', 'target', '_blank');
        });

        it('Deve redirecionar para link externo ao clicar no Mascote Flutuante', () => {
            cy.get('img[src*="btn-suporter"]')
                .should('be.visible')
                .closest('a')
                .should('have.attr', 'href', '/seja-um-apoiador')
                .and('have.attr', 'target', '_blank');
        });
    });

    describe('Experiência mobile', () => {

        beforeEach(() => {
            cy.viewport('iphone-x');
            cy.visit('/');
        });

        it('NÃO deve exibir o mascote flutuante na versão mobile', () => {
            cy.get('img[src*="btn-suporter"]').should('not.be.visible');
        });

        it('Deve manter a seção de apoio e o botão Mãozinha visíveis no mobile', () => {
            cy.get('div#seja-um-apoiador').scrollIntoView();

            cy.contains('div#seja-um-apoiador h2', 'Seja um apoiador!').should('be.visible');
            cy.get('img[src*="icon-suporter"]').should('be.visible');
        });
    });

});
