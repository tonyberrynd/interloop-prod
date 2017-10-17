/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.navCtrl', [])

//declare dependencies
.controller('navCtrl', function(
	$scope,
	$state,
	$window,
	$timeout,
	$rootScope,
	$intercom,
	$mixpanel,
	hotkeys,
	configService,
	modalManager,
	searchService,
	authService,
	Notification,
	Appuser,
	ENV,
	Logger) {

// BINDABLES
//===========================================

	//vars
	//----------------------
	var currentPage = 0;

	//data
	//----------------------
	$scope.data = {};

	$scope.data.globalSearch = '';
	$scope.data.globalDropdownOpen = true;
	$scope.data.results = {};

	$scope.data.gotNotifications = false;


	//functions
	//----------------------
	//sidebar
	$scope.openTo = openTo;

	//search
	$scope.search = search;
	$scope.searchScore = searchScore;
	$scope.focusResult = focusResult;

	//notifications
	$scope.getNotifications = getNotifications;
	$scope.checkNotifications = checkNotifications;

	//new items
	$scope.submitForecast = submitForecast;
	$scope.newActivity = newActivity;
	$scope.newOpportunity = newOpportunity;
	$scope.newContact = newContact;
	$scope.newCompany = newCompany;

	$scope.newTask = newTask;
	$scope.logCall = logCall;
	$scope.newMeeting = newMeeting;

	//help menu
	$scope.keyboardShortcuts = keyboardShortcuts;
	$scope.contactSupport = contactSupport;

	//more options
	$scope.logout = logout; 

	//show agenda
	$scope.showAgenda = showAgenda;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

//Global Search
//----------------------
/*
Open to Sidebar State
*/
function openTo(state, id, $event) {

	//needed to prevent dropdown from acting weirdly
	if($event){
	    $event.stopPropagation(); 
	}
    //clear global search
    $scope.data.globalSearch = '';
	// console.log('open to');
	$state.go(state, {"id": id});
	//open sidebar after navigating to state
	$timeout(function(){
		$rootScope.sidePanelOpen = true;	
	}, 100)
}


/*
Check Notifications
*/
function checkNotifications() {
	console.log('should check notifications');
	//already check on page load - new notifications will be pushed directly into the notifications array
	//this will
	if($scope.data.gotNotifications && $rootScope.unreadNotifications == 0){
		return
	} else {
		getNotifications();
	}
}


/*
Retrieves Notifications
*/
function getNotifications() {
	return Appuser.notifications({"id": $rootScope.activeUser.id, "options": null, "filter": {"order":"createdOn DESC", "limit": 15}}).$promise
		.then(function(results){
			$scope.data.notifications = results;
			console.log($scope.data.notifications);
			//keeps app from constantly polling for notifications
			$scope.data.gotNotifications = true;
			//stops loading indicator
			$scope.data.notificationsLoaded = true;


			//Mark Each as read after 2 seconds
			//---------------------------------
			var mappedIds = _.map(_.filter($scope.data.notifications, ['read', false]), 'id');
			console.log('mapped ids', mappedIds);
			//only do this if unread notifications 
			if(mappedIds.length){
				$timeout(function(){
					Notification.updateAll({"where": {"id": {"inq": mappedIds}}}, {"read": true}).$promise
						.then(function(results){
							console.log('Marked Notification as Read')
							$rootScope.unreadNotifications = 0;
						})
						.catch(function(err){
							console.log(err);
						})
				}, 2000)
			}
			
		})
		.catch(function(err){
			console.log(err);
		})
}

/*
Allows search results to be keyed into
*/
function search() {

	$scope.data.globalDropdownOpen = true;
	$scope.data.searchLoading = true;

	//perform search action
	searchService.globalSearch($scope.data.globalSearch, true)
		.then(function(results){
			console.log(results);
			//prevents flashing
			$timeout(function(){
				$scope.data.searchLoading = false;
				$scope.data.searchResults = results;
				$scope.data.resultsCount = _.flattenDeep(_.map(results, 'results')).length;

			}, 250)
		})
		.catch(function(err){
			console.log('error searching');
			console.log(err);
		})

}

/*
Show Agenda
*/
function showAgenda(){
	$state.go('app.sidebar.agenda');

	//open sidebar after navigating to state
	$timeout(function(){
		$rootScope.sidePanelOpen = true;	
	}, 100)
}

/*
Search Score
*/
function searchScore(result) {
    return result.score >= 15;
};

/*
Allows search results to be keyed into
*/
function focusResult($event) {

	//listen for down arrow
	if ($event.keyCode == 40) {
		$event.preventDefault();
	    $event.stopPropagation();

	    //first results
	    var firstResult = $window.document.getElementById( 'globalSearchResults' ).getElementsByTagName( 'li' )[0].getElementsByTagName( 'a' )[0];

	    console.log(firstResult);

	    //if item - focus
	    if(firstResult) {
	    	firstResult.focus();
	    }
	} 
	// enter
	else if($event.keyCode == 13 && $scope.data.globalSearch) {
		//close dropdown
		$scope.data.globalDropdownOpen = false;
		//go to search results page
		$state.go('app.search', {'q': $scope.data.globalSearch});

	}
}


//new items
//-----------------------

function newActivity() {
	$mixpanel.track('NEW_ACTIVITY_MODAL');
	var newActivityModal = modalManager.openModal('newActivity')
}

function newTask() {
	$mixpanel.track('NEW_MEETINGS_MODAL');
	var newTaskModal = modalManager.openModal('newTask')
}

function newMeeting() {
	$mixpanel.track('NEW_MEETINGS_MODAL');
	var newMeeting = modalManager.openModal('newMeeting')
}

function logCall() {
	$mixpanel.track('LOG_CALL_MODAL');
	var logCallModal = modalManager.openModal('logCall')
}

function submitForecast() {
	$mixpanel.track('SUBMIT_FORECAST_MODAL');
	modalManager.openModal('submitForecast');
}

function newOpportunity() {
	$mixpanel.track('NEW_OPPORTUNITY_MODAL');
	modalManager.openModal('newOpportunity');
}

function newContact() {
	$mixpanel.track('NEW_CONTACT_MODAL');
	modalManager.openModal('newContact');
}

function newCompany() {
	$mixpanel.track('NEW_COMPANY_MODAL');
	modalManager.openModal('newCompany');
}

//Help Dropdown
//-----------------------
/*
Keyboard Shortcuts
*/
function keyboardShortcuts() {
	$mixpanel.track('VIEW_SHORTCUTS');
	//launch hotkeys
	hotkeys.toggleCheatSheet()
}

/*
Toggle Sidebar
*/
function contactSupport() {
	if(ENV === 'PRODUCTION'){
		 //login event
  		$mixpanel.track('INTERCOM_SUPPORT');
  		//show intercom
		$intercom.show('showNewMessage');
	} else {
		alert('Intercom only active in production');
	}
}

/*
Logout
*/
function logout() {
  authService.logout();
}





//-------------------------------------------


// EVENTS
//===========================================
/*
logout success
*/
$scope.$on('auth_logout_success', function(event, args) {
	//shutsdown every necessary
	configService.shutDown();
});

/*
logout failure
*/
$scope.$on('auth_logout_failed', function(event, args) {
  Logger.error('Logout Failed', 'Please try again in a moment');
});
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});
