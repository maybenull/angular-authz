'use strict';

describe('Factory: SimplePermission', function() {

	beforeEach(function() {
		module('angular-authz');
	});

	it('implies', inject(function(SimplePermission) {
		var perm = new SimplePermission('a');
		var other = new SimplePermission('a');
		expect(perm.implies(other)).toEqual(true);
	}));

});