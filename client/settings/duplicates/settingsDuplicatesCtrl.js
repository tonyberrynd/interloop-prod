  /* ==========================================================================
   Duplicates Manager
   ========================================================================== */

angular.module('interloop.settingsDuplicatesCtrl', [])
//declare dependencies
.controller('settingsDuplicatesCtrl', function(
  $scope,
  $rootScope,
  $log,
  $timeout,
  $uibModal,
  $injector,
  Logger,
  Appuser,
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
	$scope.data.loading = true;

	//find views
	$injector.get($scope.data.currentEntity).duplicates().$promise
		.then(function(results){
			$scope.data.duplicates = results;
			$scope.data.loading = false;
			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.error('Error Fetching Duplicates');
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