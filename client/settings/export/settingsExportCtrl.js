/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsExportCtrl', [])
//declare dependencies
.controller('settingsExportCtrl', function(
	$scope,
	$rootScope,
	$injector,
	Logger,
	Export,
	modalManager) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};


	//functions
	//----------------------
	$scope.exportData = exportData;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return Export.find().$promise
		.then(function(results){
			$scope.data.exports = results;
		})
		.catch(function(err){
			Logger.error('Error Retrieving Previous Exports')
		})
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Request Data Export
*/
function exportData(entityType){

	var resolvedData = {
		entityType: entityType
	}

	var exportModal = modalManager.openModal('export', resolvedData);

	//export data
	exportModal.result.then(function(results){
		console.log("start export job");
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
