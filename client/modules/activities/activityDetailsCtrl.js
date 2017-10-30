/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.activityDetailsCtrl', [])
//declare dependencies
.controller('activityDetailsCtrl', function(
  $scope,
  $rootScope,
  $stateParams,
  $q,
  $state,
  $timeout,
  $location,
  $injector,
  Logger, 
  Activity,
  CustomField,
  gridManager,
  Lightbox,
  RelationshipManager,
  ActivityFields,
  SidebarActions,
  SidebarRouter,
  modalManager,
  entityTypes,
  ShareLinkFactory) {

// BINDABLES
//===========================================

  //vars 
  //----------------------
  var initializing = true;
  var initFilters = true;
  var viewFilters = null;
  var query = $location.search().query || null;
  var count = $location.search().count || 0;
  var backUrl = $location.search().backUrl || null;
  var oppId = $location.search().id || null;
  var shareLink = ShareLinkFactory.getShareLink('Activity', $stateParams.id);

  //data
  //----------------------
  $scope.data = {};
  $scope.data.activated = false;
  $scope.data.copyUrl = shareLink;
  $scope.data.currentEntity = 'Activity';
  $scope.data.currentTab = 2;
  $scope.data.endOfToday = moment().endOf('day').format();
  $scope.data.entityTypes = entityTypes;
  $scope.data.historyFilter = 'all';
  $scope.data.sidebarHistory = SidebarRouter.getHistory();


  //functions
  //----------------------
  $scope.addActivity = addActivity;
  $scope.addNote = addNote;
  $scope.isStarred = isStarred;
  $scope.manageRelationships = manageRelationships;
  $scope.manageTags = manageTags; 
  $scope.saveData = saveData;
  $scope.triggerUpload = triggerUpload;
  $scope.uploadFiles = uploadFiles;
  $scope.addMeeting = addMeeting;
  $scope.addOwner = addOwner;
  $scope.addTask = addTask;
  $scope.checkIfEmpty = checkIfEmpty;
  $scope.cloneItem = cloneItem;
  $scope.copyShareLink = copyShareLink;
  $scope.deleteItem = deleteItem;
  $scope.fileDetails = fileDetails;
  $scope.getLookupValue = getLookupValue;
  $scope.goBack = goBack;
  $scope.goTo = goTo;
  $scope.isOwner = isOwner;
  $scope.logCall = logCall;
  $scope.percentComplete = percentComplete;
  $scope.previewImage = previewImage;
  $scope.primaryCompanyName = primaryCompanyName;
  $scope.refresh = refresh;
  $scope.removeTag = removeTag;
  $scope.scrollLeft = scrollLeft;
  $scope.scrollRight = scrollRight;
  $scope.shareWith = shareWith;
  $scope.starUnstarItem = starUnstarItem;
  $scope.unArchiveItem = unArchiveItem;
  $scope.updatePrimaryCompany = updatePrimaryCompany;
  $scope.viewRelationship = viewRelationship;
  $scope.viewTagList = viewTagList;
  $scope.toggleActivity = toggleActivity;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  // console.log($stateParams.id);


  return Activity.findOne({"filter": {"where": {"id": $stateParams.id}, "include": ["owners", "sharedWith", "entities", "items"], "deleted": true}}).$promise
      .then(function(results){
        console.log('thisOpp', results)
        //basic off details
        $scope.data.thisRecord = results;

        //get primary company
        $scope.data.thisRecord.primaryCompany = RelationshipManager.getPrimary($scope.data.thisRecord.entityLinks, "Company") || null;
        $scope.data.prevPrimaryCompany = $scope.data.thisRecord.primaryCompany ? angular.copy($scope.data.thisRecord.primaryCompany) : null;
        //set up fields
        $scope.data.fields = ActivityFields;

        //custom fields
        $scope.data.customFields = _.filter($rootScope.customFields,function(o){
                    return _.includes(o.useWith, 'Activity');
                })

        //get related entities, items
        $scope.data.thisRecord.starred = SidebarActions.getStarred($scope.data.thisRecord);
        $scope.data.thisRecord.tags = SidebarActions.getTags($scope.data.thisRecord);
        $scope.data.thisRecord.files = SidebarActions.getFiles($scope.data.thisRecord.items);
        $scope.data.thisRecord.lastActivity = SidebarActions.getLastActivity($scope.data.thisRecord.activities);
        $scope.data.thisRecord.nextActivity = SidebarActions.getNextActivity($scope.data.thisRecord.activities);
        $scope.data.thisRecord.overdueActivities = SidebarActions.getOverdueActivities($scope.data.thisRecord.activities);
        $scope.data.thisRecord.upcomingActivities = SidebarActions.getUpcomingActivities($scope.data.thisRecord.activities);
        console.log('upcoming activities', $scope.data.thisRecord.upcomingActivities);
        $scope.data.thisRecord.openActivities = SidebarActions.getOpenActivities($scope.data.thisRecord.activities);
        $scope.data.thisRecord.history = SidebarActions.getHistory($scope.data.thisRecord.activities);

        //ensure entities are valid
        var validEntities = [];
        _.forEach($scope.data.thisRecord.entities, function(entity, key){
           if(_.has(entity, 'entity')){
              validEntities.push(entity);
           }
        })
        //valid entities
        $scope.data.thisRecord.entities = validEntities;


        //group activities by month
        var groupedResults = _.groupBy($scope.data.thisRecord.activities, function (result) {
          return moment(result['completedDate']).startOf('month').format('MMMM')
        });

        //set score knob options
        $scope.data.options = {
            width: 50,
            height:50,
            fgColor: getScoreColor($scope.data.thisRecord.smartScore),
            skin: "tron",
            thickness: .15,
            // angleArc: 250,
            // angleOffset: -125,
            font: "proxima-nova",
            fontWeight: 400,
            displayPrevious: true,
            readOnly: true
        }

        //expand collapse related and activity collpases based on whether there are values
        //--------------------------
        _.forEach($scope.data.entityTypes, function(value){
          var relatedRecords = _.filter($scope.data.thisRecord.entities, function(o){
            return o.entityType == value.singular;
          })
          //only expand if there is length
          if(relatedRecords.length == 0){
            value.collapsed = true;
          }
        })

        //expand collapse files
        //--------------------------
        if(!$scope.data.thisRecord.files.length) {
          $scope.data.filesCollapsed = true;
        }
        
        //activated
        //--------------------------
        $scope.data.activated = true;

          //monitor scroll once activated
          // monitorScroll();

      })
      .catch(function(err){
        Logger.error('Error Retrieving Activity');
        Logger.log(err);
        $scope.data.activated = true;
      })
}
//-------------------------------------------
//timeout allows transition to finish
$timeout(function(){
  activate()
}, 300)

//-------------------------------------------


// FUNCTIONS
//===========================================


function getScoreColor(score){
  if(score > 66) {
    return '#02B892';
  } else if(score >= 33 && score <= 66){
    return '#FFD11A';
  } else{
    return '#E02F2F';
  }

}
/*
Preview An Image
*/
function previewImage(file){
  var filesArray = [ file ];
  Lightbox.openModal(filesArray, 0);
}

/*
Test
*/
function fileDetails(id){
  $state.go('app.file-details', {'id': id})
}

/*
Checks if current user is an owner
*/
function isOwner(ownerLinks){
  console.log(ownerLinks);
  var owners = _.filter(ownerLinks, function(o){
    return o.id == $rootScope.activeUser.id;
  })

  return owners.length > 0 ? true : false;
}

/*
Calculated percentage of array of fields / basic, custom - has information
*/
function percentComplete(fields){
  var length = _.filter(fields, function(o) {return o.type !== 'divider' && !o.disabled}).length || '0';
  var complete = 0;
  _.forEach(fields, function(value){
    if(!_.isNil($scope.data.thisRecord[value.key])){
      complete++
    }
  })

  return _.toString(_.round((complete / length) * 100)) + '%';
}

function refresh(){
  activate();
}

function getLookupValue(filter, entityType, searchVal){
  return searchService.getLookupValue(filter, entityType, searchVal);
  }


function updatePrimaryCompany(){
  $state.go('app.sidebar.activity.details');

  $timeout(function(){
     angular.element('#primaryCompany').focus();
  }, 150);
 
}

function primaryCompanyName(entityLinks) {
  var primaryCompanyObj =  RelationshipManager.getPrimary(entityLinks, "Company") ;
  return _.get(primaryCompanyObj, 'name', null); 
}


function primaryCompanyChanged (companyValue){
  Logger.info('Updating Activity...');

  $q.when(
     $scope.data.prevPrimaryCompany 
     ? unlinkCompany($scope.data.thisRecord, $scope.data.prevPrimaryCompany, false)
     : null
  )
  //Now create new link 
  .then(function(){ 
    linkCompany($scope.data.thisRecord, companyValue, true)
  }); 
}; 

//TB - TODO - Look at moving the broadcast messages into a shared factory 
function linkCompany(opp, company, updateGrid){
  return RelationshipManager.linkEntity(opp, company, "Activity", "Company",  
  {
    "from": { "name": opp.name, "description": "Primary Org", "isPrimary": true}, 
    "to" : { "name": company.name, "description": "Primary Org", "isPrimary": true}
  })
  .then(function(results){
    // console.log(results);
      $scope.data.thisRecord.primaryCompany = results; 
      $scope.data.prevPrimaryCompany = results; //set new current since link was changed 
       //add this to entityLinks array of this opp
      $scope.data.thisRecord.entityLinks.push(results); 
      // console.log($scope.data.thisRecord);
      
      if(updateGrid){   
          // //refresh grid
          gridManager.refreshView()
          // $rootScope.$broadcast('OPP_UPDATED', {"id": opp.id}); //reload opp with changes 
          Logger.info('Activity Updated');
      }; 
  }); 
}; 

function unlinkCompany(opp, company, updateGrid) {
    //do this from company side to get back in format that matches relatedEntities 
    return RelationshipManager.unlinkEntity(opp, company, "Activity", "Company")
    .then(function(results){
      // console.log(results);
      //remove from the loaded related items - keep as chained promise 
      _.remove($scope.data.thisRecord.entityLinks, {'entityId' :  company.entityId}); 
      //$rootScope.$broadcast('OPP_UPDATED', {"id": opp.id}); 
      if(updateGrid) { 
        //refresh grid
        gridManager.refreshView()
        // $rootScope.$broadcast('OPP_UPDATED', {"id": opp.id}); //reload opp with changes 
        Logger.info('Primary Company Removed');
      };
    }); 
};


function removePrimaryCompany() {
  unlinkCompany($scope.data.thisRecord, $scope.data.prevPrimaryCompany, true); 
  $scope.data.primaryCompany = null; 
};

function checkCompany(company) {
  // console.log('checking company');
  if(!company) {
    removePrimaryCompany();
  }
}


function checkIfEmpty(field, value) {
  if(field == 'primaryCompany' && $scope.data.prevPrimaryCompany && value == null){
    removePrimaryCompany();
  }
}


function viewRelationship(entityLink){
  console.log('entityLink', entityLink);
  $state.go('app.relationship-details', {'parentEntityType': 'activity', 'parentEntityId': $stateParams.id, 'entityLinkId': entityLink.entityId, 'entityLink': entityLink});
}

/*
Go to next sidebar state
*/
function goTo(entity, id){
  console.log('entity', entity);
  console.log('id', id);
  //pass current state into sidebar history stack
  var currentState = {'entity': 'Activity', 'id': $stateParams.id }
  //sidebar router manages sidebar history
  SidebarRouter.goTo(currentState, entity, id );
}

function goBack() {
  SidebarRouter.goBack()
}

/*
Is Starred
*/
function saveData(field, value) {
  //build new value object
 var newValue = {}
   newValue[field] = value;

  if(field == 'primaryCompany') {
    primaryCompanyChanged(value)
  } else {

   //Save data for this activity 
    SidebarActions.saveData('Activity', $scope.data.thisRecord, newValue)
    .then(function(results){

      console.log(results);
       // //refresh grid
       // gridManager.refreshView()

       gridManager.setData($scope.data.thisRecord.id, field, newValue)

       // console.log('trying to update data');

       // gridManager.updateRow($scope.data.thisRecord.id, results);

    }) 

  }
}

/*
Sets Up Dates for Form so doesn't throw errors
*/
function setUpFields(fields){

  _.forEach(fields, function(value, key){
    if(value.type == 'date'){
      $scope.data.thisRecord[value.field || value.key] = {
        startDate: $scope.data.thisRecord[value.field || value.key] || null,
        endDate: null //have to stub but don't use all the time
      }
    }
  })

  return fields;

}


/*
Is Starred
*/
function isStarred(activity) {
  return true;
}



//toggle activity status

function toggleActivity(activity, activities){

  console.log(activity);

  if(activity.completed){

    //ensure subactivty
    activity.completed = true;
    activity.completedDate = moment().format();

    return Activity.prototype$patchAttributes({id: activity.id}, activity).$promise
    .then(function(results){
        Logger.info('Completed Task');

         var doubleLayerActivity = {
          activityId: results.activityId,
          type: 'todo',
          completed: results.completed,
          completedDate: results.completedDate,
          createdBy: results.createdBy,
          id: results.id,
          updatedOn: results.updatedOn,
          activity: activity
        }

        //push into record real time
        $scope.data.thisRecord.activities.push(doubleLayerActivity);
        $scope.data.thisRecord.activityLinks.push(doubleLayerActivity);

        //get the history so its updated
        $timeout(function(){
            //push into history
            $scope.data.thisRecord.history = SidebarActions.getHistory($scope.data.thisRecord.activities);
            //remove from open activities
            activities.splice( activities.indexOf(activity), 1 );
        }, 50)
       
    })
    .catch(function(err){
      Logger.error('Error Completing Task');
    })


  } 
}


///////////////////////
// MANAGE SCROLLING  //
///////////////////////

function scrollRight() {
  SidebarActions.scrollRight()
}

//scroll left within the tab bar
function scrollLeft() {
  SidebarActions.scrollLeft()
}

//monitor scroll and show indicators
function monitorScroll() {
 SidebarActions.monitorScroll()
}


///////////////////////
//    TOP RIGHT      //
///////////////////////
/*
Clone Item
*/
function cloneItem() {
  SidebarActions.cloneItem('Activity', $scope.data.thisRecord, $scope.data.owners);
}

/*
Copy Share Link
*/
function copyShareLink() {
 SidebarActions.copyShareLink(shareLink);
}

/*
Delete Opp - Soft Deletes activity
*/
function deleteItem() {
  SidebarActions.deleteItem('Activity', $scope.data.thisRecord)
};


/*
Un-Archive Item
*/
function unArchiveItem() {
  SidebarActions.unArchiveItem('Activity', $scope.data.thisRecord);
};

/*
Determine whether to star or unstar item
*/
function starUnstarItem() {
  if($scope.data.thisRecord.starred) {
    unStarItem()
  } else {
    starItem()
  }
}

/*
Star item
*/
function starItem() {
  SidebarActions.starItem('Activity', $scope.data.thisRecord)
    .then(function(results){
    $scope.data.thisRecord.starred = true;
  })
  .catch(function(err){
    console.log(err)
   })
}

/*
Un-Star item
*/
function unStarItem() {
  SidebarActions.unStarItem($scope.data.thisRecord)
     .then(function(results){
      $scope.data.thisRecord.starred = false;
     })
     .catch(function(err){
      console.log(err)
     })
}


///////////////////////
//    ACTION PANEL   //
///////////////////////

/*
Add / Remove Owners from the activity
*/
function addOwner() {
  var resolvedData = {
    entity: 'Activity',
    thisRecord: $scope.data.thisRecord
  }

  var addOwnerModal = modalManager.openModal('addOwners', resolvedData)

  //after result - add / remove from UI

  addOwnerModal.result.then(function(results){
    // console.log(results);
    //update this opp
    //comes back as array so need to loop through to push in properly
    _.forEach(results, function(value){
      $scope.data.thisRecord.ownerLinks.push(value);
      $scope.data.thisRecord.owners.push(value);
    })

  })
}

function shareWith() {

  var resolvedData = {
    entity: 'Activity',
    thisRecord: $scope.data.thisRecord
  }

  var shareWithModal = modalManager.openModal('shareWith', resolvedData)

  //after result - add / remove from UI

  shareWithModal.result.then(function(results){
    //update this opp
   _.forEach(results, function(value){
      $scope.data.thisRecord.sharedWithLinks.push(value);
      $scope.data.thisRecord.sharedWith.push(value);
    })
  })

}

/*
Log call
*/
function logCall() {  
    SidebarActions.logCall('Activity', $scope.data.thisRecord)
};


/*
New Task
*/
function addTask() {  
    SidebarActions.createTask('Activity', $scope.data.thisRecord)
};

/*
Create New Custom Activity
*/
function addActivity(activityType){
  SidebarActions.createActivity('Activity', $scope.data.thisRecord, activityType);
}

/*
Add Meetings
*/
function addMeeting() {  
    SidebarActions.createMeeting('Activity', $scope.data.thisRecord)
};

/*
Add Activity
*/
function addActivity() {  
    SidebarActions.createActivity('Activity', $scope.data.thisRecord)
};

/*
Click Hidden file input to trigger file upload process
*/
function addNote() {  
    SidebarActions.createNote('Activity', $scope.data.thisRecord)
};

/*
Trigger Upload File
*/
function triggerUpload() {
  angular.element('#ActivityFileUpload').trigger('click');
}

/* 
Upload Files
*/ 
function uploadFiles(files) {
  SidebarActions.uploadFiles('Activity', $scope.data.thisRecord, files)
}

/* 
Manage Tags Modal
*/ 
function manageTags() {
  SidebarActions.manageTags('Activity', $scope.data.thisRecord)
}

/* 
remove tag from entity
*/ 

function removeTag(tag) {
  //remove tag from entity
  SidebarActions.removeTag('Activity', $scope.data.thisRecord, tag)
}

/* 
View Tag List
*/ 
function viewTagList(entityType, tag){
  //close sidebar
  $rootScope.sidePanelOpen = false;
  //query param to be passed
  var strParam = '{"filter": {"where": {"and": [{"itemLinks.itemType": {"inq": ["Tag"]}}, {"itemLinks.name":"' + tag.name + '"}]}}}';
  //entity plural
  var entityPlural = entityTypes[entityType.toLowerCase()].plural;
  //go to dyanmic query location
  $location.url("/" + entityPlural.toLowerCase() + "/view/query?query=" + strParam + '&count=' + tag.count + '&backUrl=' + $location.url());
}

/*
Relate Entity Wizard
*/
function manageRelationships() {
  SidebarActions.manageRelationships('Activity', $scope.data.thisRecord, $scope.data.pickLists)
}; 


///////////////////////
// Win / Lost Modals //
///////////////////////

/*
Won Reason Modal
*/
function wonReason(value, oldValue) {
  SidebarActions.wonReason($scope.data.thisRecord, value, oldValue, _.find(oppConfig.picklists, { 'name': 'wonReasons' }))
}

/*
Lost Reason Modal
*/
function lostReason(value, oldValue) {
  SidebarActions.lostReason($scope.data.thisRecord, value, oldValue, _.find(oppConfig.picklists, { 'name': 'lostReasons' }))
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
