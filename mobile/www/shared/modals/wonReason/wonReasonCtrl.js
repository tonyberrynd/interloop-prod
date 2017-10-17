/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.wonReasonCtrl', [])
//decalre dependencies
.controller('wonReasonCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $uibModalInstance,
  Logger,
  Value,
  thisOpp,
  Opportunity,
  Reasons) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisOpp = thisOpp;
  $scope.data.value = Value;
  $scope.data.wonReason = null;
  //won reasons
  $scope.data.reasons = Reasons.items;


  //functions
  //----------------------
  $scope.save = save;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save
*/
function save() {

  Opportunity.prototype$patchAttributes({"id": $scope.data.thisOpp.id}, 
  {
    status: $scope.data.value,
    wonReason: $scope.data.wonReason,
    wonDetails: $scope.data.wonDetails,
    lostReason: {},
    lostDetails: '',
    actualClose: moment().format()
  })
  .$promise
  .then(function(result){
    Logger.success('Won Opportunity');
    $uibModalInstance.close(result);
  })
  .catch(function(err){
    Logger.error('Error Updating Opportunity')
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