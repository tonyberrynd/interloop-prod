/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.editReasonCtrl', [])

//declare dependencies
.controller('editReasonCtrl', function(
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
  $scope.data.field = resolvedData;


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

    $uibModalInstance.close(); 

    // Field.prototype$patchAttributes({id: $scope.data.field.id}, $scope.data.field).$promise
    //   .then(function(results){
    //     Logger.info('Updated Field Details')
    //     $uibModalInstance.close(); 
    //   })
    //   .catch(function(err){
    //     Logger.error('Error Updating Field', 'Please try again in a few moments')
    //   })

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