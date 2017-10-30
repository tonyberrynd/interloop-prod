/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addActivityTypeCtrl', [])
//decalre dependencies
.controller('addActivityTypeCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  resolvedData,
  Appuser,
  ActivityType,
  Logger,
  ForecastCategory,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.activityType = {};



  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {


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

    //custom field attributes
  var activityType = {
    key: _.camelCase($scope.data.activityType.name),
    label: $scope.data.activityType.name,
    description: $scope.data.activityType.description,
    active: true
  };

  ActivityType.create(activityType).$promise
    .then(function(results){
        Logger.info('Created New Activity Type');
        $uibModalInstance.close(results);
    })
    .catch(function(err){
      Logger.error('Error Creating Activity Type');
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