import nextConfig from 'eslint-config-next'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextConfig,
  {
    rules: {
      // Downgrade new react-hooks rules to warnings until pre-existing code is fixed
      'react-hooks/set-state-in-effect': 'warn',
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@/lib/supabase'],
            message: 'Import data fetchers from @/lib/data instead. Direct supabase client access is only allowed in lib/data/ and app/api/.'
          }
        ]
      }]
    }
  },
  {
    files: ['src/lib/data/**/*', 'src/app/api/**/*'],
    rules: {
      'no-restricted-imports': 'off'
    }
  }
]
