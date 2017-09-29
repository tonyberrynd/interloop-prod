/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.settingsCompanyCtrl', [])
//declare dependencies
.controller('settingsCompanyCtrl', function(
	$scope,
	Org, 
	Logger) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {}
	$scope.data.activated = false;
	$scope.data.domains = '';

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
function save(value) {
	// handles domain parsing
	if(value == 'domains') {
		var domains = [];
		//split values into array of values
		var lines = $scope.data.domains.split('\n');
		console.log(lines);
		for(var i = 0;i < lines.length;i++){
		    //code here using lines[i] which will give you each line
		    //only pushes unique values
		    if(!_.includes(domains, lines[i])){
		    	domains.push(lines[i])
		    }
		}

		$scope.data.thisOrg.domains = domains;
	}

	//save values
	$scope.data.thisOrg
	.$save()
	.then(function(){
		Logger.info('Successfully Updated')
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
