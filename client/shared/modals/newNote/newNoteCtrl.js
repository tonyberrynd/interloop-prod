/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.newNoteCtrl', [])

//declare dependencies
.controller('newNoteCtrl', function(
  $scope,
  $uibModalInstance,
  $document,
  searchService,
  Activity,
  Logger,
  resolvedData) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var thisEntity =

  //data
  //----------------------
  $scope.data = {};
  $scope.data.note = {};

  //functions
  //----------------------
  $scope.lookupEntities = lookupEntities;

  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.focusTextEdit = focusTextEdit;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  function lookupEntities(query) {
    return searchService.globalSearch(query)
          .then(function(results){
            $scope.data.results = results;
        })
  };


  function focusTextEdit(event){
    // console.log(event);
    // if(event.keyCode === 9) {
    //   console.log('should focus');
    //   angular.element(document.getElementById('Trix-Editor')).focus();
    // }
  }

  function ok() {
    //ensure this is set to true - might want to move some of this server side
    $scope.data.note.type = 'note';
    $scope.data.note.completed = true;
    $scope.data.note.completedDate = moment().format();

    return Activity.create($scope.data.note).$promise
            .then(function(results){
              console.log(results);
              Logger.info('Note Created Successfully');
              //will be related from the sidebar actions factory
              $uibModalInstance.close(results);
            })
            .catch(function(err){
                Logger.error('Error Creating Note', 'Please Try Again in a moment');
                console.log(err);
            })
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
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