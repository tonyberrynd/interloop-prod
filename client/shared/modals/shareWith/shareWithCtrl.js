/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.shareWithCtrl', [])

//declare dependencies
.controller('shareWithCtrl', function(
  $scope,
  $q, 
  $injector,
  Logger,
  $uibModalInstance,
  Appuser,
  resolvedData,
  Team) {

// BINDABLES
//===========================================

  //vars
  //---------------------
  var entityType = resolvedData.entity;

  //data
  //----------------------
  $scope.data = {};
  $scope.data.choices = [];
  $scope.data.sharedWith = [];

  $scope.data.thisRecord = resolvedData.thisRecord;

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  return $q.all([
      Appuser.find().$promise,
      Team.find().$promise
    ])
    .then(function(results){
      $scope.data.users = results[0];
      $scope.data.teams = results[1];



      //transform and push users into choices
      _.forEach($scope.data.users, function(value){
        value.type = 'user';
        $scope.data.choices.push(value);
      })

      //transform and push users into choices
      _.forEach($scope.data.teams, function(value){
        value.type = 'team';
        $scope.data.choices.push(value);
      })

    })

}
activate()
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {

    var entityModel = $injector.get(entityType);
    var shareWithPromises = [];

    _.forEach($scope.data.sharedWith, function(value, key){

      var thisPromise = entityModel.shareWith.create(
        {"id": $scope.data.thisRecord.id},
        {
            "name": value.name,
            "type": value.type,
        })

        // push promise into array
        shareWithPromises.push(thisPromise)
    })

    $q.all(shareWithPromises)
      .then(function(results){
        Logger.info('Share With Updated')
        $uibModalInstance.close(results);
      })
      .catch(function(err){
        Logger.error('Error Updating Share With', 'Please Try Again in a moment')
        console.log(err);
      })
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

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