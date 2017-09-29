/* ==========================================================================
   Dynamic Title Directive
   ========================================================================= */

angular.module('interloop.directive.dynamicTitle', [])

.directive('title', ['$rootScope', '$timeout' ,
  function($rootScope, $timeout) {
    return {
      link: function() {
        var listener = function(event, toState) {  
              // if electron stop propogation
              $timeout(function() {
                $rootScope.pageTitle = (toState.data && toState.data.pageTitle) ? toState.data.pageTitle : 'Interloop';
              }); 
          };
        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
])
