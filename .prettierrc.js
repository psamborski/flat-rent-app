// @ts-check
export default {
  semi: false, // No semicolons
  singleQuote: true, // Use single quotes
  trailingComma: 'all', // Add trailing commas where possible
  tabWidth: 2, // Use 2 spaces for indentation
  printWidth: 100, // Max line width
  jsxSingleQuote: true, // Use single quotes in JSX
  bracketSpacing: true, // Add spaces around brackets, e.g., { foo: bar }
  arrowParens: 'always', // Use parentheses in single-argument arrow functions
  spaceBeforeFunctionParen: true, // Spaces before func arguments
  endOfLine: 'lf', // Use LF (Unix) line endings
  quoteProps: 'consistent', // Consistent quotes around object property names
  proseWrap: 'always', // Wrap text in Markdown files
  htmlWhitespaceSensitivity: 'css', // Preserve whitespace in HTML like in CSS

  // Plugins
  plugins: [
    '@trivago/prettier-plugin-sort-imports', // Sort imports
    'prettier-plugin-organize-attributes', // Organize attributes in JSX/HTML
    'prettier-plugin-tailwindcss', // Sort Tailwind CSS classes
  ],

  // Sort imports configuration
  importOrder: [
    '^react', // React imports first
    '^@core/(.*)$', // Core modules
    '<THIRD_PARTY_MODULES>', // Other third-party modules
    '^@ui/(.*)$', // UI components
    '^.+\\.(css|scss|sass)$', // CSS & SASS imports
    '^[./]', // Local imports
  ],
  importOrderSeparation: true, // Add a new line between import groups
  importOrderSortSpecifiers: true, // Sort import specifiers (e.g., { a, b, c })

  // Tailwind CSS configuration
  // tailwindConfig: './tailwind.config.js', // Path to Tailwind config

  // Organize attributes configuration
  attributeGroups: [
    '$DEFAULT', // Default attributes
    '^aria-', // ARIA attributes
    '^data-', // Data attributes
    '^on', // Event handlers
  ],
  attributeSort: 'ASC', // Sort attributes in ascending order
}
