  /* ==========================================================================
   Settings - Account Ctrl
   ========================================================================== */

angular.module('interloop.settingsSubscriptionCtrl', [])
//declare dependencies
.controller('settingsSubscriptionCtrl', function(
	$scope,
	$rootScope,
  $http,
  $q, 
  $timeout,
  $window, 
	Logger,
	Appuser,
  Org,
  modalManager) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;

	//functions
	//----------------------
  $scope.editBillingDetails = editBillingDetails;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
 return Org.findOne().$promise
        .then(function(results){
          $scope.data.thisOrg = results;

          $scope.data.activated = true;
        })
}


//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Edit Invoice Details
*/

function editBillingDetails() {
  modalManager.openModal('invoiceDetails');
}

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