// A Home tem 10 cards. Business continua entre as 11 páginas internas.
const areasInternas = [
  {
    id: 'CT-PAG-001',
    nome: 'Business',
    rota: '/area/business',
    titulo: 'Business',
    trecho: 'A área de Business é responsável por conectar o projeto ao mundo externo.',
  },
  {
    id: 'CT-PAG-002',
    nome: 'Tech Recruiter',
    rota: '/area/tech-recruiter',
    titulo: 'Tech Recruiter',
    trecho:
      'O Tech Recruiter é a pessoa responsável por conectar talentos com oportunidades dentro do projeto.',
  },
  {
    id: 'CT-PAG-003',
    nome: 'Produtos',
    rota: '/area/produto',
    titulo: 'Produto',
    trecho: 'A área de Produto é o coração estratégico de muitos times.',
  },
  {
    id: 'CT-PAG-004',
    nome: 'Agilidade',
    rota: '/area/agilidade',
    titulo: 'Agilidade',
    trecho:
      'A área de Agilidade é responsável por garantir que os times consigam trabalhar de forma colaborativa',
  },
  {
    id: 'CT-PAG-005',
    nome: 'Social Media',
    rota: '/area/social-media',
    titulo: 'Social Media',
    trecho: 'A área de Social Media é responsável por dar voz ao projeto nas redes sociais',
  },
  {
    id: 'CT-PAG-006',
    nome: 'Design',
    rota: '/area/design',
    titulo: 'Design',
    trecho:
      'Na área de Design, o foco está em criar experiências que sejam bonitas, intuitivas e centradas nas pessoas.',
  },
  {
    id: 'CT-PAG-007',
    nome: 'Desenvolvimento Frontend',
    rota: '/area/front-end',
    titulo: 'Front-end',
    trecho: 'A área de Front-end é responsável por transformar ideias e designs em telas reais',
  },
  {
    id: 'CT-PAG-008',
    nome: 'Desenvolvimento Backend',
    rota: '/area/back-end',
    titulo: 'Back-end',
    trecho: 'Na área de Back-end, você cuida da lógica por trás do que aparece na tela.',
  },
  {
    id: 'CT-PAG-009',
    nome: 'Dados',
    rota: '/area/dados',
    titulo: 'Dados',
    trecho: 'Na área de Dados, nosso foco é transformar informações em decisões estratégicas.',
  },
  {
    id: 'CT-PAG-010',
    nome: 'QA',
    rota: '/area/qa',
    titulo: 'Quality Assurance (QA)',
    trecho:
      'A área de QA (Quality Assurance) é essencial para garantir que tudo o que é desenvolvido funcione bem',
  },
  {
    id: 'CT-PAG-011',
    nome: 'DevOps',
    rota: '/area/dev-ops',
    titulo: 'DevOps',
    trecho:
      'A área de DevOps é o elo entre o desenvolvimento de software e a operação dos sistemas.',
  },
];
const ordemDaHome = [
  'Agilidade',
  'Design',
  'Dados',
  'Desenvolvimento Backend',
  'Desenvolvimento Frontend',
  'Social Media',
  'DevOps',
  'Produtos',
  'QA',
  'Tech Recruiter',
];
const areasHome = ordemDaHome.map((nome) => areasInternas.find((area) => area.nome === nome));
module.exports = { areasInternas, areasHome };
