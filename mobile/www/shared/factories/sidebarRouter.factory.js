angular.module('interloop.factory.sidebarRouter', [])

.factory('SidebarRouter', function(
    $rootScope, 
    $stickyState, 
    $state, 
    $stateParams, 
    $injector, 
    $timeout, 
    $q, 
    Logger) {



    var sidebarCurrentState;
    var sidebarHistory = [];


    var SidebarRouter = {
        getSidebarBackState: getSidebarBackState,
        // backState: backState,
        pushHistory: pushHistory,
        getHistory: getHistory
    };

    return SidebarRouter;

    /////////////////////////////////////////

    function getSidebarBackState() {

        var defer = $q.defer();

        //resolve the options
        defer.resolve(sidebarHistory[sidebarHistory.length - 1]);

        return defer.promise;
    }


    //push state into sidebar history
    function pushHistory(state){

        var defer = $q.defer();

        sidebarHistory.push(state);

        //resolve the options
        defer.resolve('pushed state to history');

        return defer.promise;

    }   

    //get history as promise
    function getHistory() {

        var defer = $q.defer();

        //resolve the options
        defer.resolve(sidebarHistory);

        return defer.promise;
    }

    //removes last history item
    function removeLastHistory() {

        var defer = $q.defer();

        sidebarHistory.pop();

        //resolve the options
        defer.resolve('removed state from history');

        return defer.promise;
    }



});








