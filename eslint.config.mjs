import { baseConfig } from '@pet-shop/eslint-config'

export default baseConfig.append({
  ignores: [
    'pnpm-lock.yaml',
  ],
})
