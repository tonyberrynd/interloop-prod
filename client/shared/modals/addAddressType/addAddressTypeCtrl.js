/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addAddressTypeCtrl', [])
//decalre dependencies
.controller('addAddressTypeCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  resolvedData,
  Appuser,
  AddressType,
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

  AddressType.create(activityType).$promise
    .then(function(results){
        Logger.info('Created New Address Type');
        $uibModalInstance.close(results);
    })
    .catch(function(err){
      Logger.error('Error Creating Address Type');
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