module.exports = {
  extends: '@loopback/eslint-config',
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'sort-imports': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        camelcase: ['off'],
      },
    },
  ],
};
