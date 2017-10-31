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

  $scope.data.activities = [];


	//functions
	//----------------------
  $scope.toDay = toDay;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  //find where user is owner
  return Activity.find({"filter": {"where": {"completed": false}}}).$promise
            .then(function(results){
              
              console.log('found activities', results);

              $scope.data.activities = results;

              $scope.data.activated = true;

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
function toDay( activity ) {
    activity.day = moment( activity.dueDate ).format( "L" );
    return activity;
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
