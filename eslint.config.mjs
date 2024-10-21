import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';  // Import TypeScript plugin
import tsParser from '@typescript-eslint/parser';  // Use TypeScript parser
import cypressPlugin from 'eslint-plugin-cypress';  // Import Cypress plugin

export default [
  // Apply to general JavaScript and TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    ignores: ['.trash/**/*'],  // Exclude .trash folder
    languageOptions: {
      parser: tsParser,  // Use TypeScript parser for TS files
      globals: {
        ...globals.browser,  // Include browser-specific global variables
        ...globals.node,     // Include Node.js globals
        JQuery: 'readonly',  // Add JQuery global for Cypress files
        expect: 'readonly',  // Add expect as a global for tests
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,  // Ensure TypeScript ESLint plugin is used
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',  // Reference this rule correctly
    },
  },
  
  // Apply specifically to Cypress test files
  {
    files: ['**/*.cy.{js,ts,tsx}', 'cypress/**/*.{js,ts,tsx}'],
    ignores: ['.trash/**/*'],
    languageOptions: {
      parser: tsParser,  // Use TypeScript parser for Cypress files
      globals: {
        ...globals.browser,  // Include browser-specific global variables
        cy: 'readonly',  // Explicitly define 'cy' as a global variable
        Cypress: 'readonly',  // Explicitly define 'Cypress' as a global variable
        ...globals.cypress,  // Include Cypress globals (cy, Cypress, etc.)
        ...globals.mocha,  // Include Mocha globals (describe, it, beforeEach, etc.)
        JQuery: 'readonly',  // Add JQuery global for Cypress files
        expect: 'readonly',  // Add expect as a global for Cypress tests
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'cypress': cypressPlugin,  // Enable Cypress plugin
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

  // Apply recommended JS rules
  pluginJs.configs.recommended,

  // Apply recommended TypeScript rules
  {
    rules: tseslint.configs.recommended.rules,
  },
];
