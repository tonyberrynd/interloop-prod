/* ==========================================================================
   change and blur input
   ========================================================================= */

angular.module('coil.directive.changeOnBlur', [])

.directive('changeOnBlur', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attrs, ngModelCtrl) {
                    if (attrs.type === 'radio' || attrs.type === 'checkbox') 
                        return;

                    var expressionToCall = attrs.changeOnBlur;

                    var oldValue = null;
                    elm.bind('focus',function() {
                        scope.$apply(function() {
                            oldValue = elm.val();
                            // console.log(oldValue);
                        });
                    })
                    elm.bind('blur', function() {
                        scope.$apply(function() {
                            var newValue = elm.val();
                            // console.log(newValue);
                            if (newValue !== oldValue){
                                scope.$eval(expressionToCall);
                            }
                                //alert('changed ' + oldValue);
                        });         
                    });
                }
            };
        });