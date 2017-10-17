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
	$scope.data.activated = false;


	//functions
	//----------------------
	$scope.exportData = exportData;
	$scope.refresh = refresh;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
		$scope.data.refreshing = true;
	return Export.find().$promise
		.then(function(results){
			$scope.data.exports = results;
			$scope.data.activated = true;
			$scope.data.refreshing = false;
		})
		.catch(function(err){
			Logger.error('Error Retrieving Previous Exports')
			$scope.data.activated = true;
			$scope.data.refreshing = false;
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

function refresh(){
	activate();
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
