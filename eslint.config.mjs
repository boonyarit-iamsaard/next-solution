import { baseConfig } from '@next-solution/eslint-config'

export default baseConfig.append({
  ignores: [
    'pnpm-lock.yaml',
  ],
})
