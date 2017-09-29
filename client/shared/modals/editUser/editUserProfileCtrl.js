/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.editUserProfileCtrl', [])

//declare dependencies
.controller('editUserProfileCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData,
  newEntityFactory,
  Appuser,
  View,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisUser = resolvedData;


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
    Appuser.prototype$patchAttributes({"id": $scope.data.thisUser.id}, $scope.data.thisUser).$promise
    .then(function(results){
      Logger.info('Saved User Profile');

      //close modal
      $uibModalInstance.close(results); 
    })
    .catch(function(err){
      Logger.error('Error Saving User Details');
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