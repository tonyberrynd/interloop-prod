/* ==========================================================================
   Login Controller
   ========================================================================== */

angular.module('interloop.loginCtrl', [])
//decalre dependencies
.controller('loginCtrl', function(
  $scope, 
  $rootScope, 
  $state, 
  $timeout,
  $mixpanel,
  BASE,
  Logger,
  Org, 
  VERSION,
  authService,
  Appuser) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var subdomain_name = window.location.hostname.split('.').length >= 3 ? window.location.hostname.split('.')[0] : false;

  //data
  //----------------------

  $scope.data = {};
  $scope.data.loginFailed = false;
  $scope.data.loginLoading = false;
  $scope.data.rememberMe = true;
  $scope.data.inputType = 'password';
  //make the version visible
  $scope.data.version = 'v' + VERSION;


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

  //login event
  $mixpanel.track('LOGIN_BUTTON');

  $scope.data.loginLoading = true;
  $scope.data.loginFailed = false;

  //SETUP BASE URL
  //------------------------

  //if electron - user sets it
  if($rootScope.ELECTRON) {
    BASE.URL = $scope.data.domain;
  //else dynanmically get it form subdomain
  }  else {
    //get sbudomain or localstorage
    if(subdomain_name == 'localhost' || subdomain_name == '0') {
      BASE.URL = 'http://localhost:3000'
    }
    else {
      BASE.URL = 'https://interloop3-api-' + subdomain_name + '.interloop.ai';
    }
  }

  //USE AUTH SERVICE TO LOGIN
  //------------------------
  $timeout(function() {
    authService.login($scope.data.email, $scope.data.password, $scope.data.rememberMe);
  }, 250)


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

  });

  /*
  Login Failed
  */
  $scope.$on('auth_login_failed', function(event, args) {

      $scope.data.loginLoading = false;
      $scope.data.loginFailed = true;
  });


});