/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.newActivityCtrl', [])

//declare dependencies
.controller('newActivityCtrl', function(
  $scope,
  $rootScope,
  RelationshipManager,
  $uibModalInstance,
  resolvedData,
  Activity,
  newEntityFactory,
  View,
  searchService,
  ActivityType,
  Logger) {

// BINDABLES
//===========================================
  var entityType = _.get(resolvedData, 'entityType', null)
  var thisRecord = _.get(resolvedData, 'entityType', null)

  //data
  //----------------------
  $scope.data = {};
  $scope.data.loggedCall = {};

    //owners
  $scope.data.owners = [];
  //should push current user as owner
  $scope.data.owners.push($rootScope.activeUser);

  //erlated to
  $scope.data.related = [];
  if(thisRecord && entityType){
    console.log(thisRecord);
    //need to set entity type so ng repeat know what is going on
    thisRecord.thisEntityType = entityType;
    //push into related array
    $scope.data.related.push(thisRecord);

    //go ahead and prepoulate search results with already related entities
    $scope.data.results = setUpPreSearch(thisRecord.entities);
  }


  //set default values
  $scope.data.loggedCall.completedDate = moment().format();
  $scope.data.loggedCall.callType = $scope.data.callTypes[1];
 

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// function activate(){
//   return ActivityType.find().$promise
//           .then(function(results){
//             console.log('task types', results);
//             $scope.data.taskTypes = results;
//           })
//           .catch(function(err){
//             Logger.error('Error Fetching Task Types', 'Please Try Again in a moment')
//           })
// }
//-------------------------------------------
// activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function ok() {
    //ensure this is set to true - might want to move some of this server side
    $scope.data.loggedCall.type = 'call';
    $scope.data.loggedCall.completed = true;
    $scope.data.loggedCall.completedDate = moment().format();
    $scope.data.loggedCall.createdBy = {
      'firstName': $rootScope.activeUser.firstName,
      'lastName': $rootScope.activeUser.lastName,
      'color': $rootScope.activeUser.color,
      'id': $rootScope.activeUser.id
    };

    var result = {
      loggedCall: $scope.data.loggedCall,
      owners: $scope.data.loggedCall,
      related: $scope.data.related
    }

   $uibModalInstance.close(result);
}

function cancel () {
  $uibModalInstance.dismiss('cancel');
};


function setUpPreSearch(records){
  _.forEach(records, function(record){
    record.thisEntityType = record.entityType;
    //need to reassign id to match true entitiy id, not the entity link id
    //otherwise will cause issues in the promise all after selecting multiple users
    record.id = record.entityId;
  })

  return records;
}


 function getRecords(searchVal){
      $scope.data.results = [];
      $scope.data.serverError = false;
      $scope.data.loadingResults = true;

      return searchService.globalSearch(searchVal, false)
              .then(function(results){
                $scope.data.results = results;
                console.log(results);
              })
              .catch(function(err){
                $scope.data.serverError = true;
              })
       

  }


  function addOwner(owner){
    if(!_.find($scope.data.owners, ['id', owner.id])){
           $scope.data.owners.push(owner);
      }
  }

  function removeOwner(owner){
    $scope.data.owners.splice($scope.data.owners.indexOf(owner), 1);
  }


  function addRelated(item){
      //ensures unique
      if(!_.find($scope.data.related, ['id', item.id])){
          $scope.data.related.push(item)
      }
  }

  function removeRelated(item){
    $scope.data.related.splice($scope.data.related.indexOf(item), 1);
  }

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