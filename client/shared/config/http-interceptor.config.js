/* ==========================================================================
   http interceptor
   ========================================================================== */

angular.module('interloop.config.http-interceptor', [])

.config(function($httpProvider) {
// Inside app config block
$httpProvider.interceptors.push(function($rootScope, $q, $location, LoopBackAuth) {
  return {
    responseError: function(rejection) {
      if (rejection.status == 401) {

        console.log('401 error handled');
        //Now clearing the loopback values from client browser for safe logout...
        // LoopBackAuth.clearUser();
        // LoopBackAuth.clearStorage();

        //set redirect if needed
        $location.nextAfterLogin = $location.path();

        //login required - triggers redirect to login
        $rootScope.$broadcast('loginRequired');
      }
      return $q.reject(rejection);
      }
    };
  });

//Switches out BASE URL FOR EACH CLIENT
//======================================
$httpProvider.interceptors.push(function($q, $rootScope, BASE) {
return {
  request: function(config) {

    //IF API CALL _ SWITCH OUT BASE URL
    if (config.url.includes('/api/')) {

      var windowBase = config.url.substring(0, config.url.indexOf("/api"));
      var configUrlString = config.url.replace(windowBase, BASE.URL);

      config.url = configUrlString;
    }
    return config;
    }
  };
});

});