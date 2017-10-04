  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsStatusesCtrl', [])
//declare dependencies
.controller('settingsStatusesCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
	$injector,
  Logger,
	Appuser,
	modalManager,
	Status,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};

  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.addStatus = addStatus;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return Status.find().$promise
		.then(function(results){
			$scope.data.statuses = results;

			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.error('Error Fetching Activity Types', 'Please Try Again in a moment')
		})


}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function addStatus() {

	var statusModal = modalManager.openModal('addStatus');

	statusModal.result.then(function(results){
		activate()
	}, function(){
		//ignore
	})
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