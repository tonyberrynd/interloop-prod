/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addStatusCtrl', [])
//decalre dependencies
.controller('addStatusCtrl', function(
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
  Permission,
  Permissions,
  Status,
  ForecastCategory,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.status = {};


  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
//-------------------------------------------
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save
*/
function ok() {

  $scope.data.status.active = true;
  $scope.data.status.key = _.camelCase($scope.data.status.label);

  return Status.create($scope.data.status).$promise
    .then(function(results){

      $uibModalInstance.close(results);

    })
    .catch(function(err){
      Logger.error('Error Creating Role', 'Please Try Again in a moment');
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