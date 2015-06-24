module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            gruntfile: { src: 'Gruntfile.js' },
            src: { src: 'src/**/*.js' }
        },
        karma: {
            options: {
                configFile: './test/karma.conf.js'
            },
            'ng-modal-service': {}
        },
        concat: {
            deploy: {
                src: ['src/ng-modal-service.js'],
                dest: 'dist/ng-modal-service.js'
            }
        },
        uglify: {
            deploy: {
                options: {
                    mangle: false,
                    banner: '/*\n' +
                            '   <%=pkg.name%> v<%=pkg.version%>\n' +
                            '   Copyright 2015 Billie Ko\n' +
                            '   License: MIT\n' +
                            '   */\n'
                },
                files: {
                    'dist/ng-modal-service.min.js': ['src/ng-modal-service.js']
                }
            }
        }
    });

    grunt.registerTask('default', []);
    grunt.registerTask('test', ['karma:ng-modal-service']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('deploy', ['concat:deploy', 'uglify:deploy']);
};