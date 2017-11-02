/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.showFullRecordCtrl', [])

//declare dependencies
.controller('showFullRecordCtrl', function(
  $scope,
  $uibModalInstance,
  Appuser,
  Logger,
  resolvedData) {

// BINDABLES
//===========================================

  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisRecord = _.get(resolvedData, 'thisRecord', {});

  //functions
  //----------------------
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
//-------------------------------------------


// FUNCTIONS
//===========================================

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});