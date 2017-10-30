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
  excelGenerator,
  $uibModalInstance,
  socialTypes,
  CustomField,
  resolvedData) {

// BINDABLES
//===========================================
  //vars
  //----------------------
  var entityType = resolvedData.currentEntity || null;

    //columns for entity / exclude any that should be exluded from the import
  var fields = _.filter($injector.get(entityType + 'Fields'), function(o){
    return !o.excludeImport;
  });


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


  // $scope.data.columns = []

  $scope.data.selected = [];

  //functions
  //----------------------
  // $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.nextStep = nextStep;
  $scope.previousStep = previousStep;
  $scope.ok = ok;
  $scope.checkFields = checkFields;


  //functions
  //----------------------
  $scope.nextStep = nextStep;
  $scope.previousStep = previousStep;
  $scope.cancel = cancel;
  $scope.fieldSelected = fieldSelected;
  $scope.createTemplate = createTemplate;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){
  $scope.data.loading = true;
  return CustomField.find({"filter": {'where': {"useWith": {"inq": [$scope.data.currentEntity]}}}}).$promise
      .then(function(results){
        var customFields = results;
        //include both regular fields & custom fields
        $scope.data.columns = buildColumns(_.union(fields, customFields));
        console.log($scope.data.columns);
        $scope.data.activated = true;
        $scope.data.loading = false;
      })
      .catch(function(err){
        Logger.error('Error fetching custom fields', 'Please try again in a moment');
        console.log(err);
        $scope.data.loading = false;
      })
}
activate()
//-------------------------------------------


// FUNCTIONS
//===========================================


function buildColumns(columns){

     var alteredColumns = [];

      _.forEach(columns, function(value, key){
            switch(value.type) {
                case 'email':
                    var emailIndexes = [1,2];
                    _.forEach(emailIndexes, function(value){
                        alteredColumns.push({'label': 'email' + value + '_type'});
                        alteredColumns.push({'label': 'email' + value + '_value'});
                    })
                    break;
                case 'phone':
                     var phoneIndexes = [1,2];
                    _.forEach(phoneIndexes, function(value){
                      alteredColumns.push({'label': 'phone' + value + '_type'});
                      alteredColumns.push({'label': 'phone' + value + '_value'});
                      alteredColumns.push({'label': 'phone' + value + '_extension'});
                    })
                    break;
                case 'address':
                    var addressIndexes = [1,2];
                    //add two address stubs
                    _.forEach(addressIndexes, function(value){
                      alteredColumns.push({'label': 'address' + value + '_type'});
                      alteredColumns.push({'label': 'address' + value + '_street1'});
                      alteredColumns.push({'label': 'address' + value + '_street2'});
                      alteredColumns.push({'label': 'address' + value + '_city'});
                      alteredColumns.push({'label': 'address' + value + '_region'});
                      alteredColumns.push({'label': 'address' + value + '_postal_code'});
                      alteredColumns.push({'label': 'address' + value + '_country'});
                    })
                    break;
                case 'social':
                    _.forEach(socialTypes, function(value){
                        alteredColumns.push({'label': value.key});
                    })
                    break;
                // case 'category':
                //     //TODO - add data validation to only allow category values
                //     break;
                default:
                    //just add key so can be recognized
                    if(value.key) { alteredColumns.push({'label': value.key}) };
            }
      })

      //return back columns
      return alteredColumns;
}

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
  $scope.data.fileContents.columnDefs.unshift({"field": ""});
  console.log('trying to match columns');
  _.forEach($scope.data.fileContents.columnDefs, function(value){

    if(_.map($scope.data.columns, 'label').indexOf(value.field) > -1) {
      $scope.data.selected[_.indexOf(_.map($scope.data.columns, 'label'), value.field)] = value;
      value.disabled = true;
    } 

  })
}

function checkFields(){
  console.log('check fields');
  _.forEach($scope.data.fileContents.columnDefs, function(value){
    if(_.find($scope.data.selected, ['field', value.field])) {
      value.disabled = true;
    } else {
      value.disabled = false;
    }
  })
}

function ok(){

  var mapping = [];
  //ensures no undefined or nulls
  var selectedValues = _.compact($scope.data.selected);
  
  _.forEach(selectedValues, function(value){
    var key = _.get(_.find($scope.data.columns, ['label', value.field]), 'key', null);
    var type = _.get(_.find($scope.data.columns, ['label', value.field]), 'type', null);
    if(type == 'lookup'){ var lookupEntity = _.get(_.find($scope.data.columns, ['label', value.field]), 'lookup', null); }
    if(key && type){
      mapping.push({
        key: key,
        type: type,
        lookupEntity: lookupEntity || null,
        mappedKey: value.field
      })
    }
  })

  console.log(mapping);

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

function createTemplate(){
  console.log('create template');
  return excelGenerator.createImportTemplate(entityType);
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