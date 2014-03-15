module.exports = function(karma) {
    karma.set({
		// base path, that will be used to resolve files and exclude
		basePath: '../',
		files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'dist/angular-authz.js',
            'test/unit/*.js'
        ],
        frameworks: ['jasmine'],
		singleRun: true,
		plugins : [
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-spec-reporter'
		]
	});
};
