/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.addRelatedCtrl', [])

//declare dependencies
.controller('addRelatedCtrl', function(
  $scope,
  $uibModalInstance,
  $timeout, 
  $q, 
  $injector,
  Opportunity,
  resolvedData,
  searchService,
  Appuser,
  Logger) {

// BINDABLES
//====================,=======================

  //vars
  //----------------------
  var entity = resolvedData.entity || null;
  var initializing = true;

  //data
  //----------------------
  $scope.data = {};
  $scope.data.results = [];
  $scope.data.serverError = false;
  $scope.data.loadingResults = false;

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.getRecords = getRecords;

//-------------------------------------------


// ACTIVATE
//===========================================
//-------------------------------------------
//-------------------------------------------


// FUNCTIONS
//===========================================

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };


  /*
  Get Look Up Values
  */
  function getRecords(searchVal){
      $scope.data.results = [];
      $scope.data.serverError = false;
      $scope.data.loadingResults = true;

      return searchService.globalSearch(searchVal, false)
              .then(function(results){
                $scope.data.results = results;
              })
              .catch(function(err){
                $scope.data.serverError = true;
              })
       

  }




  function ok() {
    $uibModalInstance.close();
  }

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================

//-------------------------------------------

});