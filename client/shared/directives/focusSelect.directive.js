/* ==========================================================================
   FocusSelect Directive
   ========================================================================== */

angular.module('interloop.directive.focusSelect', [])

.directive('focusSelect', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
        $element.select();
      });
    }
  }
}]);