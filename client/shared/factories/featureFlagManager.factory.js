angular.module('interloop.factory.featureFlagManager', [])

.factory('featureFlagManager', function($rootScope, $q, Org, Logger, FeatureFlags) {

    var FeatureFlagManager = {
        getFeatureFlags: getFeatureFlags, 
    };

    return FeatureFlagManager;

    //////////////////////////////

    function getFeatureFlags(orgId, userType) {


        return Org.featureFlags({
                'id': orgId
                })
                .$promise
                .then(function(results){

                    //JB TODO - Filter Out Feature Flags By User Edition Type

                    return results;
                })
                .catch(function(err){
                    Logger.error('Error Fetching Config Data', 'Please Refresh Your Browser');
                    return [];
                })
    }

}); 