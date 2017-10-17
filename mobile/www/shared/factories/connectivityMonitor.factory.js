angular.module('interloop.factory.connectivityMonitor', [])

.factory('ConnectivityMonitor', function($rootScope, Logger){
 
  return {
    startWatching: function(){
          window.addEventListener("online", function(e) {
            Logger.log("went online");
            $rootScope.$apply(function() {
              $rootScope.offline = false;
            });

          }, false);    
          window.addEventListener("offline", function(e) {
            Logger.log("went offline");
            // apply scope change
            $rootScope.$apply(function() {
              $rootScope.offline = true;
            });
          }, false);  
        }       
  }
})