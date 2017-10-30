/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.agendaCtrl', [])
//declare dependencies
.controller('agendaCtrl', function(
	$scope,
  $rootScope,
  $state,
  Logger,
  Appuser,
  Lightbox,
  Activity,
	Attachment) {

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

  //find where user is owner
  return Activity.find({"filter": {"where": {"ownerLinks.ownerId": {"in": [$rootScope.activeUser.id]}}, "order": "dueDate: ASC"}}).$promise
            .then(function(results){
              $scope.data.activities = results;
            })
            .catch(function(err){
              Logger.error("Error Fetching Activities", "please try again in amoment")
            })


}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


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
