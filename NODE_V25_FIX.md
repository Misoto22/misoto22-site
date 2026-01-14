# Node.js v25 localStorage Fix

## Problem

When running the development server with Node.js v25.x, you may encounter the error:
```
TypeError: localStorage.getItem is not a function
```

This causes pages to fail with 500 errors.

## Root Cause

Node.js v25 introduced experimental `localStorage` support with the `--localstorage-file` flag. When this flag is passed without a valid file path, Node creates a localStorage global object but doesn't initialize the methods (`getItem`, `setItem`, etc.), causing the error.

## Solution

The fix is to provide a valid file path for the localStorage database:

### Automatic Fix (Recommended)

The `dev` script in `package.json` has been updated to include the proper NODE_OPTIONS:

```bash
pnpm dev  # Uses the configured NODE_OPTIONS automatically
```

### Manual Fix

If you need to run Node.js commands directly:

```bash
NODE_OPTIONS='--localstorage-file=./.node-localstorage/storage.db' node your-script.js
```

### Alternative: Downgrade Node.js

If you prefer, you can use Node.js v22 or earlier (recommended v22 LTS):

```bash
nvm install 22
nvm use 22
```

An `.nvmrc` file has been added to the project specifying Node v22.

## Files Modified

1. `package.json` - Updated `dev` script with NODE_OPTIONS
2. `.gitignore` - Added `.node-localstorage/` directory
3. `.nvmrc` - Added to specify Node v22 as recommended version
4. `.env.local.example` - Added NODE_OPTIONS documentation

## References

- Node.js v25 introduced experimental localStorage: https://nodejs.org/docs/latest-v25.x/api/globals.html#localstorage
- The `--localstorage-file` flag is required for the feature to work properly
