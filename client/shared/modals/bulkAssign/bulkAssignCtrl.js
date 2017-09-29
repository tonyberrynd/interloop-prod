/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.bulkAssignCtrl', [])

//declare dependencies
.controller('bulkAssignCtrl', function(
  $scope,
  $uibModalInstance,
  Appuser,
  Logger,
  resolvedData) {

// BINDABLES
//===========================================
  //vars
  //----------------------
  var query = resolvedData.query || {};

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

  return Appuser.find().$promise
    .then(function(results){
      $scope.data.owners = results;
    })
    .catch(function(err){
      Logger.error('Error Retrieving Owners', 'Please Try again in a moment');
    })
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function ok() {

  //TODO - FOR EACH _SET UP OWNER


    $uibModalInstance.close($scope.data);
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