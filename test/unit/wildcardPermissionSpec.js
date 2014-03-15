'use strict';

describe('Factory: WildcardPermission', function() {

	beforeEach(function() {
		module('angular-authz');
	});

	it('implies first level', inject(function(WildcardPermission) {
		var perm = new WildcardPermission('a');
		
		expect(perm.implies(new WildcardPermission('a'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:*'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:*:c'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:b'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:b:*'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:b:c'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('b'))).toEqual(false);
		expect(perm.implies(new WildcardPermission('b:*'))).toEqual(false);
	}));

	it('implies second level', inject(function(WildcardPermission) {
		var perm = new WildcardPermission('a:b');
		
		expect(perm.implies(new WildcardPermission('a:*'))).toEqual(false);
		expect(perm.implies(new WildcardPermission('a:z'))).toEqual(false);
		expect(perm.implies(new WildcardPermission('a:b'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:b:*'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:b:c'))).toEqual(true);
	}));

	it('implies second level', inject(function(WildcardPermission) {
		var perm = new WildcardPermission('a:b:c');
		
		expect(perm.implies(new WildcardPermission('a:b:c'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:b:c:d'))).toEqual(true);
		expect(perm.implies(new WildcardPermission('a:b:z'))).toEqual(false);
		expect(perm.implies(new WildcardPermission('a:b'))).toEqual(false);
		expect(perm.implies(new WildcardPermission('a:b:*'))).toEqual(false);
		expect(perm.implies(new WildcardPermission('a:*'))).toEqual(false);
		expect(perm.implies(new WildcardPermission('a'))).toEqual(false);
	}));

});