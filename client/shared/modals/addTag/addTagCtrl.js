/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.addTagCtrl', [])

//declare dependencies
.controller('addTagCtrl', function(
  $scope,
  $uibModalInstance,
  $q,
  $rootScope,
  Logger,
  Tag,
  RelationshipManager,
  resolvedData) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var entity = resolvedData.entity;
  var thisRecord = resolvedData.thisRecord;
  var currentTags = _.get(resolvedData.thisRecord, 'tags', []);

  //data
  //----------------------
  $scope.data = {}

  $scope.data.currentRecordName = entity == 'Contact' ? thisRecord.firstName + ' ' + thisRecord.lastName : thisRecord.name;

  $scope.data.selectedItems = resolvedData.selectedItems;

  $scope.data.selectedTag = null;
  $scope.data.newTag = null;

  $scope.data.tagType = 'existing';

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.shouldDisable = shouldDisable;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  //get tags for this entity
  return Tag.find({"filter": {"where": {"useWith": { "inq": [entity]}}}}).$promise
    .then(function(results){
      $scope.data.tags = results;
      console.log($scope.data.tags);
    })
    .catch(function(err){
      Logger.error('Error Fetching Views');
    })

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {
    $scope.data.processing = true;

    //new tag - need to create first
    if($scope.data.tagType == 'new') {

      var newTag = {
        "name": $scope.data.newTag,
        "useWith": [entity],
        "createdBy": {
          "firstName": $rootScope.activeUser.firstName,
          "lastName": $rootScope.activeUser.lastName
        },
        "createdOn": moment().format()
      };

      Tag.create(newTag).$promise
        .then(function(results){
          $rootScope.tagList.push(results);
          return applyTags(results)
        })
        .catch(function(err){
          console.log(err);
        })
    //existing tag
    } else {
      //checks to ensure tag is unique
      if(!_.find(currentTags, ['itemId', $scope.data.selectedTag.id])){
        return applyTags(angular.fromJson($scope.data.selectedTag));
      } else {
        Logger.info('Added Tags');
        $uibModalInstance.dismiss();
      }
    }    
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

  function shouldDisable() {

    if($scope.data.disableSubmit) {
      return true;
    }
      else {
      if($scope.data.tagType == 'existing' && $scope.data.selectedTag) {
        return false
      } 
      else if($scope.data.tagType == 'new' && $scope.data.newTag){
        return false;
      }
      else {
        return true
      }
    }
  }

    //apply tags

    //TODO - FIX THIS SHOTTY LOGIC _ CURRENTLY JUST GETTING READY FOR DPEPLOY
    //NEED TO COME BACK AND FIX
  function applyTags(tag) {
        var promises = [];

         $scope.data.disableSubmit = true;

      _.forEach([thisRecord], function(value, key){
        promises.push(linkTag(value, tag, entity))
      })

      $q.all(promises).then(function(results){
        Logger.info('Added Tags');
        $uibModalInstance.close(results);
        $scope.data.disableSubmit = false;
      }).catch(function(err){
        Logger.error('Error Tagging Records', 'Please Try Again In A Moment');
        $scope.data.disableSubmit = false;
      })
  }

    //link tag function
  function linkTag(entityItem, tagItem, entityType){
    return RelationshipManager.linkItem(entityItem.id ,tagItem.id, entityType, "Tag", {"name": tagItem.name})
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