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
	$window,
	$injector,
	Logger,
	Appuser,
	modalManager,
	CustomField,
	Team
  ) {

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
	$scope.save = save;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	$scope.data.loading = true;
	return CustomField.find({"filter": {'where': {"useWith": {"inq": [$scope.data.currentEntity]}}}}).$promise
			.then(function(results){
				$scope.data.customFields = results;
				$scope.data.activated = true;
				$scope.data.loading = false;
			})
			.catch(function(err){
				Logger.error('Error fetching custom fields', 'Please try again in a moment');
				$scope.data.loading = false;
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
		CustomField.find().$promise
			.then(function(results){
				$rootScope.customFields = results;
				activate();
			})
			.catch(function(err){
				Logger.log('Error Updating Custom Fields')
				$window.reload();
			})

	}, function(){
		//ignore
	})
}

function save(field){

	  CustomField.prototype$patchAttributes({id: field.id}, field).$promise
      .then(function(results){
        Logger.info('Field Saved', 'Refresh Your Browser to see changes throughout the application')
      })
      .catch(function(err){
        Logger.error('Error Updating Field', 'Please try again in a few moments')
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