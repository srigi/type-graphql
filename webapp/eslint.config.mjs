import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier'; // We still need this to apply its disabling rules

export default tseslint.config(
  {
    ignores: [
      'dist/',
      'node_modules/',
      'src/.gql/', // Ignore generated GraphQL types
      '*.config.js', // Ignore config files like vite, postcss etc. if any
      '*.cjs',
    ],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended, // Apply recommended TS rules

  // React/Preact specific configurations
  {
    files: ['**/*.{jsx,tsx}'], // Apply only to JSX/TSX files
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version (works for Preact)
        pragma: 'h', // Tell ESLint JSX factory is 'h' for Preact
        fragment: 'Fragment', // Tell ESLint Fragment factory is 'Fragment' for Preact
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      // Preact / JSX rules
      ...reactPlugin.configs['jsx-runtime'].rules, // Rules for the new JSX transform
      ...reactHooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform + Preact
      'react/no-deprecated': 2,
      'react/display-name': [1, { ignoreTranspilerName: false }],
      'react/jsx-no-bind': [1, { ignoreRefs: true, allowFunctions: true, allowArrowFunctions: true }],
      'react/jsx-no-comment-textnodes': 2,
      'react/jsx-no-duplicate-props': 2,
      'react/jsx-no-target-blank': 2,
      'react/jsx-no-undef': 2,
      'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
      'react/jsx-uses-react': 2, // debatable
      'react/jsx-uses-vars': 2,
      'react/jsx-key': [2, { checkFragmentShorthand: true }],
      'react/self-closing-comp': 2,
      'react/prefer-es6-class': 2,
      'react/prefer-stateless-function': 1,
      'react/require-render-return': 2,
      'react/no-danger': 1,
      // legacy APIs not supported in Preact:
      'react/no-did-mount-set-state': 2,
      'react/no-did-update-set-state': 2,
      'react/no-find-dom-node': 2,
      'react/no-is-mounted': 2,
      'react/no-string-refs': 2,
      // hooks
      'react-hooks/rules-of-hooks': 2,
      'react-hooks/exhaustive-deps': 1,
    },
  },

  // Prettier integration - MUST BE LAST to override other configs
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      ...prettierConfig.rules, // Apply prettier-config to disable conflicting rules
      'prettier/prettier': 'warn', // Report Prettier differences as warnings
    },
  },
);
