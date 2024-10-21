import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import cypressPlugin from 'eslint-plugin-cypress';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    ignores: ['.trash/**/*'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        JQuery: 'readonly',
        expect: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },
  {
    files: ['**/*.cy.{js,ts,tsx}', 'cypress/**/*.{js,ts,tsx}'],
    ignores: ['.trash/**/*'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly',
        ...globals.cypress,
        ...globals.mocha,
        JQuery: 'readonly',
        expect: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'cypress': cypressPlugin,
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'error',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/unsafe-to-chain-command': 'off',
    },
  },
  pluginJs.configs.recommended,
  {
    rules: tseslint.configs.recommended.rules,
  },
];
