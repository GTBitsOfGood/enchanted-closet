module.exports = {
  root: true,
  extends: [
    'standard',
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
      pragma: 'React',
      version: '15.5.4'
    },
  },
  rules: {
    'space-before-function-paren': 'off',
    'no-callback-literal': 'off',
    'no-useless-escape': 'off',
    'import/no-unresolved': 'off',
    'react/no-unescaped-entities': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'react/require-render-return': 'off',
    'react/prop-types': 'off'
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
