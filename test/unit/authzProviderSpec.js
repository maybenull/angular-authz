'use strict';

describe('Provider: authz', function() {

	it('should be an authz provider', function() {
		var theAuthzProvider;
		var fakeModule = angular.module('test.app.config', []);
		fakeModule.config(function(authzProvider) {
			theAuthzProvider = authzProvider;
		});

		module('angular-authz', 'test.app.config');
		inject(function () {});

		expect(theAuthzProvider).not.toBeUndefined();
	});

	it('should use provided permissions', function() {
		var fakeModule = angular.module('test.app.config', []);
		fakeModule.config(function(authzProvider) {
			authzProvider.setPermissions(['b','a']);
		});

		module('angular-authz', 'test.app.config');

		inject(function(authz) {
			expect(authz.hasPermission('h')).toEqual(false);
			expect(authz.hasPermission('a')).toEqual(true);
			expect(authz.hasPermission('a')).toEqual(true);
		});
	});

	it('should use provided resolver', function() {
		var impliesCount = 0;
		var fakeModule = angular.module('test.app.config', []);
		fakeModule.config(function(authzProvider) {
			authzProvider.setResolver({
				resolve: function(permString) {
					return {
						implies: function(permission) {
							++impliesCount;
							return 'h' === permission.permString;
						},
						permString: permString
					};
				}
			});
		});
		

		module('angular-authz', 'test.app.config');

		inject(function(authz) {
			authz.setPermissions(['h', 'j']);
			expect(authz.hasPermission('h')).toEqual(true);
			expect(impliesCount).toBeGreaterThan(0);
		});
	});

	it('should use provided hasResolver', function() {
		var fakeModule = angular.module('test.app.config', []);
		fakeModule.config(function(authzProvider) {
			
			authzProvider.setHasResolver({
				resolve: function(permString) {
					return {
						asParts: function() {
							return [['a']];
						},
						fuckingJsHint: permString
					};
				}
			});
		});
		

		module('angular-authz', 'test.app.config');

		inject(function(authz) {
			authz.setPermissions(['a', 'b']);
			expect(authz.hasPermission('not-a-permission-but-true')).toEqual(true);
		});
	});

});