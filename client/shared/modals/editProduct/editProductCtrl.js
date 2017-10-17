/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.editProductCtrl', [])
//decalre dependencies
.controller('editProductCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  resolvedData,
  Appuser,
  Product,
  Logger,
  ForecastCategory,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.product = {};
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

  $scope.data.product.active = true;

  Product.prototype$patchAttributes({id: $scope.data.product.id}, $scope.data.product).$promise
    .then(function(results){
        Logger.info('Created New Product');
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