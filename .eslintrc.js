module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'react',
  ],
  settings: {
    react: {
      pragma: 'React'
    },
  },
  rules: {
    'import/no-unresolved': 'off',
    'react/no-unescaped-entities': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'react/require-render-return': 'off'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      allowImportExportEverywhere: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true,
    jest: true
  },
  globals: {}
}
