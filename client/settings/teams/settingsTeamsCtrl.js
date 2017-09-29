  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsTeamsCtrl', [])
//declare dependencies
.controller('settingsTeamsCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
  Logger,
	Appuser,
  modalManager,
  Team) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;

  // $scope.data.teams = [{
  //   id: 1,
  //   name: 'Team 1',
  //   members: [{
  //     fullName: 'Jordan Berry',
  //     initials: 'JB'
  //   }]
  // },
  // {
  //   id: 2,
  //   name: 'Team 2',
  //   members: [{
  //     fullName: 'Jordan Berry',
  //     initials: 'JB'
  //   }]
  // },
  // {
  //   id: 3,
  //   name: 'Team 3',
  //   members: [{
  //     fullName: 'Jordan Berry',
  //     initials: 'JB'
  //   }]
  // }];


  
	//functions
	//----------------------
  $scope.newTeam = newTeam;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
    return Team.find({"filter": {"include": 'members'}})
           .$promise
           .then(function(results){

            //set into scope
              $scope.data.teams = results;

              $scope.data.activated = true;
           })
           .catch(function(err){
              Logger.error('Error Fetching Teams');

              $scope.data.activated = true;
           })

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
New Team
*/
function newTeam() {
  var resolvedData = {
    currentUser: $rootScope.activeUser
  }

  var newTeamModal = modalManager.openModal('newTeam', resolvedData);

  newTeamModal.result.then(function(results){
    activate();
  })
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