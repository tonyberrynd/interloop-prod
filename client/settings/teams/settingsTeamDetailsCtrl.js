  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsTeamDetailsCtrl', [])
//declare dependencies
.controller('settingsTeamDetailsCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
  $state,
  $stateParams,
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

  $scope.data.editTeamType = 'members';
  
	//functions
	//----------------------
  $scope.changeType = changeType;
  $scope.addMembers = addMembers;
  $scope.removeMember = removeMember;
  $scope.editTeam = editTeam;
  $scope.deleteTeam = deleteTeam;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
    return Team.findOne({"filter": {"where": {"id": $stateParams.teamId}, "include": "members"}})
           .$promise
           .then(function(results){

              $scope.data.thisTeam = results;
              console.log($scope.data.thisTeam);

              $scope.data.activated = true;
           })
           .catch(function(err){
              Logger.error('Error Fetching Teams');

              $scope.data.activated = true;
              //ensure there is a team to view the detail
              $state.go('app.settings.teams');
           })

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeType(type){
  $scope.data.editTeamType = type;
}


function editTeam() {
  var resolvedData = {
    thisTeam: $scope.data.thisTeam
  }
  //open modal
  var editTeamModal = modalManager.openModal('editTeam', resolvedData);

  editTeamModal.result.then(function(results){

    //reactivate
    activate();
  })
}

function deleteTeam() {
  var resolvedData = {
    "thisItem": $scope.data.thisTeam.name,
    "helperText": 'This will remove all members from teams and change their visibilty settings'
  }

  var deleteTeamModal = modalManager.openModal('confirm', resolvedData);

  deleteTeamModal.result.then(function(results){

    Team.deleteById({"id": $scope.data.thisTeam.id}).$promise
      .then(function(results){
        Logger.info('Team Succesfully Removed');

        $state.go('app.settings.teams')
      })
      .catch(function(err){
        Logger.error('Error Deleting Team', 'Please Try again in a moment')
      })

  })
}

function addMembers() {
  var resolvedData = {
    thisTeam: $scope.data.thisTeam
  };

  var addMembersModal = modalManager.openModal('addTeamMembers', resolvedData);

  //results
  addMembersModal.result.then(function(results){
    //repulls team information
    activate();
  })
}

function removeMember(member){

  Team.members.unlink({"id": $scope.data.thisTeam.id}, {"fk": member.id}).$promise
    .then(function(results){
      Logger.info("Member Removed From Team");

      //remove from array
      $scope.data.thisTeam.members.splice($scope.data.thisTeam.members.indexOf(member), 1);

    })
    .catch(function(err){
      console.log(err);
      Logger.error("Error Removing Member", "Please try again In a moment")
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