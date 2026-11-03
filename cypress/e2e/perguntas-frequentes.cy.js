const { PaginaInicial } = require('../support/pages/PaginaInicial');
const { SecaoFaq } = require('../support/pages/SecaoFaq');
const { categorias } = require('../../shared/faq.data');
const { validarLinkExterno, validarLimitesHorizontais } = require('../support/validacoes');

const inicio = new PaginaInicial();

describe('Perguntas Frequentes e Ouvidoria', () => {
  beforeEach(() => inicio.abrir());

  it('[CT-FAQ-001] Deve apresentar a FAQ com Instituição selecionada inicialmente', () => {
    const faq = new SecaoFaq();
    faq
      .secao()
      .findByRole('heading', { name: 'Perguntas Frequentes', exact: true })
      .should('be.visible');
    faq.secao().findByText('Olá! Como podemos te ajudar?', { exact: true }).should('be.visible');
    faq.secao().find('[role="button"][aria-expanded]').should('have.length', 4);
    faq.pergunta(categorias[0].perguntas[0].pergunta).should('have.attr', 'aria-expanded', 'false');
    faq.pergunta(categorias[1].perguntas[0].pergunta).should('not.exist');
  });

  it('[CT-FAQ-002] Deve trocar as perguntas ao escolher outra categoria', () => {
    const faq = new SecaoFaq();
    categorias.forEach((categoria) => {
      faq.selecionarCategoria(categoria.nome);
      faq
        .secao()
        .find('[role="button"][aria-expanded]')
        .should('have.length', categoria.perguntas.length);
      faq.pergunta(categoria.perguntas[0].pergunta).should('be.visible');
    });
  });

  categorias.forEach((categoria) => {
    categoria.perguntas.forEach((item) => {
      it('[' + item.id + '] Deve abrir e recolher a resposta: ' + item.pergunta, () => {
        const faq = new SecaoFaq();
        faq.selecionarCategoria(categoria.nome);
        faq.pergunta(item.pergunta).click().should('have.attr', 'aria-expanded', 'true');
        faq.resposta(item.resposta).should('be.visible');
        faq.pergunta(item.pergunta).click().should('have.attr', 'aria-expanded', 'false');
        faq.resposta(item.resposta).should('not.exist');
      });
    });
  });

  it('[CT-FAQ-015] Deve manter respostas independentes abertas ao mesmo tempo', () => {
    const faq = new SecaoFaq();
    const [primeira, segunda] = categorias[0].perguntas;
    faq.pergunta(primeira.pergunta).click();
    faq.pergunta(segunda.pergunta).click();
    faq.pergunta(primeira.pergunta).click().should('have.attr', 'aria-expanded', 'false');
    faq.resposta(primeira.resposta).should('not.exist');
    faq.pergunta(segunda.pergunta).should('have.attr', 'aria-expanded', 'true');
    faq.resposta(segunda.resposta).should('be.visible');
  });

  it('[CT-FAQ-016] Deve operar uma pergunta com Enter e Espaço', () => {
    const faq = new SecaoFaq();
    const item = categorias[0].perguntas[0];
    faq
      .pergunta(item.pergunta)
      .focus()
      .type('{enter}')
      .should('have.attr', 'aria-expanded', 'true');
    faq.resposta(item.resposta).should('be.visible');
    faq.pergunta(item.pergunta).type(' ').should('have.attr', 'aria-expanded', 'false');
    faq.resposta(item.resposta).should('not.exist');
  });

  it('[CT-FAQ-017] Deve manter o acesso à Ouvidoria disponível na FAQ', () => {
    const faq = new SecaoFaq();
    faq
      .secao()
      .findByText(/Não encontrou a sua dúvida\?/)
      .should('be.visible');
    validarLinkExterno(
      faq.secao().findByRole('link', { name: 'Pergunte Aqui!', exact: true }),
      '/FAQ',
    );
  });

  it('[CT-FAQ-018] Deve trocar categorias e ler respostas no celular', () => {
    cy.viewport(375, 812);
    const faq = new SecaoFaq();
    categorias.forEach((categoria) => {
      faq.selecionarCategoria(categoria.nome);
      const item = categoria.perguntas[0];
      faq.pergunta(item.pergunta).click();
      faq.resposta(item.resposta).should('be.visible');
      validarLimitesHorizontais(faq.pergunta(item.pergunta));
    });
  });
});
