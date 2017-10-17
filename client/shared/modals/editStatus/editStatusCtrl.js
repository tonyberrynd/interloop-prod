
angular.module('interloop.editStatusCtrl', [])
//decalre dependencies
.controller('editStatusCtrl', function(
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
  $scope.data.status = resolvedData;



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
  // $scope.data.status.key = _.camelCase($scope.data.status.label);


    Status.prototype$patchAttributes({id: $scope.data.status.id}, $scope.data.status).$promise
      .then(function(results){
        Logger.info('Updated Status Details')
        $uibModalInstance.close(); 
      })
      .catch(function(err){
        Logger.error('Error Updating Role', 'Please try again in a few moments')
      })
}

/*
Dismiss Note Modal
*/
function cancel() {
  $uibModalInstance.dismiss('cancel');
}

//-------------------------------------------

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});