import js from "@eslint/js";
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import stylistic from '@stylistic/eslint-plugin';
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

// Условный уровень для production/dev
const severityLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'error'

export default [
  // Base configs
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  stylistic.configs.recommended,
  prettierRecommended,

  // Main configuration
  {
    name: 'project/base',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
  },

  // Custom rules
  {
    name: 'project/custom-rules',
    rules: {
      'vue/no-v-html': 'off',
      'default-param-last': severityLevel,
      'no-console': [severityLevel, { allow: ['warn', 'error', 'info', 'group', 'groupEnd', 'groupCollapsed'] }],
      'class-methods-use-this': 'off',
      'no-param-reassign': severityLevel,
      'no-shadow': severityLevel,
      'vue/no-v-for-template-key': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/max-len': 'off',

      'prettier/prettier': [
        severityLevel,
        {
          semi: false,
          endOfLine: 'auto',
        },
      ],

      'import/order': [
        severityLevel,
        {
          'groups': ['builtin', 'external', 'internal', 'type', 'parent', 'index', 'sibling', 'object'],
          'pathGroups': [
            { pattern: '@components', group: 'internal', position: 'before' },
            { pattern: '@components/**', group: 'internal', position: 'before' },
            { pattern: '@helpers', group: 'internal', position: 'before' },
            { pattern: '@helpers/**', group: 'internal', position: 'before' },
            { pattern: '@stores', group: 'internal', position: 'before' },
            { pattern: '@stores/**', group: 'internal', position: 'before' },
            { pattern: '@/views', group: 'internal', position: 'before' },
            { pattern: '@/views/**', group: 'internal', position: 'before' },
            { pattern: '@assets', group: 'internal', position: 'after' },
            { pattern: '@assets/**', group: 'internal', position: 'after' },
            { pattern: '@public', group: 'internal', position: 'after' },
            { pattern: '@public/**', group: 'internal', position: 'after' },
            { pattern: '@styles', group: 'internal', position: 'after' },
            { pattern: '@styles/**', group: 'internal', position: 'after' },
          ],
          'alphabetize': { order: 'asc', caseInsensitive: true },
          'newlines-between': 'never',
          'pathGroupsExcludedImportTypes': [
            ['builtin', 'type'],
            {
              alphabetize: { order: 'asc', caseInsensitive: true },
            },
          ],
        },
      ],

      'no-restricted-syntax': [
        severityLevel,
        {
          selector: 'CallExpression[arguments.length=1] > MemberExpression.callee > Identifier.property[name=at]',
          message: 'Do not use the native array method "at", it is not supported by older browsers',
        },
        {
          selector: 'CallExpression[arguments.length=1] > MemberExpression.callee > Identifier.property[name=findLast]',
          message: 'Do not use the native array method "findLast", it is not supported by older browsers',
        },
      ],

      '@stylistic/max-len': [
        severityLevel,
        {
          code: 120,
        },
      ],
    },
  },

  // Override for tests
  {
    name: 'project/tests',
    files: ['**/*.spec.js'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },

  // Ignores
  {
    name: 'project/ignores',
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/public/**',
      '**/.eslintrc.*',
      '**/eslint.config.*',
    ],
  },
]
