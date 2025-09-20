import baseConfig from '../eslint.config.js'
import pluginN from 'eslint-plugin-n'
import globals from 'globals'
import typescriptParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,

  {
    // ✅ Разделяем конфиги для TS и JS
    files: ['**/*.ts'],
    languageOptions: {
      //parser: typescriptParser, // Обязательно для TypeScript(надо найти другой парсер)
      globals: {
        ...globals.node, // Все Node.js глобалы
      },
      parserOptions: {
        project: './tsconfig.json', // Для typed linting
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      n: pluginN,
    },
    rules: {
      'n/no-process-env': [
        'warn',
        {
          allowedVariables: [],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node, // Все Node.js глобалы
      },
    },
    plugins: {
      n: pluginN,
    },
    rules: {
      'n/no-process-env': [
        'warn',
        {
          allowedVariables: [],
        },
      ],
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'eslint.config.js',
      'eslint.config.mjs', // Добавьте это
    ],
  },
]
