/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.newNoteCtrl', [])

//declare dependencies
.controller('newNoteCtrl', function(
  $scope,
  $uibModalInstance,
  searchService,
  resolvedData) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var relatedEntities = resolvedData.relatedEntities;

  //data
  //----------------------
  $scope.data = {};

  //functions
  //----------------------
  $scope.lookupEntities = lookupEntities;

  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  function lookupEntities(query) {
    return searchService.globalSearch(query)
          .then(function(results){
            $scope.data.results = results;
        })
  };

  function ok() {
    $uibModalInstance.close($scope.data);
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