angular.module('interloop.factory.queryBuilder', [])

.factory('QueryBuilder', function($log, $uibModal, $q, $http, BASE, searchEntities, entityTypes) {

    var queryBuilder = {
        buildQuery: buildQuery
    };

    return queryBuilder;

    ////////


    function buildQuery(filters) {

        console.log(filters);

        //will accumulate the various parts
        var queryParts = [];
        

    
        //loop through each filter
        _.forOwn(filters, function(filter, key){

            //filter types
            switch(filter.type) {
                case 'is':
                    queryParts.push({ [key]: filter.value });
                    break;
                case 'is-not':
                    queryParts.push({ [key]: { "neq":  filter.value } });
                    break;
                case 'contains':
                    queryParts.push({ [key]: {"regexp": "/" + filter.value + "/i"}});
                    break; 
                case 'does-not-contain':
                    queryParts.push({ [key]: {"regexp": "^((?!" + filter.value + ").)*$"}});
                    break;
                case 'includes':
                    queryParts.push({ [key + ".value"]: { "inq": filter.value}});
                    break;
                case 'does-not-include':
                    queryParts.push({ [key]: { "nin": filter.value}});
                    break;
                case 'is-unknown':
                    queryParts.push({ "or": [{ [key]: { "exists": false }}, { [key]: null}, { [key]: '' }]});
                    break;
                case 'has-any-value':
                    queryParts.push({ [key]: { "neq":  null } });
                    break;
                case 'range':
                    queryParts.push({ "and": [ {[key]: {"gt": filter.value }}, {[key]: {"lt": filter.value }}]});
                    break;
                case 'greater-than':
                    queryParts.push({ [key]: {"gt": filter.value }});
                    break;
                case 'less-than':
                    queryParts.push({ [key]: {"lt": filter.value }});
                    break;
            }
        })

        //add parts to query
        //-------------------------
        if(queryParts.length > 1) {
            var query = {"and": queryParts};
        } else {
          var query = queryParts[0];  
        }

        console.log('builtQuery', query);

        //return build filter
        //-------------------------
        return query;
    }

});
