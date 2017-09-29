  /* ==========================================================================
   Settings - Account Ctrl
   ========================================================================== */

angular.module('interloop.settingsCreationCtrl', [])
//declare dependencies
.controller('settingsCreationCtrl', function(
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
  $scope.data.activated = false;

	//functions
	//----------------------
	$scope.save = save;


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