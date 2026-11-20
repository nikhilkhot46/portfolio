import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'scripts/**'],
  },
  nextPlugin.configs['core-web-vitals'],
]
