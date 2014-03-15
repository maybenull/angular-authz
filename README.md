# angular-authz

Granular authorization in AngularJS.

Visit http://maybenull.github.io/angular-authz/ for complete documentation.

## Permissions

Refer to the [Apache Shiro permissions page](https://shiro.apache.org/permissions.html) for detailed documentation on permissions in `angular-authz`.

###Simple Permissions

Supports simple, one level permissions

```
<div has-permission="driveCar"></div>
or
authz.hasPermission('driveCar')
```

###Advanced Permissions

Supports multiple levels and wildcards

```
/* These examples use 3 levels in the form domain:action:instance */
/* But any number of levels are supported                         */

// drive any car
<div has-permission="car:drive:*"></div>
or
authz.hasPermission('car:drive:*')


// drive only corvette
<div has-permission="car:drive:corvette"></div>
or
authz.hasPermission('car:drive:corvette')

// park only corvett
<div has-permission="car:park:corvette"></div>
or
authz.hasPermission('car:park:corvette')

// do anything on a corvette
<div has-permission="car:*:corvette"></div>
or
authz.hasPermission('car:*:corvette')

// do anything on any car
<div has-permission="car:*"></div>
or
authz.hasPermission('car:*')

```


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
      angular.bootstrap(document, ['app']);
    });
  });
</script>

// set permissions during app execution
angular.module('app').controller('FooController', function(authz) {
  this.init = function() {
    var fooPermissions = queryForFooPermissions(); 
    authz.setPermissions(fooPermissions);
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

// check permission programatically
angular.module('app').controller('BarController', function(authz) {
  this.init = function() {
    if (! authz.hasPermission('barpermission')) {
      // get em outa here
    }
  };
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

<!-- use the scope -->
<div has-permission="printer:print:{{printerModel.id}}">
  You can print on the inkjet3000 printer
</div>
```


## Advanced Usage
Does your application represent permission in a different format from `domain:action:instance`, no problem. Define and resolve your own permissions.

```javascript
// create a new permission type 
angular.module('app').factory('MyPermission', function() {
  function MyWierdPermission(permissionString) {
    this.wierd = parseTheWierdness(permissionString);
  
    this.implies = function(otherWierdPermission) {
      return this.wierd === otherWierdPermission.wierd;
    };
  }
  
  // note NO new operator
  return MyWierdPermission;
});

// permission strings now resolve to your new type
angular.module('app').factory('MyPermissionResolver', function(MyPermission) {
  this.resolve = function(permissionString) {
    // note we now use new operator
    return new MyPermission(permissionString);
  };
});

// tell authz to use your new permission
angular.module('app').config(function(authzProvider, resolverProvider) {
  authzProvider
});

```



