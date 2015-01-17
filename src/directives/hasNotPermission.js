angular.module('angular-authz').directive('hasNotPermission', function($interpolate, authz) {
	return {
		transclude: 'element',
		priority: 1000,
		terminal: true,
		restrict: 'A',
		compile: function(element, attr, transclude) {
			return function($scope, $element, $attr) {
				var permission = $interpolate($attr.hasNotPermission)($scope);

				if (! authz.hasPermission(permission)) {
					transclude($scope.$new(), function(clone) {
						$element.after(clone);
					});
				}
			};
		}
	};
});