/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.submitForecastCtrl', [])

//declare dependencies
.controller('submitForecastCtrl', function(
  $scope,
  $uibModalInstance) {

// BINDABLES
//===========================================
  //data
  //----------------------


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