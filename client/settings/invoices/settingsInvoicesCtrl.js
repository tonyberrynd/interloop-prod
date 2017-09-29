/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsInvoicesCtrl', [])
//declare dependencies
.controller('settingsInvoicesCtrl', function(
	$scope, 
	$timeout,
	Logger) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {}
	$scope.data.activated = false;

	$scope.data.invoices = [{id: 1}, {id: 2}, {id: 3}];

	//functions
	//----------------------
	// $scope.save = save;


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {


	$timeout(function(){
		$scope.data.activated = true;
		$scope.data.invoicePreferences = {};
	}, 250)

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Function Description
*/


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
