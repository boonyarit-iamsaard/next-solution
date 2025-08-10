import antfu from '@antfu/eslint-config'

export const nextConfig = antfu({
  formatters: true,
  react: true,
  nextjs: true,
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': [
        'off',
      ],
    },
  },
})
