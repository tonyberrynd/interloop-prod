/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.bulkEditCtrl', [])

//declare dependencies
.controller('bulkEditCtrl', function(
  $scope,
  $uibModalInstance,
  $injector,
  $timeout,
  resolvedData,
  Logger,
  gridManager,
  $q) {

// BINDABLES
//===========================================
  //vars
  //----------------------
  var entity = resolvedData.entity;
  //query
  var query = resolvedData.query || {};
  //get entity
  var entityModel = $injector.get(entity);


  //data
  //----------------------
  $scope.data = {};
  $scope.data.selectedOption = {};
  $scope.data.value = null;

  //fields - filter certain fields
  $scope.data.fields = _.pickBy($injector.get(entity + 'Fields'), function(value, key){
    return !value.excludeBulk;
  });


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
    var updateAttributes = {}
        updateAttributes[$scope.data.selectedOption.key] = ($scope.data.selectedOption.type == 'category') ? JSON.parse($scope.data.value) : $scope.data.value;

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
        Logger.error("Error Updating Some Records", "Please try again in a moment");
        //cancel
        $uibModalInstance.dismiss('cancel');
      })
  }

  //cancel
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