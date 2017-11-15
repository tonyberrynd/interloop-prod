/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addAvatarCtrl', [])
//decalre dependencies
.controller('addAvatarCtrl', function(
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
  var thisPhoto = resolvedData.uploadedPhoto;
  var thisRecord = resolvedData.thisRecord;

  //data
  //----------------------
  $scope.data = {};



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