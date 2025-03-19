import noTsxWithoutJsx from './dist/index.js';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts', "test/**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      'no-tsx-without-jsx': noTsxWithoutJsx
    },
    rules: {
      'no-tsx-without-jsx/no-tsx-without-jsx': 'error'
    }
  }
];
