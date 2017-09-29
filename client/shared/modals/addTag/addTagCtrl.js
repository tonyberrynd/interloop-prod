/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.addTagCtrl', [])

//declare dependencies
.controller('addTagCtrl', function(
  $scope,
  $uibModalInstance,
  Tag,
  resolvedData) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var entity = resolvedData.entity;

  //data
  //----------------------
  $scope.data = {}

  $scope.data.selectedItems = resolvedData.selectedItems;

  $scope.data.selectedTag = null;
  $scope.data.newTag = null;

  $scope.data.tagType = 'existing';

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.shouldDisable = shouldDisable;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  //get tags for this entity
  return Tag.find({"filter": {"where": {"useWith": { "inq": [entity]}}}}).$promise
    .then(function(results){
      $scope.data.tags = results;
      console.log($scope.data.tags);
    })
    .catch(function(err){
      Logger.error('Error Fetching Views');
    })

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {
    $uibModalInstance.close($scope.data);
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

  function shouldDisable() {

    if($scope.data.tagType == 'existing' && $scope.data.selectedTag) {
      return false
    } 
    else if($scope.data.tagType == 'new' && $scope.data.newTag){
      return false;
    }
    else {
      return true
    }
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