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

  $scope.data.selectedOwners = _.map(currentOwners, 'owner') || [];
  $scope.data.selectedRelated = [];

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

  $scope.addRemoveOwner = addRemoveOwner;
  $scope.removeOwner = removeOwner;


  // $scope.addOwner = addOwner;
  // $scope.removeOwner = removeOwner;
  // $scope.checkValues = checkValues;
  // $scope.isAlreadyChosen = isAlreadyChosen;

//-------------------------------------------


// ACTIVATE
//===========================================
// function activate() {

// }
//-------------------------------------------
// activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };


    /*
  Add Selected Owner
  */
  function addRemoveOwner(owner){
    if(!_.find($scope.data.selectedOwners, ['id', owner.id])){
           $scope.data.selectedOwners.push(owner);
    } else {
      removeOwner(owner);
    }
  }

  /*
  Remove Selected Owner
  */
  function removeOwner(owner){
    $scope.data.selectedOwners.splice($scope.data.selectedOwners.indexOf(owner), 1);
  }


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

  //need to remove any non selected owners, update any current owners if data changes - TODO & then add some other owners that have been selected

  function ok() {
    $scope.data.processing = true;

    var removeOwners = [];
    var newOwners = [];
    var ownerPromises = [];

    //owners to remove
    _.forEach(currentOwners, function(value, key){
      if(!_.find($scope.data.selectedOwners, ['id', value.id])){
        //collect new owners to be returned to side panel
        removeOwners.push(value);
        ownerPromises.push(
          function() {
            return $injector.get(entity).owners.destroyById({
              "fk": value.id,
              "id": $scope.data.thisRecord.id
            }).$promise
          })
        }
    });


    //TODO - DO I NEED TO UPDATE? SPLITS, ROLES, RELATIONSHIPS etc


    //owners to add
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

        $uibModalInstance.close($scope.data.selectedOwners);

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