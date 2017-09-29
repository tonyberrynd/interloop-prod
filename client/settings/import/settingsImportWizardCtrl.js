/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsImportWizardCtrl', [])
//declare dependencies
.controller('settingsImportWizardCtrl', function(
	$scope,
	$stateParams) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};

	// wizard steps
	$scope.data.steps = [
	    { number: 1, name: 'Download File' },
	    { number: 2, name: 'Upload File' },
	    { number: 3, name: 'Match Fields' },
	    { number: 4, name: 'Selecgt Records' },
	    { number: 5, name: 'Confirm Import' }
	  ];
	//current step
    $scope.data.currentStep = angular.copy($scope.data.steps[0]);

	$scope.data.entityType = $stateParams.entityType;
	$scope.data.importType = $stateParams.importType;

	//functions
	//----------------------
	$scope.nextStep = nextStep;
    $scope.previousStep = previousStep;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){


}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/
/*
Go to next Step
*/
function nextStep() {
  var nextNumber = $scope.data.currentStep.number;
  if ($scope.data.steps.length == nextNumber){
    // $uibModalInstance.dismiss('cancel');
  }
  $scope.data.currentStep = angular.copy($scope.data.steps[nextNumber]);
};

/*
Go to previous Step
*/
function previousStep() {
  var previousNumber = $scope.data.currentStep.number - 2;
  
  $scope.data.currentStep = angular.copy($scope.data.steps[previousNumber]);
};


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
