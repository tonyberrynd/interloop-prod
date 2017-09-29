  /* ==========================================================================
   Settings - Account Ctrl
   ========================================================================== */

angular.module('interloop.settingsProfileCtrl', [])
//declare dependencies
.controller('settingsProfileCtrl', function(
	$scope,
	$rootScope,
  $http,
  $q, 
  $timeout,
  $window, 
	Logger,
	Appuser) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.page = 1; 
  $scope.data.activated = false;
  $scope.data.updatingPassword = false;

	//functions
	//----------------------
	$scope.save = save;
  $scope.updatePassword = updatePassword;
  $scope.clearCache = clearCache;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  return Appuser.findById({ id: $rootScope.activeUser.id })
	.$promise
	.then(function(result) {
		$scope.data.thisUser = result;

    //avoids flashing
    $timeout(function() {
          $scope.data.activated = true;
    },750)

	})
  .catch(function(err){
    //avoids flashing
    $timeout(function() {
          $scope.data.activated = true;
          Logger.error('Error retrieving profile information');
    },750)
  })
}


//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save Information
*/
function save() {
    $scope.data.updateLoading = true;


    Appuser.prototype$patchAttributes({ id: $rootScope.activeUser.id }, $scope.data.thisUser)
    .$promise
    .then(function successCallback(response) {
        Logger.info('Successfully Updated Profile')

        console.log(response);

        Logger.log(response);
        //update rootscope
        $rootScope.activeUser = response;
        $scope.data.updateLoading = false;

      }, function errorCallback(response) {
        Logger.error('Error Updating Profile')
        $scope.data.updateLoading = false;
    });
}

/*
Update User Password
*/
function updatePassword() {

  $scope.data.thisUser.password = $scope.data.confirmPassword;
  $scope.data.updatingPassword = true;

  Appuser.prototype$patchAttributes({ id: $rootScope.activeUser.id }, {password: $scope.data.confirmPassword})
    .$promise
    .then(function successCallback(response) {
        Logger.info('Successfully Updated Password')
        //update rootscope
        $rootScope.activeUser = response;
        $scope.data.updateLoading = false;

        $scope.data.updatingPassword = false;
        clearPasswords();

      }, function errorCallback(response) {
        Logger.error('Error Updating Password')
        $scope.data.updateLoading = false;
        $scope.data.updatingPassword = false;
        clearPasswords();
    });
}

/*
Clear Password Fieds
*/
function clearPasswords() {
  $scope.data.newPassword = '';
  $scope.data.confirmPassword = '';
}


function clearCache() {
  // entityConfig.clearAll(true);
  $window.location.reload();
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