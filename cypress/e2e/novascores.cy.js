const { HomePage } = require('../support/pages/HomePage');
const { ColorPaletteSection } = require('../support/pages/ColorPaletteSection');

const HOME_URL = 'http://localhost:3000/';

const viewports = [
    { name: 'Desktop', width: 1366, height: 768 },
    { name: 'Mobile', width: 390, height: 844 },
];

const home = new HomePage();
const palette = new ColorPaletteSection();

describe('Nova identidade visual - cores aprovadas', () => {
    viewports.forEach(({ name, width, height }) => {
        describe(`${name}`, () => {
            beforeEach(() => {
                cy.viewport(width, height);
                home.visit(HOME_URL);
            });

            it('Deve exibir o Footer com o azul principal da marca', () => {
                palette.shouldShowBlueFooter();
            });

            it('Deve exibir a seção Hero com o azul principal da marca', () => {
                palette.shouldShowBlueHero();
            });

            it('Deve exibir os 11 cards de Áreas de Atuação com o azul principal', () => {
                palette.shouldShowBlueAreaCards();
            });

            it('Deve exibir os cards de Depoimentos com o azul principal', () => {
                palette.shouldShowBlueTestimonials();
            });
        });
    });
});
