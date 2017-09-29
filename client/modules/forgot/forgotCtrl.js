/* ==========================================================================
   Forgot Password Controller
   ========================================================================== */

angular.module('interloop.forgotCtrl', [])
//decalre dependencies
.controller('forgotCtrl', function(
	$scope, 
	$mixpanel,
	authService,
	Logger) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  	$scope.data.resetComplete = false;

	//functions
	//----------------------
	$scope.resetPassword = resetPassword;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Reset Password
*/
function resetPassword() {
	//reset password event
    $mixpanel.track('RESET_PASSWORD');
    //reset flow
	authService.resetPassword($scope.data.email);
}

//-------------------------------------------


// EVENTS
//===========================================
/*
Reset Success
*/
$scope.$on('auth_reset_success', function(event, args) {
	$scope.data.resetComplete = true;
});

/*
Reset Failure
*/
$scope.$on('auth_reset_failed', function(event, args) {
	var error = args.error.message || 'User Not Found';
	Logger.error(error)
});
//-------------------------------------------


});