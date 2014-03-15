'use strict';

describe('Factory: WildcardPermissionResolver', function() {

	beforeEach(function() {
		module('angular-authz');
	});

	it('resolves', inject(function(wildcardPermissionResolver, WildcardPermission) {
		var perm = wildcardPermissionResolver.resolve('a:*:c');
		var other = new WildcardPermission('a:b:c');
		expect(perm.implies(other)).toEqual(true);
	}));

});