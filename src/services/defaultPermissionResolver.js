angular.module('angular-authz').factory('defaultPermissionResolver', function(DefaultPermission) {
	return {
		resolve: function(permissionString) {
			return new DefaultPermission(permissionString);
		}
	};
});