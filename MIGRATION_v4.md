# Migration Guide: v3.x → v4.0.0

## Overview

Version 4.0.0 removes the `blueimp-md5` dependency and uses native crypto APIs instead. This is a **breaking change** that requires code updates.

## What Changed?

### ✅ Benefits

- **Zero runtime dependencies** - No external packages needed
- **Smaller bundle size** - ~2KB reduction
- **Better security** - Uses platform-native crypto APIs
- **Same output** - 100% algorithm-compatible with v3.x
- **Dual API** - Both async and sync versions available

### ⚠️ Breaking Changes

1. **Named exports instead of default export**
   - Changed from `export default` to `export { fpCode, fpCodeSync }`
   - Requires using named imports: `import { fpCode } from 'flowerpassword.js'`

2. **Main export is now async**
   - `fpCode()` returns `Promise<string>` instead of `string`
   - Requires `await` or `.then()` in your code

3. **New sync function for Node.js**
   - `fpCodeSync()` provides synchronous API
   - Only available in Node.js (throws error in browsers)

4. **Removed dependencies**
   - `blueimp-md5` removed
   - `@types/blueimp-md5` removed

## Migration Steps

### Browser Code

**Before (v3.x):**
```javascript
import fpCode from 'flowerpassword.js';

function handleClick() {
  const password = fpCode("mypassword", "github.com", 16);
  console.log(password);
}
```

**After (v4.x):**
```javascript
import { fpCode } from 'flowerpassword.js';

async function handleClick() {
  const password = await fpCode("mypassword", "github.com", 16);
  console.log(password);
}

// Or with .then()
function handleClick() {
  fpCode("mypassword", "github.com", 16)
    .then(password => console.log(password));
}
```

### Node.js Code (Synchronous)

**Before (v3.x):**
```javascript
const fpCode = require('flowerpassword.js');
const password = fpCode("mypassword", "github.com", 16);
```

**After (v4.x):**
```javascript
const { fpCodeSync } = require('flowerpassword.js');
const password = fpCodeSync("mypassword", "github.com", 16);
```

### Node.js Code (Asynchronous)

**Before (v3.x):**
```javascript
const fpCode = require('flowerpassword.js');
const password = fpCode("mypassword", "github.com", 16);
```

**After (v4.x):**
```javascript
// CommonJS
const { fpCode } = require('flowerpassword.js');

async function getPassword() {
  const password = await fpCode("mypassword", "github.com", 16);
  return password;
}
```

### ES Modules (Node.js)

**Before (v3.x):**
```javascript
import fpCode from 'flowerpassword.js';
const password = fpCode("mypassword", "github.com", 16);
```

**After (v4.x):**
```javascript
// Option 1: Use async
import { fpCode } from 'flowerpassword.js';
const password = await fpCode("mypassword", "github.com", 16);

// Option 2: Use sync (Node.js only)
import { fpCodeSync } from 'flowerpassword.js';
const password = fpCodeSync("mypassword", "github.com", 16);
```

## API Reference

### `fpCode(password, key, length)` - Async (named export)

```typescript
async function fpCode(
  password: string,
  key: string,
  length?: number
): Promise<string>
```

- **Works in**: Node.js, browsers, Electron
- **Returns**: `Promise<string>`
- **Import**: `import { fpCode } from 'flowerpassword.js'`
- **Example**: `await fpCode("pass", "site.com", 16)`

### `fpCodeSync(password, key, length)` - Sync (Node.js only)

```typescript
function fpCodeSync(
  password: string,
  key: string,
  length?: number
): string
```

- **Works in**: Node.js only
- **Returns**: `string`
- **Import**: `import { fpCodeSync } from 'flowerpassword.js'`
- **Throws**: Error if used in browser
- **Example**: `fpCodeSync("pass", "site.com", 16)`

## Testing Your Migration

After updating your code, verify:

1. **Same output**: Passwords generated should be identical to v3.x
2. **Error handling**: Length validation still throws errors for invalid inputs
3. **Browser compatibility**: Async code works in target browsers
4. **Node.js compatibility**: Sync code works in Node.js environments

## Compatibility

- **Node.js**: 20.x, 22.x (tested)
- **Browsers**: Chrome 37+, Firefox 34+, Safari 11+, Edge 12+
- **Electron**: Full support (renderer and main process)

## Rollback

If you encounter issues, you can temporarily rollback:

```bash
npm install flowerpassword.js@3.0.12
```

Then file an issue at: https://github.com/xlsdg/flowerpassword.js/issues

## Need Help?

- **Documentation**: See [CLAUDE.md](./CLAUDE.md)
- **Issues**: https://github.com/xlsdg/flowerpassword.js/issues
- **Examples**: Check [example/index.html](./example/index.html)
