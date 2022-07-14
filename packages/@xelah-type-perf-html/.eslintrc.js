module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  'parserOptions': {
    'ecmaFeatures': { 'jsx': true },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': ['react'],
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-tag-spacing': ['error'],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'indent': ['error', 2, { 'ignoredNodes': ['TemplateLiteral'] }],
  },
  'env': {
    'browser': true,
    'node': true,
    'es2021': true,
  },
};