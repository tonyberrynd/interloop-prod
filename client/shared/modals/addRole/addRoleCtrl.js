/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addRoleCtrl', [])
//decalre dependencies
.controller('addRoleCtrl', function(
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
  ForecastCategory,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.currentTab = 'details';
  $scope.data.thisRole = resolvedData || {};
  $scope.data.thisRole.visibility = 'limited';

  // permissions
  // $scope.data.permissions = Permissions;


  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  return Permission.find().$promise
    .then(function(results){
      $scope.data.permissions = results;
    })
    .catch(function(err){
      Logger.error("Error Finding Permissions", "Please try again in a moment");
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

  return AppRole.create($scope.data.role).$promise
    .then(function(results){

      $uibModalInstance.close(results);

      // //Link Permissions
      // var permissionPromises = [];

      // _.forEach(_.filter($scope.data.permissions, ['active', true]), function(value){
      //     permissionPromises.push(AppRole.permissions.link({fk: value.id}))
      // })

      // $q.all(permissionPromises)
      //   .then(function(results){
      //     $uibModalInstance.close(results);
      //   })
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