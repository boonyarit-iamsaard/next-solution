# Turborepo Code Generator

This directory contains code generators for creating new packages in the Next Solution monorepo.

## Usage

Generate a new package or bounded context:

```bash
pnpm turbo gen package
```

The generator will prompt you for:

- **Package name** (automatically prefixed with `@next-solution/`)
- **Package type**:
  - `Internal Package (packages/)` - Shared libraries and utilities
  - `Bounded Context (contexts/)` - Domain bounded contexts
- **Dependencies** (optional space-separated list)

## Generated Structure

Each package is created with:

**Internal Package (packages/):**

```text
packages/{name}/
├── package.json           # Package config with workspace dependencies
├── eslint.config.mjs      # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── tsup.config.ts         # Build configuration
├── lint-staged.config.mjs # Git hooks configuration
└── src/
    └── index.ts           # Main entry point (exports PACKAGE_NAME)
```

**Bounded Context (contexts/):**

```text
contexts/{name}/
├── package.json           # Context config with workspace dependencies
├── eslint.config.mjs      # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── tsup.config.ts         # Build configuration
├── lint-staged.config.mjs # Git hooks configuration
└── src/
    └── index.ts           # Main entry point (exports CONTEXT_NAME)
```

## Build Output

After running `pnpm build`, each package generates:

```text
dist/
├── index.js           # ESM JavaScript bundle
├── index.d.ts         # TypeScript declarations
└── index.js.map       # Source map for debugging
```

**Important**: Packages include `"type": "module"` to ensure proper ESM handling and `.d.ts` generation (not `.d.mts`).

## How It Works

### Generator Configuration

The main generator logic is in `generators/config.ts`:

- Uses Plop.js for templating and file generation
- Prompts for user input
- Processes templates with Handlebars
- Automatically installs dependencies and runs linting

### Templates

Templates are located in `generators/templates/` and use Handlebars syntax:

- `package.json.hbs` - Internal package configuration template
- `context-package.json.hbs` - Bounded context package configuration template
- `eslint.config.mjs.hbs` - ESLint configuration template
- `tsconfig.json.hbs` - TypeScript configuration template
- `tsup.config.ts.hbs` - Build configuration template
- `lint-staged.config.mjs.hbs` - Git hooks configuration template

### Template Variables

Available variables in templates:

- `{{ name }}` - Package name without scope (e.g., "auth")
- `{{ type }}` - Package type ("internal" or "context")

## Adding New Templates

1. Create a new `.hbs` file in `generators/templates/`
2. Add the template action to `generators/config.ts`:

```handlebars
{
  type: 'add',
  path: '{{#if (eq type "context")}}contexts{{else}}packages{{/if}}/{{ name }}/filename.ext',
  templateFile: 'templates/filename.ext.hbs',
}
```

## Updating Templates

1. Edit the corresponding `.hbs` file in `generators/templates/`
2. Templates are processed immediately - no rebuild required
3. Test with a new package generation

## Template Syntax

Use Handlebars syntax for dynamic content:

```handlebars
{
  "name": "@next-solution/{{ name }}",
  "scripts": {
    "build": "tsup"
  }
}
```

## Post-Generation Actions

The generator automatically:

1. Installs dependencies with `pnpm i`
2. Runs `pnpm lint:fix` to format code
3. Processes any custom dependencies from user input

## Dependencies

- `@turbo/gen` - Turborepo generator framework
- Uses Plop.js under the hood for templating
