const nextConfig = require('eslint-config-next');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

const customRulesAll = {
  'react/no-unescaped-entities': 'off',
  'react/jsx-no-comment-textnodes': 'warn',
  'react-hooks/exhaustive-deps': 'warn',
  // React 19 / eslint-plugin-react-hooks (new rules) – keep non-blocking during upgrade
  'react-hooks/set-state-in-effect': 'off',
  'react-hooks/purity': 'off',
  'react-hooks/immutability': 'off',
  'prefer-const': 'warn',
  'no-irregular-whitespace': 'warn',
};

const customRulesTs = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
};

const commonPlugins = {
  react: reactPlugin,
  'react-hooks': reactHooksPlugin,
};

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      'public/**',
      'analyze/**',
    ],
  },
  ...nextConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      ...commonPlugins,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...(tsPlugin.configs.recommended?.rules ?? {}),
      ...customRulesAll,
      ...customRulesTs,
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: commonPlugins,
    rules: customRulesAll,
  },
];
