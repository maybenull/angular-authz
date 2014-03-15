'use strict';

describe('Factory: DefaultPermissionResolver', function() {

	beforeEach(function() {
		module('angular-authz');
	});

	it('resolves', inject(function(defaultPermissionResolver, DefaultPermission) {
		var perm = defaultPermissionResolver.resolve('a');
		var other = new DefaultPermission('a');
		expect(perm.implies(other)).toEqual(true);
	}));

});