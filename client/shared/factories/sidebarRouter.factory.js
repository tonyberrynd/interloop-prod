angular.module('interloop.factory.sidebarRouter', [])

.factory('SidebarRouter', function(
    $rootScope, 
    $stickyState, 
    $state, 
    $location,
    $stateParams, 
    $injector, 
    $timeout, 
    $q, 
    Logger) {



    var sidebarCurrentState;
    var sidebarHistory = {};
        sidebarHistory.stack = [];


    var SidebarRouter = {
        openTo: openTo,
        goTo: goTo,
        goBack: goBack,
        getSidebarBackState: getSidebarBackState,
        // backState: backState,
        // pushHistory: pushHistory,
        getHistory: getHistory
    };

    return SidebarRouter;

    /////////////////////////////////////////

    function openTo(entity, id) {

        sidebarHistory.stack = [];

        var currentState = _.get($state.current, 'data.sidebarState', false) && _.includes($state.current.name, '.sidebar.') ? $state.current.name.split('.')[3] : 'insights';  // TODO _ SET DEFAULT PER ENTITY

        //opens to current sidebar state or insights
        $state.go('app.' + entity.toLowerCase() + '-details', {'id': id}, {reload: 'app.sidebar.' + entity.toLowerCase() });

            $timeout(function(){
                $rootScope.sidePanelOpen = true;
            }, 0);


        // $location.hash('#' + id);
    }


    function goTo(currentState, entity, id) {
        $state.go('app.sidebar.' + entity.toLowerCase() + '.' + 'insights', {'id': id}, {reload: 'app.sidebar.' + entity.toLowerCase() });

         sidebarHistory.stack.push({
            'entity': currentState.entity,
            'id': currentState.id
        })


    }

    function goBack() {
       var backState = getSidebarBackState()

        $state.go('app.sidebar.' + backState.entity.toLowerCase() + '.' + 'insights', {'id': backState.id}, {reload: 'app.sidebar.' + backState.entity.toLowerCase() });

       //remove last state from stack
       sidebarHistory.stack.pop();
    }

    function getSidebarBackState() {
        return sidebarHistory.stack[sidebarHistory.stack.length - 1];
    }


    // //push state into sidebar history
    // function pushHistory(state){

    //     var defer = $q.defer();

    //     sidebarHistory.stack.push(state);

    //     //resolve the options
    //     defer.resolve('pushed state to history');

    //     return defer.promise;

    // }   

    //get history as promise
    function getHistory() {
        return sidebarHistory.stack;
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








