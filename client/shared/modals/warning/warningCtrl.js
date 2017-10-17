/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.warningCtrl', [])

//declare dependencies
.controller('warningCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

  $scope.data.helperTitle = resolvedData.helperTitle;
  $scope.data.helperText = resolvedData.helperText;

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