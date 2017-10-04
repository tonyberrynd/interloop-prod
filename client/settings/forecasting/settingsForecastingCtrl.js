  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsForecastingCtrl', [])
//declare dependencies
.controller('settingsForecastingCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
	$uibModal,
	$injector,
  Logger,
	Appuser,
	modalManager,
	ForecastCategory,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.currentType = 'categories';
	$scope.data.forecastCadence = 'Monthly';
	$scope.data.fiscalYearStart = '1';
	$scope.data.forecastSubmissionDay = 'Fri';
  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.changeType = changeType;
	$scope.editField = editField;
	$scope.addCategory = addCategory;
	$scope.deleteCategory = deleteCategory;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return ForecastCategory.find().$promise
			.then(function(results){
				$scope.data.categories = results;

				$scope.data.activated = true;
			})
			.catch(function(err){
				Logger.error('Error Retrieving forecast categories', 'Please try again in a moment')
			})

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeType(type){
	$scope.data.currentType = type;
}

function addCategory(){

	var newCategoryModal = modalManager.openModal('addForecastCategory');

	newCategoryModal.result.then(function(results){
		activate();
	})
}


function editField(field){
	var resolvedData = field;

	//open modal
	modalManager.openModal('editField', resolvedData);
}

function deleteCategory(category){
	var resolvedData = {
		thisItem: category.label || 'this category',
		helperText: 'Any opportunities with this forecast category will need to be updated'
	}

	var deleteCategoryModal = modalManager.openModal('confirm', resolvedData);

	deleteCategoryModal.result.then(function(results){
		ForecastCategory.deleteById({"id": category.id}).$promise
			.then(function(results){
				activate();
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