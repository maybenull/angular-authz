# angular-authz

Granular authorization in AngularJS.

##Usage

```javascript

// add dependency
angular.module('app', ['angular-authz']);

// set permissions during manual bootstrap
<script>
  angular.element(document).ready(function() {
    $.get('query/for/permissions', function(permissions) {
      angular.module('app').config(function(authzProvider) {
        var permissions = queryForPermissions();
        authzProvider.setPermissions(permissions);
      });
    });
  });
</script>

// set permissions during app execution
angular.module('app').controller('FooController', function(authz) {
  this.init = function() {
    var fooPermissions = queryForFooPermissions(); 
    authzProvider.setPermissions(fooPermissions);
  };
});

// set permissions during route resolution
angular.module('app').config(function($stateProvider) {
  $stateProvider
    .state('team', {url: '/team/{teamId}', templateUrl: 'partials/team.html',
      resolve: {
        something: function($stateParams, authz) {
          var teamPermissions = queryForTeamPermissions($stateParams.teamId); 
          authz.setPermissions(teamPermissions);
        }
      }
    })
});
```
```html
<!-- display if permission exists -->
<div has-permission="printer:print:inket3000">
  You can print on the inkjet3000 printer
</div>

<!-- display if permission does not exist -->
<div has-not-permission="printer:print:inket3000">
  You don't have access to print on the inkjet3000 print
</div>
```
