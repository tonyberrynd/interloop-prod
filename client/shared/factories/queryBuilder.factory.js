angular.module('interloop.factory.queryBuilder', [])

.factory('QueryBuilder', function($log, $uibModal, $q, $http, BASE, searchEntities, entityTypes) {

    var queryBuilder = {
        buildQuery: buildQuery
    };

    return queryBuilder;

    ////////


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // WARNING - WHEN BUILDING DATE TIME QUERIES        //
    // USE BETWEEN VS AND (GT ? LT)                     //
    // MONGO MATCH NEEDS BETWEEN TO PARSE CORRECTLY     //
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    function buildQuery(currentQuery, filters, matchType) {

        console.log(filters);

        //will accumulate the various parts
        var queryParts = [];
        

    
        //loop through each filter
        _.forEach(filters, function(filter){

            //filter types
            switch(filter.type) {
                case 'is':
                    queryParts.push({ [filter.key]: filter.value });
                    break;
                case 'is-not':
                    queryParts.push({ [filter.key]: { "neq":  filter.value } });
                    break;
                case 'contains':
                    queryParts.push({"or": [{ [filter.key]: {"regexp": _.upperFirst(filter.value) }}, { [filter.key]: {"regexp": _.lowerCase(filter.value)}} ]});
                    break; 
                case 'does-not-contain':
                    queryParts.push({"and": [{ [filter.key]: { "regexp": '^((?!' + _.upperFirst(filter.value) + ').)*$'}}, { [filter.key]: {"regexp": '^((?!' + _.lowerCase(filter.value) + ').)*$'}} ]});
                    break;
                case 'includes':
                    queryParts.push({ [filter.key + ".value"]: { "inq": filter.value}});
                    break;
                case 'does-not-include':
                    queryParts.push({ [filter.key]: { "nin": filter.value}});
                    break;
                //unkown / no value
                case 'is-unknown':
                    queryParts.push({ "or": [{ [filter.key]: { "exists": false }}, { [filter.key]: null}, { [filter.key]: '' }]});
                    break;
                case 'has-any-value':
                    queryParts.push({ "and": [{ [filter.key]: { "exists": true }}, { [filter.key]: { "neq":  null }}, { [filter.key]: { "neq":  '' }}]});
                    break;
                // numbers / currency    
                case 'range':
                    queryParts.push({ [filter.key]: {"between": [ filter.value['lower'], filter.value['upper'] ]  } });
                    break;
                case 'greater-than':
                    queryParts.push({ [filter.key]: {"gt": filter.value }});
                    break;
                case 'less-than':
                    queryParts.push({ [filter.key]: {"lt": filter.value }});
                    break;

                //dynamic days filter
                // gt and lt are opposite becuase rear view mirror approach to volume (ie LT 5 Days would be gt (today - 5 days)) 
                case 'dynamic-days-range':
                    queryParts.push({ [filter.dynamicKey]: {"between": [moment().subtract(filter.value['upper'], 'day').format(), moment().subtract(filter.value['lower'], 'day').format()]  } });
                    break;
                case 'dynamic-days-greater-than':
                    queryParts.push({ [filter.dynamicKey]: {"lt": moment().subtract(filter.value, 'day').format() }});
                    break;
                case 'dynamic-days-less-than':
                    queryParts.push({ [filter.dynamicKey]: {"gt": moment().subtract(filter.value, 'day').format() }});
                    break;

                //category
                //---------------------
                case 'category-includes':
                    queryParts.push({ [filter.key + ".value"]: { "in": _.map(filter.value, 'value') }});
                break; 

                //boolean
                //---------------------
                case 'boolean':
                      queryParts.push({ [filter.key]: filter.value });   
                break; 

                //Lookup
                //---------------------
                case 'value-contains':
                   if(filter.key == 'owners'){
                        queryParts.push({"ownerLinks.ownerId": {"in": _.map(filter.value, 'id')}})
                   }
                   else if(filter.key == 'primaryCompany'){
                        var query = {"or": []}
                        _.forEach(_.map(filter.value, 'id'), function(companyId){
                            query.or.push({ "entityLinks": {"elemMatch": { "entityId": companyId, "entityType": "Company", "isPrimary":true }}})
                        })

                        queryParts.push(query)
                   }
                   else if(filter.key == 'tags'){
                         var query = {"or": []}

                        _.forEach(_.map(filter.value, 'id'), function(tagId){
                            query.or.push({ "itemLinks": {"elemMatch": { "itemId": tagId, "itemType": "Tag" }}})
                        })

                        queryParts.push(query)
                   }
                   //probably custom field multi select - sits at top level
                   else {
                        queryParts.push({[filter.key]: {"in": _.map(filter.value, 'key')}})
                   }
                    break;
                case 'value-does-not-contain':
                    if(filter.key == 'owners'){
                        var query = {"or": []}
                        _.forEach(_.map(filter.value, 'id'), function(ownerId){
                            query.or.push({"ownerLinks.ownerId": {"ne": ownerId }})
                        })

                        queryParts.push(query)
                   }
                   else if(filter.key == 'primaryCompany'){
                        var query = {"or": []}
                        _.forEach(_.map(filter.value, 'id'), function(companyId){
                            query.or.push({"entityLinks.entityId": {"ne": companyId }})
                        })

                        queryParts.push(query)
                   }
                   else if(filter.key == 'tags'){
                        var query = {"or": []}
                        _.forEach(_.map(filter.value, 'id'), function(tagId){
                            query.or.push({"itemLinks.itemId": {"ne": tagId }})
                        })

                        queryParts.push(query)
                   }
                   //probably custom field multi select - sits at top level
                   else {
                        var query = {"or": []}
                        _.forEach(_.map(filter.value, 'id'), function(itemId){
                            query.or.push({[filter.key]: {"ne": itemId }})
                        })

                        queryParts.push(query)
                   }
                    break; 


                //Relative Dates
                //---------------------
                case 'date-less-than':
                    if(filter.value['timeframe'] == 'ago') {
                        queryParts.push({[filter.key]: {"between": [moment().subtract(filter.value['days'], 'day').startOf('day').toISOString(), moment().endOf('day').toISOString()] } })
                        // queryParts.push({[filter.key]: {"gt": moment().subtract(filter.value['days'], 'day').startOf('day').toISOString() }}, {[filter.key]: {"lt": moment().endOf('day').toISOString() }}]})
                    } else {
                        queryParts.push({[filter.key]: {"between": [moment().startOf('day').toISOString(), moment().add(filter.value['days'], 'day').endOf('day').toISOString()] } })
                        // queryParts.push({ "and": [ {[filter.key]: {"lt": moment().add(filter.value['days'], 'day').endOf('day').toISOString() }}, {[filter.key]: {"gt": moment().startOf('day').toISOString() }}]})
                    }
                    break;
                case 'date-exactly':
                    if(filter.value['timeframe'] == 'ago') {
                        queryParts.push({[filter.key]: {"between": [moment().subtract(filter.value['days'], 'day').startOf('day').toISOString(), moment().subtract(filter.value['days'], 'day').endOf('day').toISOString()] } })
                        // queryParts.push({ "and": [ {[filter.key]: {"gt": moment().subtract(filter.value['days'], 'day').startOf('day').toISOString() }}, {[filter.key]: {"lt": moment().subtract(filter.value['days'], 'day').endOf('day').toISOString() }}]});
                    } else {
                        queryParts.push({[filter.key]: {"between": [moment().add(filter.value['days'], 'day').startOf('day').toISOString(), moment().add(filter.value['days'], 'day').endOf('day').toISOString()] } })
                        // queryParts.push({ "and": [ {[filter.key]: {"gt": moment().add(filter.value['days'], 'day').startOf('day').toISOString() }}, {[filter.key]: {"lt": moment().add(filter.value['days'], 'day').endOf('day').toISOString() }}]});
                    }
                    break;
                case 'date-more-than':
                    if(filter.value['timeframe'] == 'ago') {
                        queryParts.push({ [filter.key]: {"lt": moment().subtract(filter.value['days'], 'day').startOf('day').toISOString() }});
                    } else {
                        queryParts.push({ [filter.key]: {"gt": moment().add(filter.value['days'], 'day').startOf('day').toISOString() }});
                    }
                    break;

                // absolute dates
                case 'date-range':
                    queryParts.push({ [filter.key]: {"between": [moment(filter.value.startDate).toISOString(), moment(filter.value.endDate).toISOString()] } });
                    break;
                case 'date-after':
                    queryParts.push({ [filter.key]: { "gt":  moment(filter.value).toISOString() }});
                    break;
                case 'date-on':
                    queryParts.push({ "and": [ {[filter.key]: {"gt": moment(filter.value).startOf('day').toISOString() }}, {[filter.key]: {"lt": moment(filter.value).endOf('day').toISOString() }}]});
                    break;
                case 'date-before':
                    queryParts.push({ [filter.key]: {"lt": moment(filter.value).toISOString() }});
                    break;
                case 'date-is-unknown':
                    queryParts.push({ "or": [{ [filter.key]: { "exists": false }}, { [filter.key]: null}]}); //$type $6 is technically deprecated but still works in node and looks for undefined
                    break;
                case 'date-has-any-value':
                    queryParts.push({ "and": [{ [filter.key]: { "exists": true }}, { [filter.key]: { "ne":  null }}]});
                    break;


                //Related Items - Entity Links / Item Links
                //---------------------

            }
        })

        console.log('queryParts', queryParts);

        //add parts to query
        //-------------------------
        if(queryParts.length > 1) {

            //based on match type - either an 'AND' or an 'OR' type filter
            if(matchType == 'all') {
                var query = {"and": queryParts};
            } else {
                var query = {"or": queryParts};
            }
            
        } else {
          var query = queryParts[0];  
        }

        console.log('builtQuery', query);

        //return build filter
        //-------------------------
        return query;
    }

});
