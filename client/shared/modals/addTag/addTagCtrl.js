/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.addTagCtrl', [])

//declare dependencies
.controller('addTagCtrl', function(
  $scope,
  $rootScope,
  $uibModalInstance,
  $timeout, 
  $q, 
  $injector,
  Opportunity,
  resolvedData,
  RelationshipManager,
  Tag,
  Appuser,
  Logger) {

// BINDABLES
//====================,=======================

  //vars
  //----------------------
  var entity = resolvedData.entity || null;
  var currentTags = resolvedData.currentTags || [];
  console.log('currentTags', currentTags);
  var initializing = true;

  //data
  //----------------------
  $scope.data = {};
  $scope.data.tagList = [];
  $scope.data.activated = false;
  $scope.data.thisRecord = angular.copy(resolvedData.thisRecord);

  $scope.data.selectedTags = _.map(currentTags, 'item') || [];
  $scope.data.selectedRelated = [];

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

  $scope.addRemoveTag = addRemoveTag;
  $scope.removeTag = removeTag;


  // $scope.addTag = addTag;
  // $scope.removeTag = removeTag;
  // $scope.checkValues = checkValues;
  // $scope.isAlreadyChosen = isAlreadyChosen;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  //find views
  return Tag.list({"entityType": entity}).$promise
    .then(function(results){
      console.log(results);
      $scope.data.tagList = results;
      $scope.data.activated = true;
      $scope.data.loading = false;
    })
    .catch(function(err){
      Logger.error('Error Fetching Tags');
      $scope.data.loading = false;
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


    /*
  Add Selected Tag
  */
  function addRemoveTag(tag){
    if(!_.find($scope.data.selectedTags, ['id', tag.id])){
           $scope.data.selectedTags.push(tag);
    } else {
      removeTag(tag);
    }
  }

  /*
  Remove Selected Tag
  */
  function removeTag(tag){
    $scope.data.selectedTags.splice($scope.data.selectedTags.indexOf(tag), 1);
  }


  // function addTag() {
  //   $scope.data.Tags.push({
  //     value: {},
  //     splitPercent: (100 - _.sum(_.map($scope.data.Tags, 'splitPercent'))),
  //     splitValue: $scope.data.thisRecord.value * (100 - _.sum(_.map($scope.data.Tags, 'splitPercent'))),
  //     splitNote: null
  //   });

  //   checkValues();
  // }


  // function removeTag(tag) {
  //   $scope.data.Tags.splice($scope.data.Tags.indexOf(tag), 1);

  //   //if only 1 tag - set back to full Tagship
  //   if($scope.data.Tags.length == 1) {
  //     $scope.data.Tags[0].splitPercent = 100;
  //     $scope.data.Tags[0].splitValue = $scope.data.thisRecord.value;
  //   }

  //   //ensure option is not disabled
  //   isAlreadyChosen();
  //   checkValues();
  // }

  // function isAlreadyChosen(user){
   
  //  _.forEach($scope.data.tagOptions, function(value, key){
  //   if(_.includes(_.map($scope.data.Tags, 'value'), value)) {
  //     value.disabled = true;
  //   } else {
  //     value.disabled = false;
  //   }
  //  })
    
  // }



  // function checkValues(tag) {

  //    //check if percentages add up
  //   if(_.sum(_.map($scope.data.Tags, 'splitPercent')) !== 100) {
  //     $scope.data.splitError = true;
  //   } else {
  //     $scope.data.splitError = false;
  //   }

  //   _.forEach($scope.data.Tags, function(value, key){
  //     value.splitValue = (value.splitPercent / 10) * ($scope.data.thisRecord.value)
  //   })

  // }

  //need to remove any non selected Tags, update any current Tags if data changes - TODO & then add some other Tags that have been selected

  function ok() {
    $scope.data.processing = true;

    var removeTags = [];
    var newTags = [];
    var tagPromises = [];

    //Tags to remove
    _.forEach(currentTags, function(value, key){
      if(!_.find($scope.data.selectedTags, ['id', value.itemId])){
        //collect new Tags to be returned to side panel
        removeTags.push(value);
        tagPromises.push(
          function() {
            return RelationshipManager.unlinkItem($scope.data.thisRecord.id, value.id, entity, "Tag")
          })
        }
    });


    //Tags to add
    _.forEach($scope.data.selectedTags, function(value, key){
      if(!_.find(currentTags, ['itemId', value.id])){
        //collect new Tags to be returned to side panel
        //need to make sure new tags reflect current user as tagger
        value.createdBy = {
          'firstName': $rootScope.activeUser.firstName,
          'lastName': $rootScope.activeUser.lastName,
          'id': $rootScope.activeUser.id
        }
        value.createdOn = moment().format();

        newTags.push(value);
        tagPromises.push(
          function() {
            return RelationshipManager.linkItem($scope.data.thisRecord.id ,value.id, entity, "Tag", {"name": value.name}) 
          })
        }
    });

  $q.serial(tagPromises)
      .then(function(results){
        Logger.info('Tags Updated')

        $scope.data.processing = false;

        $uibModalInstance.close($scope.data.selectedTags);

      })
      .catch(function(err){
        Logger.error('Error Updating Tags', 'Please Try Again in a moment')
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