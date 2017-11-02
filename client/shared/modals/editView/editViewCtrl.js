/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.editViewCtrl', [])

//declare dependencies
.controller('editViewCtrl', function(
  $scope,
  $uibModalInstance,
  $q,
  $rootScope,
  View,
  resolvedData,
  newEntityFactory,
  Appuser, 
  Team,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.choices = [];
  $scope.data.view = resolvedData;

  console.log($scope.data.view);


  $scope.data.view.type = resolvedData.type || 'personal';

  //push shared with into array
  _.forEach($scope.data.view.sharedWith, function(value){
    $scope.data.choices.push(value);
  })

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

    $scope.data.view.createdById ='user-' + $rootScope.activeUser.id;

    //stringify query to be able to user "." dot notation

    $scope.data.view.query = JSON.stringify($scope.data.view.query);

    newEntityFactory.createNew('View', $scope.data.view)
      .then(function(results) { 

        var newView = results;
        // // //log success  
        // // Logger.info('Successfully created view');
        // //close modal
        // $uibModalInstance.close(results); 

        //once new view is created - apply shared with rules
         var sharedWithPromises = [];

          _.forEach($scope.data.sharedWith, function(value, key){

            console.log('sharing with', $scope.data.sharedWith);

            sharedWithPromises.push(
              function(){
              return View.sharedWith.create(
                {"id": results.id},
                {
                    "name": value.type == 'team' ? value.name : value.firstName + ' ' + value.lastName,
                    "itemId": value.id,
                    "itemType" : value.type
                }).$promise

              })
            })


           $q.serial(sharedWithPromises)
            .then(function(results){
              Logger.info('Successfully created view')
              $uibModalInstance.close(newView);
            })
            .catch(function(err){
              Logger.error('View Created but error sharing view', 'Please Try Changed Shared With Values');
              console.log(err);
            })

      })
      .catch(function(err){
        //show errer
        Logger.error('Error Creating View');
        console.log(err);
        //cose modal
        $uibModalInstance.dismiss('cancel');
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