/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.bulkAssignCtrl', [])

//declare dependencies
.controller('bulkAssignCtrl', function(
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

  $scope.data.selectedItems = resolvedData.selectedItems;

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  Appuser.find().$promise
    .then(function(results){
      $scope.data.owners = results;
    })
    .catch(function(err){
      Logger.error('Error Retrieving Owners', 'Please Try again in a moment');
    })

}
//-------------------------------------------
activate();
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