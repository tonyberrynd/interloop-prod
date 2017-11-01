/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configErrorHandlingCtrl', [])
//declare dependencies
.controller('configErrorHandlingCtrl', function(
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
	$scope.data.title = "Title";
	$scope.data.message = "Message Body"

	//functions
	//----------------------
	$scope.info = info;
	$scope.warning = warning;
	$scope.error = error;
	$scope.success = success;

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

function info(title, message){
	Logger.info(title, message);
}

function warning(title, message){
	Logger.warning(title, message);
}

function error(title, message){
	Logger.error(title, message);
}

function success(title, message){
	Logger.success(title, message);
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
