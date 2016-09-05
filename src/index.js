import eslint from 'eslint';
import loaderUtils from 'loader-utils';

let engine = null;

const cwd = process.cwd();

/**
 * linter
 *
 * @param {String|Buffer} input JavaScript string
 * @param {Object} config eslint configuration
 * @param {Object} webpack webpack instance
 * @return {void}
 */
function lint(input, config, webpack) {
  let resourcePath = webpack.resourcePath;

  // remove cwd from resource path in case webpack has been started from project
  // root, to allow having relative paths in .eslintignore
  if (resourcePath.indexOf(cwd) === 0) {
    resourcePath = resourcePath.substr(cwd.length + 1);
  }

  const res = engine.executeOnText(input, resourcePath, true);

  // We'll only have one result:
  return res.results[0];
}

module.exports = function eslintReturnLoader(input) {
  const config = {
    // user defaults
    ...this.options.eslint,
    // loader query string
    ...loaderUtils.parseQuery(this.query),
  };

  this.cacheable();

  // Create the ESLint engine only once:
  if (engine === null) {
    engine = new eslint.CLIEngine(config);
  }

  const lintResults = lint(input, config, this);
  this.callback(null, `
    module.exports = ${JSON.stringify(lintResults, null, '  ')};
  `);
};
