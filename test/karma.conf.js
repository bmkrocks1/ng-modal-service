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
            '../bower_components/jquery/dist/jquery.js',
            '../bower_components/bootstrap/dist/js/bootstrap.min.js',
            '../bower_components/angular/angular.js',

            // application code
            '../src/**/*.js',

            // test dependencies
            '../bower_components/chai/chai.js',
            'mocha.conf.js',
            'chai.conf.js',

            // test code
            '*.test.js'
        ]
    });
};