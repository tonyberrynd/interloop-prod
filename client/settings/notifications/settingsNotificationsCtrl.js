  /* ==========================================================================
   Settings2 - Notification Ctrl
   ========================================================================== */

angular.module('interloop.settingsNotificationsCtrl', [])
//declare dependencies
.controller('settingsNotificationsCtrl', function(
	$scope,
	$rootScope,
  $http,
  $timeout,
  BASE,
  Logger,
	Appuser) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = true;
  $scope.data.webNotifications = true;

  //basic setup
  $scope.data.alertSettings = {
     "opportunity-assigned": {
        desktop: true,
        mobile: true, 
        email: true
      },
      "opportunity-shared": {
        desktop: true,
        mobile: true, 
        email: true
      },
      "activity-assigned": {
        desktop: true,
        mobile: true, 
        email: true
      },
      "activity-completed": {
        desktop: true,
        mobile: true, 
        email: true
      },
      "comment-owned-record": {
        desktop: true,
        mobile: true, 
        email: true
      },
      "comment-started-record": {
        desktop: true,
        mobile: true, 
        email: true
      },
      "comment-added": {
        desktop: true,
        mobile: true, 
        email: true
      }
  }

	//functions
	//----------------------
	$scope.save = save;
  // $scope.allowWebNotifications = allowWebNotifications;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
   $scope.data.activated = false;

  return Appuser.findById({ id: $rootScope.activeUser.id })
	.$promise
	.then(function(result) {
    //check if web notifications already enabled
    if(!webNotification.permissionGranted) {
      $scope.data.webNotifications = false;
    }

		$scope.data.thisUser = result;

    //if not in elemnt set all notifications to true
    //TODO - MOVE TO CREATION OF USER
    $scope.data.thisUser.alertSettings = _.merge({}, $scope.data.alertSettings, $scope.data.thisUser.alertSettings);

        //avoids flashing
    $timeout(function() {
          $scope.data.activated = true;
    },750)

	})
  .catch(function(error){
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

Appuser.updateAttributes({ id: $rootScope.activeUser.id }, $scope.data.thisUser)
    .$promise
    .then(function successCallback(response) {
        Logger.info('Successfully Updated Profile')
        $rootScope.activeUser = response;
        $scope.data.updateLoading = false;
      }, function errorCallback(err) {
        Logger.error('Error Updating Profile')
         $scope.data.updateLoading = false;
    });
}

/*
Allow web notifications
*/
// function allowWebNotifications() {
//   webNotification.showNotification('Test Notification', {
//      body: 'You can now recieve notifications',
//      icon: 'assets/img/interloop-icon.ico',
//      onClick: function onNotificationClicked() {
       
//      },
//   }, function onShow(error, hide) {
//      if (error) {
         
//      } else {
//          setTimeout(function hideNotification() {
//              hide();
//              //close banner on success
//               AlertBanner.closeBanner();
//          }, 4000);
//      }
//   });
// }

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