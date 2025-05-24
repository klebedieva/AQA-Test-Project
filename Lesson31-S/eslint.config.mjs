import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js'
import pluginCypress from 'eslint-plugin-cypress/flat'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/**.mjs', '**/**.js']},
  {ignores: ['html*']},
  {languageOptions: 
    { 
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      'cypress': pluginCypress
    },
  },
  {
    rules: {
      'no-unused-vars': 0,
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 2 }],
      '@stylistic/js/no-extra-semi': ['error'],
      '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/max-len': ['error', { code: 150 }],
      'cypress/unsafe-to-chain-command': 'warn',
      'cypress/no-unnecessary-waiting': 'warn',
    }
  }
];