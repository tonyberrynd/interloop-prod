/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.addTeamMemberCtrl', [])
//decalre dependencies
.controller('addTeamMemberCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $q,
  $uibModalInstance,
  Logger,
  resolvedData,
  Appuser,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisTeam = resolvedData.thisTeam;
  console.log('thisTeam', $scope.data.thisTeam);
  $scope.data.people = [];

  $scope.data.selectedPeople = [];



  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  Appuser.find().$promise
    .then(function(results){
      $scope.data.people = results
    })
    .catch(function(err){
      Logger.error('Error Retrieving Users', 'Please Close the modal and try again in a moment')
    })

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Save
*/
function ok() {

    var teamMemberPromises = [];

  _.forEach($scope.data.selectedPeople, function(value, key){
      teamMemberPromises.push(Team.members.link({"id": $scope.data.thisTeam.id}, {"fk": value.id}).$promise);
  })

  //execute calls
  $q.all(teamMemberPromises)
    .then(function(results){
      Logger.info('Added members to team');
      $uibModalInstance.close(results);
    })
    .catch(function(err){
      Logger.error('Error Adding Members to team', 'Please Close the modal and try again in a moment')
      $uibModalInstance.dismiss('cancel');
    })
}

/*
Dismiss Note Modal
*/
function cancel() {
  $uibModalInstance.dismiss('cancel');
}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});