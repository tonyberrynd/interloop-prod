/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.searchCtrl', [])
//declare dependencies
.controller('searchCtrl', function(
	$scope,
	$stateParams,
	$timeout,
	$location,
	$rootScope,
	entityTypes,
	searchService,
	SidebarRouter,
	Appuser) {

// BINDABLES
//===========================================

	// vars
	//----------------------
	var initializing = true;

	//data
	//----------------------
	$scope.data = {};
	$scope.data.searchTerm = $stateParams.q;

	$scope.data.currentType = null;

	//functions
	//----------------------
	$scope.changeSearchType = changeSearchType;
	$scope.viewInGrid = viewInGrid;
	$scope.openTo = openTo;



//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	//search is loadin
	$scope.data.searchLoading = true;

	//handles applying filters to search results
	var searchFilter = {"where": {}};

	if($scope.data.filterValues) {
		var searchFilter = buildSearchFilter($scope.data.filterValues);
	}

	console.log(searchFilter);

	//perform search action
	return searchService.globalSearch($scope.data.searchTerm, true, searchFilter)
		.then(function(results){
			console.log(results);
			//prevents flashing
			$timeout(function(){
				//ensure highScore isnt' undefined
				_.forEach(results, function(value){
					if(_.isNil(value.highScore)) {
						value['highScore'] = 0;
					}
				})

				$scope.data.currentType = _.maxBy(results, 'highScore')['entityType'];
				$scope.data.searchResults = results;
				$scope.data.resultsCount = _.flattenDeep(_.map(results, 'results')).length;

				$scope.data.scopedResults = _.find($scope.data.searchResults, ['entityType', $scope.data.currentType]);

				$scope.data.searchLoading = false;

			}, 250)
		})
		.catch(function(err){
			console.log('error searching');
			console.log(err);
		})
}
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function openTo(currentEntityType, id){
   //open sidebar to entity and state
   SidebarRouter.openTo(currentEntityType, id);
}

/*
Change Search Type
*/

function changeSearchType(type) {
	//set current type
	$scope.data.currentType = type;
	//change out scoped search results
	$scope.data.scopedResults = _.find($scope.data.searchResults, ['entityType', type]);
}


function viewInGrid(){
	var resultsIds = [];
	_.forEach(_.map($scope.data.scopedResults.results, 'id'), function(value){
		var newValue = '"' + value + '"';
		resultsIds.push(newValue);
	})
	//query param to be passedd
	var strParam = '{"filter": {"where": {"id": {"inq": [' +  resultsIds + ']}}}}';
	//entity plural
	var entityPlural = entityTypes[$scope.data.currentType.toLowerCase()].plural;
	//go to dyanmic query location
	$location.url("/" + entityPlural.toLowerCase() + "/view/query?query=" + strParam + '&backUrl=' + $location.url());
}


function buildSearchFilter(filterValues) {

	var searchFilter = {};

	//will push values into 
	if(filterValues.length && filterValues.length > 1) {
		searchFilter = {"and": []};

			//push values into and 
		_.forEach(filterValues, function(value){
			//should be added
			switch(value) {
			    case "createdByMe":
			        searchFilter.and.push({"createdBy.id": Appuser.getCurrentId()})
			        break;
			    case "ownedByMe":
			        searchFilter.and.push({"ownerLinks.ownerId": {"in": Appuser.getCurrentId()}}) //TODO - APPLY MATCH TYPE LOGIC FOR MULTIPLE OWNERS
			        break;
			    case "sharedWithMe":
			        searchFilter.and.push({"sharedWith": {"inq": [ Appuser.getCurrentId() ] }})
			        break;
			   	case "recentlyCreated":
			        searchFilter.and.push({"createdOn": {"gt":  moment().subtract(1000, 'd').format() }})
			        break;
			}
		})

	} else if(filterValues.length && filterValues.length == 1){
			//push values into and 
		_.forEach(filterValues, function(value){
			//should be added
			switch(value) {
			    case "createdByMe":
			        searchFilter = {"createdBy.id": Appuser.getCurrentId()};
			        break;
			    case "ownedByMe":
			        searchFilter = {"ownerLinks.ownerId": {"in": Appuser.getCurrentId()}};
			        break;
			    case "sharedWithMe":
			        searchFilter = {"sharedWith": {"inq": [ Appuser.getCurrentId() ] }};
			        break;
			   	case "recentlyCreated":
			        searchFilter = {"createdOn": {"gt":  moment().subtract(1000, 'd').format() }};
			        break;
			}
		})

	}

	//return back searchFilter
	return searchFilter;

}



//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
/*
Watch Value Type
*/
$scope.$watchCollection('data.filterValues', function(newVal, oldVal) {
  //this ensures that it doesn't fire on first load
  if (initializing) {
    $timeout(function() { initializing = false; });
  } else {
   	
   	//activates with extended query
  	activate()

  }

});
//-------------------------------------------

});
