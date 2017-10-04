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
  $scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.changeEntity = changeEntity;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  $scope.data.fields = $injector.get($scope.data.currentEntity + "Fields")
  $scope.data.activated = true;
}
//-------------------------------------------
activate();
//-------------------------------------------


//functions
function changeEntity(entity){
  $scope.data.currentEntity = entity;
  activate();

}


});