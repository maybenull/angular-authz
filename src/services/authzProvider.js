angular.module('angular-authz').provider('authz', function() {
	
	var providedPermissionResolver;
	this.setResolver = function(resolver) {
		providedPermissionResolver = resolver;
	};

	var providedHasPermissionResolver;
	this.setHasResolver = function(resolver) {
		providedHasPermissionResolver = resolver;
	};

	var providedPermissionsStringArray;
	this.setPermissions = function(perms) {
		providedPermissionsStringArray = perms;
	};

	this.$get = function(wildcardPermissionResolver) {
		var resolver = providedPermissionResolver || wildcardPermissionResolver;
		var hasResolver = providedHasPermissionResolver || providedPermissionResolver || wildcardPermissionResolver;
		var permissions = [];

		function resolvePermissions(permissionsStringArray) {
			permissions.length = 0;
			for (var i = 0; i < permissionsStringArray.length; ++i) {
				var permission = resolver.resolve(permissionsStringArray[i]);
				permissions.push(permission);
			}
		}

		if (providedPermissionsStringArray) {
			resolvePermissions(providedPermissionsStringArray);
		}

		return {
			setPermissions: function(permissionsStringArray) {
				resolvePermissions(permissionsStringArray);
			},
			addPermission: function(permissionString) {
			  permissions.push(resolver.resolve(permissionString));
			},
			hasPermission: function(permissionString) {
				var permission = hasResolver.resolve(permissionString);
				for (var i = 0; i < permissions.length; ++i) {
					if (permissions[i].implies(permission)) {
						return true;
					}
				}
				return false;
			}
		};
	};

});
