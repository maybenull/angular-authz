'use strict';

(function() {
	var app = angular.module('app', ['ngRoute']);

	app.config(function($routeProvider) {
	    $routeProvider.
		      	when('/home', {
		        templateUrl: 'partials/home.html'
	    	}).
		    when('/gettingstarted', {
		        templateUrl: 'partials/gettingstarted.html'
		    }).
		    when('/tutorial', {
		        templateUrl: 'partials/tutorial.html'
		    }).
	      	otherwise({
	        	redirectTo: '/home'
	      	});
	 	}
	);

	app.directive('matchRoute', function($route, $location) {
		return {
		    restrict: 'A',
		    link: function postLink(scope, element, attrs, controller) {		    	
		    	scope.$watch(function() {
		    		return $location.path();	
		    	}, function() {		    		
			    	if ($location.path() === ('/' + attrs.matchRoute)) {
			    		element.addClass('active');
			    	} else {
			    		element.removeClass('active');
			    	}
		    	}
		    );

		    }
		  };
	});


})();
