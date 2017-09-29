angular.module('interloop.factory.viewManager', [])

//TB - TODO may want to change factory name to viewManager to be consistent 

.factory('ViewManager', function($rootScope, $injector, $q, Logger, View, Appuser) {
    
    //views come back grouped in an object
    var currentViewsObject = {};

    //current view being used
    var currentView = null;

    //factory object
    var ViewManager = { 
        getThisView: getThisView,
        // getCurrentView: getCurrentView,
        // getViews: getViews, 
        // saveView: saveView, 
        // editView: editView, 
        // deleteView: deleteView, 
        setDefault: setDefault,
        clearDefault: clearDefault
    };

    return ViewManager;

    //returns current view based on either viewId or 
    function getThisView(entityType, views, viewId, query, count) {

            //no view provided
            if(viewId == 'default') {

                //set up as promise
                var defer = $q.defer();

                var defaultViewId = $rootScope.activeUser.defaultViews[entityType] || $rootScope.activeOrg.defaultViews[entityType];
                var defaultView = _.find(views, ['id', defaultViewId]);

                //org fallback - essentially all companies, all contacts, etc
                if(!defaultView) {
                    defaultView = _.find(views, ['id', $rootScope.activeOrg.defaultViews[entityType]]);
                }

                //resolve / reject promise
                if(defaultView) {
                    defer.resolve(defaultView);
                } else {
                    defer.reject('No View Found');
                }
                return defer.promise;
            }
            //dynamic query
            else if(query) {

                var defer = $q.defer();

                //build custom view
                var dynamicQueryView = {"name": "CUSTOM", "query": query, "count": count, "sum": 0, "max": 0, "avg": 0};
                //resolve view
                defer.resolve(dynamicQueryView);
                //return promise
                return defer.promise;

            } 
            //view with ID
            else { 
                //set up as promise
                var defer = $q.defer();

                 //finds view from currentViews for this entity
                var thisView = _.find(views, ['id', viewId]);

                //resolve / reject promise
                if(thisView) {
                    defer.resolve(thisView);
                } else {
                    defer.reject('No View Found');
                }
                return defer.promise;
            }
    };



    //try to parse json
    function tryParseJSON(jsonString){
        try {
                var o = JSON.parse(jsonString);
                // Handle non-exception-throwing cases:
                // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
                // but... JSON.parse(null) returns null, and typeof null === "object", 
                // so we must check for that, too. Thankfully, null is falsey, so this suffices:
                if (o && typeof o === "object") {
                    return o;
                }
            }
            catch (e) { }
        return null;  //return null since this failed 
    };

    // unpack the view from server
    function unpackView(view){
        //parse query and filter strings if they are stringified.  Need to store in Mongo 
        view.query = typeof(view.query) == 'string' ? tryParseJSON(view.query) : view.query; 
        view.filters = _.map(view.filters, function(filter){
            filter.filterString = typeof(filter.filterString) == 'string' ? JSON.parse(filter.filterString) : filter.filterString; 
            return filter; 
        })
        return view; 
    }; 

    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };



    function setDefault(view, entity){
        $rootScope.activeUser.defaultViews = $rootScope.activeUser.defaultViews || {}; 
        $rootScope.activeUser.defaultViews[entity] = view.id; 
    
        //persist to server 
        return Appuser.prototype$patchAttributes(
            { 'id': $rootScope.activeUser.id},
            { ['defaultViews.' + entity] : view.id}
        ).$promise
        .then(function (response) {
            Logger.info('Default View Set Successfully'); 
        })
        .catch(function(err){
            console.log(err);
            Logger.error('Error Setting Default View'); 
        }) 
    };  

    function clearDefault(view, entity){
        //set to null locally
        $rootScope.activeUser.defaultViews[entity] = null
        //persist to server 
        return Appuser.prototype$patchAttributes(
            { 'id': $rootScope.activeUser.id},
            { ['defaultViews.' + entity] : null}
        ).$promise
        .then(function (response) {
            Logger.info('Default View Removed')
        })
        .catch(function(err){
            console.log(err);
            Logger.error('Error Setting Default View')
        }) 
    }; 

});
