import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://app.qa.nesto.ca',
  },
  env: {
    language: 'fr',
  },
});
