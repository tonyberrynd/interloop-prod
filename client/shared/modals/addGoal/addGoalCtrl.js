/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addGoalCtrl', [])
//decalre dependencies
.controller('addGoalCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  resolvedData,
  Appuser,
  Logger,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.people = [];
  $scope.data.selectedPeople = [];



  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  return Appuser.find().$promise
    .then(function(results){
      $scope.data.people = results
    })
    .catch(function(err){
      Logger.error('Error Retrieving Users', 'Please Close the modal and try again in a moment')
    })

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save
*/
function ok() {

  $uibModalInstance.close($scope.data.selectedPeople);

}

/*
Dismiss Note Modal
*/
function cancel() {
  $uibModalInstance.dismiss('cancel');
}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});