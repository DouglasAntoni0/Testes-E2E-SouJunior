import { test, expect } from '@playwright/test';

test.describe('Papéis na SouJunior - seção da comunidade', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('Deve apresentar os papéis da comunidade com seus textos de apoio', async ({ page }) => {

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

    test('Deve manter o botão "Participar" apontando para o Stars', async ({ page }) => {

        const btnParticipar = page.getByRole('link', { name: 'Participar' });

        await btnParticipar.scrollIntoViewIfNeeded();

        await expect(btnParticipar).toBeVisible();
        await expect(btnParticipar).toHaveCSS('cursor', 'pointer');
        await expect(btnParticipar).toHaveAttribute('href', 'https://stars.soujunior.tech/');
        await expect(btnParticipar).toHaveAttribute('target', '_blank');

    });
});
