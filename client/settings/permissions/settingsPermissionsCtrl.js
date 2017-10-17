  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsPermissionsCtrl', [])
//declare dependencies
.controller('settingsPermissionsCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
  Logger,
	Appuser,
	AppRole,
	modalManager,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  	$scope.data.activated = false;

  	$scope.data.sortOptions = [
		{label: 'Label',
		 value: 'label'},
		 {label: 'Created Date',
		 value: 'createdOn'}
	];

  
	//functions
	//----------------------
	$scope.addRole = addRole;
	$scope.editRole = editRole;
	$scope.copyRoleAs = copyRoleAs;
	$scope.deleteRole = deleteRole;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return AppRole.find({"filter": {'include': ['permissions', 'users']}}).$promise
		.then(function(results){
			$scope.data.roles = results;
			console.log($scope.data.roles);

			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.error('Error fetching roles', 'Please try again in a moment');
		})

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function editRole(role) {

	var resolvedData = role;

	var editRoleModal = modalManager.openModal('editRole', resolvedData);


	editRoleModal.result.then(function(results){
		activate();
	})
}

function addRole() {

	var addRoleModal = modalManager.openModal('addRole');


	addRoleModal.result.then(function(results){
		activate();
	})

}

function copyRoleAs(role) {

	var resolvedData = role;

	var addRoleModal = modalManager.openModal('addRole', resolvedData);


	addRoleModal.result.then(function(results){
		activate();
	})

}


function deleteRole(role) {

	if(role.users.length) {
		alert("Cannot Delete a Role with users", "Please Reassign these users before deleteing");
	} else {
	var resolvedData = {
		thisItem: role.name,
		helpText: 'This Role Can Only Be Removed if No Users have this role'
	};

	var confirmDeleteRole = modalManager.openModal('confirm', resolvedData);

	confirmDeleteRole.result.then(function(results){

	AppRole.deleteById({id: role.id}).$promise
		.then(function(results){
			Logger.info("Deleted Role");
			activate();
		})
		.catch(function(err){
			Logger.error("Error Deleting Role");
		})

	});

}


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