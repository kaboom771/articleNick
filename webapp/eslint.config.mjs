// import baseConfig from '../eslint.config.js'

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   ...baseConfig,

//   {
//     files: ['**/*.{ts,tsx,js,jsx}'],
//     languageOptions: {
//       parserOptions: {
//         globals: {
//           process: 'readonly', // определяем process как глобальную переменную
//         },
//         project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
//       },
//     },
//     env: {
//       node: true, // включает все Node.js глобальные переменные
//     },
//     rules: {
//       'react/react-in-jsx-scope': 'off', // React 17+ не требует импортировать React
//       //   'jsx-a11y/anchor-is-valid': 'off',
//       '@typescript-eslint/no-explicit-any': 'warn',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       'no-restricted-syntax': [
//         'error',
//         {
//           selector:
//             'MemberExpression[object.type="MetaProperty"][object.meta.name="import"][object.property.name="meta"][property.name="env"]',
//           message: 'Use instead: import { env } from "./env"',
//         },
//       ],
//     },
//   },

//   {
//     ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
//   },

//   //   🔹 Специальные настройки для Vite-конфига
//   {
//     files: ['./vite.config.ts'],
//     languageOptions: {
//       parserOptions: {
//         project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
//       },
//     },
//   },
// ]

import baseConfig from '../eslint.config.js'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,

  // Для обычных фронтенд файлов (компоненты, lib) - запрещаем import.meta.env
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser, // Браузерные глобальные переменные
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
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

  // Для конфигурационных файлов (vite.config.ts) - разрешаем process и Node.js глобалы
  {
    files: ['vite.config.ts', '**/*.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node, // Node.js глобальные переменные
        process: 'readonly',
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
      },
    },
    rules: {
      'no-restricted-syntax': 'off', // Отключаем правило для конфигов
      '@typescript-eslint/no-floating-promises': 'off', // Отключаем для конфигов
    },
  },

  // Для Node.js скриптов (если есть)
  {
    files: ['scripts/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
    },
    rules: {
      'no-restricted-syntax': 'off', // Отключаем правило для скриптов
    },
  },

  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js', 'eslint.config.mjs'],
  },
]
