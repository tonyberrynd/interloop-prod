/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.addOwnerCtrl', [])

//declare dependencies
.controller('addOwnerCtrl', function(
  $scope,
  $uibModalInstance,
  $timeout, 
  $q, 
  Opportunity,
  resolvedData,
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
  $scope.data.currentType = 'standard';
  $scope.data.splitError = false;
  $scope.data.thisRecord = angular.copy(resolvedData.thisRecord);

  $scope.data.owners = $scope.data.thisRecord.owners || [{
      value: {},
      splitPercent: 100,
      splitValue: $scope.data.thisRecord.value || 0,
      splitNote: null
    }];

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.addOwner = addOwner;
  $scope.removeOwner = removeOwner;
  $scope.checkValues = checkValues;
  $scope.isAlreadyChosen = isAlreadyChosen;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  return Appuser.find().$promise
    .then(function(results){
      $scope.data.ownerOptions = results;
    })
    .catch(function(err){
      Logger.error('Error Retrieving Owners', 'Please Try again in a moment');
    })

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };


  function addOwner() {
    $scope.data.owners.push({
      value: {},
      splitPercent: (100 - _.sum(_.map($scope.data.owners, 'splitPercent'))),
      splitValue: $scope.data.thisRecord.value * (100 - _.sum(_.map($scope.data.owners, 'splitPercent'))),
      splitNote: null
    });

    checkValues();
  }


  function removeOwner(owner) {
    $scope.data.owners.splice($scope.data.owners.indexOf(owner), 1);

    //if only 1 owner - set back to full ownership
    if($scope.data.owners.length == 1) {
      $scope.data.owners[0].splitPercent = 100;
      $scope.data.owners[0].splitValue = $scope.data.thisRecord.value;
    }

    //ensure option is not disabled
    isAlreadyChosen();
    checkValues();
  }

  function isAlreadyChosen(user){
   
   _.forEach($scope.data.ownerOptions, function(value, key){
    if(_.includes(_.map($scope.data.owners, 'value'), value)) {
      value.disabled = true;
    } else {
      value.disabled = false;
    }
   })
    
  }



  function checkValues(owner) {

     //check if percentages add up
    if(_.sum(_.map($scope.data.owners, 'splitPercent')) !== 100) {
      $scope.data.splitError = true;
    } else {
      $scope.data.splitError = false;
    }

    _.forEach($scope.data.owners, function(value, key){
      value.splitValue = (value.splitPercent / 10) * ($scope.data.thisRecord.value)
    })

  }


  function ok() {

    var ownerPromises = [];

    _.forEach($scope.data.owners, function(value, key){

      var thisPromise = Opportunity.owners.create(
        {"id": $scope.data.thisRecord.id},
        {
            "firstName": value.value.firstName,
            "lastName": value.value.lastName,
            "initials": value.value.initials,
            "email": value.value.email,
            "split": value.splitPercent,
            "active": true,
            "ownerId": value.value.id
        })

        // push promise into array
        ownerPromises.push(thisPromise)
    })

    $q.all(ownerPromises)
      .then(function(results){
        Logger.info('Owners Updated')
        $uibModalInstance.close(results);
      })
      .catch(function(err){
        Logger.error('Error Updating Owners', 'Please Try Again in a moment')
        console.log(err);
      })


    
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