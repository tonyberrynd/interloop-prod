/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.newNoteCtrl', [])

//declare dependencies
.controller('newNoteCtrl', function(
  $scope,
  $q,
  $rootScope,
  $timeout,
  $uibModalInstance,
  $document,
  searchService,
  Activity,
  RelationshipManager,
  Logger,
  resolvedData) {

// BINDABLES
//===========================================

  // vars
  //----------------------
  var entityType = _.get(resolvedData, 'entityType', null);
  var thisRecord = _.get(resolvedData, 'thisRecord', null);

  //data
  //----------------------
  $scope.data = {};
  $scope.data.note = {};

  $scope.data.people = [
   {
      "name":"Iqbal",
      "bio":"I think therefore I am",
      "imageUrl":"https://avatars0.githubusercontent.com/u/3493285?s=460"
   },
   {
      "name":"Frank",
      "bio":"Long walks in the park",
      "imageUrl":"https://avatars0.githubusercontent.com/u/207585?s=460"
   },
   {
      "name":"Suzie",
      "bio":"Icecream eater",
      "imageUrl":"http://educationalsoftware.wikispaces.com/file/view/manga_suzie.jpg/38030142/178x177/manga_suzie.jpg"
   },
   {
      "name":"Godzilla",
      "bio":"Roar!",
      "imageUrl":"http://www.badassoftheweek.com/godzilla.jpg"
   }
]

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

  $scope.products = [
    { label: 'One'},
    { label: 'Two'},
    { label: 'Three'}
]

        $scope.getPeopleText = function(item) {
            // note item.label is sent when the typedText wasn't found
            return '[~<i>' + (item.name || item.label) + '</i>]';
        };

        $scope.searchPeople = function(term) {
          console.log('searching for people', term);
            var peopleList = [];

                angular.forEach($scope.data.people, function(item) {
                    if (item.name.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
                        peopleList.push(item);
                    }
                $scope.people = peopleList;
                return $q.when(peopleList);
            });
        };

            $scope.test = function () {
               var press = jQuery.Event("keydown");
                // press.currentTarget = angular.element(document.getElementById('superNote'));
                // press.shiftKey = true;
                press.which = 20;
                press.keyCode = 20;

                angular.element(document.getElementById('superNote')).focus()

                  // var node = document.querySelector(".mention");
                  // var textNode = node.firstChild;
                  // var caret = 2; // insert caret after the 10th character say
                  // var range = document.createRange();
                  // range.setStart(textNode, caret);
                  // range.setEnd(textNode, caret);
                  // var sel = window.getSelection();
                  // sel.removeAllRanges();
                  // sel.addRange(range);

                $timeout(function(){
                  $document.triggerHandler({
                    type: 'keydown',
                    which: 64,
                    keyCode: 64,
                    shiftKey: true,
                    altKey: false,
                    ctrlKey: false,
                    metaKey: false
                  });
                  $scope.$apply();
                }, 10);

                angular.element(document.getElementById('superNote')).keydown(function(e){
                      console.log('key down', e.which);
                      console.log(e);
                      
                  });
                
            }




        $scope.keypress = function(event) {
            var select = window.getSelection().anchorNode.parentNode;
            var el = angular.element( select );

            if ( event.which === 8 && $scope.peopleList.length > 0 && el.hasClass( 'mention' ) ) {
                select.parentNode.removeChild( select );
            }
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

  //functions
  //----------------------
  $scope.lookupEntities = lookupEntities;

  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.focusTextEdit = focusTextEdit;
  $scope.getRecords = getRecords;
  $scope.addRelated = addRelated;
  $scope.removeRelated = removeRelated;
  $scope.addOwner = addOwner;
  $scope.removeOwner = removeOwner;

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
    $scope.data.note.createdBy = {
      'firstName': $rootScope.activeUser.firstName,
      'lastName': $rootScope.activeUser.lastName,
      'color': $rootScope.activeUser.color,
      'id': $rootScope.activeUser.id
    };

    $uibModalInstance.close($scope.data.note);
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