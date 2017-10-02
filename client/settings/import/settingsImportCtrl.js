/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsImportCtrl', [])
//declare dependencies
.controller('settingsImportCtrl', function(
	$scope,
	Logger,
	Import,
	excelGenerator,
	modalManager) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;


	//functions
	//----------------------
	$scope.importData = importData;
	$scope.createTemplate = createTemplate;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){
	return Import.find().$promise
		.then(function(results){
			$scope.data.imports = results;
			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.error('Error Fetching Import History', 'You can still import data');
			$scope.data.activated = true;
		})
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/

function importData(entityType){
	var resolvedData = {};
		resolvedData.entityType = entityType;

	var importModal = modalManager.openModal('importData', resolvedData);

		importModal.result.then(function(results){
			console.log('Import Started');
		})
}


function createTemplate(entity){
	console.log('create template');
	return excelGenerator.createImportTemplate(entity);
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
