/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.configFeaturesCtrl', [])
//declare dependencies
.controller('configFeaturesCtrl', function(
	$scope,
	$timeout,
	$rootScope,
	$q,
	Logger,
	Org,
	featureFlags,
	FeatureFlags) {

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
	$scope.data.masterFeatureFlags = FeatureFlags;


	//functions
	//----------------------
	$scope.addRemoveFeatureFlag = addRemoveFeatureFlag;
	$scope.saveOrg = saveOrg;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
			return $q.all([	
				    Org.findOne().$promise,
					Org.featureFlags({'id': $rootScope.activeOrg.id}).$promise 
				])
				.then(function(results){

					$scope.data.thisOrg = results[0];

					$scope.data.orgFeatureFlags = results[1];

					//iterate through org feature flags and enabled master features flags in UI
					_.forEach($scope.data.masterFeatureFlags, function(value, key){

						var thisFeature = _.find($scope.data.orgFeatureFlags, ['key', value.key])
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

function saveOrg(){
	$scope.data.thisOrg.$save()
		.then(function(results){
			Logger.info('Save Org Default Route')
		})
		.catch(function(err){
			Logger.error('Error Updating Org Record')
		})
}

function addRemoveFeatureFlag(feature){
	if(feature.active) {

		//remove id to avoid errors
		delete feature.id;

		//update org record
		return Org.featureFlags.create({'id': $rootScope.activeOrg.id}, feature)
			.$promise
			.then(function(results){
				Logger.info('Updated Feature Flags');

				//Push into orglist
				$scope.data.orgFeatureFlags.push(results);

				//set feature falgs
				featureFlags.set($scope.data.orgFeatureFlags);
			})
			.catch(function(err){
				Logger.error('Error Updated Feature Flag', "Check Console For Error");
				console.log(err);
			})
	}
	else {

		return Org.featureFlags.destroyById({id: $rootScope.activeOrg.id, fk: feature.id})
			.$promise
			.then(function(results){
				Logger.info('Removed Feature Flag');


				//async feature flags
				return asyncFeatureFlags($scope.data.masterFeatureFlags)
					.then(function(results){
						console.log(results);
						featureFlags.set(results);
					})
					.catch(function(err){

					})

				
			})
			.catch(function(err){
				Logger.error('Error Removing Feature Flag', "Check Console For Error");
				console.log(err);
			})

	}
}


function asyncFeatureFlags(theseFeatureFlags) {
  var deferred = $q.defer();

  deferred.resolve(theseFeatureFlags);

  return deferred.promise;
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
