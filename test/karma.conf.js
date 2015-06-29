module.exports = function(config) {
    'use strict';

    config.set({
        basePath: '',
        frameworks: ['mocha'],
        reporters: ['progress'],
        browsers: ['Chrome'],

        autoWatch: true,
        singleRun: false,
        colors: true,

        files: [
            // dependencies
            'bower.js',
            'mocha.conf.js',
            'chai.conf.js',
            '../node_modules/chai-spies/chai-spies.js',

            // application code
            '../src/**/*.js',

            // test code
            '*.test.js'
        ]
    });
};