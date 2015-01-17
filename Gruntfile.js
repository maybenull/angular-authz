'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			options : {
				livereload: 7777
			},
			source: {
				files: ['src/**/*.js', 'test/unit/**.js'],
				tasks: [
					'jshint',
					'concat:dist',
					'ngmin',
					'karma:unit',
				]
			}
		},

		// tests
		karma: {
			unit: {
				configFile: 'test/karma-unit.conf.js',
				browsers: ['PhantomJS'],
				singleRun: true
			}
		},

		// linting, concating file, minifying and uglifying
		jshint: {
			options: {
				jshintrc: true
			},
			source: {
				src: ['Gruntfile.js', 'src/**/*.js'],
			},
			tests: {
				src: ['test/**/*.js'],
			},
		},
		concat: {
			options: {
				banner: '(function() {\n\n"use strict";\n\n',
				footer: '\n\n}());'
			},
			dist: {
				src: [
					'src/services/authz.js',
					'src/services/simplePermission.js',
					'src/services/simplePermissionResolver.js',
					'src/services/wildcardPermission.js',
					'src/services/wildcardPermissionResolver.js',
					'src/services/authzProvider.js',
					'src/directives/hasPermission.js',
					'src/directives/hasNotPermission.js'
                ],
                dest: 'dist/angular-authz.js'
            }
        },
        ngmin: {
            all: {
                src: ['dist/angular-authz.js'],
                dest: 'dist/angular-authz.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/angular-authz.js']
                }
			}
        }
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('test', ['jshint', 'concat:dist', 'ngmin', 'karma:unit']);
	grunt.registerTask('dev', ['test', 'watch:source']);
	grunt.registerTask('default', ['dev']);
	grunt.registerTask('dist', ['test', 'uglify']);
	// grunt.registerTask('dist', ['jshint', 'concat:dist', 'ngmin', 'uglify']);
};