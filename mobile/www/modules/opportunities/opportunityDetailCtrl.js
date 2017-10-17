/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.opportunityDetailCtrl', [])
//declare dependencies
.controller('opportunityDetailCtrl', function(
	$scope,
	$ionicHistory,
	$stateParams,
	Opportunity,
	Logger,
	RelationshipManager,
	OpportunityFields) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;

	//fields
	$scope.data.fields = OpportunityFields;

	//functions
	//----------------------
	$scope.goBack = goBack;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	return Opportunity.findById({'id': $stateParams.id}).$promise
		.then(function(results){
			$scope.data.thisOpp = results;
			//get primary company
			$scope.data.thisOpp.primaryCompanyLink = RelationshipManager.getPrimary($scope.data.thisOpp.entityLinks, "Company") || {};
			//activated
			$scope.data.activated = true;
		})
		.catch(function(err){
			// Logger.error('Error Retrieving Opportunity');
			// Logger.log(err);
			$scope.data.activated = true;
		})
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
goBack
*/
function goBack() {
	console.log('go back');
	$ionicHistory.goBack();

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
