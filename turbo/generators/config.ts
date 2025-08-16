import type { PlopTypes } from '@turbo/gen'
import { execSync } from 'node:child_process'

interface PackageJson {
  name: string
  scripts: Record<string, string>
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Add the eq helper for conditional logic
  plop.setHelper('eq', (a, b) => a === b)

  plop.setGenerator('package', {
    description: 'Generate a new package for the Next Solution monorepo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'What is the name of the package? (You can skip the `@next-solution/` prefix)',
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type of package is this?',
        choices: [
          { name: 'Internal Package (packages/)', value: 'internal' },
          { name: 'Bounded Context (contexts/)', value: 'context' },
        ],
        default: 'internal',
      },
      {
        type: 'input',
        name: 'deps',
        message:
          'Enter a space separated list of dependencies you would like to install (optional)',
      },
    ],
    actions: [
      (answers) => {
        if ('name' in answers && typeof answers.name === 'string') {
          if (answers.name.startsWith('@next-solution/')) {
            answers.name = answers.name.replace('@next-solution/', '')
          }
        }
        return 'Config sanitized'
      },
      {
        type: 'add',
        path: '{{#if (eq type "context")}}contexts{{else}}packages{{/if}}/{{ name }}/eslint.config.mjs',
        templateFile: 'templates/eslint.config.mjs.hbs',
      },
      {
        type: 'add',
        path: '{{#if (eq type "context")}}contexts{{else}}packages{{/if}}/{{ name }}/package.json',
        templateFile: '{{#if (eq type "context")}}templates/context-package.json.hbs{{else}}templates/package.json.hbs{{/if}}',
      },
      {
        type: 'add',
        path: '{{#if (eq type "context")}}contexts{{else}}packages{{/if}}/{{ name }}/tsconfig.json',
        templateFile: 'templates/tsconfig.json.hbs',
      },
      {
        type: 'add',
        path: '{{#if (eq type "context")}}contexts{{else}}packages{{/if}}/{{ name }}/tsup.config.ts',
        templateFile: 'templates/tsup.config.ts.hbs',
      },
      {
        type: 'add',
        path: '{{#if (eq type "context")}}contexts{{else}}packages{{/if}}/{{ name }}/lint-staged.config.mjs',
        templateFile: 'templates/lint-staged.config.mjs.hbs',
      },
      {
        type: 'add',
        path: '{{#if (eq type "context")}}contexts{{else}}packages{{/if}}/{{ name }}/src/index.ts',
        template: 'export const {{#if (eq type "context")}}CONTEXT{{else}}PACKAGE{{/if}}_NAME = \'@next-solution/{{ name }}\'',
      },
      {
        type: 'modify',
        path: '{{#if (eq type "context")}}contexts{{else}}packages{{/if}}/{{ name }}/package.json',
        async transform(content, answers) {
          if ('deps' in answers && typeof answers.deps === 'string' && answers.deps.trim()) {
            const pkg = JSON.parse(content) as PackageJson
            for (const dep of answers.deps.split(' ').filter(Boolean)) {
              try {
                const version = await fetch(
                  `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
                )
                  .then(res => res.json())
                  .then(json => json.latest)
                if (!pkg.dependencies)
                  pkg.dependencies = {}
                pkg.dependencies[dep] = `^${version}`
              }
              catch {
                console.warn(`Could not fetch version for ${dep}`)
              }
            }
            return JSON.stringify(pkg, null, 2)
          }
          return content
        },
      },
      async (answers) => {
        /**
         * Install deps and format everything
         */
        if ('name' in answers && typeof answers.name === 'string') {
          execSync('pnpm i', { stdio: 'inherit' })
          execSync('pnpm lint:fix', { stdio: 'inherit' })
          return 'Package scaffolded'
        }
        return 'Package not scaffolded'
      },
    ],
  })
}
