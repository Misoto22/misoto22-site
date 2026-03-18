#!/bin/bash
# Agent bootstrap: verify environment is healthy before starting work
set -e

echo "=== Environment Check ==="
node -v && pnpm -v

echo "=== Install Dependencies ==="
pnpm install --frozen-lockfile

echo "=== Type Check ==="
pnpm typecheck

echo "=== Build Check ==="
pnpm build

echo "=== Tests ==="
pnpm test

echo "=== Recent Git History ==="
git log --oneline -10

echo "=== Environment OK ==="
