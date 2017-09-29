  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsPipelinesCtrl', [])
//declare dependencies
.controller('settingsPipelinesCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
  Logger,
	Appuser,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  	$scope.data.activated = false;

  
	//functions
	//----------------------


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