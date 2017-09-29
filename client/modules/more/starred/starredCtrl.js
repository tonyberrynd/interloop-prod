/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.starredCtrl', [])
//declare dependencies
.controller('starredCtrl', function(
	$scope,
	$rootScope,
	Appuser,
  $state,
  SidebarRouter,
	entityTypes) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
    $scope.data.activated = false;

    $scope.data.currentEntity = 'Opportunity';

    $scope.data.entityTypes = entityTypes;

	//functions
	//----------------------
  $scope.goToRecord = goToRecord;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  	return Appuser.prototype$__get__starredItems({"id": $rootScope.activeUser.id}).$promise
  		.then(function(results){
  			$scope.data.starredItems = results;

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
function goToRecord(entityType, id){
   // SidebarRouter.openTo(entityType, id);
   var currentState = $state.current;
   //go to state
   SidebarRouter.goTo(currentState, entityType, id );
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
