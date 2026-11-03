const { spawnSync } = require('node:child_process');
const { dirname, join } = require('node:path');

const suites = [
  {
    nome: 'Cypress',
    programa: join(dirname(require.resolve('cypress/package.json')), 'bin', 'cypress'),
    argumentos: ['run'],
  },
  { nome: 'Playwright', programa: require.resolve('@playwright/test/cli'), argumentos: ['test'] },
];

let codigoDeSaida = 0;
for (const suite of suites) {
  console.log('\nExecutando ' + suite.nome + '\n');
  const execucao = spawnSync(process.execPath, [suite.programa, ...suite.argumentos], {
    stdio: 'inherit',
  });
  if (execucao.signal === 'SIGINT') process.exit(130);
  if (execucao.error) console.error(execucao.error.message);
  if (execucao.error || execucao.status !== 0) codigoDeSaida = 1;
}
process.exitCode = codigoDeSaida;
