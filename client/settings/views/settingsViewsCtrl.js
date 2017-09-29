  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsViewsCtrl', [])
//declare dependencies
.controller('settingsViewsCtrl', function(
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

	//find views
	View.find({"filter": {"where": {"entity": $scope.data.currentEntity}}}).$promise
		.then(function(results){
			$scope.data.views = results;

			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.error('Error Fetching Views');
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