import antfu from '@antfu/eslint-config'
import { baseOptions } from './base.js'

export const reactConfig = antfu({
  ...baseOptions,
  react: true,
})
