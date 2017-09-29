/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.newTeamCtrl', [])
//decalre dependencies
.controller('newTeamCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $uibModalInstance,
  Logger,
  Appuser,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.team = {};



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

  Team.create($scope.data.team).$promise
    .then(function(results){

      Logger.info('Succesfully Created Team')
      $uibModalInstance.close(results);
    })
    .catch(function(err){
      Logger.error('Error Create Team', 'Please Try again in a few moments')
    });
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