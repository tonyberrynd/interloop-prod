/* ==========================================================================
   Settings - Data Export Controller
   ========================================================================== */

angular.module('interloop.settingsAuditLogCtrl', [])
//declare dependencies
.controller('settingsAuditLogCtrl', function(
	$scope, 
	$http,
	$sce, 
	AuditLog,
	modalManager,
	Logger) {

// BINDABLES
//===========================================

	//data
	//----------------------
	 $scope.data = {};
	 $scope.data.currentPos = 0;
 	 $scope.data.currentPage = 1;
 	 $scope.data.perPage = 100;
 	 $scope.data.isLoaded = false;
 	 $scope.data.activated = false;
 	 // ip address popover
 	 $scope.data.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');

 	 
	//functions
	//----------------------
	$scope.pageChanged = pageChanged;
	$scope.showFullLog = showFullLog;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

	//get total number of logs
	AuditLog.count()
	.$promise
	.then(function(value){
		$scope.data.totalItems = value.count;
		//get logs
		return getLogs();
	})
	.catch(function(err){
		console.log('Error Retrieving Logs')
	})
	

}
//-------------------------------------------
activate()
//-------------------------------------------

// FUNCTIONS
//===========================================

/*
Get Page of Logs
*/
function getLogs(){
	//get first page of results
	AuditLog.find({filter: {limit: $scope.data.perPage, order: 'createdOn DESC', skip: $scope.data.currentPos }})
	.$promise
	.then(function(results){
		$scope.data.logs = results;
		$scope.data.activated = true;
	})	
	.catch(function(err){
		$scope.data.activated = true;
		Logger.error('Error Retrieving Logs');
	})
}

/*
Set Page
*/
function pageChanged(){
	$scope.data.activated = false;
	$scope.data.currentPos = ($scope.data.currentPage - 1) * $scope.data.perPage;

	//get next page of results
	$scope.data.logs = [];
	AuditLog.find({filter: {limit: $scope.data.perPage, order: 'createdOn DESC', skip: $scope.data.currentPos }})
	.$promise
	.then(function(results){
		$scope.data.activated = true;
		$scope.data.logs = results;
	})
	.catch(function(err){
		$scope.data.activated = true;
		Logger.error('Error Retrieving Logs');
	})
}


function showFullLog(log){

	var resolvedData = {
		id: log.id
	}

	var fullPageModal = modalManager.openModal('logDetails', resolvedData);

	//launch modal
	fullPageModal.result.then(function(result){

	}, function(){
		//cancel
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