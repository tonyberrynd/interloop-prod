/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configOnboardingCtrl', [])
//declare dependencies
.controller('configOnboardingCtrl', function(
	$scope,
	$rootScope,
	$timeout,
	Logger,
	Org,
	modalManager,
	Appuser) {

// BINDABLES
//===========================================

	//vars
	//----------------------
	var initializing = true;


	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;



	//functions
	//----------------------
	$scope.launchUserOnboarding = launchUserOnboarding;

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

function launchUserOnboarding(){
	modalManager.openModal('userOnboarding');
}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
//-------------------------------------------

});
