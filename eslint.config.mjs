import { baseConfig } from '@next-solution/eslint-config'

const config = baseConfig.append({
  ignores: [
    'apps/*',
    'packages/*',
    'tools/*',
    '!tools/typescript-config',
    'pnpm-lock.yaml',
  ],
})

export default config
