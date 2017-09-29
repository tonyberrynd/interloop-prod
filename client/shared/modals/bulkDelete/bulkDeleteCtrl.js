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
  //query
  var query = resolvedData.query || {};


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

    //update attributes
    var updateAttributes = {'_isDeleted': true, 'deletedOn': moment().format() }

    //update via query
    return entityModel.updateAll(query, updateAttributes).$promise
      .then(function(results){
          //updated records
          Logger.info("Updated Records");
          //close modal
          $uibModalInstance.close(results);
      })
      .catch(function(err){
        //error
        Logger.error("Error Deleting Some Records", "Please try again in a moment");
        //cancel
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