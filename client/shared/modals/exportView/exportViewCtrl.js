/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.exportViewCtrl', [])

//declare dependencies
.controller('exportViewCtrl', function(
  $scope,
  $injector,
  $rootScope,
  Logger,
  Opportunity,
  $uibModalInstance,
  resolvedData) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

  $scope.data.thisView = resolvedData.view;
  $scope.data.columns = resolvedData.columns;

  $scope.data.fileName = $scope.data.thisView.name || 'View Export';

  //functions
  //----------------------
  $scope.cancel = cancel;
  $scope.startExport = startExport;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

//                   {arg: 'fileName', type: 'string'},  
//                   {arg: 'filter', type: 'object'},
//                   {arg: 'fieldKeys', type: 'array'},
//                   {arg: 'fieldLabels', type: 'array'},
//                   {arg: 'includeDeleted', type: 'boolean'},
//                   {arg: 'email', type: 'string'}],

  function startExport() {

    console.log('start export');

    console.log($scope.data.columns);

    var fileName = $scope.data.fileName;
    var filter = {};
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
    // var entityModel = $injector.get($scope.data.thisView.entity);
    Opportunity.exportData(exportObject).$promise
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