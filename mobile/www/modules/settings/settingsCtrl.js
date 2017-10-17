/* ==========================================================================
   Fake Controller Setup
   ========================================================================== */

angular.module('interloop.settingsCtrl', [])
//declare dependencies
.controller('settingsCtrl', function(
	$scope,
	$rootScope,
	$state,
  $ionicPlatform,
  $cordovaAppVersion,
  $cordovaSafariViewController,
	authService) {

// BINDABLES
//===========================================
	//data
	//----------------------
  $scope.data = {};

  //set version
  if(window.cordova) {
    $ionicPlatform.ready(function(){
      $scope.data.version = $cordovaAppVersion.getVersionNumber()
      .then(function(version){
        console.log(version);
        $scope.data.version = version;
      })
    })
  }


	//functions
	//----------------------
	$scope.logout = logout;
  $scope.helpCenter = helpCenter;
  $scope.contactSupport = contactSupport;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Logout
*/
function logout() {
	authService.logout();
}


function helpCenter() {

    console.log('help center');

    if(window.cordova) {
      $cordovaSafariViewController.isAvailable()
      .then(function(available){
          if(available){

            console.log('Safari View Controller available');

            $cordovaSafariViewController.show({
              url: 'http://help.interloop.ai',
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#199ED9'
            })
            .then(function(result) {
               if(result.event === 'opened') console.log('Opened');
                else if(result.event === 'loaded') console.log('Loaded');
                else if(result.event === 'closed') console.log('Closed');
            })
            .catch(function(err){
              console.log(err);
            })
          } else {
            alert('Web Browser Unavailable');
            // use fallback browser, example InAppBrowser
          }
      });
    } else {
      //open help center
      window.open('http://help.interloop.ai');

    }

}


function contactSupport() {

  if(window.cordova) {
    $ionicPlatform.ready(function() {
       intercom.displayMessenger();
    });
  }
  else {
    alert('Support Only Works on Native Devices');
  }
 
}

//-------------------------------------------


// EVENTS
//===========================================
/*
logout success
*/
$scope.$on('auth_logout_success', function(event, args) {

    //set to nothing and then go to login
    $rootScope.baseUrl = null;
    $rootScope.activeOrg = null;
    $rootScope.activeUser = null;
    // clear localstorage
    window.localStorage.removeItem('baseUrl');
    // window.localStorage.removeItem('activeOrg');
    // window.localStorage.removeItem('activeUser');

    //clear out intercom
    if(window.cordova){
      $ionicPlatform.ready(function(){
        intercom.reset();
      })
    }

    //go to login state
    $state.go('login')
    
});

/*
logout failure
*/
$scope.$on('auth_logout_failed', function(event, args) {
  alert('Logout Failed', 'Please try again in a moment');
});
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});