
/* ==========================================================================
   Extending UI Select Directive
   ========================================================================= */

angular.module('interloop.directive.myUiSelect', [])

.directive('placeholderAlwaysVisible', function() {
  return {
    require: 'uiSelect',
    link: function($scope, $element, attrs, $select) {     
      $select.getPlaceholder = function () {
        return $select.placeholder;
      }
    }
  }
});