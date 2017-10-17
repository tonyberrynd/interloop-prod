/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.editCustomFieldCtrl', [])

//declare dependencies
.controller('editCustomFieldCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData,
  newEntityFactory,
  View,
  CustomField,
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

    CustomField.prototype$patchAttributes({id: $scope.data.field.id}, $scope.data.field).$promise
      .then(function(results){
        Logger.info('Updated Field Details')
        $uibModalInstance.close(); 
      })
      .catch(function(err){
        Logger.error('Error Updating Field', 'Please try again in a few moments')
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