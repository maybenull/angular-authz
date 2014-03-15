'use strict';

describe('Factory: SimplePermissionResolver', function() {

	beforeEach(function() {
		module('angular-authz');
	});

	it('resolves', inject(function(simplePermissionResolver, SimplePermission) {
		var perm = simplePermissionResolver.resolve('a');
		var other = new SimplePermission('a');
		expect(perm.implies(other)).toEqual(true);
	}));

});