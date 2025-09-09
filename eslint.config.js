import pluginJs from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintReact from 'eslint-plugin-react'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'

// Вместо прямого импорта конфигов, используем flat config style
const tsConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...tsPlugin.configs.recommended.rules,
    // Добавьте здесь любые кастомные правила TypeScript
  },
}

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: eslintReact,
      prettier: prettierPlugin,
      import: pluginImport,
    },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  pluginJs.configs.recommended,
  tsConfig, // ← используем наш кастомный TS конфиг

  pluginReact.configs.flat.recommended,
  {
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
            orderImportKind: 'asc',
          },
        },
      ],
      // Добавлено правило для проверки плавающих промисов
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreVoid: false, // запрещает использование void для игнорирования промисов
          ignoreIIFE: false, // запрещает немедленно вызываемые функции
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      curly: ['error', 'all'],
      'no-irregular-whitespace': ['error', { skipTemplates: true, skipStrings: true }],
      'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
    },
  },
]
