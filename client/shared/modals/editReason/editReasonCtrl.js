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
  WonReason,
  LostReason,
  Logger) {

// BINDABLES
//===========================================
  var type = resolvedData.type;

  //data
  //----------------------
  $scope.data = {};
  $scope.data.reason = resolvedData.reason;


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

  if(type == 'won') {
    //create won reason
    WonReason.prototype$patchAttributes({id: $scope.data.reason.id}, $scope.data.reason).$promise
      .then(function(results){
          Logger.info("Created New Reason")
          $uibModalInstance.close(results);
      })
      .catch(function(err){
        Logger.error("Error Creating Reason", "Please try again in a moment");
      })
  } else {

    //create won reason
    LostReason.prototype$patchAttributes({id: $scope.data.reason.id}, $scope.data.reason).$promise
      .then(function(results){
          Logger.info("Created New Reason")
          $uibModalInstance.close(results);
      })
      .catch(function(err){
        Logger.error("Error Creating Reason", "Please try again in a moment");
      })

  }

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