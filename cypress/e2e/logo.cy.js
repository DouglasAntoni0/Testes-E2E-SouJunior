const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { areasInternas } = require('../../shared/areas.data');
const { DESCRICAO_LOGO, largurasMobile } = require('../../shared/interface.data');
const { validarImagem, validarLimitesHorizontais } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Identidade visual: logo', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-LOG-001] Deve carregar a identidade da marca no cabeçalho e no rodapé', () => {
    validarImagem(inicio.cabecalho().findByRole('img', { name: DESCRICAO_LOGO, exact: true }));
    inicio
      .cabecalho()
      .findByRole('img', { name: DESCRICAO_LOGO, exact: true })
      .should('have.attr', 'src')
      .and('match', /\.svg(?:\?|$)/);
    inicio.rodape().scrollIntoView();
    validarImagem(inicio.rodape().findByRole('img', { name: DESCRICAO_LOGO, exact: true }));
  });

  it('[CT-LOG-002] Deve disponibilizar um favicon que possa ser carregado', () => {
    cy.get('head link[rel~="icon"]')
      .first()
      .should('have.attr', 'href')
      .then((endereco) => {
        expect(endereco).not.to.be.empty;
        cy.request(endereco).then((resposta) => {
          expect(resposta.status).to.eq(200);
          expect(resposta.headers['content-type']).to.include('image');
        });
      });
  });

  it('[CT-LOG-003] Deve usar a logo do cabeçalho como atalho para a Home', () => {
    inicio.abrir('/area/qa');
    inicio.logo('banner').click();
    cy.location('pathname').should('eq', '/');
    cy.get('#home-heading').should('be.visible');
  });

  it('[CT-LOG-004] Deve usar a logo do rodapé como atalho para a Home', () => {
    inicio.abrir('/area/qa');
    inicio.logo('contentinfo').click();
    cy.location('pathname').should('eq', '/');
    cy.get('#home-heading').should('be.visible');
  });

  areasInternas.forEach((area) => {
    it('[CT-LOG-005] Deve aplicar a marca na página de ' + area.titulo, () => {
      inicio.abrir(area.rota);
      validarImagem(inicio.cabecalho().findByRole('img', { name: DESCRICAO_LOGO, exact: true }));
      inicio.rodape().scrollIntoView();
      validarImagem(inicio.rodape().findByRole('img', { name: DESCRICAO_LOGO, exact: true }));
    });
  });

  it('[CT-LOG-006] Deve manter as logos acessíveis nas larguras mobile', () => {
    largurasMobile.forEach((largura) => {
      cy.viewport(largura, 812);
      validarImagem(inicio.cabecalho().findByRole('img', { name: DESCRICAO_LOGO, exact: true }));
      validarLimitesHorizontais(
        inicio.cabecalho().findByRole('img', { name: DESCRICAO_LOGO, exact: true }),
      );
      inicio.rodape().scrollIntoView();
      validarImagem(inicio.rodape().findByRole('img', { name: DESCRICAO_LOGO, exact: true }));
      validarLimitesHorizontais(
        inicio.rodape().findByRole('img', { name: DESCRICAO_LOGO, exact: true }),
      );
    });
  });
});
