/* ==========================================================================
   Bulk Merge Control
   ========================================================================== */

angular.module('interloop.bulkMergeCtrl', [])

.controller('bulkMergeCtrl', function(
  $scope, 
  $uibModalInstance, 
  $log, 
  $timeout, 
  Selected) {

	$scope.data = {};


  //============================
  // Functions
  $scope.ok = ok;
  $scope.cancel = cancel;


  $scope.data.selected = Selected;

  

  //============================

  //submit form and update values
  function ok() {
  	$uibModalInstance.close();
  }

  function cancel () {
  $uibModalInstance.dismiss('cancel');
	};
	
  //internal functions
  function do_merge(items) {

    // Custom merge function ORs together non-object values, recursively
    // calls itself on Objects.
    var merger = function (a, b) {
      if (_.isObject(a)) {
        return _.merge({}, a, b, merger);
      } else {
        return a || b;
      }
    };

    // Allow items to be passed to _.merge as an array of arbitrary length
    var args = _.flatten([{}, items, merger]);
    return _.merge.apply(_, args);
  }


});