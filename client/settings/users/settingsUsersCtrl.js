/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsUsersCtrl', [])
//declare dependencies
.controller('settingsUsersCtrl', function(
	$scope,
	Appuser,
	Logger,
	modalManager) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;
	$scope.data.sortBy = {label: 'First Name', value: 'firstName'};

	$scope.data.sortOptions = [
		// first
		{label: 'First Name',
		 value: 'firstName'},
		 // last
		 {label: 'Last Name',
		 value: 'lastName'},
		 // role
		 // {label: 'Role',
		 // value: 'role'},
		 // created date
		 {label: 'Created Date',
		 value: 'createdOn'}
	];


	//functions
	//----------------------
	$scope.inviteUsers = inviteUsers;
	$scope.deactivate = deactivate;
	$scope.changeUserState = changeUserState;
	$scope.editUser = editUser;
	$scope.assignRole = assignRole;


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  return Appuser.find({"filter": {"include": "role"}})
      .$promise.then(function(results) {
          $scope.data.users = results;  
          //activated
          $scope.data.activated = true;
      })
      .catch(function(err){
        Logger.error('Error Fetching Users');
		//activated
        $scope.data.activated = true;
      })
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Invite Users
*/

function inviteUsers() {
	modalManager.openModal('inviteUsers');
}


function editUser(user){
	var resolvedData = user;

	var editUserModal = modalManager.openModal('editUser', resolvedData);

	//after editing users
	editUserModal.result.then(function(results){
		activate();
	})
}


/*
Assign Role To User
*/
function assignRole(user){
	var resolvedData = user;

	var assignRoleModal = modalManager.openModal('assignRole', resolvedData);

	//after editing users
	assignRoleModal.result.then(function(results){
		activate();
	})
}



/*
Deactivate User
*/
function deactivate(user) {
	//bind to var
	var deactiveUser = modalManager.openModal('confirm');
	//allows us to fulfill promise
	deactiveUser.result.then(function () {

		return changeUserState(user, true);

    }, function () {
      Logger.log('Cancel');
    });
}


/*
Deactivates / Activates User Account
*/
function changeUserState(user, boolean){
	return Appuser.updateAttributes({ id: user.id }, { deactivated: boolean })
    .$promise
    .then(function successCallback(response) {
    	//on success - close modal
    	if(boolean){
    		Logger.error('User Deactivated');
    		//show state in ui
    		user.deactivated = true;
    	}
    	else {
    		Logger.success('User Re-Activated');
    		//show state in ui
    		user.deactivated = false;
    	}
    	
      }, function errorCallback(response) {
        Logger.error('Error Updating Profile');
    });
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
