/* ==========================================================================
   change and blur input
   ========================================================================= */

angular.module('coil.directive.scrollClass', [])

.directive('scrollClass', function(){
  return {
    restrict: 'C',
    link: function(scope,element, attrs){
       element.bind('scroll', function(){
         //do code here
         if($(element).scrollTop() > 0) {
         	$(element).addClass( "scrolled");
         } else {
         	$(element).removeClass( "scrolled" );
         }
       })
    }
  }
})