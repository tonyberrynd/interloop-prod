/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsImportCtrl', [])
//declare dependencies
.controller('settingsImportCtrl', function(
	$scope,
	Logger,
	Import,
	modalManager) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};


	//functions
	//----------------------
	$scope.importData = importData;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){
	return Import.find().$promise
		.then(function(results){
			$scope.data.imports = results;
		})
		.catch(function(err){
			Logger.error('Error Fetching Import History', 'You can still import data');
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
