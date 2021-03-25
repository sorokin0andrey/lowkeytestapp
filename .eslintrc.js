module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'arrow-body-style': ['error', 'as-needed'],
    'no-console': 'error',
    'import/order': [
      'error',
      {
        groups: ['external', 'internal', 'builtin', 'parent', 'unknown', 'index', 'sibling'],
        'newlines-between': 'always',
      },
    ],
    'import/no-absolute-path': 2,
    'import/no-useless-path-segments': 2,
    'import/newline-after-import': 2,
  },
}
