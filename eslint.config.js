import pluginJs from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import path from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist', '*.config.js', '*.config.cjs', '*.config.mjs', '.prettierrc.js'], // Ignore the 'dist' directory and config files
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // Apply to all JS/TS files
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      globals: globals.browser, // Include browser globals
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        project: ['./tsconfig.json'], // Use the main tsconfig file
        tsconfigRootDir: __dirname, // Specify the root directory for tsconfig
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Enable TypeScript plugin
      'react-hooks': reactHooks, // Enable React Hooks plugin
      'react-refresh': reactRefresh, // Enable React Refresh plugin
      'react': pluginReact, // Enable React plugin
    },
    rules: {
      // React-specific rules
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Warn about non-component exports
      'react/jsx-uses-react': 'off', // Disable (not needed with React 17+)
      'react/react-in-jsx-scope': 'off', // Disable (not needed with React 17+)
      'react/jsx-key': 'error', // Warn about missing keys in lists
      'react/jsx-no-useless-fragment': 'error', // Warn about useless fragments
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }], // Enforce consistent JSX curly braces
      'react/self-closing-comp': 'error', // Enforce self-closing components
      'react/no-unescaped-entities': 'error', // Warn about unescaped entities in JSX
      'react/no-array-index-key': 'warn', // Warn about using array index as key

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused function arguments prefixed with _
      '@typescript-eslint/no-explicit-any': 'warn', // Warn about using `any`
      '@typescript-eslint/ban-ts-comment': 'warn', // Warn about using `@ts-ignore`
      '@typescript-eslint/no-non-null-assertion': 'warn', // Warn about non-null assertions
      '@typescript-eslint/consistent-type-imports': 'error', // Enforce consistent type imports
      '@typescript-eslint/no-floating-promises': 'error', // Ensure promises are handled
      '@typescript-eslint/no-misused-promises': 'error', // Warn about misused promises
      '@typescript-eslint/no-unnecessary-type-assertion': 'error', // Warn about unnecessary type assertions
      '@typescript-eslint/no-empty-object-type': 'error', // Disallow certain types
      '@typescript-eslint/no-unsafe-function-type': 'error', // Disallow certain types
      '@typescript-eslint/no-wrapper-object-types': 'error', // Disallow certain types

      // General best practices
      'no-console': 'warn', // Warn about console.log
      'no-var': 'error', // Disallow `var`
      'prefer-const': 'error', // Prefer `const` over `let`
      'eqeqeq': 'error', // Require `===` and `!==`
      'no-implicit-coercion': 'error', // Disallow implicit type coercion

      // React Hooks rules
      ...reactHooks.configs.recommended.rules, // Apply recommended React Hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect

      // React recommended rules
      ...pluginReact.configs.recommended.rules, // Apply recommended React rules

      // JSX runtime rules
      ...pluginReact.configs['jsx-runtime'].rules, // Apply JSX runtime rules
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
  pluginJs.configs.recommended, // Apply recommended ESLint rules
  ...tseslint.configs.recommendedTypeChecked, // Enable type-aware linting
  ...tseslint.configs.stylisticTypeChecked, // Optional: Add stylistic rules
  ...tseslint.configs.strictTypeChecked, // Enable stricter TypeScript rules
  prettierConfig, // Disable ESLint rules that conflict with Prettier
]
