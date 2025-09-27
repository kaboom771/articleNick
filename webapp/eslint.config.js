import baseConfig from '../eslint.config.js'
import globals from 'globals'

export default [
  ...baseConfig,

  // Frontend-specific правила
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'MemberExpression[object.type="MetaProperty"][object.meta.name="import"][object.property.name="meta"][property.name="env"]',
          message: 'Use instead: import { env } from "./env"',
        },
      ],
    },
  },

  // Конфигурационные файлы
  {
    files: ['vite.config.ts', '**/*.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  // Игнорируемые файлы для фронтенда
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
]
