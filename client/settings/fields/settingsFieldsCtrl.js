  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsFieldsCtrl', [])
//declare dependencies
.controller('settingsFieldsCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
	$injector,
  Logger,
	Appuser,
	modalManager,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.currentEntity = 'Opportunity';
	$scope.data.fields = $injector.get($scope.data.currentEntity + 'Fields');
  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.changeEntity = changeEntity;
	$scope.editField = editField;
	$scope.save = save;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	$timeout(function(){
		$scope.data.activated = true;
	}, 250)

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeEntity(entity){
	$scope.data.currentEntity = entity;
	$scope.data.fields = $injector.get($scope.data.currentEntity + 'Fields');
}


function editField(field){
	var resolvedData = field;

	//open modal
	modalManager.openModal('editField', resolvedData);
}


function save(field){
	//TODO - persist to server
	Logger.info('Field Saved', 'Refresh Your Browser to see changes throughout the application')
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