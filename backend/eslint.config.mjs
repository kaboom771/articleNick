import baseConfig from '../eslint.config.js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,

  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },
]
