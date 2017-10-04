  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsTypesCtrl', [])
//declare dependencies
.controller('settingsTypesCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
	$injector,
  Logger,
	Appuser,
	modalManager,
	ActivityType,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};

  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.addType = addType;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return ActivityType.find().$promise
		.then(function(results){
			$scope.data.activityTypes = results;

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


function addType(){
	
	var newTypeModal = modalManager.openModal('addActivityType');

	//activate after creation
	newTypeModal.result.then(function(results){
		activate();
	})
}


function editType(type){
	var resolvedData = type;

	//open modal
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