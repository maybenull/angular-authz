angular.module('angular-authz').factory('WildcardPermission', function() {

	function toParts(permissionString) {
		var parts = [];
		var levels = permissionString.split(':');

		for (var i = 0; i < levels.length; ++i) {
			parts.push(levels[i].split(','));
		}
		return parts;
	}

	function containsAll(source, vals) {
		for (var i = 0; i < vals.length; ++i) {
			if (source.indexOf(vals[i]) === -1) {
				return false;
			}
		}
		return true;
	}


	function WildcardPermission(permissionString) {

		var parts = toParts(permissionString);

		this.asString = function() {
			return permissionString;
		};

		this.asParts = function() {
			return parts;
		};
		
		this.implies = function(other) {
			var i;
			for (i = 0; i < other.asParts().length; ++i) {
				if (parts.length - 1 < i) {
					return true;
				} else {

					if (parts[i].indexOf('*') === -1 && !containsAll(parts[i], other.asParts()[i])) {
						return false;
					}
				}
			}

			for (; i < parts.length; ++i) {
				if (parts[i].indexOf('*') === -1) {
					return false;
				}
			}
			return true;
		};
	}

	return WildcardPermission;
});