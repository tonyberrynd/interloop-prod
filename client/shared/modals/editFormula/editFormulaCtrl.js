/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.editFormulaCtrl', [])

//declare dependencies
.controller('editFormulaCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData,
  newEntityFactory,
  View,
  ActivityType,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.formula = resolvedData;

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// function activate(){
//   return ActivityType.find().$promise
//           .then(function(results){
//             console.log('task types', results);
//             $scope.data.taskTypes = results;
//           })
//           .catch(function(err){
//             Logger.error('Error Fetching Task Types', 'Please Try Again in a moment')
//           })
// }
//-------------------------------------------
// activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function ok() {
    //close modal
    $uibModalInstance.close($scope.data.formula); 
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