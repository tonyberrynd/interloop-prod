  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsTagsCtrl', [])
//declare dependencies
.controller('settingsTagsCtrl', function(
  $scope,
  $rootScope,
  $log,
  $location,
  $timeout,
  $uibModal,
  $injector,
  Logger,
  Appuser,
  entityTypes,
  View,
  Tag) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.currentEntity = 'Opportunity';
  	$scope.data.activated = false;

  
	//functions
	//----------------------
	$scope.changeEntity = changeEntity;
	$scope.viewTagRecords = viewTagRecords;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	//get views
	changeEntity($scope.data.currentEntity);

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeEntity(entity){
	$scope.data.loading = true;
	$scope.data.currentEntity = entity;

	//find views
	Tag.list({"entityType": $scope.data.currentEntity}).$promise
		.then(function(results){
			$scope.data.tags = results;
			$scope.data.activated = true;
			$scope.data.loading = false;
		})
		.catch(function(err){
			Logger.error('Error Fetching Views');
			$scope.data.loading = false;
		})
}


function viewTagRecords(tag){
	//query param to be passed
	var strParam = '{"filter": {"where": {"and": [{"itemLinks.itemType": {"inq": ["Tag"]}}, {"itemLinks.name":"' + tag.name + '"}]}}}';
	//entity plural
	var entityPlural = entityTypes[$scope.data.currentEntity.toLowerCase()].plural;
	//go to dyanmic query location
	$location.url("/" + entityPlural.toLowerCase() + "/view/query?query=" + strParam + '&count=' + tag.count + '&backUrl=' + $location.url());
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