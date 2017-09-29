/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.newSystemViewCtrl', [])

//declare dependencies
.controller('newSystemViewCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData,
  newEntityFactory,
  View,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.dynamicValues = [
   {
    'key': '**USER_ID**', 
    'description': 'Will Replace with current Users Id'
   },
   {
    'key': '**BEGINNING_OF_TODAY**', 
    'description': 'Replaces with datetime of start of today'
   },
   {
    'key': '**END_OF_TODAY**', 
    'description': 'Replaces with datetime of end of today'
   }];

  $scope.data.thisView = resolvedData || {};
  $scope.data.thisView.type = 'system';



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
    View.create($scope.data.thisView ).$promise
    .then(function(results){
      Logger.info('Created View');

      //close modal
      $uibModalInstance.close(results); 
    })
    .catch(function(err){
      Logger.error('Error Creating View');
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