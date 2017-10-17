/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsInvoicesCtrl', [])
//declare dependencies
.controller('settingsInvoicesCtrl', function(
	$scope, 
	$timeout,
	$rootScope,
	$state,
	modalManager,
	Appinvoice,
	Logger) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {}
	$scope.data.activated = false;

	$scope.data.invoices = [{id: 1}, {id: 2}, {id: 3}];
	//ensure we dont get a typeerror
	$rootScope.activeOrg.invoicePreferences = _.get($rootScope.activeOrg, 'invoicePreferences', {});

	//functions
	//----------------------
	$scope.updatePayment = updatePayment;
	$scope.save = save;


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {


	return Appinvoice.find().$promise
				.then(function(results){
					$scope.data.invoices = results;
					$scope.data.activated = true;
				})
				.catch(function(err){
					Logger.error('Error Fetching Invoices', 'Please try again in a moment');
					$scope.data.activated = true;
					$state.go('app.settings.invoices')
				})

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Function Description
*/

function updatePayment(){
	var updatePaymentModal = modalManager.openModal('paymentMethod');

	updatePaymentModal.result.then(function(results){
		activate();
	}, function(err){

	})
}

//this saves organization billing information to org record
function save(){
	$rootScope.activeOrg.$save()
		.then(function(results){
			Logger.info('Saved Billing Information');
		})
		.catch(function(err){
			Logger.error('Error Saving Billing Information');
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
