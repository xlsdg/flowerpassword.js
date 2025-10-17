# Quick Start: GitHub Actions CI/CD

## 🚀 One-Time Setup

### Step 1: Create npm Token

1. Visit <https://www.npmjs.com/settings/YOUR_USERNAME/tokens>
2. Click "Generate New Token" → "Classic Token"
3. Select **Automation** type
4. Copy the token

### Step 2: Add Token to GitHub

1. Go to your repo: `https://github.com/xlsdg/flowerpassword.js/settings/secrets/actions`
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Paste your npm token
5. Click "Add secret"

### Step 3: Enable Workflow Permissions

1. Go to `https://github.com/xlsdg/flowerpassword.js/settings/actions`
2. Under "Workflow permissions"
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click "Save"

## ✅ Done! Now you can use automated releases

---

## 📦 How to Release

### Method 1: Tag-Based (Recommended)

```bash
# Bump version and create tag
npm version patch   # 3.0.2 → 3.0.3
# or
npm version minor   # 3.0.2 → 3.1.0
# or
npm version major   # 3.0.2 → 4.0.0

# Push tag to GitHub (triggers automated release)
git push origin master --follow-tags
```

**What happens automatically:**

1. ✅ GitHub Actions runs tests
2. ✅ Builds the package
3. ✅ Creates GitHub Release with changelog
4. ✅ Publishes to npm

### Method 2: Manual from GitHub UI

1. Go to <https://github.com/xlsdg/flowerpassword.js/actions>
2. Click **"Manual Release"** workflow
3. Click **"Run workflow"** button (top right)
4. Select version type: `patch`, `minor`, or `major`
5. Click **"Run workflow"**

**What happens automatically:**

1. ✅ Bumps version in package.json
2. ✅ Runs tests
3. ✅ Builds the package
4. ✅ Creates and pushes git tag
5. ✅ Creates GitHub Release
6. ✅ Publishes to npm

---

## 🔄 CI Workflow

Every push or PR automatically:

- ✅ Runs tests on Node.js 20, 22
- ✅ Builds the package
- ✅ Reports status

---

## 🐛 Troubleshooting

### "npm publish failed: 403"

- Check `NPM_TOKEN` secret is set correctly
- Verify token has publish permissions
- Ensure version hasn't been published already

### "GitHub Release failed: 403"

- Check workflow permissions are set to "Read and write"
- Verify you're pushing to correct branch (master/main)

### "Tests failed"

- Run `npm test` locally to debug
- Check Actions logs for details

---

## 📊 Status Badges

Add to README.md:

```markdown
[![CI](https://github.com/xlsdg/flowerpassword.js/actions/workflows/ci.yml/badge.svg)](https://github.com/xlsdg/flowerpassword.js/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/flowerpassword.js.svg)](https://www.npmjs.com/package/flowerpassword.js)
```
