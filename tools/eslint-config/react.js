import antfu from '@antfu/eslint-config'
import { baseOptions, baseOverrideOptions } from './base.js'

export const reactConfig = antfu({
  ...baseOptions,
  react: true,
}, {
  ...baseOverrideOptions,
})
