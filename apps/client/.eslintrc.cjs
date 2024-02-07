module.exports = {
  extends: ['@inc-dev'],
  parserOptions: {
    project: require.resolve('./tsconfig.json'),
    extraFileExtensions: ['.vue'],
  },
  overrides: [
    {
      files: ['src/**/*.vue'],
      extends: ['@inc-dev/eslint-config-vue'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
    {
      files: ['vite.config.ts'],
      extends: ['@inc-dev'],
      parserOptions: {
        project: require.resolve('./tsconfig.node.json'),
      },
    },
  ],
}
