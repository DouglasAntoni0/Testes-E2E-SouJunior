describe('Navegação do Header - Scroll da Tela (Home)', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Deve rolar a página para "Sobre a SouJunior" ao clicar em "Sobre nós"', () => {
        cy.get('a[aria-label="Navegar para a página Sobre Nós"]').click();

        cy.get('section#sobre-nos')
            .should('exist')
            .and('be.visible');

        cy.window().its('scrollY').should('be.greaterThan', 0);
    });

    it('Deve rolar a página para "Nossas iniciativas" ao clicar no menu', () => {
        cy.get('a[aria-label="Navegar para a página Nossas Iniciativas"]').click();

        cy.get('section#nossas-iniciativas')
            .should('exist')
            .and('be.visible');

        cy.window().its('scrollY').should('be.greaterThan', 0);
    });

    describe('Validações Avançadas do Header - UI, Acessibilidade e Rede', () => {

        beforeEach(() => {
            cy.visit('/');
        });

        it('Deve lidar de forma graciosa com falha de rede ao tentar aceder a rota externa', () => {
            cy.intercept('GET', '**/stars.soujunior.tech/**', { forceNetworkError: true }).as('siteOffline');

            cy.get('nav[role="navigation"]').contains('Faça parte').click();
        });

        it('Deve colapsar os itens de menu e exibir o botão hambúrguer em ecrãs de telemóvel', () => {
            cy.viewport(390, 844);

            cy.get('a[aria-label="Navegar para a página Sobre Nós"]').should('not.be.visible');

            // NOTA: Este passo vai falhar intencionalmente até o bug ser corrigido!
            cy.get('button[aria-label="Abrir menu mobile"]')
                .should('exist')
                .and('be.visible');
        });

        it('Deve manter o cabeçalho visível no topo do ecrã após fazer scroll para o rodapé', () => {
            cy.scrollTo('bottom');

            cy.get('header[role="banner"]')
                .should('be.visible')
                .invoke('css', 'position')
                .should('match', /(fixed|sticky)/);
        });

        it('Deve ser possível navegar e focar nos itens do menu utilizando a tecla Tab', () => {
            cy.get('body').tab();

            cy.focused().should('have.attr', 'href', '/');

            cy.focused().tab();
            cy.focused().should('have.attr', 'aria-label', 'Navegar para a página Sobre Nós');

            cy.focused().tab();
            cy.focused().should('have.attr', 'aria-label', 'Navegar para a página Nossas Iniciativas');
        });

        it('Deve apresentar feedback visual (cor azul e sublinhado) ao passar o ponteiro do rato sobre um link', () => {
            cy.get('a[aria-label="Navegar para a página Sobre Nós"]').realHover();

            cy.get('a[aria-label="Navegar para a página Sobre Nós"]')
                .should('have.css', 'text-decoration')
                .and('include', 'underline');

            cy.get('a[aria-label="Navegar para a página Sobre Nós"]')
                .should('have.css', 'background-color')
                .and('not.match', /(rgba\(0, 0, 0, 0\)|transparent)/);
        });

    });

});