/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.confirmCtrl', [])

//declare dependencies
.controller('confirmCtrl', function(
  $scope,
  $uibModalInstance) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

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