module.exports = {
  extends: [
    '@eslint-kit/patch',
    '@eslint-kit/base',
    '@eslint-kit/typescript',
    '@eslint-kit/prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'off',
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',
    '@typescript-eslint/no-empty-interface': 'off'
  },
}
