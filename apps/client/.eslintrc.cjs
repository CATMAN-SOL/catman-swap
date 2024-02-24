module.exports = {
  extends: ['@inc-dev'],
  parserOptions: {
    project: require.resolve('./tsconfig.json'),
    extraFileExtensions: ['.vue'],
  },
  overrides: [
    {
      files: ['src/**/*.vue'],
      extends: ['@inc-dev/eslint-config-vue', 'plugin:tailwindcss/recommended'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
    {
      files: ['*.config.ts', '*.config.js'],
      extends: ['@inc-dev'],
      parserOptions: {
        project: require.resolve('./tsconfig.node.json'),
      },
    },
  ],
  ...require('./.eslintrc-auto-import.json'),
}
