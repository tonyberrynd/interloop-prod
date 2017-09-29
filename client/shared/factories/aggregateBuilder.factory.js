angular.module('interloop.factory.aggregateBuilder', [])

.factory('aggregateBuilder', function($log, $uibModal, $q, $http, BASE, $injector, searchEntities, entityTypes) {

    var aggregateBuilder = {
        buildAggregate: buildAggregate
    };

    return aggregateBuilder;

    ////////


    function buildAggregate(ingredients) {

        
        var aggregate = {};

        //return build filter
        //-------------------------
        return aggregate;
    }

});
