/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.filesCtrl', [])
//declare dependencies
.controller('filesCtrl', function(
	$scope,
  $rootScope,
  $state,
  Logger,
  Appuser,
  Lightbox,
	Attachment) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;


	//functions
	//----------------------
  $scope.previewImage = previewImage;
  $scope.fileDetails = fileDetails;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  return Appuser.attachments({id: $rootScope.activeUser.id}).$promise
        .then(function(results){
          $scope.data.files = results;
          $scope.data.activated = true;
        })
        .catch(function(err){
          Logger.error('Error Retrieving Files', 'Please try again in a moment')
           $scope.data.activated = true;
        })


}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Preview An Image
*/
function previewImage(file){
  var filesArray = [ file ];
  Lightbox.openModal(filesArray, 0);
}

/*
Test
*/
function fileDetails(id){
  $state.go('app.file-details', {'id': id})
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
