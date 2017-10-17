/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.contactsCtrl', [])
//declare dependencies
.controller('contactsCtrl', function(
	$scope,
	$rootScope,
	$ionDrawerVerticalDelegate,
	$stateParams,
	$state,
  $timeout,
	$location,
  $ionicHistory,
	Contact,
  RelationshipManager,
	View,
	ViewManager,
	pageManager) {

// BINDABLES
//===========================================

	//vars
	//---------------------
	var query = $location.search().query || null;
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
  return View.find({"filter": {"where": {"entity": "Contact"}}}).$promise
          .then(function(results){
            //set views into scope
            $scope.data.views = results;
            console.log('views', $scope.data.views);

          //Get Current View
          //------------------------------------------
          return ViewManager.getThisView('Contact', $scope.data.views, $stateParams.viewId, query)
              .then(function(results){
                //set this view
                $scope.data.thisView = results;

                //get first page of data
                pageManager.getData(true, 'Contact', $scope.data.thisView)
                .then(function(results){

                  //get primary companies
                  _.forEach(results, function(value, key){
                    value.primaryCompanyLink = RelationshipManager.getPrimary(value.entityLinks, "Company") || {};
                  })

                  //set data into scope
                	$scope.data.contacts = results;

                	//check if should load more
                	$scope.data.moreData = pageManager.isMoreData();

                	//broadcase compelte
                	$scope.$broadcast('scroll.infiniteScrollComplete');

                  //Stop the ion-refresher from spinning
                  $scope.$broadcast('scroll.refreshComplete');
  

                  intializing = false;

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

    	pageManager.getData(false, 'Contact', $scope.data.thisView)
    		.then(function(results){
 

    			$scope.data.contacts = _.concat($scope.data.contacts, results);

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
      $state.go($state.current.name, {"viewId": view.id}, {reload: 'app.contacts'});
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
