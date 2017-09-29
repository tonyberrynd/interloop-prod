/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.assignRoleCtrl', [])
//decalre dependencies
.controller('assignRoleCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  resolvedData,
  Appuser,
  AppRole,
  ActivityType,
  Logger,
  ForecastCategory,
  Team) {

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
function activate() {
  return AppRole.find().$promise
    .then(function(results){
      $scope.data.roles = results;
    })
    .catch(function(err){
      Logger.error('Error Retrieving Roles', 'Please try again in a moment');
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
  console.log('assign role');

  Appuser.roles.link(
    {'id': $scope.data.thisUser.id },
    { 'fk': $scope.data.selectedRole.id}
    ).$promise
    .then(function(results){
      Logger.info('Added Role');
      $uibModalInstance.close(results);
    })
    .catch(function(err){
      Logger.error("Error Assigning Role", "Please Try Again In A Moment");
      console.log(err);
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