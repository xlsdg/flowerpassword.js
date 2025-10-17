# Development Playground Guide

## Quick Start

```bash
# Start the interactive development server
npm run dev
```

This will:

- Start Vite development server at <http://localhost:3000>
- Auto-open in your default browser
- Enable hot module reload (HMR)

## Features

### 🎨 Interactive UI

- **Beautiful gradient interface** with smooth animations
- **Responsive design** works on mobile and desktop
- **Dark-themed accents** with professional styling

### 🔐 Password Generation

- **Master Password Input** - Your secret password (with password masking)
- **Key/Domain Input** - Website or service identifier
- **Length Control** - Dual input (slider + number) for 2-32 characters
- **Generate Button** - Creates password with smooth animation

### 📊 Live Statistics

After generation, you'll see:

- Total password length
- Number of uppercase letters
- Number of lowercase letters

### 📋 Quick Copy

- **One-click copy** to clipboard
- **Visual feedback** when copied (button turns green)
- **Auto-reset** after 2 seconds

### ⚡ Quick Examples

Pre-configured examples for instant testing:

- **GitHub** - test123 + github.com (16 chars)
- **Google** - mypassword + google.com (20 chars)
- **Example** - secure2024 + example.com (12 chars)

Click any example to auto-fill and generate!

## Hot Reload Workflow

1. **Start dev server**: `npm run dev`
2. **Edit source code**: Modify `src/flowerPassword.ts`
3. **See changes instantly**: Browser auto-updates without refresh
4. **Debug easily**: Check browser console for logs

## Development Tips

### Testing Algorithm Changes

```typescript
// Edit src/flowerPassword.ts
const MAGIC_STRING = "your_new_string";  // Change this
// Save file → Browser updates automatically!
```

### Debugging

Open browser DevTools (F12) to see:

```
🌸 Flower Password Development Server
Hot reload is enabled - edit source files to see changes!
```

### Version Display

The playground automatically fetches and displays the version from `package.json`.

## Comparison: Before vs After

### Before 😢

```bash
# Old workflow
1. Edit src/flowerPassword.ts
2. npm run build
3. Open example/index.html manually in browser
4. See basic "document.write" output
5. Repeat for every change
```

### After 🎉

```bash
# New workflow
1. npm run dev (once)
2. Edit src/flowerPassword.ts
3. See changes instantly in beautiful UI
4. Test with interactive forms
5. Copy generated passwords easily
```

## Available Scripts

```bash
# Interactive development playground (recommended)
npm run dev

# Library build watch mode (for package development)
npm run dev:lib

# Production build
npm run build

# Run tests
npm test
```

## Tech Stack

- **Vite** - Lightning-fast dev server with HMR
- **Native ES Modules** - Direct TypeScript import in browser
- **No build step needed** - Edit and see changes instantly
- **Modern CSS** - Gradients, animations, flexbox/grid

## Tips

- 💡 Use **Quick Examples** for fast testing
- 💡 Open **DevTools** to see console logs
- 💡 **Bookmark** localhost:3000 for quick access
- 💡 Edit styles **directly in DevTools** to experiment
- 💡 Press **Ctrl+C** in terminal to stop server

Enjoy your enhanced development experience! 🚀
