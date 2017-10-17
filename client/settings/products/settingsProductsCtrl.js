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
	$scope.deleteProduct = deleteProduct;
	$scope.editProduct = editProduct;

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


function editProduct(product){
	var resolvedData = product;

	var editProductModal = modalManager.openModal('editProduct', resolvedData);
		editProductModal.result.then(function(results){
			activate();
		}, function(err){

		})
}


function deleteProduct(product) {

	var resolvedData = {
		helperTitle: 'Delete Product',
		helperText: 'Are you sure you want to delete this product?',
		helperDescription: 'This will remove the product from the catalog, anything associated with this product will not be changed'
	};

	//open modal
	var deleteFieldModal = modalManager.openModal('warning', resolvedData);

	deleteFieldModal.result.then(function(results){
		Product.deleteById({"id": product.id}).$promise
			.then(function(results){
				$scope.data.products.splice($scope.data.products.indexOf(product), 1);
			})
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