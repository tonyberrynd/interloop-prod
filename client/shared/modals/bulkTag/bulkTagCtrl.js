/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.bulkTagCtrl', [])

//declare dependencies
.controller('bulkTagCtrl', function(
  $injector,
  $q, 
  $rootScope,
  $timeout,
  $scope,
  $uibModalInstance,
  Logger,
  RelationshipManager,
  resolvedData,
  Tag
  ) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var currentEntity = _.get(resolvedData, 'currentEntity', null);
  var query = _.get(resolvedData, 'query', null);

  //data
  //----------------------
  $scope.data = {}
  $scope.data.processing = false;
  $scope.data.selectedTag = null;
  $scope.data.newTag = null;
  $scope.data.tagType = 'existing';
  $scope.data.disableSubmit = false;

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
  return Tag.find({"filter": {"where": {"useWith": { "inq": [currentEntity]}}}}).$promise
    .then(function(results){
      $scope.data.tags = results;
      console.log($scope.data.tags);
    })
    .catch(function(err){
      console.log(err);
      Logger.error('Error Fetching Views');
    })

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {
     $scope.data.disableSubmit = false;
    //new tag - need to create first
    if($scope.data.tagType == 'new') {

      //build new tag
      var newTag = {
        "name": $scope.data.newTag,
        "useWith": [currentEntity],
        "createdBy": {
          "firstName": $rootScope.activeUser.firstName,
          "lastName": $rootScope.activeUser.lastName
        },
        "createdOn": moment().format()
      };

      //create before starting bulk tag
      return Tag.create(newTag).$promise
        .then(function(results){
          return applyTags(results)
        })
        .catch(function(err){
          console.log(err);
        })
    //existing tag
    } else {
        return applyTags(angular.fromJson($scope.data.selectedTag));
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
  function applyTags(tag) {
    $scope.data.processing = true;
 
    var data = {
      thisQuery: query,
      thisTag: tag,
      user: $rootScope.activeuser
    }
    //creates job
    $injector.get(currentEntity).bulkTag(data).$promise
                .then(function(results){
                  Logger.info('Bulk tagging started', 'You will be notified when this job is complete');

                  $timeout(function(){
                    $scope.data.processing = false;
                    $uibModalInstance.close(results);
                  }, 250);
                })
                .catch(function(err){
                  console.log(err);
                  $scope.data.processing = false;
                  // Logger.error('Error bulk tagging', 'Please try again in a moment');
                })

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