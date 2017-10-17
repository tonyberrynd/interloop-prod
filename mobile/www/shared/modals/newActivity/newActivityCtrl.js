/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.newActivityCtrl', [])

//declare dependencies
.controller('newActivityCtrl', function(
  $scope,
  $uibModalInstance,
  searchService) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.activity = {};

  $scope.people = [
    { label: 'Joe'},
    { label: 'Mike'},
    { label: 'Diane'}
]

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