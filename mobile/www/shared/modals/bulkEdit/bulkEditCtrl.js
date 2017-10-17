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

    //create promise updates
    var updatePromises = [];

    //create array of promises
    _.forEach($scope.data.selectedItems, function(value, key){
      console.log(value.id);
      var promiseObject = {}
      //set equal to value
      promiseObject[$scope.data.selectedOption.field] = ($scope.data.selectedOption.type == 'category') ? JSON.parse($scope.data.value) : $scope.data.value;
      //push into array
      updatePromises.push(entityModel.prototype$patchAttributes({"id": value.id}, promiseObject).$promise)
    })

    //complete updates
    $q.all(updatePromises)
      .then(function(results){
        console.log(results);
        //purge grid cache
        gridManager.refreshInfinitePageCache();

        //show response
        $timeout(function(){
          Logger.info("Updated " + $scope.data.selectedItems.length + " Records");
        }, 750)

        //close modal
        $uibModalInstance.close(results);
      })
      .catch(function(err){
        console.log(err);
        Logger.error("Error Updating Some Records");
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