const config = require('@silvermine/eslint-config'),
      node = require('@silvermine/eslint-config/partials/node'),
      nodeTests = require('@silvermine/eslint-config/partials/node-tests');

module.exports = [
   ...config,
   {
      files: [ 'tests/**.ts' ],
      ...nodeTests,
   },
   {
      files: [ '**/*.ts', '**/*.js' ],
      ...node,
   },
];
