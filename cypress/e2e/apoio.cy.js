const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { CAMINHO_APOIO } = require('../../shared/interface.data');
const {
  validarImagem,
  validarLinkExterno,
  validarLimitesHorizontais,
  validarSemRolagemHorizontal,
} = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Apoio, mascote e faixa mobile', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-APO-001] Deve apresentar a proposta da seção de apoio', () => {
    inicio
      .apoio()
      .findByRole('heading', { name: 'Seja um Apoiador!', exact: true })
      .should('be.visible');
    inicio
      .apoio()
      .findByText(
        'Com o seu apoio, ampliamos as oportunidades para quem está dando os primeiros passos na área de tecnologia.',
        { exact: true },
      )
      .should('be.visible');
    validarImagem(
      inicio
        .apoio()
        .find('a:not(:has(img[alt="Coração"]))')
        .findByRole('img', { name: 'Seja um apoiador', exact: true }),
    );
  });

  it('[CT-APO-002] Deve oferecer o acesso à página de apoio pela mão com coração', () => {
    validarLinkExterno(inicio.apoio().find('a:not(:has(img[alt="Coração"]))'), CAMINHO_APOIO);
  });

  it('[CT-APO-003] Deve acompanhar a rolagem com o mascote no desktop', () => {
    inicio.controleDeApoio().should('have.css', 'position', 'fixed');
    inicio.sobre().scrollIntoView();
    inicio.controleDeApoio().should('be.visible').and('have.css', 'position', 'fixed');
    inicio.controleDeApoio().find('img[alt="Seja um apoiador"]').should('be.visible');
  });

  it('[CT-APO-004] Deve vincular o mascote à seção de apoio ao alcançá-la', () => {
    inicio.apoio().scrollIntoView();
    cy.findByRole('heading', { name: 'Perguntas Frequentes', exact: true }).scrollIntoView();
    inicio.controleDeApoio().should('have.css', 'position', 'absolute');
  });

  it('[CT-APO-005] Deve retomar o mascote flutuante ao voltar para o topo', () => {
    cy.findByRole('heading', { name: 'Perguntas Frequentes', exact: true }).scrollIntoView();
    inicio.controleDeApoio().should('have.css', 'position', 'absolute');
    cy.get('#home-heading').scrollIntoView();
    inicio.controleDeApoio().should('be.visible').and('have.css', 'position', 'fixed');
  });

  it('[CT-APO-006] Deve preservar o destino do mascote nos dois estados', () => {
    validarLinkExterno(inicio.controleDeApoio(), CAMINHO_APOIO);
    cy.findByRole('heading', { name: 'Perguntas Frequentes', exact: true }).scrollIntoView();
    inicio.controleDeApoio().should('have.css', 'position', 'absolute');
    validarLinkExterno(inicio.controleDeApoio(), CAMINHO_APOIO);
  });

  it('[CT-APO-007] Deve substituir o mascote pela faixa inferior no celular', () => {
    cy.viewport(375, 812);
    inicio
      .controleDeApoio()
      .should('have.css', 'position', 'fixed')
      .and('have.css', 'bottom', '0px');
    inicio.controleDeApoio().findByText('Seja um Apoiador', { exact: true }).should('be.visible');
    inicio.controleDeApoio().findByAltText('Coração', { exact: true }).should('be.visible');
    inicio.controleDeApoio().find('img[alt="Seja um apoiador"]').should('not.be.visible');
  });

  it('[CT-APO-008] Deve vincular a faixa à seção de apoio no mobile', () => {
    cy.viewport(375, 812);
    cy.findByRole('heading', { name: 'Perguntas Frequentes', exact: true }).scrollIntoView();
    inicio.controleDeApoio().should('have.css', 'position', 'absolute');
  });

  it('[CT-APO-009] Deve trazer a faixa de volta ao subir a página', () => {
    cy.viewport(375, 812);
    cy.findByRole('heading', { name: 'Perguntas Frequentes', exact: true }).scrollIntoView();
    inicio.controleDeApoio().should('have.css', 'position', 'absolute');
    inicio
      .sobre()
      .findByRole('heading', { name: 'Sobre a SouJunior', exact: true })
      .scrollIntoView();
    inicio.controleDeApoio().should('be.visible').and('have.css', 'position', 'fixed');
    validarLimitesHorizontais(inicio.controleDeApoio());
  });

  it('[CT-APO-010] Deve mostrar somente a apresentação adequada ao dispositivo', () => {
    inicio.controleDeApoio().find('img[alt="Seja um apoiador"]').should('be.visible');
    inicio
      .controleDeApoio()
      .findByText('Seja um Apoiador', { exact: true })
      .should('not.be.visible');
    cy.viewport(375, 812);
    inicio.controleDeApoio().find('img[alt="Seja um apoiador"]').should('not.be.visible');
    inicio.controleDeApoio().findByText('Seja um Apoiador', { exact: true }).should('be.visible');
  });

  it('[CT-APO-011] Deve ocupar toda a largura útil com a faixa mobile', () => {
    cy.viewport(375, 812);
    inicio
      .controleDeApoio()
      .should('be.visible')
      .should(($faixa) => {
        const caixa = $faixa[0].getBoundingClientRect();
        expect(Math.abs(caixa.left)).to.be.at.most(1);
        expect(Math.abs(caixa.width - 375)).to.be.at.most(1);
      });
    validarSemRolagemHorizontal();
  });

  it('[CT-APO-012] Deve centralizar o conjunto de texto e coração na faixa', () => {
    cy.viewport(375, 812);
    inicio
      .controleDeApoio()
      .should('be.visible')
      .should(($faixa) => {
        const caixa = $faixa[0].getBoundingClientRect();
        const texto = $faixa.find('p')[0].getBoundingClientRect();
        const coracao = $faixa.find('img[alt="Coração"]')[0].getBoundingClientRect();
        const centroDoConteudo = (texto.left + coracao.right) / 2;
        expect(Math.abs(centroDoConteudo - (caixa.left + caixa.width / 2))).to.be.at.most(8);
      });
    validarLimitesHorizontais(inicio.controleDeApoio());
  });

  it('[CT-APO-013] Deve preservar o acesso ao apoio na faixa móvel e vinculada', () => {
    cy.viewport(375, 812);
    validarLinkExterno(inicio.controleDeApoio(), CAMINHO_APOIO);
    cy.findByRole('heading', { name: 'Perguntas Frequentes', exact: true }).scrollIntoView();
    inicio.controleDeApoio().should('have.css', 'position', 'absolute');
    validarLinkExterno(inicio.controleDeApoio(), CAMINHO_APOIO);
  });
});
