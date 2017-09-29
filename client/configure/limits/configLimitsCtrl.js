/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configLimitsCtrl', [])
//declare dependencies
.controller('configLimitsCtrl', function(
	$scope,
	$timeout,
	$http,
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
	//json optoins
	$scope.data.options = { 
		mode: 'tree',
		change: saveChanges
	};


	//set current vlaues
	$scope.data.storageValue = 100;
	$scope.data.apiValue = 100;
	$scope.data.enrichmentValue = 100;
	$scope.data.salesforceValue = 100;
	$scope.data.twitterValue = 100;




	$scope.data.options = {
        width: 100,
        height:80,
        fgColor: "#4D96D8",
        skin: "tron",
        thickness: .1,
        angleArc: 250,
        angleOffset: -125,
        font: "proxima-nova",
        displayPrevious: true,
        readOnly: true
    }

    	$scope.data.contactOptions = {
        width: 100,
        height:80,
        fgColor: "#4D96D8",
        skin: "tron",
        thickness: .1,
        angleArc: 250,
        angleOffset: -125,
        font: "proxima-nova",
        displayPrevious: true,
        readOnly: true,
        max: 200
    }


	$scope.data.companyOptions = {
        width: 100,
        height:80,
        fgColor: "#4D96D8",
        skin: "tron",
        thickness: .1,
        angleArc: 250,
        angleOffset: -125,
        font: "proxima-nova",
        displayPrevious: true,
        readOnly: true,
        max: 200
    }




	//functions
	//----------------------


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
	return Org.findOne()
			.$promise
			.then(function(results){

				//needed to do this to remove promise stuff - was causing recursive errors
				$scope.data.orgConfig = JSON.parse(angular.toJson(results));

				$http.get('/api/enrichment-limit')
					.then(function(fullContactResult){

						//gets top values
						$scope.data.companyEnrichmentValue = _.find(fullContactResult.data.metrics, ['metricId', 'company_200']).usage;
						$scope.data.companyOptions['max'] = _.find(fullContactResult.data.metrics, ['metricId', 'company_200']).planLevel

						$scope.data.contactEnrichmentValue = _.find(fullContactResult.data.metrics, ['metricId', '200']).usage;
						$scope.data.contactOptions['max'] = _.find(fullContactResult.data.metrics, ['metricId', '200']).planLevel

						//view activated
						$scope.data.activated = true;
					})
					.catch(function(err){
						console.log(err);
						//view activated
						$scope.data.activated = true;
					})
			})
			.catch(function(err){
				console.log('error fetching org record')
				console.log(error);

				//view activated
				$scope.data.activated = true;
			})
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function saveChanges() {
	console.log($scope.data.orgConfig)

	Org.updateAttributes(
	   {id:    $scope.data.orgConfig.id},
	   $scope.data.orgConfig
	)
	.$promise
	.then(function(results){
		Logger.info('Updates Saved');
	})
	.catch(function(err){
		Logger.info('Error Saving Updates');
	})

}
//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
//-------------------------------------------

});
