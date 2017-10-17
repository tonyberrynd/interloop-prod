/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.editRoleCtrl', [])

//declare dependencies
.controller('editRoleCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData,
  newEntityFactory,
  AppRole,
  View,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.currentTab = 'details';
  $scope.data.thisRole = resolvedData;


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

    // TODO - Move Fields to Database
    AppRole.prototype$patchAttributes({id: $scope.data.thisRole.id}, $scope.data.thisRole).$promise
      .then(function(results){
        Logger.info('Updated Role Details')
        $uibModalInstance.close(); 
      })
      .catch(function(err){
        Logger.error('Error Updating Role', 'Please try again in a few moments')
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

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});