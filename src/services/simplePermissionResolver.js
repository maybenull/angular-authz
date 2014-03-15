angular.module('angular-authz').factory('simplePermissionResolver', function(SimplePermission) {
	return {
		resolve: function(permissionString) {
			return new SimplePermission(permissionString);
		}
	};
});