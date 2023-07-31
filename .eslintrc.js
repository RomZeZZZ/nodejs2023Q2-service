const parser = '@typescript-eslint/parser';
const parserOptions = {
  project: path.resolve(__dirname, 'tsconfig.json'),
  sourceType: 'module',
};
const plugins = ['@typescript-eslint/eslint-plugin'];
const eslintExtends = ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'];
const root = true;
const env = {
  node: true,
  jest: true,
};
const ignorePatterns = ['.eslintrc.js'];
const rules = {
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
};

module.exports = {
  parser,
  parserOptions,
  plugins,
  extends: eslintExtends,
  root,
  env,
  ignorePatterns,
  rules,
};