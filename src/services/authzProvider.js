angular.module('angular-authz').provider('authz', function() {
	
	var providedPermissionResolver;
	this.setResolver = function(resolver) {
		providedPermissionResolver = resolver;
	};

	var providedHasPermissionResolver;
	this.setHasResolver = function(resolver) {
		providedHasPermissionResolver = resolver;
	};

	this.$get = function(DefaultPermission, defaultPermissionResolver) {
		var resolver = providedPermissionResolver || defaultPermissionResolver;
		var hasResolver = providedHasPermissionResolver || providedPermissionResolver || defaultPermissionResolver;

		var permissions = [];

		return {
			setPermissions: function(permissionsStringArray) {
				permissions.length = 0;
				for (var i = 0; i < permissionsStringArray.length; ++i) {
					var permission = resolver.resolve(permissionsStringArray[i]);
					permissions.push(permission);
				}
			},
			hasPermission: function(permissionString) {
				var permission = hasResolver.resolve(permissionString);
				for (var i = 0; i < permissions.length; ++i) {
					if (permissions[i].implies(permission)) {
						return true;
					}
					return false;
				}
			}
		};
	};

});
