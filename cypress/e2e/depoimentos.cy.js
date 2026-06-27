const { pagina1, pagina2, pagina3 } = require('../../shared/depoimentos.data');
const { HomePage } = require('../support/pages/HomePage');
const { DepoimentosSection } = require('../support/pages/DepoimentosSection');

const home = new HomePage();
const depoimentos = new DepoimentosSection();

describe('Seção de Depoimentos', () => {
  beforeEach(() => {
    home.visit('http://localhost:3000');
  });

  it('Deve exibir a estrutura base e títulos da seção', () => {
    depoimentos.shouldShowBaseStructure();
  });

  it('Deve validar a integridade de todos os dados nos cards e a transição de páginas', () => {
    depoimentos.shouldShowCards(pagina1);

    depoimentos.goToNextPage();
    depoimentos.shouldShowCards(pagina2);

    depoimentos.goToNextPage();
    depoimentos.shouldShowCards(pagina3);

    depoimentos.goToPreviousPage();
    depoimentos.shouldShowPerson('Ana Santos');
  });

  it('Deve validar o estado habilitado/desabilitado das setas através de navegação automatizada', () => {
    depoimentos.shouldStartWithExpectedArrowState();
    depoimentos.clickNextUntilTheEnd();
    depoimentos.shouldFinishWithExpectedArrowState();
  });
});
