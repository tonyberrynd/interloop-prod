/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.createViewCtrl', [])

//declare dependencies
.controller('createViewCtrl', function(
  $scope,
  $uibModalInstance,
  resolvedData,
  newEntityFactory,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.view = resolvedData;

  console.log($scope.data.view);

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {
    newEntityFactory.createNew('View', $scope.data.view)
      .then(function(results) { 
        //log success  
        Logger.info('Successfully created view');
        //close modal
        $uibModalInstance.close(results); 
      })
      .catch(function(err){
        //show errer
        Logger.error('Error Creating View');
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