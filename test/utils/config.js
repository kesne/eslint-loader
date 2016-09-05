import { resolve } from 'path';

export default {
  target: 'node',
  entry: './test/fixtures/all.js',
  output: {
    path: './test/output/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolveLoader: {
    alias: {
      'eslint-return': resolve(__dirname, '../../src/index'),
    },
  },
  // this disables the use of .eslintignore, since it contains the fixtures
  // folder to skip it on the global linting, but here we want the opposite
  // (we only use .eslintignore on the test that checks this)
  eslint: {
    ignore: false,
  },
};
