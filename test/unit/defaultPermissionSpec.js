'use strict';

describe('Factory: DefaultPermission', function() {

	beforeEach(function() {
		module('angular-authz');
	});

	it('implies', inject(function(DefaultPermission) {
		var perm = new DefaultPermission('a');
		var other = new DefaultPermission('a');
		expect(perm.implies(other)).toEqual(true);
	}));

});