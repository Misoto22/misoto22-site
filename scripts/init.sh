#!/bin/bash
# Agent bootstrap: verify environment is healthy before starting work
set -e

echo "=== Environment Check ==="
node -v && pnpm -v

echo "=== Branch Check ==="
BRANCH=$(git branch --show-current)
echo "Current branch: $BRANCH"
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
  echo "⚠️  WARNING: You are on $BRANCH. Create a feature branch before making changes."
fi

echo "=== Env File Check ==="
if [ ! -f .env.local ]; then
  echo "❌ .env.local not found. Copy from .env.local.example and fill in credentials."
  exit 1
fi
# 验证必需的环境变量
for VAR in NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY; do
  if ! grep -q "^${VAR}=" .env.local 2>/dev/null; then
    echo "❌ Missing $VAR in .env.local"
    exit 1
  fi
done
echo "✓ .env.local OK"

echo "=== Install Dependencies ==="
pnpm install --frozen-lockfile

echo "=== Lint ==="
pnpm lint

echo "=== Type Check ==="
pnpm typecheck

echo "=== Tests ==="
pnpm test

echo "=== Build Check ==="
pnpm build

echo "=== Recent Git History ==="
git log --oneline -10

echo "=== Environment OK ==="
