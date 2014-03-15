angular.module('angular-authz').factory('DefaultPermission', function() {

	function DefaultPermission(permString) {
		
		this.asString = function() {
			return permString;
		};
		
		this.implies = function(permission) {
			return this.asString() === permission.asString();
		};
	}

	return DefaultPermission;
});