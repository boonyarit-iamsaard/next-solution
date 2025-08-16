import antfu from '@antfu/eslint-config'

/** @type {Parameters<typeof antfu>[0]} */
export const baseOptions = {
  formatters: true,
  typescript: true,
}

/** @type {Parameters<typeof antfu>[1]} */
export const baseOverrideOptions = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ExportDefaultDeclaration[declaration.type=\'ObjectExpression\']',
        message: 'Direct object literal default exports are not allowed. Assign to a variable first.',
      },
    ],
    'ts/consistent-type-definitions': [
      'off',
    ],
  },
}

export const baseConfig = antfu({
  ...baseOptions,
}, {
  ...baseOverrideOptions,
})
