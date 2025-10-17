# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JavaScript/TypeScript library that implements the Flower Password algorithm. It's a lightweight package that generates secure passwords based on a master password and a key using MD5/HMAC-MD5 hashing with a specific transformation algorithm.

**Version 4.0.0** introduced significant breaking changes - see [Version History](#version-history) for migration details.

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
3. Generates an MD5 hash from password and key
4. Creates two additional MD5 hashes using the first hash with fixed salt strings ("kise" for rules, "snow" for source)
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

- **Runtime**: None - Uses native crypto APIs (Node.js `crypto` module and Web Crypto API)
- **Dev**:
  - `microbundle` - Zero-configuration bundler for tiny modules
  - `vitest` - Fast unit test framework powered by Vite
  - `@vitest/ui` - UI for Vitest testing framework

### MD5 Implementation

The library uses platform-native crypto APIs instead of external dependencies:

- **Node.js**: Uses built-in `crypto` module for MD5/HMAC-MD5
- **Browser**: Uses Web Crypto API for MD5/HMAC-MD5
- **Compatibility**: Fully compatible with `blueimp-md5` HMAC behavior
- **Implementation**: [src/md5.ts](src/md5.ts) provides both async and sync variants

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

### Version 4.0.0 - Breaking Changes

**Released**: 2025-01-XX

This major version removes the external `blueimp-md5` dependency and uses native crypto APIs instead.

#### Breaking Changes

1. **Named exports instead of default export**
   - Changed from `export default` to named exports
   - Old: `import fpCode from 'flowerpassword.js'`
   - New: `import { fpCode } from 'flowerpassword.js'`

2. **Async API by default**
   - The `fpCode()` function is now **async** and returns a `Promise<string>`
   - Old (v3.x): `const pwd = fpCode("password", "key", 16);`
   - New (v4.x): `const pwd = await fpCode("password", "key", 16);`

3. **New sync function for Node.js**
   - Added `fpCodeSync()` for synchronous usage in Node.js
   - Browser users must use the async version
   - Example: `import { fpCodeSync } from 'flowerpassword.js';`

4. **Zero runtime dependencies**
   - Removed `blueimp-md5` dependency
   - Package size reduced by ~2KB
   - Uses native `crypto` module in Node.js
   - Uses Web Crypto API in browsers

#### Migration Guide

**For Browser Users:**

```javascript
// v3.x (old)
import fpCode from 'flowerpassword.js';
const password = fpCode("mypassword", "github.com", 16);

// v4.x (new) - use named import and await
import { fpCode } from 'flowerpassword.js';
const password = await fpCode("mypassword", "github.com", 16);

// Or use in an event handler
button.addEventListener('click', async () => {
  const password = await fpCode("mypassword", "github.com", 16);
  console.log(password);
});
```

**For Node.js Users (prefer sync):**

```javascript
// v3.x (old)
const fpCode = require('flowerpassword.js');
const password = fpCode("mypassword", "github.com", 16);

// v4.x (new) - use fpCodeSync
const { fpCodeSync } = require('flowerpassword.js');
const password = fpCodeSync("mypassword", "github.com", 16);
```

**For Node.js Users (async):**

```javascript
// v3.x (old)
const fpCode = require('flowerpassword.js');
const password = fpCode("mypassword", "github.com", 16);

// v4.x (new) - use named import and async/await
const { fpCode } = require('flowerpassword.js');
const password = await fpCode("mypassword", "github.com", 16);
```

#### Benefits

- ✅ Zero external dependencies
- ✅ Smaller package size (~2KB reduction)
- ✅ Better security (uses platform-native crypto)
- ✅ Same algorithm output (100% compatible with v3.x)
- ✅ Both async and sync APIs available
- ✅ Works in Node.js, browsers, and Electron

#### Compatibility

- **Node.js**: 20.x, 22.x (tested in CI)
- **Browsers**: Modern browsers with Web Crypto API support
  - Chrome 37+
  - Firefox 34+
  - Safari 11+
  - Edge 12+
- **Electron**: Fully supported (both renderer and main process)
