  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsCustomFieldsCtrl', [])
//declare dependencies
.controller('settingsCustomFieldsCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
	$injector,
  Logger,
	Appuser,
	modalManager,
	CustomField,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.currentEntity = 'Opportunity';

  
	//functions
	//----------------------
	$scope.changeEntity = changeEntity;
	$scope.editField = editField;
	$scope.deleteField = deleteField;
	$scope.newCustomField = newCustomField;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return CustomField.find({"filter": {'where': {"useWith": {"inq": [$scope.data.currentEntity]}}}}).$promise
			.then(function(results){
				$scope.data.customFields = results;
				$scope.data.activated = true;
			})
			.catch(function(err){
				console.log(err);
			})

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeEntity(entity){
	$scope.data.currentEntity = entity;
	//rerun activation logic
	activate();
}


function editField(field){
	var resolvedData = field;

	//open modal
	var editCustomFieldModal = modalManager.openModal('editCustomField', resolvedData);

	editCustomFieldModal.result.then(function(results){
		Logger.info('Succesfully Updated Field');

		activate();
	})
}

function deleteField(field){
	var resolvedData = {
		thisItem: 'Custom Field' + field.label,
		helperText: 'This will remove this field from forms and the grid'
	};

	//open modal
	var deleteFieldModal = modalManager.openModal('confirm', resolvedData);

	deleteFieldModal.result.then(function(results){
		CustomField.deleteById({"id": field.id}).$promise
			.then(function(results){
				$scope.data.customFields.splice($scope.data.customFields.indexOf(field), 1);
			})
	})
}

function newCustomField() {
	var newCustomFieldModal = modalManager.openModal('newCustomField');

	newCustomFieldModal.result.then(function(results){
		activate();
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