const AREAS = [
  {
    cardName: 'Business',
    path: '/area/business',
    pageHeading: 'Business',
    expectedPhrase: 'A área de Business é responsável por conectar o projeto ao mundo externo.',
  },
  {
    cardName: 'Tech Recruiter',
    path: '/area/tech-recruiter',
    pageHeading: 'Tech Recruiter',
    expectedPhrase: 'O Tech Recruiter é a pessoa responsável por conectar talentos com oportunidades dentro do projeto.',
  },
  {
    cardName: 'Produto',
    path: '/area/produto',
    pageHeading: 'Produto',
    expectedPhrase: 'A área de Produto é o coração estratégico de muitos times.',
  },
  {
    cardName: 'Ágil',
    path: '/area/agilidade',
    pageHeading: 'Agilidade',
    expectedPhrase: 'A área de Agilidade é responsável por garantir que os times consigam trabalhar de forma colaborativa',
  },
  {
    cardName: 'Social Media',
    path: '/area/social-media',
    pageHeading: 'Social Media',
    expectedPhrase: 'A área de Social Media é responsável por dar voz ao projeto nas redes sociais',
  },
  {
    cardName: 'UI & UX Designer',
    path: '/area/design',
    pageHeading: 'Design',
    expectedPhrase: 'Na área de Design, o foco está em criar experiências que sejam bonitas, intuitivas e centradas nas pessoas.',
  },
  {
    cardName: 'Front-end',
    path: '/area/front-end',
    pageHeading: 'Front-end',
    expectedPhrase: 'A área de Front-end é responsável por transformar ideias e designs em telas reais',
  },
  {
    cardName: 'Back-end',
    path: '/area/back-end',
    pageHeading: 'Back-end',
    expectedPhrase: 'Na área de Back-end, você cuida da lógica por trás do que aparece na tela.',
  },
  {
    cardName: 'Dados',
    path: '/area/dados',
    pageHeading: 'Dados',
    expectedPhrase: 'Na área de Dados, nosso foco é transformar informações em decisões estratégicas.',
  },
  {
    cardName: 'QA',
    path: '/area/qa',
    pageHeading: 'Quality Assurance (QA)',
    expectedPhrase: 'A área de QA (Quality Assurance) é essencial para garantir que tudo o que é desenvolvido funcione bem',
  },
  {
    cardName: 'DevOps',
    path: '/area/dev-ops',
    pageHeading: 'DevOps',
    expectedPhrase: 'A área de DevOps é o elo entre o desenvolvimento de software e a operação dos sistemas.',
  },
];

const SECTION_HEADING = /^Áreas de atuação$/;
const PREVIOUS_BUTTON = 'button[aria-label="Ver item anterior"]';
const NEXT_BUTTON = 'button[aria-label="Ver próximo item"]';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isInteractableInsideClippingArea(element) {
  const elementRect = element.getBoundingClientRect();
  let visibleLeft = 0;
  let visibleRight = element.ownerDocument.defaultView.innerWidth;

  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const style = getComputedStyle(parent);
    const clipsHorizontally = /(auto|clip|hidden|scroll)/.test(
      `${style.overflow} ${style.overflowX}`,
    );

    if (clipsHorizontally) {
      const parentRect = parent.getBoundingClientRect();
      visibleLeft = Math.max(visibleLeft, parentRect.left);
      visibleRight = Math.min(visibleRight, parentRect.right);
    }
  }

  const horizontalCenter = elementRect.left + (elementRect.width / 2);

  return (
    elementRect.width > 0
    && horizontalCenter >= visibleLeft
    && horizontalCenter <= visibleRight
  );
}

function getAreasSection() {
  return cy.contains('h1', SECTION_HEADING).then(($heading) => {
    const $section = $heading.parents().filter((_, element) => {
      const areaCards = element.querySelectorAll('a[href^="/area/"]');
      const previousButtons = element.querySelectorAll(PREVIOUS_BUTTON);
      const nextButtons = element.querySelectorAll(NEXT_BUTTON);

      return (
        areaCards.length === AREAS.length
        && previousButtons.length === 1
        && nextButtons.length === 1
      );
    }).first();

    expect($section, 'contêiner semântico do carrossel de áreas').to.have.length(1);

    return cy.wrap($section);
  });
}

function getAreaCard(path) {
  return cy.get('@areasSection').find(`a[href="${path}"]`).should('have.length', 1);
}

function getCarouselButton(selector) {
  return cy.get('@areasSection').find(selector).should('have.length', 1);
}

function waitForCarouselToSettle(previousLeft, path) {
  getAreaCard(path).should(($card) => {
    const currentLeft = $card[0].getBoundingClientRect().left;
    expect(currentLeft, 'posição horizontal do card após mover o carrossel')
      .not.to.be.closeTo(previousLeft, 0.5);
  });

  cy.get('@areasSection').should(($section) => {
    const runningAnimations = $section[0]
      .getAnimations({ subtree: true })
      .filter(({ playState }) => ['pending', 'running'].includes(playState));

    expect(runningAnimations, 'animações ainda em execução no carrossel').to.be.empty;
  });
}

function revealAreaCard(path) {
  getAreaCard(path).then(($card) => {
    if (isInteractableInsideClippingArea($card[0])) {
      return;
    }

    const previousLeft = $card[0].getBoundingClientRect().left;

    getCarouselButton(NEXT_BUTTON)
      .then(($nextButton) => {
        expect($nextButton, `seta disponível antes de revelar ${path}`).to.be.enabled;
        cy.wrap($nextButton).click();
      });

    waitForCarouselToSettle(previousLeft, path);
    revealAreaCard(path);
  });
}

function assertAreaPage({ path, pageHeading, expectedPhrase }) {
  cy.location('pathname').should('eq', path);
  cy.contains('h1, h2', new RegExp(`^${escapeRegExp(pageHeading)}$`))
    .should('be.visible');
  cy.contains('p', expectedPhrase).should('be.visible');
}

describe('Seção Áreas de atuação', () => {
  beforeEach(() => {
    cy.visit('/');

    getAreasSection()
      .scrollIntoView()
      .should('be.visible')
      .as('areasSection');
  });

  it('deve mover o carrossel pelas duas setas e retornar ao estado inicial', () => {
    getCarouselButton(PREVIOUS_BUTTON).should('be.disabled');
    getCarouselButton(NEXT_BUTTON).should('be.enabled');

    getAreaCard(AREAS[0].path).then(($firstCard) => {
      const initialLeft = $firstCard[0].getBoundingClientRect().left;

      getCarouselButton(NEXT_BUTTON).click();
      waitForCarouselToSettle(initialLeft, AREAS[0].path);
    });

    getAreaCard(AREAS[0].path).then(($firstCard) => {
      const movedLeft = $firstCard[0].getBoundingClientRect().left;

      getCarouselButton(PREVIOUS_BUTTON)
        .should('be.enabled')
        .click();

      waitForCarouselToSettle(movedLeft, AREAS[0].path);
    });

    getCarouselButton(PREVIOUS_BUTTON).should('be.disabled');
    getAreaCard(AREAS[0].path).should(($firstCard) => {
      expect(isInteractableInsideClippingArea($firstCard[0]), 'primeiro card visível novamente')
        .to.equal(true);
    });
  });

  AREAS.forEach((area) => {
    it(`deve abrir o card ${area.cardName} e validar o conteúdo da página`, () => {
      revealAreaCard(area.path);

      getAreaCard(area.path)
        .should(($card) => {
          expect(isInteractableInsideClippingArea($card[0]), `centro do card ${area.cardName} visível`)
            .to.equal(true);
        })
        .click();

      assertAreaPage(area);
    });
  });
});
