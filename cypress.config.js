require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  retries: 0,
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
  },
});
