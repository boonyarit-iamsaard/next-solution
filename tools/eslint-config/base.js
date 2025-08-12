import antfu from '@antfu/eslint-config'

/** @type {Parameters<typeof antfu>[0]} */
export const baseOptions = {
  formatters: true,
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': [
        'off',
      ],
    },
  },
}

export const baseConfig = antfu({
  ...baseOptions,
})
