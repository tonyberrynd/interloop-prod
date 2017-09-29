/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configPermissionsCtrl', [])
//declare dependencies
.controller('configPermissionsCtrl', function(
	$scope,
	$timeout,
	$rootScope,
	$q,
	Logger,
	Org,
	Permissions,
	Permission) {

// BINDABLES
//===========================================

	//vars
	//----------------------
	var initializing = true;
	var thisOrg = null;


	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;

	//get list of flags from master constant
	$scope.data.masterPermissions = Permissions;


	//functions
	//----------------------
	$scope.addRemovePermission = addRemovePermission;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
			return Permission.find()
				.$promise
				.then(function(results){

					$scope.data.orgPermissions = results;

					//iterate through org permission flags and enabled master permissions flags in UI
					_.forEach($scope.data.masterPermissions, function(value, key){

						var thisFeature = _.find($scope.data.orgPermissions, ['key', value.key])
						//add attributes if turned on
						if(thisFeature){
								value.active = true;
								value.id = thisFeature.id //pass over id
						}
					})

					//view loaded
					$scope.data.activated = true;
				})
				.catch(function(err){
					console.log('error fetching org record')
					console.log(err);
				})
	
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function addRemovePermission(thisPermission){
	if(thisPermission.active) {

		//remove id to avoid errors
		delete thisPermission.id;

		//update org record
		return Permission.create(thisPermission)
			.$promise
			.then(function(results){
				Logger.info('Added Permission');

				//Push into orglist
				$scope.data.orgPermissions.push(results);
			})
			.catch(function(err){
				Logger.error('Error Adding Permission', "Check Console For Error");
				console.log(err);
			})
	}
	else {

		return Permission.deleteById({'id': thisPermission.id})
			.$promise
			.then(function(results){
				Logger.info('Removed Permission');
				
			})
			.catch(function(err){
				Logger.error('Error Removing Feature Flag', "Check Console For Error");
				console.log(err);
			})

	}
}


// function asyncPermissions(thesePermissions) {
//   var deferred = $q.defer();

//   deferred.resolve(thesePermissions);

//   return deferred.promise;
// }

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
//-------------------------------------------

});
