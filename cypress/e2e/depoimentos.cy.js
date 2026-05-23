describe('Seção de Depoimentos', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  const validarCard = (dados) => {
    cy.get('#depoimentos').contains('p', dados.nome).parent().parent().within(() => {
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
  };

  it('Deve exibir a estrutura base e títulos da seção', () => {
    cy.get('#depoimentos').should('be.visible');
    cy.contains('p', 'O que falam sobre a SouJunior').should('be.visible');
  });

  it('Deve validar a integridade de todos os dados nos cards e a transição de páginas', () => {

    const pagina1 = [
      { nome: 'Priscilla Souza', cargo: 'UI & UX Designer', fotoAlt: 'Priscilla Souza', inicioTexto: 'Oi, sou a Priscila', fimTexto: 'trocar muitas experiências.' },
      { nome: 'Anderson Nunes', cargo: 'Front-end', fotoAlt: 'Anderson Nunes', inicioTexto: 'Fui voluntário na Sou Junior', fimTexto: 'meu "sim" chegou.' },
      { nome: 'Caique Fonseca', cargo: 'UI & UX Designer', fotoAlt: 'Caique Fonseca', inicioTexto: 'Ambientes controlados, como salas', fimTexto: 'aberta para todos.' }
    ];

    const pagina2 = [
      { nome: 'Ana Santos', cargo: 'Front-end', fotoAlt: 'Ana Santos', inicioTexto: 'Atuar como Dev Front-end', fimTexto: 'imersivos como esse.' },
      { nome: 'Anna Claudia Andrade', cargo: 'UI & UX Designer', fotoAlt: 'Anna Claudia Andrade', inicioTexto: 'A SouJunior está me proporcionando', fimTexto: 'sendo construído.' },
      { nome: 'Priscylla A. Ribeiro', cargo: 'Mentora UI & UX Designer', fotoAlt: 'Priscylla A. Ribeiro', inicioTexto: 'A Sou Junior me desafia', fimTexto: 'compromisso com o trabalho' }
    ];

    const pagina3 = [
      { nome: 'Talita Bitencourt', cargo: 'APM', fotoAlt: 'Talita Bitencourt', inicioTexto: 'Para mim, a teoria', fimTexto: 'aprendizado muito mais efetivo.' },
      { nome: 'Eduardo Bezerra', cargo: 'UI & UX Designer', fotoAlt: 'Eduardo Bezerra', inicioTexto: 'É uma honra poder', fimTexto: 'graças a Sou Junior.' }
    ];

    pagina1.forEach(validarCard);

    cy.get('#depoimentos button[aria-label="Ver próximo item"]').click();
    pagina2.forEach(validarCard);

    cy.get('#depoimentos button[aria-label="Ver próximo item"]').click();
    pagina3.forEach(validarCard);

    cy.get('#depoimentos button[aria-label="Ver item anterior"]').click();
    cy.get('#depoimentos').contains('p', 'Ana Santos').should('be.visible');
  });

  it('Deve validar o estado habilitado/desabilitado das setas através de navegação automatizada', () => {
    cy.get('#depoimentos').within(() => {

      cy.get('button[aria-label="Ver item anterior"]').should('be.disabled');
      cy.get('button[aria-label="Ver próximo item"]').should('not.be.disabled');

      const clicarAteOFinal = () => {
        cy.get('button[aria-label="Ver próximo item"]').then(($btn) => {
          if ($btn.is(':disabled')) {
            return;
          } else {
            cy.wrap($btn).click();
            cy.wait(800); // Aguarda a animação de rolagem do carrossel
            clicarAteOFinal();
          }
        });
      };

      clicarAteOFinal();

      cy.get('button[aria-label="Ver próximo item"]').should('be.disabled');
      cy.get('button[aria-label="Ver item anterior"]').should('not.be.disabled');
    });
  });
});