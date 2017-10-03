/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configCreateUserCtrl', [])
//declare dependencies
.controller('configCreateUserCtrl', function(
	$scope,
	$rootScope,
	$timeout,
	Logger,
	Org,
	AppRole,
	Appuser) {

// BINDABLES
//===========================================

	//vars
	//----------------------
	var initializing = true;


	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;



	//functions
	//----------------------
	$scope.createUser = createUser;


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	return AppRole.find().$promise
				.then(function(results){
					$scope.data.roles = results
					$scope.data.activated = true;
				})
				.catch(function(err){
					Logger.error('Error Fetching Roles', 'See Logs');
					Logger.log(err);
				})
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================
function createUser(){

	//bypasses email verification process
	_.assignIn($scope.data.newUser, {"emailVerified" : true})

	//creates user
	return Appuser.create($scope.data.newUser).$promise
		.then(function(results){
			Logger.info('User Created',results.fullName)
		})
		.catch(function(err){
			Logger.error('Error Creating User', 'Please check console logs');
			Logger.log(err);
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
