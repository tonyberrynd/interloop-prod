/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.connectIcloudCtrl', [])
//decalre dependencies
.controller('connectIcloudCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  resolvedData,
  Appuser,
  Logger,
  $http,
  BASE,
  ForecastCategory,
  Team) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var CONNECTURL = BASE.URL.replace("/api", "");

  //data
  //----------------------
  $scope.data = {};
  $scope.data.user = {};
  $scope.data.submitted = false;
  $scope.data.loginFailed = false;


  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// function activate() {


// }
//-------------------------------------------
// activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save
*/
function ok() {


  return $http({
      method: 'GET',
      url: CONNECTURL + '/icloud',
      params: {username: $scope.data.user.username, password: $scope.data.user.password }
   }).then(function successCallback(response) {
      //success
      console.log(response);
      
    }, function errorCallback(err) {
      //error
      console.log(err);

      $scope.data.loginFailed = true;
      
    });

}

/*
Dismiss Note Modal
*/
function cancel() {
  $uibModalInstance.dismiss('cancel');
}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});