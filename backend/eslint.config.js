import baseConfig from '../eslint.config.js'
import globals from 'globals'

export default [
  ...baseConfig,

  // Backend-specific правила
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-process-env': 'off', // Разрешаем process.env для бэкенда
    },
  },

  // Игнорируемые файлы для бэкенда
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
]
