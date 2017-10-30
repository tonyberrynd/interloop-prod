/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.addOwnersCtrl', [])

//declare dependencies
.controller('addOwnersCtrl', function(
  $scope,
  $uibModalInstance,
  $timeout, 
  $q, 
  $injector,
  Opportunity,
  resolvedData,
  Appuser,
  Logger) {

// BINDABLES
//====================,=======================

  //vars
  //----------------------
  var entity = resolvedData.entity || null;
  var currentOwners = _.get(resolvedData.thisRecord, 'owners', []);
  console.log('currentOwners', currentOwners);
  var initializing = true;

  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisRecord = angular.copy(resolvedData.thisRecord);

  // $scope.data.owners = $scope.data.thisRecord.owners || [{
  //     value: {},
  //     splitPercent: 100,
  //     splitValue: $scope.data.thisRecord.value || 0,
  //     splitNote: null
  //   }];

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  // $scope.addOwner = addOwner;
  // $scope.removeOwner = removeOwner;
  // $scope.checkValues = checkValues;
  // $scope.isAlreadyChosen = isAlreadyChosen;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  return Appuser.find().$promise
    .then(function(results){
      $scope.data.owners = results;
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


  // function addOwner() {
  //   $scope.data.owners.push({
  //     value: {},
  //     splitPercent: (100 - _.sum(_.map($scope.data.owners, 'splitPercent'))),
  //     splitValue: $scope.data.thisRecord.value * (100 - _.sum(_.map($scope.data.owners, 'splitPercent'))),
  //     splitNote: null
  //   });

  //   checkValues();
  // }


  // function removeOwner(owner) {
  //   $scope.data.owners.splice($scope.data.owners.indexOf(owner), 1);

  //   //if only 1 owner - set back to full ownership
  //   if($scope.data.owners.length == 1) {
  //     $scope.data.owners[0].splitPercent = 100;
  //     $scope.data.owners[0].splitValue = $scope.data.thisRecord.value;
  //   }

  //   //ensure option is not disabled
  //   isAlreadyChosen();
  //   checkValues();
  // }

  // function isAlreadyChosen(user){
   
  //  _.forEach($scope.data.ownerOptions, function(value, key){
  //   if(_.includes(_.map($scope.data.owners, 'value'), value)) {
  //     value.disabled = true;
  //   } else {
  //     value.disabled = false;
  //   }
  //  })
    
  // }



  // function checkValues(owner) {

  //    //check if percentages add up
  //   if(_.sum(_.map($scope.data.owners, 'splitPercent')) !== 100) {
  //     $scope.data.splitError = true;
  //   } else {
  //     $scope.data.splitError = false;
  //   }

  //   _.forEach($scope.data.owners, function(value, key){
  //     value.splitValue = (value.splitPercent / 10) * ($scope.data.thisRecord.value)
  //   })

  // }


  function ok() {
    $scope.data.processing = true;

    var newOwners = [];
    var ownerPromises = [];

    _.forEach($scope.data.selectedOwners, function(value, key){

      if(!_.find(currentOwners, ['id', value.id])){

        //collect new owners to be returned to side panel
        newOwners.push(value);

        ownerPromises.push(
          function() {
            return $injector.get(entity).owners.create(
              {"id": $scope.data.thisRecord.id},
              {
                  "firstName": value.firstName,
                  "lastName": value.lastName,
                  "email": value.email,
                  "active": true,
                  "ownerId": value.id
              }).$promise

          })
        }
  });

  $q.serial(ownerPromises)
      .then(function(results){
        Logger.info('Owners Updated')

        $scope.data.processing = false;

        $uibModalInstance.close(newOwners);

      })
      .catch(function(err){
        Logger.error('Error Updating Owners', 'Please Try Again in a moment')
        console.log(err);

        $scope.data.processing = false;
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