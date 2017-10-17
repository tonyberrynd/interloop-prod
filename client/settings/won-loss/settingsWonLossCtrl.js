  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsWonLossCtrl', [])
//declare dependencies
.controller('settingsWonLossCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
  $q,
	$uibModal,
	$injector,
  Logger,
	Appuser,
	modalManager,
	WonReason,
	LostReason,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.currentType = 'won';
	$scope.data.reasons = [];
  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.changeType = changeType;
	$scope.editReason = editReason;
	$scope.addReason = addReason;
	$scope.deleteReason = deleteReason;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return $q.all([WonReason.find().$promise,
				   LostReason.find().$promise])
				.then(function(results){
					$scope.data.wonReasons = results[0];
					$scope.data.lostReasons = results[1];

					//start with won reasons
					if($scope.data.currentType == 'won'){
						$scope.data.reasons = $scope.data.wonReasons;
					} else {
						$scope.data.reasons = $scope.data.lostReasons;
					}

					$scope.data.activated = true;
				})
				.catch(function(err){
					Logger.error('Error Retriving Reasons', 'Please try again in a moment')
				})

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeType(type){
	$scope.data.loading = true;
	$scope.data.currentType = type;

	if(type == 'won') {
		$scope.data.reasons = $scope.data.wonReasons;
		$scope.data.loading = false;
	} else {
		$scope.data.reasons = $scope.data.lostReasons;
		$scope.data.loading = false;
	}
	
}


function editReason(reason){
	var resolvedData = {
		type: $scope.data.currentType,
		reason: reason
	}
	//open modal
	var editReasonModal = modalManager.openModal('editReason', resolvedData);
		editReasonModal.result.then(function(result){
			activate();
		}, function(){
			//ignore
		})
}


function addReason(){
	var resolvedData = {
		type: $scope.data.currentType
	}

	var addReasonModal = modalManager.openModal('addReason', resolvedData);

	addReasonModal.result.then(function(results){
		activate();
	})
}


function deleteReason(product) {

	var resolvedData = {
		helperTitle: 'Delete Product',
		helperText: 'Are you sure you want to delete this product?',
		helperDescription: 'This will remove the product from the catalog, anything associated with this product will not be changed'
	};

	//open modal
	var deleteReasonModal = modalManager.openModal('warning', resolvedData);
	var entityModel = $scope.data.currentType == 'Won' ? WonReason : LostReason;

	deleteReasonModal.result.then(function(results){
		entityModel.deleteById({"id": product.id}).$promise
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