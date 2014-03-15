(function () {
  'use strict';
  angular.module('angular-authz', []);
  angular.module('angular-authz').factory('DefaultPermission', function () {
    function DefaultPermission(permString) {
      this.asString = function () {
        return permString;
      };
      this.implies = function (permission) {
        return this.asString() === permission.asString();
      };
    }
    return DefaultPermission;
  });
  angular.module('angular-authz').factory('defaultPermissionResolver', [
    'DefaultPermission',
    function (DefaultPermission) {
      return {
        resolve: function (permissionString) {
          return new DefaultPermission(permissionString);
        }
      };
    }
  ]);
  angular.module('angular-authz').provider('authz', function () {
    var providedPermissionResolver;
    this.setResolver = function (resolver) {
      providedPermissionResolver = resolver;
    };
    var providedHasPermissionResolver;
    this.setHasResolver = function (resolver) {
      providedHasPermissionResolver = resolver;
    };
    this.$get = [
      'DefaultPermission',
      'defaultPermissionResolver',
      function (DefaultPermission, defaultPermissionResolver) {
        var resolver = providedPermissionResolver || defaultPermissionResolver;
        var hasResolver = providedHasPermissionResolver || providedPermissionResolver || defaultPermissionResolver;
        var permissions = [];
        return {
          setPermissions: function (permissionsStringArray) {
            permissions.length = 0;
            for (var i = 0; i < permissionsStringArray.length; ++i) {
              var permission = resolver.resolve(permissionsStringArray[i]);
              permissions.push(permission);
            }
          },
          hasPermission: function (permissionString) {
            var permission = hasResolver.resolve(permissionString);
            for (var i = 0; i < permissions.length; ++i) {
              if (permissions[i].implies(permission)) {
                return true;
              }
              return false;
            }
          }
        };
      }
    ];
  });
  angular.module('angular-authz').directive('hasPermission', [
    '$interpolate',
    'authz',
    function ($interpolate, authz) {
      return {
        transclude: 'element',
        priority: 1000,
        terminal: true,
        restrict: 'A',
        compile: function (element, attr, transclude) {
          return function ($scope, $element, $attr) {
            var permission = $interpolate($attr.hasPermission)($scope);
            if (authz.hasPermission(permission)) {
              transclude($scope.$new(), function (clone) {
                $element.after(clone);
              });
            }
          };
        }
      };
    }
  ]);
}());