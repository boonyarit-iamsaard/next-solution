# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Instruction Reminders

When regenerating this file using `/init`, always compare the content with `GEMINI.md` to ensure consistency. If the analysis reveals that `GEMINI.md` is outdated, notify the user that it needs to be updated.

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
ALWAYS wrap package names (e.g., `@scope/package`) and code snippets in backticks (`) to prevent parsing errors.

## Development Commands

This is a Turbo monorepo managed with pnpm. Use these commands for development:

- `pnpm dev` - Start all apps in development mode (web on port 3000, admin on port 4000)
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Run ESLint across all packages
- `pnpm lint:fix` - Run ESLint with auto-fix across all packages
- `pnpm typecheck` - Run TypeScript type checking across all packages
- `pnpm clean` - Clean all build artifacts and node_modules

For individual apps/packages, navigate to their directory and use the same commands (e.g., `cd apps/web && pnpm dev`).

### Local Development Services

Docker Compose services available for local development:

- `docker compose up postgres` - Start PostgreSQL database (port 5432)
- `docker compose up mailpit` - Start Mailpit email testing (web UI on port 8025, SMTP on port 1025)
- `docker compose up` - Start both services

## Project Architecture

### Monorepo Structure

- `apps/web/` - Next.js 15 web application (port 3000)
- `apps/admin/` - Next.js 15 admin application (port 4000)
- `packages/ui/` - Shared React component library with Tailwind CSS v4
- `tools/eslint-config/` - Shared ESLint configurations (`@antfu/eslint-config` based)
- `tools/typescript-config/` - Shared TypeScript configurations

### Key Technical Details

- **Package Manager**: pnpm@10.13.1 with workspace protocol for internal dependencies
- **Build System**: Turborepo for orchestrating builds and caching
- **Framework**: Next.js 15 with React 19 and Turbopack for development
- **Node.js**: >=22 (enforced in package.json engines)
- **Styling**: Tailwind CSS v4 (the latest version) in the UI package
- **Code Quality**: ESLint with `@antfu/eslint-config`, lint-staged with Husky
- **TypeScript**: Strict configuration across all packages

### UI Package Structure

The `@next-solution/ui` package exports components via path mapping:

- `@next-solution/ui/components/base/*` - Base shadcn/ui components
- `@next-solution/ui/helpers/*` - Utility functions (cn, etc.)
- `@next-solution/ui/hooks/*` - Shared React hooks
- `@next-solution/ui/styles/*` - CSS and styling files

### Development Workflow

- Apps use `--turbopack` flag for faster development builds
- ESLint caching is configured for better performance
- Husky + lint-staged ensures code quality on commits

## Package Management

- Uses pnpm catalog feature for centralized dependency versioning
- Catalog dependencies: `@types/node@22.15.3`, `eslint@9.31.0`, `lint-staged@16.1.5`, `typescript@5.8.3`
- Workspace protocol (`workspace:*`) links internal packages
- All packages use ESM (`"type": "module"`)
- Package naming convention: `@next-solution/package-name`

## Component Library (UI Package)

- **shadcn/ui Integration**: Components follow shadcn/ui patterns with Tailwind CSS v4
- **Export Structure**: Path-based exports (e.g., `@next-solution/ui/components/base/button`)
- **Component Architecture**: Uses class-variance-authority (CVA) for variant management
- **Styling Approach**: Tailwind CSS v4 with CSS variables and design tokens
- **Icon Library**: Lucide React icons
- **Key Dependencies**: Radix UI primitives, clsx, tailwind-merge, tw-animate-css
- **Theme**: "new-york" shadcn/ui theme with neutral base colors and OKLCH color system

## Code Quality Setup

- **ESLint**: Based on `@antfu/eslint-config` with custom overrides
- **TypeScript**: Strict configuration with `noUncheckedIndexedAccess`
- **Husky + lint-staged**: Pre-commit hooks for code quality
- **Caching**: ESLint and TypeScript use `.cache/` directory

## Turborepo Configuration

- Build tasks have dependency ordering (`dependsOn: ["^build"]`)
- Development tasks run persistently without caching
- Lint and typecheck tasks depend on build completion
- Cache is stored in `.cache/` directory

## CI/CD

- **GitHub Actions**: Single CI workflow combining build, lint, and typecheck
- **Build Order**: build → lint → typecheck (required for type-aware ESLint rules)
- **Node.js**: 22.x with pnpm@10.13.1
- **Caching**: Uses pnpm cache for faster CI runs

## Code Style

### TypeScript Patterns

- **Strict Mode**: `noUncheckedIndexedAccess` enabled for safer array/object access
- **Module System**: ESM with `"module": "preserve"` (base) or `"esnext"` (React/Next.js)
- **Type Definitions**: Prefer `interface` over `type` unless type alias features required (unions, mapped types, etc.)
- **Modern ES**: Target ES2022 with incremental builds cached in `.cache/`

### Export Patterns

```tsx
// Preferred - direct exports
export function ComponentName({ ...props }: ComponentProps) {
  return <div {...props} />
}

export function utilityFunction() {
  // implementation
}

// shadcn/ui components use named exports for variants
export { Button, buttonVariants }
```

### Interface vs. Type Usage

```tsx
// Prefer interface for object shapes
interface ComponentProps {
  title: string
  isVisible: boolean
}

// Use type alias when type features needed
type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ExtendedProps = ComponentProps & { variant: ButtonVariant }
```

### Import Organization

```tsx
// 1. Type-only imports first
import type { VariantProps } from 'class-variance-authority'

// Path-based UI package imports
import { Button } from '@next-solution/ui/components/base/button'

// 2. Internal package imports
import { cn } from '@next-solution/ui/helpers/cn'
// 3. External libraries
import { Slot } from '@radix-ui/react-slot'

import * as React from 'react'
```

### Component Variants (CVA)

```tsx
const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: { default: 'classes', secondary: 'classes' },
      size: { default: 'classes', sm: 'classes' }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
)
```

### Styling Conventions

- **Tailwind CSS v4**: Use CSS variables with OKLCH color space
- **Class Composition**: Use `cn()` helper for conditional classes
- **Modern CSS**: Leverage `:has()` selectors and `svh` units
- **Dark Mode**: Custom `@custom-variant dark` for theme support

### File Naming

- **Components**: `kebab-case.tsx` (e.g., `button.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `cn.ts`)
- **Configs**: `kebab-case.mjs` for ESM (e.g., `eslint.config.mjs`)

### ESLint Rules

- **Base**: `@antfu/eslint-config` with formatters enabled
- **Custom**: No direct object literal default exports (assign to variable first)
- **Caching**: Uses `.cache/.eslintcache` for performance

## Commit Message Guidelines

Write clear, concise git commit messages following the conventional commit format.

### Format

- Use conventional commit format: `<type>(<scope>): <subject>` or `<type>: <subject>`
- Scope is optional—omit when changes are global or too generic
- Write a subject line in an imperative mood (e.g., "fix bug," not "fixed bug")
- Keep the subject line lowercase except for proper nouns and acronyms
- Limit subject line to 72 characters maximum
- Omit commit message body - keep commits concise
- Do not end the subject line with a period
- Use common commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

### Examples

```text
feat(ui): add button component with variants
fix(web): resolve navigation menu overflow issue
docs: update README with setup instructions
chore: update dependencies to latest versions
ci: add GitHub Actions workflow
fix: resolve pnpm version conflicts
```
