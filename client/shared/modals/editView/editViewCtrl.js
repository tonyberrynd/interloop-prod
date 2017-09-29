/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.editViewCtrl', [])

//declare dependencies
.controller('editViewCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData,
  newEntityFactory,
  View,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.view = resolvedData;
  console.log($scope.data.view);


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
     //save view
    View.prototype$patchAttributes({"id": $scope.data.view.id}, {'name': $scope.data.view.name } ).$promise
    .then(function(results){
      Logger.info('Saved View');

      //close modal
      $uibModalInstance.close(results); 
    })
    .catch(function(err){
      Logger.error('Error Saving View');
    })
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