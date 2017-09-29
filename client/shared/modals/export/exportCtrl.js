/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.exportCtrl', [])

//declare dependencies
.controller('exportCtrl', function(
  $scope,
  $rootScope,
  $timeout,
  $injector,
  $uibModalInstance,
  Logger,
  resolvedData,
  EndFields) {

// BINDABLES
//===========================================
  //vars
  //----------------------
  var entityType = resolvedData.entityType;
  var entityFields = $injector.get(entityType + 'Fields');
  var customFields =  _.filter($rootScope.customFields,function(o){
    return _.includes(o.useWith, 'Opportunity') && o.type !== 'divider';
  })
  //data
  //----------------------
  $scope.data = {};
  $scope.data.selectedFields = [];


  $scope.data.fields = _.union(entityFields, customFields, EndFields);

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

    //initiate export
    $injector.get(entityType).export({fields: $scope.data.selectedFields, includeDeleted: $scope.data.includeDeleted, userId: $rootScope.activeUser.id}).$promise
    .then(function(results){
      Logger.info('Export Started', 'We will email you the export when finished');
      $uibModalInstance.close();
    })
    .catch(function(err){
      Logger.error('Error Exporting Data', 'Please try again in a few moments');
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