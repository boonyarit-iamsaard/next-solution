import { baseConfig } from '@next-solution/eslint-config'

const config = baseConfig.append({
  ignores: [
    'apps/*',
    'packages/*',
    'tools/*',
    '!tools/typescript-config',
    'pnpm-lock.yaml',
    '.pnpm-store',
  ],
})

export default config
