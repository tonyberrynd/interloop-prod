/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.importDataCtrl', [])

//declare dependencies
.controller('importDataCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData) {

// BINDABLES
//===========================================
  //vars
  //----------------------
  // var entity = resolvedData.entity;


  //data
  //----------------------
  $scope.data = {};


  //data
  //----------------------
  $scope.data = {};
  $scope.data.selectedOption = {};
  $scope.data.value = null;

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
    $uibModalInstance.close($scope.data);
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