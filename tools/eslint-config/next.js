import antfu from '@antfu/eslint-config'
import { baseOptions, baseOverrideOptions } from './base.js'

export const nextConfig = antfu({
  ...baseOptions,
  react: true,
  nextjs: true,
}, {
  ...baseOverrideOptions,
})
