# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JavaScript/TypeScript library that implements the Flower Password algorithm. It's a lightweight package that generates secure passwords based on a master password and a key using MD5 hashing with a specific transformation algorithm.

## Build System

The project uses **microbundle** as its build tool, which handles TypeScript compilation and creates multiple output formats from a single source file.

### Key Commands

- **Development Server**: `npm run dev` - Starts Vite dev server with hot reload at <http://localhost:3000> (interactive playground)
- **Development (Library)**: `npm run dev:lib` - Runs microbundle in watch mode for library development
- **Build**: `npm run build` - Compiles TypeScript and generates all distribution formats (CJS, ESM, UMD, Modern)
- **Test**: `npm test` - Runs unit tests once
- **Test (watch)**: `npm run test:watch` - Runs tests in watch mode for TDD
- **Test (UI)**: `npm run test:ui` - Opens Vitest UI for interactive testing
- **Test (coverage)**: `npm run test:coverage` - Runs tests with code coverage report
- **Release**: `npm run release:patch|minor|major` - Bumps version and publishes to npm (local workflow)

### Development Experience

The project includes an interactive development playground:

- **Location**: [example/index.html](example/index.html)
- **Features**:
  - Live preview with hot module reload
  - Interactive form with master password, key, and length inputs
  - Real-time password generation
  - One-click copy to clipboard
  - Password statistics (length, uppercase, lowercase counts)
  - Quick example presets
  - Auto-updates version from package.json
- **Access**: Run `npm run dev` and open <http://localhost:3000>
- **Hot Reload**: Edit `src/flowerpassword.ts` and see changes instantly in the browser

### CI/CD Automation

The project uses GitHub Actions for automated CI/CD. See [.github/CICD_SETUP.md](.github/CICD_SETUP.md) for complete setup instructions.

**Workflows:**

- **CI** - Runs tests and builds on every push/PR (Node.js 18.x, 20.x, 22.x)
- **Release** - Automatically creates GitHub Release and publishes to npm when version tags are pushed
- **Manual Release** - Allows manual release from GitHub UI with automatic version bumping

**Automated Release Process:**

```bash
# Option 1: Tag-based (recommended)
npm version patch  # Creates tag locally
git push origin master --follow-tags  # Triggers automated release

# Option 2: Manual from GitHub UI
# Go to Actions → Manual Release → Run workflow
```

### Build Configuration

- Entry point: `src/flowerpassword.ts` (specified in package.json as "source")
- Output directory: `dist/` (git-ignored, generated on build)
- Build outputs:
  - `dist/flowerpassword.js` - CommonJS (main)
  - `dist/flowerpassword.m.js` - ES Module
  - `dist/flowerpassword.modern.js` - Modern ES Module (default export)
  - `dist/flowerpassword.umd.js` - UMD format
  - `dist/flowerpassword.d.ts` - TypeScript declarations
  - `dist/*.map` - Source maps for all outputs
- The build is configured with `--name fpCode --external all` flags
- Package uses modern `exports` field for conditional exports (ESM/CommonJS)
- `prepublishOnly` hook automatically builds before npm publish

## Architecture

### Core Implementation

The entire algorithm is contained in a single file: [src/flowerpassword.ts](src/flowerpassword.ts)

**Algorithm overview:**

1. Takes three parameters: `password` (master password), `key` (site/service identifier), and `length` (2-32 characters, default 16)
2. Generates an MD5 hash from password and key
3. Creates two additional MD5 hashes using the first hash with fixed salt strings ("kise" for rules, "snow" for source)
4. Applies character transformation rules based on a magic string ("sunlovesnow1990090127xykab")
5. Ensures the first character is always alphabetic (replaces with 'K' if numeric)
6. Returns the transformed password at the requested length

### Type System

The `Length` type is a union of literal numbers from 2 to 32, enforcing valid password lengths at compile time.

### Dependencies

- **Runtime**: `blueimp-md5` - MD5 hashing implementation (external dependency)
- **Dev**:
  - `microbundle` - Zero-configuration bundler for tiny modules
  - `@types/blueimp-md5` - TypeScript type definitions for blueimp-md5
  - `vitest` - Fast unit test framework powered by Vite
  - `@vitest/ui` - UI for Vitest testing framework

## Testing

The project uses **Vitest** as the testing framework.

### Test Structure

- Test files: `src/**/*.test.ts`
- Configuration: [vitest.config.ts](vitest.config.ts)
- Main test file: [src/flowerpassword.test.ts](src/flowerpassword.test.ts)

### Test Coverage

The test suite includes:

- **Basic functionality tests** - Password generation, consistency, uniqueness
- **Length validation tests** - All supported lengths from 2 to 32 characters
- **First character requirement** - Ensures first character is always alphabetic
- **Character composition tests** - Validates alphanumeric output with mixed case
- **Real-world examples** - Test vectors for algorithm consistency verification
- **Edge cases** - Empty strings, special characters, unicode, very long inputs
- **Type safety tests** - Validates all valid length types work correctly

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Open interactive test UI
npm run test:ui

# Generate code coverage report
npm run test:coverage
```

## TypeScript Configuration

- Target: ES2015 for better compatibility with modern browsers while maintaining broad support
- Module: ES2015
- Library: ES2015
- Strict mode enabled for better type safety
- Source maps and declaration maps enabled for debugging
- Additional strictness: noUnusedLocals, noUnusedParameters, noImplicitReturns
- Includes: `./src/**/*`
- Excludes: `dist`, `node_modules`, test files
