angular.module('angular-authz').factory('wildcardPermissionResolver', function(WildcardPermission) {
	return {
		resolve: function(permissionString) {
			return new WildcardPermission(permissionString);
		}
	};
});