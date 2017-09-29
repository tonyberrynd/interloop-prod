/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.contentDetailsCtrl', [])
//declare dependencies
.controller('contentDetailsCtrl', function(
	$scope,
	$rootScope,
	$stateParams,
	$q,
  $state,
  $timeout,
  $location,
  $injector,
	Logger, 
	Content,
	CustomField,
	gridManager,
	RelationshipManager,
	ContentFields,
	SidebarActions,
  SidebarRouter,
  modalManager,
  entityTypes,
	ShareLinkFactory) {

// BINDABLES
//===========================================

	//vars 
	//----------------------
	var shareLink = ShareLinkFactory.getShareLink('Content', $stateParams.id);

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


	return $q.all([Content.findOne({"filter": {"where": {"id": $stateParams.id}, "include": ["owners", "sharedWith", "entities", "items", "activities"]}}).$promise,
				   Content.insights({'id': $stateParams.id}).$promise]
				  )
			.then(function(results){
        console.log('thisContent', results[0])
				//basic off details
				$scope.data.thisContent = results[0];
				//insights
				$scope.data.thisContent.insights = results[1];

				//get primary company
				$scope.data.thisContent.primaryCompany = RelationshipManager.getPrimary($scope.data.thisContent.entityLinks, "Company") || null;
				$scope.data.prevPrimaryCompany = $scope.data.thisContent.primaryCompany ? angular.copy($scope.data.thisContent.primaryCompany) : null;
				//set up fields
				$scope.data.fields = ContentFields;

				//custom fields
				$scope.data.customFields = _.filter($rootScope.customFields,function(o){
                    return _.includes(o.useWith, 'Content');
                })

				//get related entities, items
				$scope.data.thisContent.starred = SidebarActions.getStarred($scope.data.thisContent);
				$scope.data.thisContent.tags = SidebarActions.getTags($scope.data.thisContent);
				$scope.data.thisContent.files = SidebarActions.getFiles($scope.data.thisContent.items);
        $scope.data.thisContent.lastActivity = SidebarActions.getLastActivity($scope.data.thisContent.activities);
        $scope.data.thisContent.nextActivity = SidebarActions.getNextActivity($scope.data.thisContent.activities);
        $scope.data.thisContent.overdueActivities = SidebarActions.getOverdueActivities($scope.data.thisContent.activities);
        $scope.data.thisContent.upcomingActivities = SidebarActions.getUpcomingActivities($scope.data.thisContent.activities);
				$scope.data.thisContent.openActivities = SidebarActions.getOpenActivities($scope.data.thisContent.activities);
				$scope.data.thisContent.history = SidebarActions.getHistory($scope.data.thisContent.activities);

        //ensure entities are valid
        var validEntities = [];
        _.forEach($scope.data.thisContent.entities, function(entity, key){
           if(_.has(entity, 'entity')){
              validEntities.push(entity);
           }
        })
        //valid entities
        $scope.data.thisContent.entities = validEntities;


        //group activities by month
        var groupedResults = _.groupBy($scope.data.thisContent.activities, function (result) {
          return moment(result['completedDate']).startOf('month').format('MMMM')
        });

        console.log(groupedResults);

				
				//activated
				$scope.data.activated = true;

        //monitor scroll once activated
        // monitorScroll();

			})
			.catch(function(err){
				Logger.error('Error Retrieving Content');
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
  $state.go('app.sidebar.content.details');

  $timeout(function(){
     angular.element('#primaryCompany').focus();
  }, 150);
 
}


function primaryCompanyChanged (companyValue){
  Logger.info('Updating Content...');

  $q.when(
     $scope.data.prevPrimaryCompany 
     ? unlinkCompany($scope.data.thisContent, $scope.data.prevPrimaryCompany, false)
     : null
  )
  //Now create new link 
  .then(function(){ 
    linkCompany($scope.data.thisContent, companyValue, true)
  }); 
}; 

//TB - TODO - Look at moving the broadcast messages into a shared factory 
function linkCompany(opp, company, updateGrid){
  return RelationshipManager.linkEntity(opp, company, "Content", "Company",  
  {
    "from": { "name": opp.name, "description": "Primary Org", "isPrimary": true}, 
    "to" : { "name": company.name, "description": "Primary Org", "isPrimary": true}
  })
  .then(function(results){
    // console.log(results);
      $scope.data.thisContent.primaryCompany = results; 
      $scope.data.prevPrimaryCompany = results; //set new current since link was changed 
       //add this to entityLinks array of this opp
      $scope.data.thisContent.entityLinks.push(results); 
      // console.log($scope.data.thisContent);
      
      if(updateGrid){   
          // //refresh grid
          gridManager.refreshView()
          // $rootScope.$broadcast('OPP_UPDATED', {"id": opp.id}); //reload opp with changes 
          Logger.info('Content Updated');
      }; 
  }); 
}; 

function unlinkCompany(opp, company, updateGrid) {
    //do this from company side to get back in format that matches relatedEntities 
    return RelationshipManager.unlinkEntity(opp, company, "Content", "Company")
    .then(function(results){
      // console.log(results);
      //remove from the loaded related items - keep as chained promise 
      _.remove($scope.data.thisContent.entityLinks, {'entityId' :  company.entityId}); 
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
  unlinkCompany($scope.data.thisContent, $scope.data.prevPrimaryCompany, true); 
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
  var currentState = {'entity': 'Content', 'id': $stateParams.id }
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

   //Save data for this content 
    SidebarActions.saveData('Content', $scope.data.thisContent, newValue)
    .then(function(results){

      console.log(results);
       // //refresh grid
       // gridManager.refreshView()

       gridManager.setData($scope.data.thisContent.id, field, newValue)

       console.log('trying to update data');

       // gridManager.updateRow($scope.data.thisContent.id, results);

    }) 

  }
}

/*
Sets Up Dates for Form so doesn't throw errors
*/
function setUpFields(fields){

	_.forEach(fields, function(value, key){
		if(value.type == 'date'){
			$scope.data.thisContent[value.field || value.key] = {
				startDate: $scope.data.thisContent[value.field || value.key] || null,
				endDate: null //have to stub but don't use all the time
			}
		}
	})

	return fields;

}


/*
Is Starred
*/
function isStarred(content) {
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
  SidebarActions.cloneItem('Content', $scope.data.thisContent, $scope.data.owners);
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
  SidebarActions.deleteItem('Content', $scope.data.thisContent);
};


/*
Un-Archive Item
*/
function unArchiveItem() {
  SidebarActions.unArchiveItem('Content', $scope.data.thisContent);
};

/*
Determine whether to star or unstar item
*/
function starUnstarItem() {
  if($scope.data.thisContent.starred) {
    unStarItem()
  } else {
    starItem()
  }
}

/*
Star item
*/
function starItem() {
  SidebarActions.starItem('Content', $scope.data.thisContent)
  	.then(function(results){
		$scope.data.thisContent.starred = true;
	})
  .catch(function(err){
    console.log(err)
   })
}

/*
Un-Star item
*/
function unStarItem() {
  SidebarActions.unStarItem($scope.data.thisContent)
  	 .then(function(results){
  		$scope.data.thisContent.starred = false;
  	 })
     .catch(function(err){
      console.log(err)
     })
}


///////////////////////
//    ACTION PANEL   //
///////////////////////

/*
Add / Remove Owners from the content
*/
function addOwner() {
  var resolvedData = {
    entity: 'Content',
    thisRecord: $scope.data.thisContent
  }

  var addOwnerModal = modalManager.openModal('addOwner', resolvedData)

  //after result - add / remove from UI

  addOwnerModal.result.then(function(results){
    console.log(results);
    //update this opp
    //comes back as array so need to loop through to push in properly
    _.forEach(results, function(value){
      $scope.data.thisContent.ownerLinks.push(value);
    })

  })
}

function shareWith() {

  var resolvedData = {
    entity: 'Content',
    thisRecord: $scope.data.thisContent
  }

  var shareWithModal = modalManager.openModal('shareWith', resolvedData)

  //after result - add / remove from UI

  shareWithModal.result.then(function(results){
    //update this opp
   _.forEach(results, function(value){
      $scope.data.thisContent.shareWithLinks.push(value);
    })
  })

}


/*
Click Hidden file input to trigger file upload process
*/
function addActivity() {  
    SidebarActions.createActivity('Content', $scope.data.thisContent)
};

/*
Click Hidden file input to trigger file upload process
*/
function addNote() {  
    SidebarActions.createNote('Content', $scope.data.thisContent);  
};

/*
Trigger Upload File
*/
function triggerUpload() {
	angular.element('#ContentFileUpload').trigger('click');
}

/* 
Upload Files
*/ 
function uploadFiles(files) {
  SidebarActions.uploadFiles('Content', $scope.data.thisContent, files)
}

/* 
Manage Tags Modal
*/ 
function manageTags() {
  SidebarActions.manageTags('Content', $scope.data.thisContent)
}

/* 
remove tag from entity
*/ 

function removeTag(tag) {
  //remove tag from entity
  SidebarActions.removeTag('Content', $scope.data.thisContent, tag)
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
  SidebarActions.manageRelationships('Content', $scope.data.thisContent, $scope.data.pickLists)
}; 


///////////////////////
// Win / Lost Modals //
///////////////////////

/*
Won Reason Modal
*/
function wonReason(value, oldValue) {
  SidebarActions.wonReason($scope.data.thisContent, value, oldValue, _.find(oppConfig.picklists, { 'name': 'wonReasons' }))
}

/*
Lost Reason Modal
*/
function lostReason(value, oldValue) {
  SidebarActions.lostReason($scope.data.thisContent, value, oldValue, _.find(oppConfig.picklists, { 'name': 'lostReasons' }))
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
