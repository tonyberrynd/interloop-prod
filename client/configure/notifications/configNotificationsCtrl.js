/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configNotificationsCtrl', [])
//declare dependencies
.controller('configNotificationsCtrl', function(
	$scope,
	$rootScope,
	$timeout,
	Logger,
	Org,
	Appuser) {

// BINDABLES
//===========================================

	//vars
	//----------------------
	var initializing = true;


	//data
	//----------------------
	$scope.data = {};
	$scope.data.title = 'Test Notification';
	$scope.data.body = 'Test Body';
	$scope.data.activated = false;



	//functions
	//----------------------
	$scope.sendNotification = sendNotification;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	$timeout(function(){
		$scope.data.activated = true;
	}, 250)
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function sendNotification(){
	Appuser.notifications.create(
	{ 'id': $rootScope.activeUser.id},
	{   title: $scope.data.title,
		body: $scope.data.body,
		actions: []
	})
	.$promise
	.then(function(results){
		Logger.info('Created Notification')
	})
	.catch(function(err){
		Logger.error('Error Creating Notification');
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
//-------------------------------------------

});
