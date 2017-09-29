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
	$scope.data.currentType = type;

	if(type == 'won') {
		$scope.data.reasons = $scope.data.wonReasons;
	} else {
		$scope.data.reasons = $scope.data.lostReasons;
	}
	
}


function editReason(reason){
	var resolvedData = reason;

	//open modal
	modalManager.openModal('editReason', resolvedData);
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