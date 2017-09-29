/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.lostReasonCtrl', [])
//decalre dependencies
.controller('lostReasonCtrl', function(
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
  $scope.data.lostReason = null;
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
  // console.log('save lost reason')
  Opportunity.prototype$patchAttributes({"id": $scope.data.thisOpp.id}, 
  {
    status: $scope.data.value,
    lostReason: $scope.data.lostReason,
    lostDetails: $scope.data.lostDetails,
    wonReason: {},
    wonDetails: '',
    actualClose: moment().format()
  })
  .$promise
  .then(function(result){
    Logger.info('Lost Opportunity');
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