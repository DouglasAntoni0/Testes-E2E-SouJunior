const ENDERECO_STARS = 'https://stars.soujunior.tech/';
const CAMINHO_APOIO = '/seja-um-apoiador';
const DESCRICAO_LOGO = 'Sou Junior - Logo da organização que impulsiona carreiras em tecnologia';
const TITULO_HERO = 'Transformando potencial em experiência real.';
const AZUL_PRINCIPAL = 'rgb(60, 126, 249)';
const AZUL_CLARO = 'rgb(239, 244, 255)';
const telas = { desktop: { width: 1440, height: 900 }, mobile: { width: 375, height: 812 } };
const largurasMobile = [375, 390, 430];
const papeis = [
  {
    id: 'CT-COM-002',
    nome: 'Júnior',
    descricao:
      'Júnior executa tarefas do projeto enquanto aprende na prática e desenvolve habilidades, sempre sob orientação de mentores e heads.',
  },
  {
    id: 'CT-COM-003',
    nome: 'Mentor',
    descricao:
      'Mentor orienta, tira dúvidas e apoia o crescimento dos juniores dentro de cada área de atuação.',
  },
  {
    id: 'CT-COM-004',
    nome: 'Head',
    descricao:
      'Head organiza e lidera equipes, toma decisões e garante que tudo funcione bem dentro do projeto.',
  },
];
const indicadores = [
  { valor: '10', descricao: 'Squads Atuantes' },
  { valor: '+100', descricao: 'Voluntários Ativos' },
  { valor: '+30', descricao: 'Apoiadores do Projeto' },
];
module.exports = {
  ENDERECO_STARS,
  CAMINHO_APOIO,
  DESCRICAO_LOGO,
  TITULO_HERO,
  AZUL_PRINCIPAL,
  AZUL_CLARO,
  telas,
  largurasMobile,
  papeis,
  indicadores,
};
