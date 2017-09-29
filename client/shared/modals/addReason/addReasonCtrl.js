/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addReasonCtrl', [])
//decalre dependencies
.controller('addReasonCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  resolvedData,
  Appuser,
  Logger,
  WonReason,
  LostReason,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.reason = {};

  $scope.data.currentType = resolvedData;



  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// function activate() {


// }
//-------------------------------------------
// activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save
*/
function ok() {

  if($scope.data.currentType.type == 'won') {
    //create won reason
    WonReason.create($scope.data.reason).$promise
      .then(function(results){
          Logger.info("Created New Reason")
          $uibModalInstance.close(results);
      })
      .catch(function(err){
        Logger.error("Error Creating Reason", "Please try again in a moment");
      })
  } else {

    //create won reason
    LostReason.create($scope.data.reason).$promise
      .then(function(results){
          Logger.info("Created New Reason")
          $uibModalInstance.close(results);
      })
      .catch(function(err){
        Logger.error("Error Creating Reason", "Please try again in a moment");
      })

  }

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