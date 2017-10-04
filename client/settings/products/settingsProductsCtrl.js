  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsProductsCtrl', [])
//declare dependencies
.controller('settingsProductsCtrl', function(
	$scope,
	$rootScope,
	$log,
	$timeout,
	$uibModal,
	$injector,
	Logger,
	Appuser,
	Product,
	modalManager,
	ActivityType,
  	Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.addProduct = addProduct;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return Product.find().$promise
		.then(function(results){
			$scope.data.products = results;
			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.error('Error Fetching Activity Types', 'Please Try Again in a moment')
		})


}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function addProduct(){
	
	var newProductModal = modalManager.openModal('addProduct');

	//activate after creation
	newProductModal.result.then(function(results){
		activate();
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