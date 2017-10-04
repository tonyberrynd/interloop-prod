  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsPipelinesCtrl', [])
//declare dependencies
.controller('settingsPipelinesCtrl', function(
	$scope,
	$rootScope,
	$log,
	$timeout,
	$uibModal,
	Logger,
	Process,
	Appuser,
	Team,
	modalManager
  ) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.addProcess = addProcess;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return Process.find({'filter': {'include': ['stages']}}).$promise
			.then(function(results){
				$scope.data.processes = results;
				$scope.data.activated = true;
			})
			.catch(function(err){
				Logger.error("Error Retrieving Processes", "Please try again in a moment");
			})

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function addProcess(){
	var newProcessModal = modalManager.openModal('addProcess');

		newProcessModal.result.then(function(results){
			activate();
		}, function(){
			//ignroe
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