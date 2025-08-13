import { baseConfig } from '@next-solution/eslint-config'

export default baseConfig.append({
  ignores: [
    'apps/*',
    'packages/*',
    'tools/*',
    '!tools/typescript-config',
    'pnpm-lock.yaml',
  ],
})
