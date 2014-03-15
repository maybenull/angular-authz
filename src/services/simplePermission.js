angular.module('angular-authz').factory('SimplePermission', function() {

	function SimplePermission(permString) {
		
		this.asString = function() {
			return permString;
		};
		
		this.implies = function(permission) {
			return this.asString() === permission.asString();
		};
	}

	return SimplePermission;
});