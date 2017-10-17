/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.opportunitiesCtrl', [])
//declare dependencies
.controller('opportunitiesCtrl', function(
	$scope,
	$rootScope,
	$ionDrawerVerticalDelegate,
	$stateParams,
	$state,
  $timeout,
	$location,
  $ionicHistory,
	Opportunity,
  RelationshipManager,
	View,
	ViewManager,
	pageManager) {

// BINDABLES
//===========================================

	//vars
	//---------------------
	var query = $location.search().query || null;
  var oppId = $location.search().id || null;
	var intializing = true;

	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;

	//functions
	//----------------------
	$scope.toggleDrawer = toggleDrawer;
 	$scope.drawerIs = drawerIs;
 	$scope.loadMoreData = loadMoreData;
 	$scope.changeView = changeView;
 	$scope.refresh = refresh;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  //Get All Views for List
  //------------------------------------------
  return View.find({"filter": {"where": {"entity": "Opportunity"}}}).$promise
          .then(function(results){
            //set views into scope
            $scope.data.views = results;
            console.log('views', $scope.data.views);

          //Get Current View
          //------------------------------------------
          return ViewManager.getThisView('Opportunity', $scope.data.views, $stateParams.viewId, query)
              .then(function(results){
                //set this view
                $scope.data.thisView = results;

                //get first page of data
                pageManager.getData(true, 'Opportunity', $scope.data.thisView)
                .then(function(results){

                  //get primary companies
                  _.forEach(results, function(value, key){
                    value.primaryCompanyLink = RelationshipManager.getPrimary(value.entityLinks, "Company") || {};
                  })

                  //set data into scope
                	$scope.data.opportunities = results;

                	//check if should load more
                	$scope.data.moreData = pageManager.isMoreData();

                	//broadcase compelte
                	$scope.$broadcast('scroll.infiniteScrollComplete');

                  //Stop the ion-refresher from spinning
                  $scope.$broadcast('scroll.refreshComplete');

                  //no longer initiliazing
                  intializing = false;

                  //activated
                  $scope.data.activated = true;

                  })

               })
              .catch(function(err){
              	alert('View Not Found')
              })

        })
	    .catch(function(err){
	     	console.log('error finding views')
	    })
}

//-------------------------------------------
activate()
//-------------------------------------------


// FUNCTIONS
//===========================================


/*
Toggle Drawer
*/
function toggleDrawer() {
  $ionDrawerVerticalDelegate.toggleDrawer();
  //show hide button
  $rootScope.hideFloatingButton = !$rootScope.hideFloatingButton;
}

/*
Drawer State
*/
function drawerIs(state) {
  return $ionDrawerVerticalDelegate.getState() == state;
}


function loadMoreData() {
	console.log('load more data');


	if(!intializing){

		initializing = true;

    	pageManager.getData(false, 'Opportunity', $scope.data.thisView)
    		.then(function(results){
 

    			$scope.data.opportunities = _.concat($scope.data.opportunities, results);

    			//check if should load more
                $scope.data.moreData = pageManager.isMoreData();

    			initializing = false;

    			$scope.$broadcast('scroll.infiniteScrollComplete');
    		})
	}
}

function changeView(view) {

  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    disableBack: true
  });   

  $ionDrawerVerticalDelegate.toggleDrawer();

  $timeout(function(){
      $state.go($state.current.name, {"viewId": view.id}, {reload: 'app.opportunities'});
    }, 250);

}

function refresh(){
	activate()
}


  // $scope.noMoreItemsAvailable = false;
  
  // $scope.loadMore = function() {
  //   $scope.items.push({ id: $scope.items.length});
   
  //   if ( $scope.items.length == 99 ) {
  //     $scope.noMoreItemsAvailable = true;
  //   }
  //   $scope.$broadcast('scroll.infiniteScrollComplete');
  // };
  
  // $scope.items = [];

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
