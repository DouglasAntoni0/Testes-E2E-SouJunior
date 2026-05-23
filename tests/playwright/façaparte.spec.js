import { test, expect } from '@playwright/test';

test.describe('Papeis na SouJunior - Validação da Seção da Comunidade', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('CT-001: Deve validar a exibição e os textos dos papéis na seção', async ({ page }) => {

        const tituloSecao = page.getByRole('heading', { name: 'Faça você também parte da nossa comunidade!', exact: true });
        await tituloSecao.scrollIntoViewIfNeeded();
        await expect(tituloSecao).toBeVisible();

        const subtitulo = page.getByText('Na SouJunior, há diversas maneiras de participar:');
        await expect(subtitulo).toBeVisible();

        await expect(page.getByText('Júnior', { exact: true })).toBeVisible();
        await expect(page.getByText('Júnior executa tarefas do projeto enquanto aprende na prática e desenvolve habilidades, sempre sob orientação de mentores e heads')).toBeVisible();

        await expect(page.getByText('Mentor', { exact: true })).toBeVisible();
        await expect(page.getByText('Mentor orienta, tira dúvidas e apoia o crescimento dos juniores dentro de cada área de atuação.')).toBeVisible();

        await expect(page.getByText('Head', { exact: true })).toBeVisible();
        await expect(page.getByText('Head organiza e lidera equipes, toma decisões e garante que tudo funcione bem dentro do projeto.')).toBeVisible();
    });

    test('CT-002: Deve validar o link e o redirecionamento do botão "Participar"', async ({ page }) => {

        const btnParticipar = page.getByRole('link', { name: 'Participar' });

        await btnParticipar.scrollIntoViewIfNeeded();

        await expect(btnParticipar).toBeVisible();
        await expect(btnParticipar).toHaveCSS('cursor', 'pointer');
        await expect(btnParticipar).toHaveAttribute('href', 'https://stars.soujunior.tech/');
        await expect(btnParticipar).toHaveAttribute('target', '_blank');

    });
});
