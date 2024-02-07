module.exports = {
  extends: ['@inc-dev'],
  parserOptions: {
    project: require.resolve('./tsconfig.json'),
  },
  globals: {
    logger: true,
  },
}
