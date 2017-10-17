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
	$scope.editStatus = editStatus;
	$scope.deleteStatus = deleteStatus;

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



function editStatus(status){
	var resolvedData = status;

	//open modal
	var editStatusModal = modalManager.openModal('editStatus', resolvedData);
		//after modal closed
		editStatusModal.result.then(function(result){
			activate();
		}, function(){
			//ignore
		})
}


function deleteStatus(status) {

	var resolvedData = {
		helperTitle: 'Delete Status',
		helperText: 'Are you sure you want to delete this status?',
		helperDescription: 'This will remove the status from the application, anything associated with this status will not be changed'
	};

	//open modal
	var deleteStatusModal = modalManager.openModal('warning', resolvedData);

	deleteStatusModal.result.then(function(results){
		Status.deleteById({"id": status.id}).$promise
			.then(function(results){
				$scope.data.statuses.splice($scope.data.statuses.indexOf(status), 1);
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