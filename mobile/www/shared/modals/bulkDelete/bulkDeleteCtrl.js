/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.bulkDeleteCtrl', [])

//declare dependencies
.controller('bulkDeleteCtrl', function(
  $scope,
  $uibModalInstance,
  $injector,
  resolvedData,
  Logger,
  gridManager,
  $q) {

// BINDABLES
//===========================================
  //vars
  //----------------------
  var entity = resolvedData.entity;
  //get entity
  var entityModel = $injector.get(entity);


  //data
  //----------------------
  $scope.data = {};
  $scope.data.selectedOption = {};


  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.data.selectedItems = resolvedData.selectedItems;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {

    //create promise updates
    var deletePromises = [];

    //create array of promises
    _.forEach($scope.data.selectedItems, function(value, key){
      //push into array
      deletePromises.push(entityModel.deleteById({"id": value.id}).$promise)
    })

    //complete updates
    $q.all(deletePromises)
      .then(function(results){
        console.log(results);
        //show response
        Logger.info("Deleted " + $scope.data.selectedItems.length + " Records");
        //purge grid cache
        gridManager.refreshInfinitePageCache();
        //close modal
        $uibModalInstance.close(results);
      })
      .catch(function(err){
        console.log(err);
        Logger.error("Error Deleting Some Records");
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