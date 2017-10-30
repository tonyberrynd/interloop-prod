/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.newTaskCtrl', [])

//declare dependencies
.controller('newTaskCtrl', function(
  $scope,
  $rootScope,
  $uibModalInstance,
  resolvedData,
  newEntityFactory,
  View,
  ActivityType,
  searchService,
  Logger) {

// BINDABLES
//===========================================
  
  // vars
  //----------------------
  var entityType = _.get(resolvedData, 'entityType', null);
  var thisRecord = _.get(resolvedData, 'thisRecord', null);

  //data
  //----------------------
  $scope.data = {};
  $scope.data.todo = {};


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

 
  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.getRecords = getRecords;
  $scope.addRelated = addRelated;
  $scope.removeRelated = removeRelated;
  $scope.addOwner = addOwner;
  $scope.removeOwner = removeOwner;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){
  return ActivityType.find().$promise
          .then(function(results){
            console.log('task types', results);
            $scope.data.taskTypes = results;
          })
          .catch(function(err){
            Logger.error('Error Fetching Task Types', 'Please Try Again in a moment')
          })
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function ok() {
      //ensure this is set to true - might want to move some of this server side
    $scope.data.todo.type = 'todo';
    $scope.data.todo.dueDate = $scope.data.customDate ? $scope.data.customDate : convertDate($scope.data.setDate);
    $scope.data.todo.createdBy = {
      'firstName': $rootScope.activeUser.firstName,
      'lastName': $rootScope.activeUser.lastName,
      'color': $rootScope.activeUser.color,
      'id': $rootScope.activeUser.id
    };

    if($scope.data.todo.completed){
        $scope.data.todo.completedDate = moment().format();
    }

    var results = {
      todo: $scope.data.todo,
      owners: $scope.data.owners,
      related: $scope.data.related
    }

   $uibModalInstance.close(results);

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

function convertDate(date){
    switch(date) {
        case 'today':
            return moment().endOf("day").format();
            break;
        case 'tomorrow':
            return moment().add(1, 'd').endOf("day").format();
            break;
        case 'next-week':
            return moment().add(1, 'w').endOf("day").format();
            break;
        case 'next-month':
            return moment().add(1, 'm').endOf("day").format();
            break;
        default:
            return moment().endOf("day").format();
    }
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