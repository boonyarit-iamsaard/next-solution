import antfu from '@antfu/eslint-config'

export const reactConfig = antfu({
  formatters: true,
  react: true,
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': [
        'off',
      ],
    },
  },
})
