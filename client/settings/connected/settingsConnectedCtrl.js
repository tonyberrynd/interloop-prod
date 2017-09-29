  /* ==========================================================================
   Settings - Integrations Ctrl
   ========================================================================== */

angular.module('interloop.settingsConnectedCtrl', [])
//declare dependencies
.controller('settingsConnectedCtrl', function(
	$scope,
  $rootScope,
  $http,
  $location,
  BASE,
  modalManager,
  Appuser,
  Logger) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var CONNECTURL = BASE.URL.replace("/api", "");

	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;

  //calendar connect url
  $scope.data.connectCalendarUrl = 'https://app.cronofy.com/oauth/authorize?response_type=code&client_id=lcfLKt_57ddS6Fcy--JrJPUFXqpI6_-i&redirect_uri=http://localhost:3001/settings/integrations&scope=read_events&avoid_linking=true';

  //Evernote Connect Url
  $scope.data.evernoteURL = CONNECTURL + '/connect_evernote?userId=' + Appuser.getCurrentId();

  //Connect Office 365
  $scope.data.office365Url = CONNECTURL + '/connect_office365?userId=' + Appuser.getCurrentId();

  //Google url
  $scope.data.googleUrl = CONNECTURL + '/connect_google?userId=' + Appuser.getCurrentId();

  //Dropbox url
  $scope.data.dropboxUrl = CONNECTURL + '/connect_dropbox?userId=' + Appuser.getCurrentId();

	//functions
	//----------------------
	$scope.microsoftConnect = microsoftConnect;
  $scope.testGraph = testGraph;
  $scope.getNotes = getNotes;
  $scope.getIcloud = getIcloud;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    //refresh active user to check for any updates during connedting
return Appuser.findById({id: $rootScope.activeUser.id})
    .$promise
    .then(function(results){
      $rootScope.activeUser = results;

      //first check if being redirected
      if($location.search().redirect) {

        var connectedApp = $location.search().app || '';

        if($location.search().status == 'success') {
          //show success toast
          Logger.success('Successfully Connected' + ' ' + connectedApp);

        } else if($location.search().status == 'error') {
          //show error toast
          Logger.error('Error Connecting' + ' ' + connectedApp, 'Please try again in a few moments');

        }
      }

      $scope.data.activated = true;

    })
    .catch(function(err){
      console.log('Error finding user')

      $scope.data.activated = true;
    })
}

//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================
/*
Test Graph Api
*/
function testGraph() {
$http({
  method: 'GET',
  url: 'https://graph.microsoft.com/v1.0/me/messages'
}).then(function successCallback(response) {
    //success
    
  }, function errorCallback(response) {
    //error
    
    
  });

}


function getIcloud() {


  var icloudModal = modalManager.openModal('connectIcloud');

  icloudModal.result.then(function(results){

    //figure out what to do here



  })
}

function getNotes() {
  $http({
    method: 'GET',
    url: CONNECTURL + '/evernotes',
    params: {userId: $rootScope.activeUser.id}
   }).then(function successCallback(response) {
      //success
      console.log(response.data);
      
    }, function errorCallback(response) {
      //error
      
      
    });

}

/*
Connect Microsoft 365
*/
function microsoftConnect() {
    Logger.log('trying to connect to microsoft...')
    //user adal service to login
    //redirects user to login page
    adalAuthenticationService.login();
}

/*
Disconnect Microsoft 365
*/
function microsoftDisconnect() {
    //allow user to logout
    adalAuthenticationService.logOut();
}

/*
Connect Google
*/
function googleConnect() {

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