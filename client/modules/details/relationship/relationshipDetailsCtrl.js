/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.relationshipDetailsCtrl', [])
//declare dependencies
.controller('relationshipDetailsCtrl', function(
	$scope,
  $rootScope,
  $state,
  $stateParams,
  $injector,
  Logger,
  Appuser,
  Lightbox,
  modalManager,
  SidebarRouter,
  Comment) {

// BINDABLES
//===========================================
  //vars
  //---------------------
  var entityType = _.capitalize($stateParams.parentEntityType);
  var parentId = $stateParams.parentEntityId;
  var entityLink = $stateParams.entityLink;



	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;
  $scope.data.editcomment = '';

  $scope.data.entityType = entityType;
  $scope.data.entityLink = entityLink;
  $scope.data.currentEntityType = entityLink.entityType;


	//functions
	//----------------------
  $scope.previewImage = previewImage;
  $scope.addComment = addComment;
  $scope.isLiked = isLiked;
  $scope.toggleLike = toggleLike;
  $scope.saveComment = saveComment;
  $scope.deleteComment = deleteComment;

  $scope.goBack = goBack;
  $scope.goTo = goTo;

//-------------------------------------------


  
// ACTIVATE
//===========================================
function activate() {

  return $injector.get(entityLink.entityType).findOne({"filter": {"where": {"id": entityLink.entityId}, "include": ['comments']}}).$promise
          .then(function(results){
            $scope.data.thisRecord = results;
            console.log('related record', $scope.data.thisRecord);

            console.log(parentId);

            //get comments - filter only to comments relavent to this related entity
            $scope.data.comments = _.filter($scope.data.thisRecord.comments, ['threadId', parentId]);

            //make sure all comments are not in edit mode
            _.forEach($scope.data.comments, function(comment){
              comment.inEditMode = false;
            })

            $scope.data.activated = true;
          })
          .catch(function(err){
            Logger.error('Error Retrieving Record', 'Please try again in a moment')
          })


}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Go to next sidebar state
*/
function goTo(entity, id){
  console.log('entity', entity);
  console.log('id', id);
  //pass current state into sidebar history stack
  var currentState = {'entity': 'Opportunity', 'id': $stateParams.id }
  //sidebar router manages sidebar history
  SidebarRouter.goTo(currentState, entity, id );
}

function goBack(){
  $state.go('app.' + _.lowerCase(entityType) + '-details', {'id': parentId});
}

/*
Preview An Image
*/
function previewImage(file){
  var filesArray = [ file ];
  Lightbox.openModal(filesArray, 0);
}

function isLiked(comment){
  return _.has(comment, 'likes') && _.filter(comment.likes, ['userId', $rootScope.activeUser.id]).length > 0 ? true : false;
}

/*
Add a comment
*/
function addComment(){
  
  var comment = {
    body: $scope.data.newComment,
    threadId: parentId,
    createdBy: {
      userId: $rootScope.activeUser.id,
      firstName: $rootScope.activeUser.firstName,
      lastName: $rootScope.activeUser.lastName,
      initials: $rootScope.activeUser.initials
    }
  }

  return $injector.get(entityLink.entityType).comments.create({'id': entityLink.entityId}, comment).$promise
    .then(function(results){
      console.log(results);
      $scope.data.comments.push(results);
      $scope.data.newComment = '';
    })
    .catch(function(err){
      Logger.error('Error Creating Comment', 'Please Try Again in a moment');
    })
}


/*
toggle like
*/
function toggleLike(comment){
  if(_.has(comment, 'likes') && _.filter(comment.likes, ['userId', $rootScope.activeUser.id]).length > 0){
    //remove like
    comment.likes = _.filter(comment.likes, function(comment) { return comment.userId !== $rootScope.activeUser.id; });
  } else {
    comment.likes = comment.likes || [];
    //push into it
    comment.likes.push({
      userId: $rootScope.activeUser.id,
      firstName: $rootScope.activeUser.firstName,
      lastName: $rootScope.activeUser.lastName
    })
  }

  //either way save comment
  //save comment
  return Comment.prototype$patchAttributes({"id": comment.id}, comment).$promise
    .then(function(results){
      console.log('saved comment like');
    })
    .catch(function(err){
      console.log('error saving like');
    })
}


function saveComment(comment){
  //mark that is is edited
  comment.edited = true;
  comment.body = $scope.data.editComment;
  //clear out edit comment placeholder
  $scope.data.editComment = '';
  //persist to server
  return Comment.prototype$patchAttributes({"id": comment.id}, comment).$promise
    .then(function(results){
      comment.inEditMode = false;
    })
    .catch(function(err){
      Logger.error('Error Updated Comment', 'Please try again in a moment');
      comment.inEditMode = false;
    })
}


function deleteComment(comment){
  // resolvedData
  var resolvedData = {
    thisItem: 'this comment'
  }
  //confirm modal
  var confirmModal = modalManager.openModal('confirm', resolvedData);

  confirmModal.result.then(function(results){
      Comment.deleteById({'id': comment.id}).$promise
        .then(function(results){
          Logger.info('Comment Deleted');
          //remove comments
          $scope.data.comments = _.filter($scope.data.comments, function(eachComment){
            return eachComment.id !== comment.id
          });
        })
        .catch(function(err){
          Logger.error('Error to delete comment', 'Please try again in a moment');
        })
  }, function(err){
    function ignore(){}
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
