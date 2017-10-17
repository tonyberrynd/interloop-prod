/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.editForecastCategoryCtrl', [])
//decalre dependencies
.controller('editForecastCategoryCtrl', function(
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
  $scope.data.forecastCategory = resolvedData;



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

  ForecastCategory.prototype$patchAttributes({id: $scope.data.forecastCategory.id}, $scope.data.forecastCategory).$promise
    .then(function(results){
        Logger.info('Updated Forecast Category');
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