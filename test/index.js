import webpack from 'webpack';
import test from 'tape';
import config from './utils/config';

test('eslint-return-loader works as expected', (t) => {
  webpack(config, (err) => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line global-require
    const testResults = require('./output/bundle.js');

    t.equal(testResults.good.errorCount, 0, '"good" error count should be 0');
    t.equal(testResults.good.warningCount, 0, '"good" warning count should be 0');

    t.equal(testResults.warn.errorCount, 0, '"warn" error count should be 0');
    t.ok(testResults.warn.warningCount > 0, '"warn" warning count should be greater than 0');

    t.ok(testResults.error.errorCount > 0, '"error" error count should be greater than 0');
    t.equal(testResults.error.warningCount, 0, '"error" warning count should be 0');

    t.end();
  });
});
