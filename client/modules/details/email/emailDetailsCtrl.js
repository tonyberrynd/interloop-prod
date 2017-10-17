/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.emailDetailsCtrl', [])
//declare dependencies
.controller('emailDetailsCtrl', function(
	$scope,
  $rootScope,
  $state,
  $stateParams,
  Logger,
  Appuser,
  Lightbox,
  modalManager,
  Comment,
	Attachment) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;


	//functions
	//----------------------
  $scope.previewImage = previewImage;
  $scope.addComment = addComment;
  $scope.isLiked = isLiked;
  $scope.toggleLike = toggleLike;
  $scope.saveComment = saveComment;
  $scope.deleteComment = deleteComment;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  

            $scope.data.activated = true;


}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

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
    createdBy: {
      userId: $rootScope.activeUser.id,
      firstName: $rootScope.activeUser.firstName,
      lastName: $rootScope.activeUser.lastName,
      initials: $rootScope.activeUser.initials
    }
  }

  return Attachment.comments.create({'id': $scope.data.thisFile.id}, comment).$promise
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
