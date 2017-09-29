/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.confirmCtrl', [])

//declare dependencies
.controller('confirmCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

  $scope.data.thisItem = resolvedData.thisItem || "this item";
  $scope.data.helperText = resolvedData.helpertext || "Please Confirm Action Below";

  //functions
  //----------------------

  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {
    $uibModalInstance.close();
  }

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