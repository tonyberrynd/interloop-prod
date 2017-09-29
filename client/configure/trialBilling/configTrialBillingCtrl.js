/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configTrialBillingCtrl', [])
//declare dependencies
.controller('configTrialBillingCtrl', function(
	$scope,
	$rootScope,
	$timeout,
	Logger,
	Org) {

// BINDABLES
//===========================================

	//vars
	//----------------------
	var initializing = true;


	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;


	//functions
	//----------------------
	$scope.save = save;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){
	return Org.findOne().$promise
			.then(function(results){
				$scope.data.thisOrg = results;

				//puts each domain on one line in the textarea
				_.forEach($scope.data.thisOrg.domains, function(value, key){
					$scope.data.domains += value.toString() + '\n';
				})

				$scope.data.activated = true;

			})
}
//-------------------------------------------
activate();


// FUNCTIONS
//===========================================

/*
Function Description
*/
function save() {

	//bind rootscope to show banner or not
	$rootScope.trialEnabled = $scope.data.thisOrg.trialEnabled;
	$rootScope.trialEndDate = $scope.data.thisOrg.trialEndDate;

	//save values
	$scope.data.thisOrg
	.$save()
	.then(function(){
		Logger.info('Successfully Updated')
	})
	.catch(function(err){
		Logger.error('Error Saving Org Details');
	})
}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
$scope.$watch('data.thisOrg.trialEndDate', function (newValue, oldValue, scope) {
    //Do anything with $scope.letters
    if(initializing) {
    	return
    } else {
   		 save();
	}
}, true);
//-------------------------------------------

});
