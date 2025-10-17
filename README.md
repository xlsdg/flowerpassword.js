# flowerpassword.js

[![npm version](https://img.shields.io/npm/v/flowerpassword.js.svg)](https://www.npmjs.com/package/flowerpassword.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> A lightweight, secure password generator based on the Flower Password algorithm. Generate unique passwords for different websites using a single master password.

## Features

- **Single Master Password**: Remember one master password, generate unique passwords for every site
- **Deterministic**: Same input always produces the same output
- **Secure**: Uses MD5 hashing with a proprietary transformation algorithm
- **TypeScript Support**: Full type definitions included
- **Multiple Formats**: CommonJS, ES Module, and UMD builds
- **Zero Dependencies**: No runtime dependencies - uses native crypto APIs
- **Flexible Length**: Supports password lengths from 2 to 32 characters
- **Browser & Node.js**: Works in all modern JavaScript environments
- **Async & Sync APIs**: Choose between async (browser/Node.js) or sync (Node.js only)

## Installation

```bash
npm install flowerpassword.js
```

Or using yarn:

```bash
yarn add flowerpassword.js
```

Or using pnpm:

```bash
pnpm add flowerpassword.js
```

## Usage

### ES Module (Recommended)

```typescript
import { fpCode } from 'flowerpassword.js';

// Generate a 16-character password (async)
const password = await fpCode('myMasterPassword', 'github.com', 16);
console.log(password); // Example: "D04175F7A9c7Ab4a"

// Default length is 16 if not specified
const defaultPassword = await fpCode('myMasterPassword', 'twitter.com');
console.log(defaultPassword); // 16 characters

// Custom length (2-32 characters)
const shortPassword = await fpCode('myMasterPassword', 'bank.com', 12);
console.log(shortPassword); // 12 characters
```

### CommonJS

```javascript
// For synchronous usage in Node.js (recommended)
const { fpCodeSync } = require('flowerpassword.js');

const password = fpCodeSync('myMasterPassword', 'google.com', 16);
console.log(password);

// Or use async version
const { fpCode } = require('flowerpassword.js');

const password = await fpCode('myMasterPassword', 'google.com', 16);
console.log(password);
```

### Electron

The package works seamlessly in Electron applications (both main and renderer processes):

```javascript
// Main process (synchronous - recommended)
const { fpCodeSync } = require('flowerpassword.js');
const password = fpCodeSync('myMasterPassword', 'github.com', 16);
console.log(password);

// Renderer process (async)
import { fpCode } from 'flowerpassword.js';
const password = await fpCode('myMasterPassword', 'github.com', 16);
console.log(password);
```

### Browser (UMD)

```html
<script src="node_modules/flowerpassword.js/dist/flowerpassword.umd.js"></script>
<script>
  // The fpCode object is globally available with both fpCode and fpCodeSync
  (async () => {
    const password = await fpCode.fpCode('myMasterPassword', 'example.com', 16);
    console.log(password);
  })();
</script>
```

## API

### `fpCode(password, key, length?)` (Async)

Generates a unique password based on your master password and a key (typically a domain name).

#### Parameters

- **password** `string` (required) - Your master password
- **key** `string` (required) - A unique identifier, typically the website domain (e.g., "github.com")
- **length** `number` (optional) - Desired password length, must be an integer between 2 and 32. Default: `16`

#### Returns

- `Promise<string>` - The generated password

#### Throws

- `Error` - If length is not an integer or is outside the range 2-32

#### Type Signature

```typescript
function fpCode(
  password: string,
  key: string,
  length?: number
): Promise<string>
```

### `fpCodeSync(password, key, length?)` (Node.js only)

Synchronous version of `fpCode` for Node.js environments.

#### Parameters

Same as `fpCode`

#### Returns

- `string` - The generated password

#### Throws

- `Error` - If length is not an integer or is outside the range 2-32

#### Type Signature

```typescript
function fpCodeSync(
  password: string,
  key: string,
  length?: number
): string
```

## How It Works

The Flower Password algorithm:

1. Combines your master password with the key using MD5 hashing
2. Generates two additional MD5 hashes with fixed salts ("kise" for rules, "snow" for source)
3. Applies character transformation rules based on a magic string
4. Ensures the first character is always alphabetic
5. Returns the password at your requested length

This ensures:

- **Consistency**: Same inputs always produce the same password
- **Uniqueness**: Different keys produce completely different passwords
- **Security**: The original master password cannot be reverse-engineered
- **Usability**: Passwords contain mixed-case alphanumeric characters

## Examples

```typescript
import { fpCode } from 'flowerpassword.js';

// Different websites get different passwords
await fpCode('master123', 'github.com', 16);   // "D04175F7A9c7Ab4a"
await fpCode('master123', 'twitter.com', 16);  // "K8d3B5e9C2a1F7b6"
await fpCode('master123', 'google.com', 16);   // "A1b2C3d4E5f6G7h8"

// Same master password + key = same result (deterministic)
await fpCode('master123', 'github.com', 16);   // Always "D04175F7A9c7Ab4a"

// Different lengths
await fpCode('master123', 'github.com', 8);    // "D04175F7"
await fpCode('master123', 'github.com', 12);   // "D04175F7A9c7"
await fpCode('master123', 'github.com', 32);   // Full 32-character password

// First character is always alphabetic
await fpCode('anypassword', 'anysite', 16);    // Never starts with a number
```

## Development

### Interactive Playground

Run the interactive development server with a live demo:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to see the interactive playground where you can test password generation in real-time.

### Commands

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Build the library
npm run build

# Development mode (watch)
npm run dev:lib
```

## TypeScript

This package includes TypeScript definitions out of the box. The function performs runtime validation to ensure you only use valid length values (2-32):

```typescript
import { fpCode, fpCodeSync } from 'flowerpassword.js';

// ✅ Valid - integers between 2 and 32 (async)
const password1 = await fpCode('master', 'site.com', 16);
const password2 = await fpCode('master', 'site.com', 32);
const password3 = await fpCode('master', 'site.com', 2);

// ✅ Valid - synchronous version (Node.js only)
const password4 = fpCodeSync('master', 'site.com', 16);

// ❌ Throws Error: Length must be between 2 and 32
try {
  const password5 = await fpCode('master', 'site.com', 50);
} catch (error) {
  console.error(error.message); // "Length must be between 2 and 32, got: 50"
}

// ❌ Throws Error: Length must be an integer
try {
  const password6 = await fpCode('master', 'site.com', 16.5);
} catch (error) {
  console.error(error.message); // "Length must be an integer, got: 16.5"
}
```

## Browser Compatibility

Works in all environments that support ES2015 (ES6):

- Chrome 51+
- Firefox 54+
- Safari 10+
- Edge 15+
- Node.js 6+

## Security Note

⚠️ **Important**: While Flower Password provides a convenient way to generate unique passwords, please note:

- The algorithm uses MD5, which is not cryptographically secure by modern standards
- This is best used as a password generation tool, not for cryptographic security
- Always use additional security measures like 2FA when available
- Consider using a dedicated password manager for maximum security

## Related Projects

- [Flower Password Chrome Extension](https://github.com/xlsdg/flowerpassword-extension)
- [Original Flower Password](https://github.com/liushuaikobe/flowerpassword)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE) © [xLsDg](https://github.com/xlsdg)

## Author

**xLsDg** - [xlsdg@qq.com](mailto:xlsdg@qq.com) - [https://xlsdg.org](https://xlsdg.org)

## Support

- 🐛 [Report Bug](https://github.com/xlsdg/flowerpassword.js/issues)
- 💡 [Request Feature](https://github.com/xlsdg/flowerpassword.js/issues)
- ⭐ Star this project if you find it useful!
