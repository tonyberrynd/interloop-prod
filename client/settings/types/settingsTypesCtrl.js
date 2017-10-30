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
	$scope.deleteType = deleteType;
	$scope.editType = editType;

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
	var editActivityTypeModal = modalManager.openModal('editActivityType', resolvedData);

	editActivityTypeModal.result.then(function(results){
		Logger.info('Succesfully Updated Activity Type');

		activate();
	})
}


function deleteType(type){
	var resolvedData = {
		thisItem: 'Activity Type - ' + type.label,
		helperText: 'This will remove this activity from forms and the grid'
	};

	//open modal
	var deleteFieldModal = modalManager.openModal('confirm', resolvedData);

	deleteFieldModal.result.then(function(results){
		ActivityType.deleteById({"id": type.id}).$promise
			.then(function(results){
				$scope.data.activityTypes.splice($scope.data.activityTypes.indexOf(type), 1);
			})
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