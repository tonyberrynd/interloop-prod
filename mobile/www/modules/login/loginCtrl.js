/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.loginCtrl', [])
//declare dependencies
.controller('loginCtrl', function(
	$scope,
	$timeout, 
	$ionicLoading,
	authService,
	BASE) {

// BINDABLES
//===========================================

  //data
  //----------------------

  $scope.data = {};
  $scope.data.loginFailed = false;
  $scope.data.loginLoading = false;
  $scope.data.rememberMe = true;


  //functions
  //----------------------
  $scope.login = login;

//-------------------------------------------


// ACTIVATE
//===========================================
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Login to application
*/
function login() {

  $scope.data.loginLoading = true;
  $scope.data.loginFailed = false;

   $ionicLoading.show({
      template: 'Loading...',

    }).then(function(){
      
    	  //SETUP BASE URL
		  //------------------------
	      if($scope.data.domain == 'localhost') {
	      	BASE.URL = 'http://localhost:3000'
	    	}
	      else {
	      	BASE.URL = 'https://interloop3-api-' + $scope.data.domain.toLowerCase() + '.interloop.ai';
	   	 }


		  //USE AUTH SERVICE TO LOGIN
		  //------------------------
		  $timeout(function() {
		    authService.login($scope.data.email, $scope.data.password, $scope.data.rememberMe);
		  }, 250)

    });


}

//-------------------------------------------


// EVENTS
//===========================================
  /*
  Login Successful
  */
  $scope.$on('auth_login_success', function(event, args) {
        //stop loading indicator
        $scope.data.loginLoading = false;

        //now set localstorage as well  
        window.localStorage.baseUrl = BASE.URL;

        //hide loading indicator
        $ionicLoading.hide()

        //clear form
        $scope.data.email = '';
        $scope.data.password = '';
        $scope.data.domain = '';


  });

  /*
  Login Failed
  */
  $scope.$on('auth_login_failed', function(event, args) {

      $scope.data.loginLoading = false;
      $scope.data.loginFailed = true;


       //hide loading indicator
       $ionicLoading.hide()

       // TODO - REPLACE WITH NATIVE ALERTS
       alert('Hmm, it looks like you password or your email is incorrect');


  });

});
