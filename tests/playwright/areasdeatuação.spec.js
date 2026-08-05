const { test, expect } = require('@playwright/test');

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

const PREVIOUS_BUTTON_NAME = 'Ver item anterior';
const NEXT_BUTTON_NAME = 'Ver próximo item';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createAreasSection(page) {
  const heading = page.getByRole('heading', {
    level: 1,
    name: 'Áreas de atuação',
    exact: true,
  });

  const root = heading.locator(
    'xpath=ancestor::div['
      + 'count(.//a[starts-with(@href, "/area/")]) = 11 '
      + 'and count(.//button[@aria-label="Ver item anterior"]) = 1 '
      + 'and count(.//button[@aria-label="Ver próximo item"]) = 1'
      + '][1]',
  );

  return {
    heading,
    root,
    previousButton: root.getByRole('button', {
      name: PREVIOUS_BUTTON_NAME,
      exact: true,
    }),
    nextButton: root.getByRole('button', {
      name: NEXT_BUTTON_NAME,
      exact: true,
    }),
    cardByPath: (path) => root.locator(`a[href="${path}"]`),
  };
}

async function isInteractableInsideClippingArea(card) {
  return card.evaluate((element) => {
    const elementRect = element.getBoundingClientRect();
    let visibleLeft = 0;
    let visibleRight = window.innerWidth;

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
  });
}

async function horizontalPosition(card) {
  return card.evaluate((element) => element.getBoundingClientRect().left);
}

async function waitForCarouselToSettle(section, card, previousLeft) {
  await expect.poll(async () => {
    const currentLeft = await horizontalPosition(card);
    return Math.abs(currentLeft - previousLeft) > 0.5;
  }, {
    message: 'O card deve mudar de posição após o clique na seta',
  }).toBe(true);

  await expect.poll(() => section.root.evaluate((element) => (
    element
      .getAnimations({ subtree: true })
      .filter(({ playState }) => ['pending', 'running'].includes(playState))
      .length
  )), {
    message: 'O carrossel deve concluir a animação antes da próxima ação',
  }).toBe(0);
}

async function revealAreaCard(section, path) {
  const card = section.cardByPath(path);

  await expect(card).toHaveCount(1);

  while (!(await isInteractableInsideClippingArea(card))) {
    expect(
      await section.nextButton.isEnabled(),
      `A seta deve continuar habilitada até revelar ${path}`,
    ).toBe(true);

    const previousLeft = await horizontalPosition(card);

    await section.nextButton.click();
    await waitForCarouselToSettle(section, card, previousLeft);
  }

  await expect.poll(() => isInteractableInsideClippingArea(card), {
    message: `O centro do card ${path} deve estar visível`,
  }).toBe(true);

  return card;
}

async function assertAreaPage(page, area) {
  await expect(page).toHaveURL(new RegExp(`${escapeRegExp(area.path)}$`));
  await expect(page.getByRole('heading', {
    name: area.pageHeading,
    exact: true,
  })).toBeVisible();

  const expectedParagraph = page.locator('p').filter({
    hasText: area.expectedPhrase,
  });

  await expect(expectedParagraph).toHaveCount(1);
  await expect(expectedParagraph).toBeVisible();
}

test.describe('Seção Áreas de atuação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const section = createAreasSection(page);

    await expect(section.heading).toHaveCount(1);
    await expect(section.root).toHaveCount(1);
    await section.heading.scrollIntoViewIfNeeded();
    await expect(section.heading).toBeInViewport();
    await expect(section.root).toBeVisible();
  });

  test('deve mover o carrossel pelas duas setas e retornar ao estado inicial', async ({ page }) => {
    const section = createAreasSection(page);
    const firstCard = section.cardByPath(AREAS[0].path);

    await expect(section.previousButton).toBeDisabled();
    await expect(section.nextButton).toBeEnabled();

    const initialLeft = await horizontalPosition(firstCard);

    await section.nextButton.click();
    await waitForCarouselToSettle(section, firstCard, initialLeft);
    await expect(section.previousButton).toBeEnabled();

    const movedLeft = await horizontalPosition(firstCard);

    await section.previousButton.click();
    await waitForCarouselToSettle(section, firstCard, movedLeft);

    await expect(section.previousButton).toBeDisabled();
    await expect.poll(() => isInteractableInsideClippingArea(firstCard), {
      message: 'O primeiro card deve voltar a ficar visível',
    }).toBe(true);
  });

  for (const area of AREAS) {
    test(`deve abrir o card ${area.cardName} e validar o conteúdo da página`, async ({ page }) => {
      const section = createAreasSection(page);
      const card = await revealAreaCard(section, area.path);

      await card.click();
      await assertAreaPage(page, area);
    });
  }
});
