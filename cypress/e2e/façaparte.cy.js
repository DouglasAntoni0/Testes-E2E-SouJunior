describe('Papéis na SouJunior - seção da comunidade', () => {

    beforeEach(() => {
        cy.visit('localhost:3000');
    });

    it('Deve apresentar os papéis da comunidade com seus textos de apoio', () => {

        cy.contains('h2', 'Faça você também parte da nossa comunidade!')
            .scrollIntoView()
            .should('be.visible');

        cy.contains('p', 'Na SouJunior, há diversas maneiras de participar:')
            .should('be.visible');

        cy.contains('p', 'Júnior').should('be.visible');
        cy.contains('p', 'Júnior executa tarefas do projeto enquanto aprende na prática e desenvolve habilidades, sempre sob orientação de mentores e heads').should('be.visible');

        cy.contains('p', 'Mentor').should('be.visible');
        cy.contains('p', 'Mentor orienta, tira dúvidas e apoia o crescimento dos juniores dentro de cada área de atuação.').should('be.visible');

        cy.contains('p', 'Head').should('be.visible');
        cy.contains('p', 'Head organiza e lidera equipes, toma decisões e garante que tudo funcione bem dentro do projeto.').should('be.visible');
    });

    it('Deve manter o botão "Participar" apontando para o Stars', () => {

        cy.contains('a', 'Participar')
            .scrollIntoView()
            .should('be.visible')
            .and('have.css', 'cursor', 'pointer')
            .and('have.attr', 'href', 'https://stars.soujunior.tech/')
            .and('have.attr', 'target', '_blank');

    });
});
