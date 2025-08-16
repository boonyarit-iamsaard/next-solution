# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Instruction Reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.

## Development Commands

This is a Turbo monorepo managed with pnpm. Use these commands for development:

- `pnpm dev` - Start all apps in development mode (web on port 3000, admin on port 4000)
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Run ESLint across all packages
- `pnpm lint:fix` - Run ESLint with auto-fix across all packages
- `pnpm typecheck` - Run TypeScript type checking across all packages
- `pnpm clean` - Clean all build artifacts and node_modules

For individual apps/packages, navigate to their directory and use the same commands (e.g., `cd apps/web && pnpm dev`).

## Project Architecture

### Monorepo Structure

- `apps/web/` - Next.js 15 web application (port 3000)
- `apps/admin/` - Next.js 15 admin application (port 4000)
- `packages/ui/` - Shared React component library with Tailwind CSS v4
- `tools/eslint-config/` - Shared ESLint configurations (@antfu/eslint-config based)
- `tools/typescript-config/` - Shared TypeScript configurations

### Key Technical Details

- **Package Manager**: pnpm with workspace protocol for internal dependencies
- **Build System**: Turborepo for orchestrating builds and caching
- **Framework**: Next.js 15 with React 19 and Turbopack for development
- **Styling**: Tailwind CSS v4 (latest version) in the UI package
- **Code Quality**: ESLint with @antfu/eslint-config, lint-staged with Husky
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
- Catalog dependencies: `@types/node`, `eslint`, `lint-staged`, `typescript`
- Workspace protocol (`workspace:*`) links internal packages
- All packages use ESM (`"type": "module"`)

## Component Library (UI Package)

- **shadcn/ui Integration**: Components follow shadcn/ui patterns with Tailwind CSS v4
- **Export Structure**: Path-based exports (e.g., `@next-solution/ui/components/base/button`)
- **Component Architecture**: Uses class-variance-authority (CVA) for variant management
- **Styling Approach**: Tailwind CSS v4 with CSS variables and design tokens
- **Icon Library**: Lucide React icons
- **Key Dependencies**: Radix UI primitives, clsx, tailwind-merge

## Code Quality Setup

- **ESLint**: Based on @antfu/eslint-config with custom overrides
- **TypeScript**: Strict configuration with `noUncheckedIndexedAccess`
- **Husky + lint-staged**: Pre-commit hooks for code quality
- **Caching**: ESLint and TypeScript use `.cache/` directory

## Turborepo Configuration

- Build tasks have dependency ordering (`dependsOn: ["^build"]`)
- Development tasks run persistently without caching
- Lint and typecheck tasks depend on build completion
- Cache is stored in `.cache/` directory
