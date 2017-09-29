/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configRawCtrl', [])
//declare dependencies
.controller('configRawCtrl', function(
	$scope,
	$timeout,
	Logger,
	Org) {

// BINDABLES
//===========================================

	//vars
	//----------------------
	var initializing = true;


	//data
	//----------------------
	$scope.data = {};
	$scope.data.loaded = false;
	//json optoins
	$scope.data.options = { 
		mode: 'tree',
		change: saveChanges
	};


	//functions
	//----------------------


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	return Org.findOne()
			.$promise
			.then(function(results){

				//needed to do this to remove promise stuff - was causing recursive errors
				$scope.data.orgConfig = JSON.parse(angular.toJson(results));

				//view loaded
				$scope.data.loaded = true;
			})
			.catch(function(err){
				console.log('error fetching org record')

				//view loaded
				$scope.data.loaded = true;
			})
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function saveChanges() {
	console.log($scope.data.orgConfig)

	Org.updateAttributes(
	   {id:    $scope.data.orgConfig.id},
	   $scope.data.orgConfig
	)
	.$promise
	.then(function(results){
		Logger.info('Updates Saved');
	})
	.catch(function(err){
		Logger.info('Error Saving Updates');
	})

}
//-------------------------------------------


// EVENTS
//===========================================
$scope.$on('json-updated', function(msg, value) {
	//Save Org Re	
	Org.updateAttributes(
	   {id:    $scope.data.orgConfig.id},
	   value
	)
	.$promise
	.then(function(results){
		Logger.info('Updates Saved');
	})
	.catch(function(err){
		Logger.info('Error Saving Updates');
	})
});
//-------------------------------------------

// WATCHES
//===========================================
//-------------------------------------------

});
