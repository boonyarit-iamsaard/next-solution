import antfu from '@antfu/eslint-config'
import { baseOptions } from './base.js'

export const nextConfig = antfu({
  ...baseOptions,
  react: true,
  nextjs: true,
})
