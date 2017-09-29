  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.configFieldsCtrl', [])
//declare dependencies
.controller('configFieldsCtrl', function(
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
  $scope.data.activated = true;

  
	//functions
	//----------------------
	// $scope.changeEntity = changeEntity;
	// $scope.editView = editView;
	// $scope.newView = newView;
	// $scope.deleteView = deleteView;
	// $scope.enableDisableView = enableDisableView;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

}
//-------------------------------------------
activate();
//-------------------------------------------


});