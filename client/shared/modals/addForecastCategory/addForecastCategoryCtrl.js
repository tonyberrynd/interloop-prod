/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addForecastCategoryCtrl', [])
//decalre dependencies
.controller('addForecastCategoryCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  resolvedData,
  Appuser,
  Logger,
  ForecastCategory,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.forecastCategory = {};



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

  ForecastCategory.create($scope.data.category).$promise
    .then(function(results){
        Logger.info('Created New Forecast Category');
        $uibModalInstance.close(results);
    })
    .catch(function(err){
      Logger.error('Error Creating Category');
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