describe('Papeis na SouJunior - Validação da Seção da Comunidade', () => {

    beforeEach(() => {
        cy.visit('localhost:3000');
    });

    it('CT-001: Deve validar a exibição e os textos dos papéis na seção', () => {

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

    it('CT-002: Deve validar o link e o redirecionamento do botão "Participar"', () => {

        cy.contains('a', 'Participar')
            .scrollIntoView()
            .should('be.visible')
            .and('have.css', 'cursor', 'pointer')
            .and('have.attr', 'href', 'https://stars.soujunior.tech/')
            .and('have.attr', 'target', '_blank');

    });
});
