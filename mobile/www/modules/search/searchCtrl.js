/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.searchCtrl', [])
//declare dependencies
.controller('searchCtrl', function(
	$scope,
	$state,
	$timeout,
	$stateParams,
	searchService) {

// BINDABLES
//===========================================
	//vars
	//----------------------
	var backState = $stateParams.backState ? $stateParams.backState.name : 'app.pulse';

	//data
	//----------------------
	$scope.data = {};

	$scope.data.globalSearch = '';
	$scope.data.results = {};

	//functions
	//----------------------
	$scope.goBack = goBack;
	$scope.clearSearch = clearSearch;
	$scope.search = search;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Go Back to Previous State
*/
function goBack() {
	if(window.cordova) {
		//fade out to go back
		// $ionicNativeTransitions.stateGo(backState, {}, {}, {
	 //    	"type": "fade",
		// });
	} else {
		$state.go(backState);	
	}
}

/*
Clear Search Results
*/
function clearSearch(){
	$scope.data.searchTerm = '';
}


/*
Allows search results to be keyed into
*/
function search() {

	$scope.data.searchLoading = true;
	searchService.globalSearch($scope.data.globalSearch, true)
		.then(function(results){
			console.log(results);
			//prevents flashing
			$timeout(function(){
				$scope.data.searchLoading = false;
				$scope.data.searchResults = results;
				$scope.data.resultsCount = _.flattenDeep(_.map(results, 'results')).length;

			}, 250)
		})
		.catch(function(err){
			console.log('error searching');
			console.log(err);
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
