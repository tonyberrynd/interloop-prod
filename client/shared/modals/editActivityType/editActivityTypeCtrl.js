/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.editActivityTypeCtrl', [])
//decalre dependencies
.controller('editActivityTypeCtrl', function(
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
  $scope.data.activityType = resolvedData;


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

    ActivityType.prototype$patchAttributes({id: $scope.data.activityType.id}, $scope.data.activityType).$promise
      .then(function(results){
        Logger.info('Updated Activity Types')
        $uibModalInstance.close(); 
      })
      .catch(function(err){
        Logger.error('Error Updating Activity Type', 'Please try again in a few moments')
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

});