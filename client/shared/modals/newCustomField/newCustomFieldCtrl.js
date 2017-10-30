/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.newCustomFieldCtrl', [])
//decalre dependencies
.controller('newCustomFieldCtrl', function(
  $scope,
  $rootScope, 
  $log, 
  $timeout,
  $uibModalInstance,
  Logger,
  entityTypes,
  CustomField,
  modalManager,
  Appuser,
  Team) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

  $scope.data.steps = [
    { number: 1, name: 'Field Type' },
    { number: 2, name: 'Configure Field' },
    { number: 3, name: 'Confirm & Create' }
  ];

  $scope.data.fieldType = null;
  $scope.data.currentStep = angular.copy($scope.data.steps[0]);

  $scope.data.options = [{'value': 'Option 1'}, {'value': ''}, {'value': ''}];

  $scope.data.entities = entityTypes;

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.nextStep = nextStep;
  $scope.previousStep = previousStep;
  $scope.addOption = addOption;
  $scope.removeOption= removeOption;
  $scope.editFormula = editFormula;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){

}

activate()
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


function addOption() {
  $scope.data.options.push({
    value: ''
  })
}

function removeOption(option){
  $scope.data.options.splice($scope.data.options.indexOf(option), 1)
}

/*
Save
*/
function ok() {
  //custom field attributes
  var customField = {
    key: _.camelCase($scope.data.field.name),
    label: $scope.data.field.name,
    type: $scope.data.fieldType,
    description: $scope.data.field.description,
    useWith: $scope.data.useWith,
    active: true
  };

  //add optoins is category type
  if($scope.data.fieldType == 'category' || $scope.data.fieldType == 'mixed-select') {

    //remove blank options
    var transformedOptions = [];
    var index = 0;
    _.forEach($scope.data.options, function(value,key){
      if(value.label == '' || value.label == null){
        $scope.data.options.splice($scope.data.options.indexOf(value), 1);
      } else {
        transformedOptions[index] = {'label': value.label, 'key': _.camelCase(value.label), 'value': value.value || null}
      }
      //increment
      index++
    })

    //extend custom field object
    _.assignIn(customField, {
      values: transformedOptions
    });
  }

  if($scope.data.fieldType == 'formula'){
    customField.formula = $scope.data.formula;
  }

  //create custom field
  CustomField.create(customField).$promise
    .then(function(results){
      Logger.info('Created Custom Field');
       $uibModalInstance.close(results);
    })
    .catch(function(err){
      Logger.error('Error creating custom field', 'Please try again in a moment');
    })

}

/*
Dismiss Note Modal
*/
function cancel() {
  $uibModalInstance.dismiss('cancel');
}



function editFormula(){
  var resolvedData = $scope.data.formula;
  //open modal
  var editFormulaModal = modalManager.openModal('editFormula', resolvedData);

      editFormulaModal.result.then(function(results){
        $scope.data.formula = results;
      }, function(err){

      })
}


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});