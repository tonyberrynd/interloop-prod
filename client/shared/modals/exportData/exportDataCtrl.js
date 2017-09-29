/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.exportDataCtrl', [])

//declare dependencies
.controller('exportDataCtrl', function(
  $scope,
  $timeout,
  $uibModalInstance,
  resolvedData) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

  $scope.data.selectedItems = resolvedData.selectedItems;
  console.log($scope.data.selectedItems);

  $scope.data.fileName = $scope.data.selectedItems.length + ' Records';

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.getExport = getExport;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  function getExport() {
    return $scope.data.selectedItems;

    //close modal - TODO - Where do I put this
    $uibModalInstance.close();
  }

  function ok() {
    $timeout(function(){
          $uibModalInstance.close($scope.data);
    }, 500)

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