# eslint-return-loader

Lints your code and returns the result of linting. Useful if you want to use your lint results in code.

## Install

```console
$ npm install eslint-return-loader
```

## Usage

In your code:

```javascript
var lintResults = require('!!eslint-return!./MyFile.js');
// => returns { filePath: 'MyFile.js', messages: [], warningCount: 0, errorCount: 0 }

```

You probably shouldn't add the loader to your webpack configuration, as it will make other loaders useless.

> NOTE: We use double !! to disable all other loaders. eslint-return-loader should not be run on babel-processed code.

### Options

You can pass [eslint options](http://eslint.org/docs/developer-guide/nodejs-api#cliengine) directly by

- Adding a query string to the loader

```js
var docs = require('!!eslint-return?{ rules: { semi: 0 } }!./MyFile.js');
```

- Adding an `eslint` entry in your webpack config for global options:

```js
module.exports = {
  eslint: {
    configFile: 'path/.eslintrc'
  }
}
```

**Note that you can use both methods in order to benefit from global & specific options**

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
