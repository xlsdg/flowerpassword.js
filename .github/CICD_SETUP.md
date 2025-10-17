# GitHub Actions CI/CD Setup Guide

This project uses GitHub Actions for automated testing, building, and publishing.

## Workflows

### 1. CI (Continuous Integration)

**File:** `.github/workflows/ci.yml`

**Triggers:**

- Push to `master` or `main` branch
- Pull requests to `master` or `main` branch

**Actions:**

- Tests on Node.js 20.x and 22.x
- Runs unit tests
- Builds the package
- Uploads build artifacts

### 2. Release (Automated)

**File:** `.github/workflows/release.yml`

**Triggers:**

- Push of version tags (e.g., `v3.0.3`, `v3.1.0`)

**Actions:**

- Runs tests
- Builds the package
- Creates GitHub Release with changelog
- Publishes to npm

### 3. Manual Release

**File:** `.github/workflows/manual-release.yml`

**Triggers:**

- Manual trigger from GitHub Actions UI

**Actions:**

- Bumps version (patch/minor/major)
- Runs tests
- Builds the package
- Creates git tag
- Pushes to repository
- Creates GitHub Release
- Publishes to npm

## Setup Instructions

### Prerequisites

1. **GitHub Repository Settings**
   - Enable GitHub Actions in repository settings
   - Set permissions for `GITHUB_TOKEN` to allow creating releases

2. **npm Token**
   - Go to [npmjs.com](https://www.npmjs.com/)
   - Login and navigate to Access Tokens
   - Create a new **Automation** token
   - Copy the token (you won't see it again!)

### Configuration Steps

#### 1. Add npm Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

#### 2. Verify Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

## Usage

### Option 1: Automatic Release (Tag-based)

When you're ready to release:

```bash
# Update version and create tag locally
npm version patch  # or minor, or major
# This creates a git tag like v3.0.3

# Push the tag to GitHub
git push origin master --follow-tags
```

GitHub Actions will automatically:

1. Run tests
2. Build the package
3. Create a GitHub Release
4. Publish to npm

### Option 2: Manual Release (GitHub UI)

1. Go to **Actions** tab in GitHub
2. Click **Manual Release** workflow
3. Click **Run workflow**
4. Select version type (patch/minor/major)
5. Click **Run workflow** button

GitHub Actions will automatically:

1. Bump the version
2. Run tests
3. Build the package
4. Create git tag
5. Push to repository
6. Create a GitHub Release
7. Publish to npm

### Option 3: Local Release (Traditional)

```bash
# This will still work, but won't trigger automated release
npm run release:patch  # or release:minor, release:major
```

Then manually push the tag:

```bash
git push origin master --follow-tags
```

## Workflow Status

You can monitor workflow runs in the **Actions** tab of your GitHub repository.

### Status Badges

Add these to your README.md:

```markdown
[![CI](https://github.com/xlsdg/flowerpassword.js/actions/workflows/ci.yml/badge.svg)](https://github.com/xlsdg/flowerpassword.js/actions/workflows/ci.yml)
[![Release](https://github.com/xlsdg/flowerpassword.js/actions/workflows/release.yml/badge.svg)](https://github.com/xlsdg/flowerpassword.js/actions/workflows/release.yml)
```

## Troubleshooting

### npm publish fails

- Check that `NPM_TOKEN` is correctly set in GitHub Secrets
- Verify the token has publish permissions
- Ensure the version number hasn't been published already

### GitHub Release fails

- Check workflow permissions are set to "Read and write"
- Verify the tag format is correct (must be `v*.*.*`)

### Tests fail

- Review test output in the Actions log
- Run tests locally: `npm test`
- Fix any failing tests before releasing

## Security Notes

- Never commit npm tokens to the repository
- Use GitHub Secrets for sensitive data
- The `NPM_TOKEN` should be an Automation token (not Classic)
- Regularly rotate your npm tokens
