
module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      { pattern: 'tests/browser-setup.js', watched: false },
      { pattern: 'tests/build/ui.js', watched: false },
      { pattern: 'src/utils/tienda.js', watched: false, included: false, type: 'module' },
      { pattern: 'tests/tienda.spec.js', watched: false, type: 'module' }
    ],

    preprocessors: {
      'src/utils/tienda.js': ['coverage']
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    browsers: ['ChromeHeadless'],

    singleRun: true,

    client: {
      clearContext: false
    }
  })
}

