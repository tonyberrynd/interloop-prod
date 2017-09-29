/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.directoryCtrl', [])
//declare dependencies
.controller('directoryCtrl', function(
	$scope,
	Appuser) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;


	//functions
	//----------------------


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  return Appuser.find({"filter": {"where": {"deactivated": false }}})
      .$promise.then(function(results) {
          $scope.data.users = results;  
          $scope.data.activated = true;
      })
      .catch(function(err){
        Logger.log('Error Fetching Users');
        $scope.data.activated = true;
      })
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/


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
