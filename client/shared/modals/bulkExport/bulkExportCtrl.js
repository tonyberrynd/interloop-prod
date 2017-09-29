/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.bulkExportCtrl', [])

//declare dependencies
.controller('bulkExportCtrl', function(
  $scope,
  $timeout,
  $uibModalInstance,
  resolvedData) {

// BINDABLES
//===========================================
  
  //vars
  //----------------------
  var entityModel = resolvedData.entityModel;


  //data
  //----------------------
  $scope.data = {};

  $scope.data.query = resolvedData.query;
  $scope.data.columns = resolvedData.columns;
  $scope.data.fileName = 'Bulk Export';

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

    var fileName = $scope.data.fileName;
    var filter = query;
    var fieldKeys = [];
    var fieldLabels = [];
    var includeDeleted = false;
    var email = $rootScope.activeUser.email;

    //build out keys and lables
    _.forEach($scope.data.columns, function(value){
      fieldKeys.push(value.colId);
      fieldLabels.push(value.colDef.headerName);
    })

    var exportObject = {
      fileName: fileName,
      filter: filter,
      fieldKeys: fieldKeys,
      fieldLabels, fieldLabels,
      includeDeleted: includeDeleted,
      email: email
    }
    
    //sends export request to the server
    var entityModel = $injector.get(entityModel);
    entityModel.exportData(exportObject).$promise
      .then(function(results){
        Logger.info("Export Started!", "We will email this export to you in a few moments");

         $uibModalInstance.close(results);

      })
      .catch(function(err){
        Logger.error('Error Starting Export', 'Please Try Again In A Few Moments')
        console.log(err);
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