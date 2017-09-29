/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.manageRelationshipsCtrl', [])

//declare dependencies
.controller('manageRelationshipsCtrl', function(
  $scope,
  $uibModalInstance,
  $q, 
  $timeout,
  Logger,
  searchService,
  modalManager,
  resolvedData,
  RelationshipManager) {

// BINDABLES
//===========================================

  //entity type
  //----------------------
  var entityType = resolvedData.entityType;
  var thisRecord = resolvedData.thisRecord;

  //data
  //----------------------
  $scope.data = {};
  $scope.data.currentSearch = null;
  $scope.data.searching = false;
  $scope.data.searched = false;
  $scope.data.relatedToAdd = [];
  $scope.data.selectedItems = [];

  $scope.data.thisRecord = thisRecord;

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.searchRelated = searchRelated;
  $scope.selectItem = selectItem;
  $scope.addRelated = addRelated;
  $scope.clearSearch = clearSearch;
  $scope.removeEntity = removeEntity;
  $scope.newEntity = newEntity;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  // $scope.getLocation = function(val) {
  //   return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
  //     params: {
  //       address: val,
  //       sensor: false
  //     }
  //   }).then(function(response){
  //     return response.data.results.map(function(item){
  //       return item.formatted_address;
  //     });
  //   });
  // };


  function searchRelated(val) {
    $scope.data.searching = true;
    
    return searchService.globalSearch(val, false).then(function(results){
    
      //format here
      $scope.data.availableItems = results;
      $scope.data.searched = true;
      $scope.data.searching = false;
    })
  }

  function removeEntity(item) {
        //remove from search optoins
    $scope.data.selectedItems.splice($scope.data.selectedItems.indexOf(item), 1);
  }

  function clearSearch() {
    $scope.data.searchValue = null;
    $scope.data.availableItems = [];
  }

  function addRelated($item, $model, $label, $event) {
    console.log('add related');

    $scope.data.relatedToAdd.push($model);

    //clear search
    $scope.data.currentSearch = null;
  }


  function selectItem(item) {
    //remove from search optoins
    $scope.data.availableItems.splice($scope.data.availableItems.indexOf(item), 1);

    // push into availableItems
    $scope.data.selectedItems.push(item);
  }



  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };


  function newEntity(entity){


    var newModal = modalManager.openModal('new' + entity)

    newModal.result.then(function(results){
      //push into realted
      $scope.data.selectedItems.push(results);
    })


  }

function ok() {

  var allResults = [];

  var counter = 0;
  var promisesLength = 0;

  var relatePromises = [];

  console.log($scope.data.selectedItems);

  //create array of promises
  _.forEach($scope.data.selectedItems, function(value){

    //need to transform contacts slightly
    if(value.entityType == 'Contact') {
      value.name = value.fullName;
    }

    relatePromises.push(
    function() {
      return RelationshipManager.linkEntity($scope.data.thisRecord, value, entityType, value.thisEntityType, 
        {
          "from": {
            "name": $scope.data.thisRecord.name,
            "role": value.role || null,
            "description": value.description,
            "isPrimary": false
          }, 
          "to": {
            "name": value.name,
            "role": value.role || null,
            "description": value.description,
            "isPrimary": false
          }
        }).then(function(result){
              thisRecord.entityLinks.push(result);
              thisRecord.entities.push(result);

              counter++

              if(counter == promisesLength) {
                Logger.info('All Relationships Added');
              }
        })
        .catch(function(err){

            //still need to increment
            counter++
            if(counter == promisesLength) {
                Logger.info('All Relationships Added');
            }
            
          console.log(err);
        })
    });

  })


  //execute serially to prodect relationship mismatches
  promisesLength = relatePromises.length;
  $q.serial(relatePromises)
  // .then(function(results){

  //     console.log('serial results', results);

  //     // Logger.info('Relationships Added');

  //     //  //TODO - FIGURE OUT BEST FLOW ON THIS FOR USABILITY
  //     //   thisRecord.entityLinks.push(results);
  //     //   thisRecord.entities.push(results);

  //     //   $timeout(function(){
  //     //     console.log(thisRecord);
  //     //   }, 250)

  // })
  // .catch(function(err){
  //   Logger.error('Error Creating Relationships', 'Please try again in a moment');
  //   console.log(err);
  // })


  //go ahead and close modal 
  $uibModalInstance.close();


}




  //creates relationships

  function createRelationship(item, relationship) {
  //create a relationship for this item and then reload data when finished 
  var tasks = []; 

  if($scope.data.entityType != 'Activity'){
      //this is not an activity
    tasks.push(
        function() {
          return RelationshipManager.linkEntity($scope.data.currentEntity, item, $scope.data.entityType, $scope.data.linkEntityType, 
          {
            "from": {
              "name": $scope.data.currentEntity.name,
              "description": _.get(relationship, 'value',  'Related ' + $scope.data.entityType),
              "isPrimary": false
            }, 
            "to": {
              "name": item.name,
              "description": _.get(relationship, 'value',  'Related ' + $scope.data.linkEntityType),
              "isPrimary": false
            }
          })
        }
      ); 
    }
    else {
      //this is an activity
      tasks.push(
        function() {
          return RelationshipManager.linkActivity($scope.data.currentEntity.id, item.id, $scope.data.linkEntityType, 
          {
            "activity": {
              "name": $scope.data.currentEntity.name,
              "description": _.get(relationship, 'value',  'Related ' + $scope.data.entityType),
              "isPrimary": false
            }, 
            "entity": {
              "name": item.name,
              "description": _.get(relationship, 'value',  'Related ' + $scope.data.linkEntityType),
              "isPrimary": false
            }
          })
        }
      ); 

  }; 

  $q.serial(tasks)
  .then(function(results){
      Logger.info('Relationships Added');
  }); 
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