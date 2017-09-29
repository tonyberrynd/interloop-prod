/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.notificationsCtrl', [])
//declare dependencies
.controller('notificationsCtrl', function(
	$scope,
	$timeout,
	$rootScope,
	Logger,
	Appuser) {

// BINDABLES
//===========================================
	
	//vars
	//----------------------
	var currentPage = 0;
	var perPage = 15;


	//data
	//----------------------
	$scope.data = {};
	$scope.data.notifications = [];
	$scope.data.busy = false;
	$scope.data.loaded = false;

	//today / yesterday
	$scope.data.today = moment().format( "ll" );
	$scope.data.yesterday = moment().subtract(1, 'days').format("ll");

	//functions
	//----------------------
	$scope.loadMore = loadMore;
	$scope.toDay = toDay;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	loadMore()
}
//-------------------------------------------
activate()
//-------------------------------------------


// FUNCTIONS
//===========================================

	/*
	Get Stream Activities
	*/
	function loadMore(){
		console.log('load more');
		//don't get anything if busy
		if ($scope.data.busy) return;
		//set to busy
		$scope.data.busy = true;

		return Appuser.notifications({id: $rootScope.activeUser.id},{"filter": {"limit": perPage, "skip": currentPage * perPage, "order": "createdOn DESC"}})
				.$promise
				.then(function(results){
					//push results into array

					//prevents flashing
					$timeout(function(){
						$scope.data.notifications = $scope.data.notifications.concat(results);
						//increment current page
						currentPage++
						$scope.data.busy = false;
						
						//first time through set to loaded true
						$scope.data.loaded = true;
					}, 500)
				})
				.catch(function(err){
					Logger.log('error fetching activities');

					$scope.data.loaded = true;
				})
	}

	/*
	Converts date to day
	*/
	function toDay( item ) {
	    item.day = moment( item.createdOn ).format( "ll" );
	    return item;
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
