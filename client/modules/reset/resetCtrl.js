/* ==========================================================================
   Reset Password Controller
   ========================================================================== */

angular.module('interloop.resetCtrl', [])
//declare dependencies
.controller('resetCtrl', function(
  $scope, 
  $location, 
  $mixpanel,
  $http,
  BASE) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.password = '';
  $scope.data.updateSuccess = false;
  $scope.data.updateError = false;

  $scope.data.loading = true;
  $scope.data.showForm = false;

  $scope.data.accessToken = $location.search().access_token;
  console.log($scope.data.accessToken);

   var RESETURL = BASE.URL.replace("/api", "");

  //functions
  //----------------------
  $scope.clearForm = clearForm;
  $scope.updatePassword = updatePassword;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    $http({
          method: 'GET',
          url: RESETURL + '/check?access_token=' + encodeURIComponent($scope.data.accessToken),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(response) {
          
            //sucess
            $scope.data.loading = false;
            $scope.data.showForm = true;
            // error
          }, function errorCallback(response) {

            $scope.data.loading = false;
            $scope.data.showForm = false;
    });

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Clear the reset form
*/
function clearForm() {
  $scope.data.password = '';
  $scope.data.confirmPassword = '';
}

function updatePassword() {
    //reset password event
    $mixpanel.track('UPDATE_PASSWORD');
    //loading
    $scope.data.loading = true;
    //logic in controller on purpose
     $http({
          method: 'POST',
          url: RESETURL + '/reset-password?access_token=' + encodeURIComponent($scope.data.accessToken),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: {
                password: $scope.data.password,
                confirmation: $scope.data.passwordConfirm
            },

         }).then(function successCallback(response) {
            //sucess
            $scope.data.updateSuccess = true;
            $scope.data.loading = false;
            clearForm();
            // error
          }, function errorCallback(response) {
            $scope.data.updateError = true;
            $scope.data.loading = false;
             clearForm();
    });
}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});