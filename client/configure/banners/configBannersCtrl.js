/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configBannersCtrl', [])
//declare dependencies
.controller('configBannersCtrl', function(
	$scope,
	$rootScope,
	$timeout,
	Logger,
	Org,
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
//-------------------------------------------

});
