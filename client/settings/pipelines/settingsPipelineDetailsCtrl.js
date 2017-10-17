  /* ==========================================================================
   Settings Pipelines Ctrl
   ========================================================================== */

angular.module('interloop.settingsPipelineDetailsCtrl', [])
//declare dependencies
.controller('settingsPipelineDetailsCtrl', function(
	$scope,
  $rootScope,
	$log,
  $timeout,
  $state,
  $stateParams,
  Logger,
	Appuser,
  Process,
  modalManager) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;

  $scope.data.editPipelineType = 'members';
  
	//functions
	//----------------------
  $scope.changeType = changeType;
  $scope.addMembers = addMembers;
  $scope.removeMember = removeMember;
  $scope.editPipeline = editPipeline;
  $scope.deletePipeline = deletePipeline;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
    return Process.findOne({"filter": {"where": {"id": $stateParams.pipelineId}}})
           .$promise
           .then(function(results){

              $scope.data.thisPipeline = results;

              $scope.data.activated = true;
           })
           .catch(function(err){
              Logger.error('Error Fetching Pipelines');

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
  $scope.data.editPipelineType = type;
}


function editPipeline() {
  var resolvedData = {
    thisPipeline: $scope.data.thisPipeline
  }
  //open modal
  var editPipelineModal = modalManager.openModal('editPipeline', resolvedData);

  editPipelineModal.result.then(function(results){

    //reactivate
    activate();
  })
}

function deletePipeline() {
  var resolvedData = {
    "thisItem": $scope.data.thisPipeline.name,
    "helperText": 'This will remove all members from teams and change their visibilty settings'
  }

  var deletePipelineModal = modalManager.openModal('confirm', resolvedData);

  deletePipelineModal.result.then(function(results){

    Pipeline.deleteById({"id": $scope.data.thisPipeline.id}).$promise
      .then(function(results){
        Logger.info('Pipeline Succesfully Removed');

        $state.go('app.settings.teams')
      })
      .catch(function(err){
        Logger.error('Error Deleting Pipeline', 'Please Try again in a moment')
      })

  })
}

function addMembers() {
  var resolvedData = {
    thisPipeline: $scope.data.thisPipeline
  };

  var addMembersModal = modalManager.openModal('addPipelineMembers', resolvedData);

  //results
  addMembersModal.result.then(function(results){
    //repulls team information
    activate();
  })
}

function removeMember(member){

  Pipeline.members.unlink({"id": $scope.data.thisPipeline.id}, {"fk": member.id}).$promise
    .then(function(results){
      Logger.info("Member Removed From Pipeline");

      //remove from array
      $scope.data.thisPipeline.members.splice($scope.data.thisPipeline.members.indexOf(member), 1);

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