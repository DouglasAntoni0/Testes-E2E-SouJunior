const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { FaqSection } = require('./pages/FaqSection');

const faqInstituicao = [
    {
        pergunta: 'Qual o objetivo do SouJunior?',
        resposta: 'A SouJunior tem como missão apoiar e preparar profissionais juniores para o mercado de tecnologia por meio do voluntariado, promovendo aprendizado, conexão e desenvolvimento na prática.',
    },
    {
        pergunta: 'Como posso participar da Comunidade SouJunior?',
        resposta: 'Você pode entrar na nossa comunidade acessando o servidor do SouJunior no Discord e no GitHub. Para se tornar membro oficialmente, é só ir no menu "Nossas Iniciativas" no site, clicar em "Conheça outras iniciativas" e preencher o formulário de candidatura. Depois disso, nosso time entra em contato com você!',
    },
    {
        pergunta: 'A SouJunior oferece ajuda de custo para voluntários?',
        resposta: 'Não. Todas as atividades no SouJunior são voluntárias e realizadas de forma remota (home office).',
    },
    {
        pergunta: 'A SouJunior ajuda os juniores a entrarem no mercado de trabalho?',
        resposta: 'Sim. A SouJunior contribui para a inserção de profissionais juniores no mercado de trabalho ao promover o desenvolvimento de competências técnicas e comportamentais por meio de vivências práticas em um ambiente colaborativo. Nossa atuação é focada na formação integral do júnior, incentivando o protagonismo, a responsabilidade e a construção de repertório profissional relevante para os desafios do início de carreira.',
    },
];

const faqVoluntario = [
    {
        pergunta: 'Como ser voluntário no SouJunior?',
        resposta: 'É simples! Acesse o menu “Faça Parte” em nosso site, você será redirecionado para o formulário de candidatura. Após o envio, seu perfil será avaliado e entraremos em contato quando surgir uma oportunidade com seu perfil.',
    },
    {
        pergunta: 'Quanto tempo preciso me dedicar por semana?',
        resposta: 'As atividades são majoritariamente assíncronas, o que permite mais flexibilidade. Cada vez possui metas e alguns encontros pontuais. Durante o processo seletivo, alinhe com o Head da área o tempo médio esperado e veja possibilidades de adaptação.',
    },
    {
        pergunta: 'O que acontece depois que eu enviei minha candidatura?',
        resposta: 'Seu perfil entra em nosso banco de talentos. Assim que surgir uma vaga compatível, a equipe de recrutamento entrará em contato, geralmente pelo LinkedIn.',
    },
    {
        pergunta: 'Posso ser voluntário mesmo trabalhando em outra empresa ou iniciativa?',
        resposta: 'Sim! Você pode conciliar ou voluntariar-se com outras atividades profissionais ou voluntárias.',
    },
    {
        pergunta: 'Preciso ir até algum lugar para atuar como voluntário?',
        resposta: 'Não. Todas as atividades são 100% remotas (home office).',
    },
];

const faqMentor = [
    {
        pergunta: 'Como posso me tornar um mentor no SouJunior?',
        resposta: 'Mentores apoiam juniores na execução de atividades, esclarecendo dúvidas e orientando sobre a área de atuação. Para ser mentor, é necessário ter pelo menos 6 meses de experiência e disposição para ensinar. Para se candidatar, acesse o menu “Faça Parte”. Após o envio do formulário, você será avaliado e contatado quando surgir uma oportunidade com seu perfil.',
    },
    {
        pergunta: 'Como posso me tornar um Head na SouJunior?',
        resposta: 'Os Heads lideram áreas e projetos na SouJunior, apoiando o tempo na entrega de resultados e desenvolvimento de habilidades. As vagas para Head são abertas conforme necessidade interna. Se tiver interesse, envie a sua candidatura pelo menu “Faça Parte”. Após o envio do formulário, você será avaliado e contatado quando surgir uma oportunidade com seu perfil.',
    },
    {
        pergunta: 'Como ser um Apoiador ou Parceiro na SouJunior?',
        resposta: 'O Apoiador ou Parceiro na SouJunior, poderá incrementar seu portfólio ou envolver-se com alguma ação dentro da SouJunior. Portanto, se você acredita que pode contribuir como Apoiador ou Parceiro no SouJunior, selecione no Menu da Home do Site SouJunior a opção “Seja um apoiador”, leia sobre os tipos de apoio que o SouJunior oferece e clique em “Participar”.',
    },
];

test.describe('Seção FAQ - Interação de Abertura e Respostas', () => {
    test.beforeEach(async ({ page }) => {
        const home = new HomePage(page);
        await home.visit('http://localhost:3000');
    });

    test('Deve abrir cada pergunta, girar a seta e exibir a resposta correta', async ({ page }) => {
        const faq = new FaqSection(page);

        await faq.scrollToSection();
        await faq.shouldShowOpenQuestions(faqInstituicao);
    });

    test('Deve navegar para a aba Voluntário, abrir todas as perguntas e exibir as respostas corretas', async ({ page }) => {
        const faq = new FaqSection(page);

        await faq.scrollToSection();
        await faq.selectTab('Voluntário');
        await faq.shouldShowOpenQuestions(faqVoluntario);
    });

    test('Deve navegar para a aba Mentor | Head | Apoiador, abrir as perguntas e exibir as respostas', async ({ page }) => {
        const faq = new FaqSection(page);

        await faq.scrollToSection();
        await faq.selectTab('Mentor | Head | Apoiador');
        await faq.shouldShowOpenQuestions(faqMentor);
    });

    test('Deve exibir a seção de Ouvidoria permanentemente e validar o link de redirecionamento', async ({ page }) => {
        const faq = new FaqSection(page);

        await faq.shouldShowOuvidoriaLink();
    });

    test('Deve permitir recolher a pergunta e manter múltiplas abertas simultaneamente', async ({ page }) => {
        const faq = new FaqSection(page);
        await faq.scrollToSection();

        const pergunta1Texto = 'Qual o objetivo do SouJunior?';
        const pergunta2Texto = 'A SouJunior oferece ajuda de custo para voluntários?';

        const linhaPergunta1 = faq.question(pergunta1Texto);
        const setaPergunta1 = faq.arrow(pergunta1Texto);

        const linhaPergunta2 = faq.question(pergunta2Texto);
        const setaPergunta2 = faq.arrow(pergunta2Texto);

        await setaPergunta1.click();
        await expect(linhaPergunta1).toHaveAttribute('aria-expanded', 'true');

        await setaPergunta2.click();
        await expect(linhaPergunta2).toHaveAttribute('aria-expanded', 'true');

        await expect(page.getByText('A SouJunior tem como missão')).toBeVisible();
        await expect(page.getByText('Não. Todas as atividades no SouJunior são voluntárias')).toBeVisible();

        await setaPergunta1.click();

        await expect(setaPergunta1).not.toHaveAttribute('style', /rotate\(180deg\)/);
        await expect(linhaPergunta1).toHaveAttribute('aria-expanded', 'false');
    });

    test('Deve exibir os elementos corretamente na resolução Mobile (Telemóvel)', async ({ page }) => {
        const faq = new FaqSection(page);

        await page.setViewportSize({ width: 375, height: 812 });
        await faq.scrollToSection();
        await faq.shouldShowMobileTabs();

        const perguntaMobileEl = page.getByText('Qual o objetivo do SouJunior?', { exact: true });
        const linhaMobile = perguntaMobileEl.locator('..');

        await linhaMobile.locator('img[src*="arrow"]').click();
        await expect(linhaMobile).toHaveAttribute('aria-expanded', 'true');
    });
});
