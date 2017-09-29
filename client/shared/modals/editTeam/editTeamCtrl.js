/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.editTeamCtrl', [])
//decalre dependencies
.controller('editTeamCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $uibModalInstance,
  Logger,
  resolvedData,
  Team,
  Appuser) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisTeam = angular.copy(resolvedData.thisTeam);
  $scope.data.manager = null;



  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){

  return Appuser.find().$promise
          .then(function(results){
            $scope.data.people = results;
          })
          .catch(function(err){
            Logger.error("Error Fetching Users", "Please Try Again in a moment");
          })

}

activate()
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save
*/
function ok() {
     //save view
    Team.prototype$patchAttributes({"id": $scope.data.thisTeam.id}, $scope.data.thisTeam ).$promise
    .then(function(results){
      Logger.info('Saved Team Details');

      //close modal
      $uibModalInstance.close(results); 
    })
    .catch(function(err){
      Logger.error('Error Saving View');
    })
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