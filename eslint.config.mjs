import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';  // Import TypeScript plugin
import tsParser from '@typescript-eslint/parser';  // Use TypeScript parser
import cypressPlugin from 'eslint-plugin-cypress';  // Import Cypress plugin

export default [
  // Apply to general JavaScript and TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],  // Apply to all JS and TS files
    ignores: ['.trash/**'],
    languageOptions: {
      parser: tsParser,  // Use TypeScript parser for TS files
      globals: {
        ...globals.browser,  // Include browser-specific global variables
        ...globals.node,     // Include Node.js globals
        JQuery: 'readonly',  // Add JQuery global for Cypress files
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'quotes': ['error', 'single'],  // Enforce single quotes
      'semi': ['error', 'always'],    // Enforce semicolons
      '@typescript-eslint/no-unused-vars': 'error',  // Disallow unused variables
    },
  },

  // Apply specifically to Cypress test files
  {
    files: ['**/*.cy.{js,ts,tsx}', 'cypress/**/*.{js,ts,tsx}'],  // Target Cypress test files
    languageOptions: {
      parser: tsParser,  // Use TypeScript parser for Cypress files
      globals: {
        ...globals.browser,  // Include browser-specific global variables
        cy: 'readonly',  // Explicitly define 'cy' as a global variable
        Cypress: 'readonly',  // Explicitly define 'Cypress' as a global variable
        ...globals.cypress,  // Include Cypress globals (cy, Cypress, etc.)
        ...globals.mocha,  // Include Mocha globals (describe, it, beforeEach, etc.)
        JQuery: 'readonly',  // Add JQuery global for Cypress files
        expect: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'cypress': cypressPlugin,  // Enable Cypress plugin
    },
    rules: {
      'quotes': ['error', 'single'],  // Enforce single quotes
      'semi': ['error', 'always'],    // Enforce semicolons
      '@typescript-eslint/no-unused-vars': 'error',  // Disallow unused variables
      'cypress/no-unnecessary-waiting': 'error',  // Enforce Cypress rule
      'cypress/assertion-before-screenshot': 'warn',  // Enforce Cypress rule
    },
  },

  pluginJs.configs.recommended,  // Recommended JavaScript rules
  {
    rules: tseslint.configs.recommended.rules,  // Include recommended TypeScript rules
  },
];
