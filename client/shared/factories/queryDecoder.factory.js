angular.module('interloop.factory.queryDecoder', [])

.factory('QueryDecoder', function($rootScope, $log) {

    var queryDecoder = {
        decode: decode
    };

    return queryDecoder;


    //decodes query and creates visuals for the filter bar on the left
    //Using the query to decode keeps it in sync vs tyring to rely on a seperate filter array


    function decode(fields, currentQuery) {


        // [{"fieldName": filter goes here / could be array / object / boolean etc }] 


        // break down each part of the query and then populate field with correct values
        var queryParts = currentQuery['filter'] ? currentQuery['filter']['and'] || currentQuery['filter']['or'] || [] : [];

        // //break down query
        // _.forEach(queryParts, function(part){





        // })



        // _.forEach(viewFilters, function(value, key){
        //   var field = _.find(fields, ['key', value.key]) || null;
        //   //apply to field
        //   if(field) field.filterApplied = value.type;
        //   if(field) field.filterValue = value.value;
        //   if(field) field.filterActive = true;
        // })

        return fields;
    }



});
