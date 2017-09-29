/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.importDataCtrl', [])

//declare dependencies
.controller('importDataCtrl', function(
  $scope,
  $rootScope,
  $injector,
  Logger,
  $uibModalInstance,
  resolvedData) {

// BINDABLES
//===========================================
  //vars
  //----------------------
  var entityType = resolvedData.entityType || null;

  //data
  //----------------------
  $scope.data = {};
  $scope.fileContents = {};
  $scope.data.headerValues = [];


  $scope.data.steps = [
    { number: 1, name: 'Import Spreadsheet' },
    { number: 2, name: 'Column Matching' },
    { number: 3, name: 'Data Check and Import' }
  ];

  $scope.data.currentStep = angular.copy($scope.data.steps[0]);

  //columns for opportunity
  $scope.data.columns = $injector.get(entityType + 'Fields');
  // $scope.data.columns = []

  $scope.data.selected = [];

  //functions
  //----------------------
  // $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.nextStep = nextStep;
  $scope.previousStep = previousStep;
  $scope.ok = ok;


  //functions
  //----------------------
  $scope.nextStep = nextStep;
  $scope.previousStep = previousStep;
  $scope.cancel = cancel;
  $scope.fieldSelected = fieldSelected;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Go to next Step
*/
function nextStep() {
  var nextNumber = $scope.data.currentStep.number;
  if ($scope.data.steps.length == nextNumber){
    // $uibModalInstance.dismiss('cancel');
  }
  $scope.data.currentStep = angular.copy($scope.data.steps[nextNumber]);
};

/*
Go to previous Step
*/
function previousStep() {
  var previousNumber = $scope.data.currentStep.number - 2;
  
  $scope.data.currentStep = angular.copy($scope.data.steps[previousNumber]);
};

/*
Cancel Import
*/
function cancel() {
  $uibModalInstance.dismiss('cancel');
};

/*
Tries to match columns based on labels
*/
function matchColumns() {
  console.log('trying to match columns');
  _.forEach($scope.data.fileContents.columnDefs, function(value){

    if(_.map($scope.data.columns, 'label').indexOf(value.field) > -1) {
      $scope.data.selected[_.indexOf(_.map($scope.data.columns, 'label'), value.field)] = value.field;
    } 

  })
}

function ok(){

  var mapping = [];
  //ensures no undefined or nulls
  var selectedValues = _.compact($scope.data.selected);
  
  _.forEach(selectedValues, function(value){
    mapping.push({
      key: _.find($scope.data.columns, ['label', value]).key,
      mappedKey: value
    })
  })

  return $injector.get(entityType).import({mapping: mapping, values: $scope.data.fileContents.data, userId: $rootScope.activeUser.id}).$promise
    .then(function(results){
      Logger.info('Import Started', 'We will notify you when this import is complete');
       $uibModalInstance.close();
    })
    .catch(function(err){
      Logger.error('Error Starting Import', 'Please Try again in a few moments');
    })
}

function fieldSelected(item){
  if ($scope.data.selected.indexOf(item.field) > -1) {
    return true;
  } else {
    return false;
  }

}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
//watch for changes in data.fileContents
$scope.$watch('data.fileContents', function (newValue, oldValue, scope) {
    //Do anything with $scope.letters
    if(newValue !== oldValue) {
      matchColumns();
    }

});


//-------------------------------------------

});