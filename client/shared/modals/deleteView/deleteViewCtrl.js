/* ==========================================================================
   Delete View Modal Ctrl
   ========================================================================== */

angular.module('interloop.deleteViewCtrl', [])
//declare dependencies
.controller('deleteViewCtrl', function(
	$scope, 
  $rootScope,
	$uibModalInstance, 
	$log, 
	$timeout,
  $state,
  $http,
	Logger, 
  ViewManager, 
	resolvedData, 
  View
  ) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.view = resolvedData;

	//functions
	//----------------------
	$scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save Updates
*/
function ok() {

  if($scope.data.view.id == $rootScope.activeUser.defaultViews.opportunity) {
   Logger.error("Cannot Delete Default View", "Change Default to Delete");

  } else {

    View.deleteById({"id" :$scope.data.view.id}).$promise
    .then(function(results) {
        //log info
        Logger.info("Succesfully Deleted View");

        //remove from list of views
        $state.go('app.opportunities', {viewId: 'default'});

        //close modal
        $uibModalInstance.close();

    })
    .catch(function(err) {
      console.log(err);
      //error
      Logger.error("Error Deleting View");
      // close
      $uibModalInstance.close();
    })

  }

}


function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

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