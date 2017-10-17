/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsInvoiceDetailsCtrl', [])
//declare dependencies
.controller('settingsInvoiceDetailsCtrl', function(
	$scope, 
	$timeout,
	modalManager,
	Appinvoice,
	Logger) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {}
	$scope.data.activated = false;



	//functions
	//----------------------


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
    return Appinvoice.findOne({"filter": {"where": {"id": $stateParams.invoiceId}}}).$promise
           .then(function(results){
           	$scope.data.thisInvoice = results;
           	$scope.data.activated = true;
           })
           .catch(function(err){
           	Logger.error('Error Fetching this invoice', 'Please try again in a moment');
			$scope.data.activated = true;
           })
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
