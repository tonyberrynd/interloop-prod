/* ==========================================================================
   Permission Directive
   ========================================================================== */

angular.module('interloop.directive.permission', []) 
.directive('permission', function(authService) {
   return {
       restrict: 'A',
       scope: {
          permission: '='
       },
 
       link: function (scope, elem, attrs) {
            scope.$watch(authService.isAuthenticated, function() {
                if (authService.userHasPermission(scope.permission)) {
                    elem.show();
                } else {
                    elem.hide();
                }
            });                
       }
   }
});