/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.notificationsCtrl', [])
//declare dependencies
.controller('notificationsCtrl', function(
	$scope,
	Appuser,
	Logger) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;

	//functions
	//----------------------

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	return Appuser.notifications({id: $rootScope.activeUser.id}, {"filter": {"order":["createdOn DESC"], "limit": 30}}).$promise
		.then(function(results){
			$scope.data.notifications = results;
			// console.log($scope.data.notifications);
			//loaded
			$scope.data.activated = true;
		})
		.catch(function(err){
			Logger.log('Error retrieving notifications');
			//loaded
			$scope.data.activated = true;
		})
}

activate()
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/


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
