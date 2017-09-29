  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.configSystemViewsCtrl', [])
//declare dependencies
.controller('configSystemViewsCtrl', function(
  $scope,
  $rootScope,
  $log,
  $timeout,
  $uibModal,
  $injector,
  Logger,
  Appuser,
  modalManager,
  View,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.currentEntity = 'Opportunity';
  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.changeEntity = changeEntity;
	$scope.editView = editView;
	$scope.newView = newView;
	$scope.deleteView = deleteView;
	$scope.enableDisableView = enableDisableView;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	//get views
	changeEntity($scope.data.currentEntity);

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeEntity(entity){
	$scope.data.currentEntity = entity;

	//find views
	View.find({"filter": {"where": {"and": [{"entity": $scope.data.currentEntity}, {"type": "system"}]}}}).$promise
		.then(function(results){
			$scope.data.views = results;

			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.error('Error Fetching Views');
		})
}


function editView(view) {

	var resolvedData = view;

	var editViewModal = modalManager.openModal('editSystemView', resolvedData)

	editViewModal.result.then(function(results){
		activate();
	})
}


function newView(view) {


	var resolvedData = angular.copy(view) || { 'entity': $scope.data.currentEntity };


	var newViewModal = modalManager.openModal('newSystemView', resolvedData)

	newViewModal.result.then(function(results){
		activate();
	})
}

function enableDisableView(view) {
	//Save Report Info Here
	return View.prototype$patchAttributes({id: view.id}, {active: view.active}).$promise
      .then(function(results){
        Logger.info('Updated View')
      })
      .catch(function(err){
        Logger.error('Error Updating Report', 'Please try again in a few moments')
      })
}


function deleteView(view) {

	var resolvedData = {
		thisItem: view.name,
		helpText: 'Are you sure you want to delete this system view?'
	}

	var deleteViewModal = modalManager.openModal('confirm', resolvedData)

	deleteViewModal.result.then(function(results){
		View.deleteById({"id": view.id}).$promise
			.then(function(results){
				Logger.info("Deleted View");
				$scope.data.views.splice($scope.data.views.indexOf(view), 1);
			})
			.catch(function(err){
				Logger.error('Error Deleting View', 'Check console for details');
				console.log(err);
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