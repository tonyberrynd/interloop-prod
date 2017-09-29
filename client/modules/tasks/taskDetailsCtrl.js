/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.taskDetailsCtrl', [])
//declare dependencies
.controller('taskDetailsCtrl', function(
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
	var shareLink = ShareLinkFactory.getShareLink('Activity', $stateParams.id);

	//data
	//----------------------
	$scope.data = {};
  $scope.data.currentTab = 1;
	$scope.data.activated = false;
  $scope.data.entityTypes = entityTypes;

  $scope.data.sidebarHistory = SidebarRouter.getHistory();

  //activity heatmap chart
  $scope.data.activityChartConfig = {

    chart: {
        type: 'heatmap',
        marginTop: 10,
        marginBottom: 20,
        plotBorderWidth: 0,
        plotBorderColor: '#FFFFFF',
        style: {
            fontFamily: 'proxima-nova',
            textTransform: 'uppercase',
            color: '#292F33'
        },
    },

    credits: {
      enabled: false
    },

    legend: {
      enabled: false
    },


    title: {
        text: null
    },

    xAxis: {
    lineWidth: 0,
    gridLineColor: "#FFFFFF",
     minorGridLineWidth: 0,
     lineColor: '#FFFFFF',   
     labels: {
         enabled: true
     },
     minorTickLength: 0,
     tickLength: 0,
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    },

    yAxis: {
      lineWidth: 0,
      gridLineColor: "#FFFFFF",
       minorGridLineWidth: 0,
       lineColor: '#FFFFFF',   
       labels: {
           enabled: true
       },
       minorTickLength: 0,
       tickLength: 0,
        categories: ['Call', 'Email', 'Meeting', 'Task', 'Custom'],
        title: null
    },

    colorAxis: {
        min: 0,
        minColor: '#fafafa',
        maxColor: Highcharts.getOptions().colors[0]
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
    },

    series: [{
        name: 'Sales per employee',
        borderWidth: 10,
        borderRadius: 8,
        borderColor: '#FFFFFF',
        data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: false,
            color: '#000000'
        }
    }]

}



  // $location.url($location.path() + "#id=" + $stateParams.id);

	//functions
	//----------------------
	$scope.isStarred = isStarred;

	//top right
    $scope.cloneItem = cloneItem;
    $scope.copyShareLink = copyShareLink;
    $scope.deleteItem = deleteItem;
    $scope.unArchiveItem = unArchiveItem;
    $scope.starUnstarItem = starUnstarItem;

    $scope.data.endOfToday = moment().endOf('day').format();

  	// action panel
    $scope.addOwner = addOwner;
    $scope.shareWith = shareWith;
  	$scope.addActivity = addActivity;
  	$scope.addNote = addNote;
  	$scope.manageTags = manageTags; 
    $scope.removeTag = removeTag;
    $scope.viewTagList = viewTagList;
  	$scope.manageRelationships = manageRelationships;
  	$scope.uploadFiles = uploadFiles;

    $scope.goTo = goTo;
    $scope.goBack = goBack;

    //files
	$scope.triggerUpload = triggerUpload;
	$scope.uploadFiles = uploadFiles;

	//details
	$scope.saveData = saveData;

  $scope.updatePrimaryCompany = updatePrimaryCompany;

      //scrolling
  $scope.scrollLeft = scrollLeft;
  $scope.scrollRight = scrollRight;

  $scope.getLookupValue = getLookupValue;
  $scope.checkIfEmpty = checkIfEmpty;



//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	console.log($stateParams.id);


	return $q.all([Activity.findOne({"filter": {"where": {"id": $stateParams.id}, "include": ["owners", "sharedWith", "entities", "items", "activities"]}}).$promise,
				   Activity.insights({'id': $stateParams.id}).$promise]
				  )
			.then(function(results){
        console.log('thisTask', results[0])
				//basic off details
				$scope.data.thisTask = results[0];
				//insights
				$scope.data.thisTask.insights = results[1];

				//get primary company
				$scope.data.thisTask.primaryCompany = RelationshipManager.getPrimary($scope.data.thisTask.entityLinks, "Company") || null;
				$scope.data.prevPrimaryCompany = $scope.data.thisTask.primaryCompany ? angular.copy($scope.data.thisTask.primaryCompany) : null;
				//set up fields
				$scope.data.fields = ActivityFields;

				//custom fields
				$scope.data.customFields = _.filter($rootScope.customFields,function(o){
                    return _.includes(o.useWith, 'Activity');
                })

				//get related entities, items
				$scope.data.thisTask.starred = SidebarActions.getStarred($scope.data.thisTask);
				$scope.data.thisTask.tags = SidebarActions.getTags($scope.data.thisTask);
				$scope.data.thisTask.files = SidebarActions.getFiles($scope.data.thisTask.items);
        $scope.data.thisTask.lastActivity = SidebarActions.getLastActivity($scope.data.thisTask.activities);
        $scope.data.thisTask.nextActivity = SidebarActions.getNextActivity($scope.data.thisTask.activities);
        $scope.data.thisTask.overdueActivities = SidebarActions.getOverdueActivities($scope.data.thisTask.activities);
        $scope.data.thisTask.upcomingActivities = SidebarActions.getUpcomingActivities($scope.data.thisTask.activities);
				$scope.data.thisTask.openActivities = SidebarActions.getOpenActivities($scope.data.thisTask.activities);
				$scope.data.thisTask.history = SidebarActions.getHistory($scope.data.thisTask.activities);

        //ensure entities are valid
        var validEntities = [];
        _.forEach($scope.data.thisTask.entities, function(entity, key){
           if(_.has(entity, 'entity')){
              validEntities.push(entity);
           }
        })
        //valid entities
        $scope.data.thisTask.entities = validEntities;


        //group activities by month
        var groupedResults = _.groupBy($scope.data.thisTask.activities, function (result) {
          return moment(result['completedDate']).startOf('month').format('MMMM')
        });

        console.log(groupedResults);

				
				//activated
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


function getLookupValue(filter, entityType, searchVal){
  return searchService.getLookupValue(filter, entityType, searchVal);
  }


function updatePrimaryCompany(){
  $state.go('app.sidebar.task.details');

  $timeout(function(){
     angular.element('#primaryCompany').focus();
  }, 150);
 
}


function primaryCompanyChanged (companyValue){
  Logger.info('Updating Activity...');

  $q.when(
     $scope.data.prevPrimaryCompany 
     ? unlinkCompany($scope.data.thisTask, $scope.data.prevPrimaryCompany, false)
     : null
  )
  //Now create new link 
  .then(function(){ 
    linkCompany($scope.data.thisTask, companyValue, true)
  }); 
}; 

//TB - TODO - Look at moving the broadcast messages into a shared factory 
function linkCompany(activity, company, updateGrid){
  return RelationshipManager.linkEntity(activity, company, "Activity", "Company",  
  {
    "from": { "name": activity.name, "description": "Primary Org", "isPrimary": true}, 
    "to" : { "name": company.name, "description": "Primary Org", "isPrimary": true}
  })
  .then(function(results){
    // console.log(results);
      $scope.data.thisTask.primaryCompany = results; 
      $scope.data.prevPrimaryCompany = results; //set new current since link was changed 
       //add this to entityLinks array of this activity
      $scope.data.thisTask.entityLinks.push(results); 
      // console.log($scope.data.thisTask);
      
      if(updateGrid){   
          // //refresh grid
          gridManager.refreshView()
          // $rootScope.$broadcast('OPP_UPDATED', {"id": activity.id}); //reload activity with changes 
          Logger.info('Activity Updated');
      }; 
  }); 
}; 

function unlinkCompany(activity, company, updateGrid) {
    //do this from company side to get back in format that matches relatedEntities 
    return RelationshipManager.unlinkEntity(activity, company, "Activity", "Company")
    .then(function(results){
      // console.log(results);
      //remove from the loaded related items - keep as chained promise 
      _.remove($scope.data.thisTask.entityLinks, {'entityId' :  company.entityId}); 
      //$rootScope.$broadcast('OPP_UPDATED', {"id": activity.id}); 
      if(updateGrid) { 
        //refresh grid
        gridManager.refreshView()
        // $rootScope.$broadcast('OPP_UPDATED', {"id": activity.id}); //reload activity with changes 
        Logger.info('Primary Company Removed');
      };
    }); 
};


function removePrimaryCompany() {
  unlinkCompany($scope.data.thisTask, $scope.data.prevPrimaryCompany, true); 
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

/*
Go to next sidebar state
*/
function goTo(entity, id){
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

   //Save data for this task 
    SidebarActions.saveData('Activity', $scope.data.thisTask, newValue)
    .then(function(results){

      console.log(results);
       // //refresh grid
       // gridManager.refreshView()

       gridManager.setData($scope.data.thisTask.id, field, newValue)

       console.log('trying to update data');

       // gridManager.updateRow($scope.data.thisTask.id, results);

    }) 

  }
}

/*
Sets Up Dates for Form so doesn't throw errors
*/
function setUpFields(fields){

	_.forEach(fields, function(value, key){
		if(value.type == 'date'){
			$scope.data.thisTask[value.field || value.key] = {
				startDate: $scope.data.thisTask[value.field || value.key] || null,
				endDate: null //have to stub but don't use all the time
			}
		}
	})

	return fields;

}


/*
Is Starred
*/
function isStarred(task) {
	return true;
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
  SidebarActions.cloneItem('Activity', $scope.data.thisTask, $scope.data.owners);
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
  SidebarActions.deleteItem('Activity', $scope.data.thisTask);
};


/*
Un-Archive Item
*/
function unArchiveItem() {
  SidebarActions.unArchiveItem('Activity', $scope.data.thisTask);
};

/*
Determine whether to star or unstar item
*/
function starUnstarItem() {
  if($scope.data.thisTask.starred) {
    unStarItem()
  } else {
    starItem()
  }
}

/*
Star item
*/
function starItem() {
  SidebarActions.starItem('Activity', $scope.data.thisTask)
  	.then(function(results){
		$scope.data.thisTask.starred = true;
	})
  .catch(function(err){
    console.log(err)
   })
}

/*
Un-Star item
*/
function unStarItem() {
  SidebarActions.unStarItem($scope.data.thisTask)
  	 .then(function(results){
  		$scope.data.thisTask.starred = false;
  	 })
     .catch(function(err){
      console.log(err)
     })
}


///////////////////////
//    ACTION PANEL   //
///////////////////////

/*
Add / Remove Owners from the task
*/
function addOwner() {
  var resolvedData = {
    entity: 'Activity',
    thisRecord: $scope.data.thisTask
  }

  var addOwnerModal = modalManager.openModal('addOwner', resolvedData)

  //after result - add / remove from UI

  addOwnerModal.result.then(function(results){
    console.log(results);
    //update this activity
    //comes back as array so need to loop through to push in properly
    _.forEach(results, function(value){
      $scope.data.thisTask.ownerLinks.push(value);
    })

  })
}

function shareWith() {

  var resolvedData = {
    entity: 'Activity',
    thisRecord: $scope.data.thisTask
  }

  var shareWithModal = modalManager.openModal('shareWith', resolvedData)

  //after result - add / remove from UI

  shareWithModal.result.then(function(results){
    //update this activity
   _.forEach(results, function(value){
      $scope.data.thisTask.shareWithLinks.push(value);
    })
  })

}


/*
Click Hidden file input to trigger file upload process
*/
function addActivity() {  
    SidebarActions.createActivity('Activity', $scope.data.thisTask)
};

/*
Click Hidden file input to trigger file upload process
*/
function addNote() {  
    SidebarActions.createNote('Activity', $scope.data.thisTask);  
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
  SidebarActions.uploadFiles('Activity', $scope.data.thisTask, files)
}

/* 
Manage Tags Modal
*/ 
function manageTags() {
  SidebarActions.manageTags('Activity', $scope.data.thisTask)
}

/* 
remove tag from entity
*/ 

function removeTag(tag) {
  //remove tag from entity
  SidebarActions.removeTag('Activity', $scope.data.thisTask, tag)
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
  SidebarActions.manageRelationships('Activity', $scope.data.thisTask, $scope.data.pickLists)
}; 


///////////////////////
// Win / Lost Modals //
///////////////////////

/*
Won Reason Modal
*/
function wonReason(value, oldValue) {
  SidebarActions.wonReason($scope.data.thisTask, value, oldValue, _.find(activityConfig.picklists, { 'name': 'wonReasons' }))
}

/*
Lost Reason Modal
*/
function lostReason(value, oldValue) {
  SidebarActions.lostReason($scope.data.thisTask, value, oldValue, _.find(activityConfig.picklists, { 'name': 'lostReasons' }))
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
