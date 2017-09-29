  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsGoalsCtrl', [])
//declare dependencies
.controller('settingsGoalsCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
	$injector,
  Logger,
	Appuser,
	modalManager,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.goalType == 'revenue';
	$scope.data.activated = false;
  
	//functions
	//----------------------
	$scope.changeType = changeType;
	$scope.addGoal = addGoal;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	$timeout(function(){
		$scope.data.activated = true;
	}, 250)
	

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeType(type){
	$scope.data.goalType = type;
}

function addGoal() {
	var addGoalModal = modalManager.openModal('addGoal');

	//create goals and configure
	addGoalModal.result.then(function(results){

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