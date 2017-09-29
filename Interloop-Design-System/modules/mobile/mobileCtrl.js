/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('coil.mobileCtrl', [])
//declare dependencies
.controller('mobileCtrl', function(
	$scope, 
  $injector) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};


	//functions
	//----------------------
	$scope.launchModal = launchModal;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/
function launchModal(){
  //set up modal
  $injector.get('$ionicModal').fromTemplateUrl('modules/mobile/mobile-modal.tpl.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
      //launch modal
  	$scope.modal.show();
  });

}




//-------------------------------------------


// EVENTS
//===========================================
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});
