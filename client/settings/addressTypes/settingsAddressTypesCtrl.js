  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsAddressTypesCtrl', [])
//declare dependencies
.controller('settingsAddressTypesCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
	$injector,
  Logger,
	Appuser,
	modalManager,
	AddressType,
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

	return AddressType.find().$promise
		.then(function(results){
			$scope.data.addressTypes = results;

			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.error('Error Fetching Address Types', 'Please Try Again in a moment')
		})


}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function addType(){
	
	var newTypeModal = modalManager.openModal('addAddressType');

	//activate after creation
	newTypeModal.result.then(function(results){
		activate();
	})
}


function editType(type){
	var resolvedData = type;

	//open modal
	var editActivityTypeModal = modalManager.openModal('editAddressType', resolvedData);

	editActivityTypeModal.result.then(function(results){
		Logger.info('Succesfully Updated Address Type');

		activate();
	})
}


function deleteType(type){
	var resolvedData = {
		thisItem: 'Address Type - ' + type.label,
		helperText: 'This will remove this activity from forms and the grid'
	};

	//open modal
	var deleteFieldModal = modalManager.openModal('confirm', resolvedData);

	deleteFieldModal.result.then(function(results){
		AddressType.deleteById({"id": type.id}).$promise
			.then(function(results){
				$scope.data.addressTypes.splice($scope.data.activityTypes.indexOf(type), 1);
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