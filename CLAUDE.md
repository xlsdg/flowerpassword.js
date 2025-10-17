# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JavaScript/TypeScript library that implements the Flower Password algorithm. It's a lightweight package that generates secure passwords based on a master password and a key using MD5/HMAC-MD5 hashing with a specific transformation algorithm.

**Version 5.0.0** is the current version - see [Version History](#version-history) for migration details.

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
- **Hot Reload**: Edit `src/flowerPassword.ts` and see changes instantly in the browser

### CI/CD Automation

The project uses GitHub Actions for automated CI/CD. See [.github/CICD_SETUP.md](.github/CICD_SETUP.md) for complete setup instructions.

**Workflows:**

- **CI** - Runs tests and builds on every push/PR (Node.js 20.x, 22.x)
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

- Entry point: `src/flowerPassword.ts` (specified in package.json as "source")
- Output directory: `dist/` (git-ignored, generated on build)
- Build outputs:
  - `dist/flowerPassword.js` - CommonJS (main)
  - `dist/flowerPassword.m.js` - ES Module
  - `dist/flowerPassword.modern.js` - Modern ES Module (default export)
  - `dist/flowerPassword.umd.js` - UMD format
  - `dist/flowerPassword.d.ts` - TypeScript declarations
  - `dist/*.map` - Source maps for all outputs
- The build is configured with `--name fpCode --external all` flags
- Package uses modern `exports` field for conditional exports (ESM/CommonJS)
- **Module system**: Does NOT use `"type": "module"` to ensure proper CommonJS compatibility in environments like Electron
- `prepublishOnly` hook automatically builds before npm publish

## Architecture

### Core Implementation

The entire algorithm is contained in a single file: [src/flowerPassword.ts](src/flowerPassword.ts)

**Algorithm overview:**

1. Takes three parameters: `password` (master password), `key` (site/service identifier), and `length` (2-32 characters, default 16)
2. Validates that `length` is an integer between 2 and 32 (throws `Error` if invalid)
3. Generates an HMAC-MD5 hash from password and key using `blueimp-md5`
4. Creates two additional HMAC-MD5 hashes using the first hash with fixed salt strings ("kise" for rules, "snow" for source)
5. Applies character transformation rules based on a magic string ("sunlovesnow1990090127xykab")
6. Ensures the first character is always alphabetic (replaces with 'K' if numeric)
7. Returns the transformed password at the requested length

### Type System

The function accepts a `number` type for the `length` parameter and performs runtime validation:

- **Integer check**: Uses `Number.isInteger()` to ensure the value is a whole number
- **Range check**: Validates that the length is between `MIN_LENGTH` (2) and `MAX_LENGTH` (32)
- **Error handling**: Throws descriptive `Error` messages for invalid inputs:
  - `"Length must be an integer, got: {value}"` for non-integer values (including `NaN`, `Infinity`)
  - `"Length must be between 2 and 32, got: {value}"` for out-of-range integers

### Dependencies

- **Runtime**:
  - `blueimp-md5` - Mature, well-tested MD5/HMAC-MD5 implementation
- **Dev**:
  - `@types/blueimp-md5` - TypeScript type definitions for blueimp-md5
  - `microbundle` - Zero-configuration bundler for tiny modules
  - `vitest` - Fast unit test framework powered by Vite
  - `@vitest/ui` - UI for Vitest testing framework

### MD5 Implementation

The library uses `blueimp-md5` for reliable MD5/HMAC-MD5 hashing:

- **All environments**: Uses `blueimp-md5` package (browser and Node.js)
- **Synchronous**: No async/await needed
- **Proven**: Mature library with 1.2k+ GitHub stars
- **Small**: ~2KB minified
- **Compatible**: Same algorithm output as previous versions

## Testing

The project uses **Vitest** as the testing framework.

### Test Structure

- Test files: `src/**/*.test.ts`
- Configuration: [vitest.config.ts](vitest.config.ts)
- Main test file: [src/flowerPassword.test.ts](src/flowerPassword.test.ts)

### Test Coverage

The test suite includes:

- **Basic functionality tests** - Password generation, consistency, uniqueness
- **Length validation tests** - All supported lengths from 2 to 32 characters
- **First character requirement** - Ensures first character is always alphabetic
- **Character composition tests** - Validates alphanumeric output with mixed case
- **Real-world examples** - Test vectors for algorithm consistency verification
- **Edge cases** - Empty strings, special characters, unicode, very long inputs
- **Type safety tests** - Validates all valid length types work correctly
- **Length validation errors** - Tests runtime error throwing for:
  - Out-of-range values (< 2 or > 32)
  - Non-integer values (floats, NaN, Infinity)

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

## Version History

### Version 5.0.0 - Simplified API (Current)

**Released**: 2025-10-17

This major version simplifies the API by removing async/await and restoring the `blueimp-md5` dependency.

#### Breaking Changes

1. **Single synchronous API**
   - Removed `fpCodeAsync` (async version)
   - Removed `fpCodeSync` (sync version)
   - Single `fpCode()` function works in all environments (synchronous)
   - Old (v4.x): `const pwd = await fpCode("password", "key", 16);`
   - New (v5.0): `const pwd = fpCode("password", "key", 16);`

2. **Restored blueimp-md5 dependency**
   - Uses proven `blueimp-md5` library instead of custom MD5 implementation
   - More reliable and battle-tested
   - Slightly larger bundle (~2KB) but better maintained

#### Migration Guide

**From v4.x to v5.0:**

```javascript
// v4.x (old) - async
import { fpCode } from 'flowerpassword.js';
const password = await fpCode("mypassword", "github.com", 16);

// v4.x (old) - sync (Node.js only)
import { fpCodeSync } from 'flowerpassword.js';
const password = fpCodeSync("mypassword", "github.com", 16);

// v5.0 (new) - single synchronous API
import { fpCode } from 'flowerpassword.js';
const password = fpCode("mypassword", "github.com", 16);
```

**From v3.x to v5.0:**

```javascript
// v3.x (old) - default export
import fpCode from 'flowerpassword.js';
const password = fpCode("mypassword", "github.com", 16);

// v5.0 (new) - named export
import { fpCode } from 'flowerpassword.js';
const password = fpCode("mypassword", "github.com", 16);
```

#### Benefits

- ✅ Simpler API - no async/await needed
- ✅ More reliable - uses battle-tested `blueimp-md5`
- ✅ Less code to maintain - no custom MD5 implementation
- ✅ Same algorithm output (100% compatible with v3.x and v4.x)
- ✅ Works in all environments (Node.js, browsers, Electron)
- ✅ Synchronous execution - no performance overhead from async

#### Compatibility

- **Node.js**: 6+ (tested in CI with 20.x, 22.x)
- **Browsers**: All modern browsers (ES2015+)
  - Chrome 51+
  - Firefox 54+
  - Safari 10+
  - Edge 15+
- **Electron**: Fully supported (both renderer and main process)

### Version 4.0.0 - Native Crypto APIs

**Released**: 2025-10-17 (deprecated in favor of v5.0.0)

This version removed the `blueimp-md5` dependency and used native crypto APIs, but introduced complexity with async/await.

**Note**: This version is now deprecated. Use v5.0.0 instead.

### Version 3.x - Classic Version

**Last Release**: 3.0.2

Used default export and `blueimp-md5` dependency. Simple synchronous API.

**Note**: Upgrade to v5.0.0 for named exports and latest improvements.
