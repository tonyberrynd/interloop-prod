angular.module('interloop.factory.authService', [])

//auth constants
.constant('authEvents', {
    LOGIN_SUCCESS: 'auth_login_success',
    LOGIN_FAILED: 'auth_login_failed',
    LOGOUT_SUCCESS: 'auth_logout_success',
    LOGOUT_FAILED: 'auth_logout_failed',
    RESET_SUCCESS: 'auth_reset_success',
    RESET_FAILED: 'auth_reset_failed',
    UPDATE_SUCCESS: 'auth_update_success',
    UPDATE_FAILED: 'auth_update_failed',
    SESSION_TIMEOUT: 'auth_session_timeout',
    NOT_AUTHENTICATED: 'auth_not_authenticated'
})

// AuthService
.factory('authService', function (
    Appuser, 
    Org, 
    authEvents, 
    $rootScope,
    $location, 
    $http, 
    LoopBackAuth,
    Permissions
    // RoleStore, 
    // PermissionStore
    ) {

    var service = {
      login: login,
      logout: logout,
      register: register,
      resetPassword: resetPassword,
      isAuthenticated: isAuthenticated,
      getCurrentAppuser: getCurrentAppuser,
      getCurrentAppuserId: getCurrentAppuserId,
      getCurrentOrg: getCurrentOrg,
      userHasPermissionForView: userHasPermissionForView,
      userHasPermission: userHasPermission
    };
    return service;

    ////////////////
    // login
    function login(email, password, rememberMe) {
      return Appuser
      .login({email: email, password: password, rememberMe: rememberMe})
      .$promise
      .then(function(response) {

        //if access token expired redirect them
        var next = $location.nextAfterLogin || '/opportunities/view/default';
        $location.nextAfterLogin = null;

        //triage if next is login
        if(next == '/login') { next = '/opportunities/view/default'}
        //go to next loation
        $location.path(next);
        

        $rootScope.$broadcast(authEvents.LOGIN_SUCCESS);
      }, function() {
        $rootScope.$broadcast(authEvents.LOGIN_FAILED);
      });
    }


    //logout
    function logout() {
      return Appuser
      .logout()
      .$promise
      .then(function(response) {
        //clear permissions for user
        // clearPermissions();
        $rootScope.$broadcast(authEvents.LOGOUT_SUCCESS);
      }, function() {
        $rootScope.$broadcast(authEvents.LOGOUT_FAILED);
      });
    }


    //reset password
    function resetPassword(email) {
      return Appuser
      .resetPassword({email: email})
      .$promise
      .then(function(response) {
        $rootScope.$broadcast(authEvents.RESET_SUCCESS);
      })
      .catch(function(err) {
        $rootScope.$broadcast(authEvents.RESET_FAILED, {'error': err});
      })
    }

    //register user
    function register(email, password) {
      return Appuser
      .create({
       email: email,
       password: password
     })
      .$promise;
    }

    //check is User is Authenticated
    function isAuthenticated() {
      return Appuser.isAuthenticated();
    }

    //get current id
    function getCurrentAppuserId() {
      return Appuser.getCurrentId();
    }

    //get current user data
    function getCurrentAppuser() {
      return Appuser
      .findById({ id: Appuser.getCurrentId()})
    }

    //get current organization
    function getCurrentOrg() {
      return Org.findOne().$promise;
    }
     
    //get current organization
    function userHasPermissionForView(view){
        //if view doesn't have permissions set - allow
        if(!view.permissions || !view.permissions.length){
            return true;
        }
        
        return userHasPermission(view.permissions);
    };
     
    //check if user has particular permission in profile
    function userHasPermission(permissions) {
        //check if permissions and roles intersect
        var intersectRoles = [];

        //create single array of all permissions
        if(_.has($rootScope.activeUser, 'roles')) {
          var tempPermissionsArray = [];
           _.forEach($rootScope.activeUser.roles, function(value, key) {
            //push all permissions in temp array
            var thisPermissions = _.isNil(_.find(Permissions, ['name', value])) || _.isNil(_.find(Permissions, ['name', value])).permissions ? [] : _.find(Permissions, ['name', value]).permissions;
            tempPermissionsArray.push(thisPermissions);
           })
        }

        //array of user permissions merged from various roles
        var allowedPermissions = _.uniqWith(_.flattenDeep(tempPermissionsArray), _.isEqual);
        //if there is an intersection, user has permission and should show / include etc
        intersectRoles = _.intersection(permissions, allowedPermissions);

        //return value
        if(intersectRoles.length) {
          return true;
        } else {
          return false;
        }
    };
});

