angular.module('interloop.factory.searchService', [])

.factory('searchService', function($log, $q, $http, $injector, BASE, searchEntities, entityTypes) {

    var searchService = {
        globalSearch: globalSearch,
        entitySearch: entitySearch,
        getLookupValue: getLookupValue
    };

    return searchService;

    ////////

    /*
    Uses Mongo $text Search to search DB
    */
    function globalSearch(query, grouped, filter) {
      var results = {};
      var searchPromises = [];
      var thisFilter = filter || {};

      //push entities in promises
      //---------------------------
      _.forOwn(searchEntities, function(value, key){
        //searches across all entities

        searchPromises.push($injector.get(value.singular).search({"searchText": "" + query + "", "searchFilter": thisFilter }).$promise)
      })

      //do search
      //---------------------------
      return $q.all(searchPromises)
      .then(function(results){  
        console.log(results);
        var searchItem = {}; 

        //group results by type
        if(grouped) {
          var searchResults = [];
          //add entityType to each result
          var index = 0;  
          _.forOwn(searchEntities, function(value, key){
            searchItem = {};
            //searches across all entities
           searchItem.entityType = value.singular;
           //set high score
           searchItem.highScore = _.max(_.map(results[index], 'score'));
           //results
           searchItem.results = results[index];
           // push object into array
           searchResults.push(searchItem);
           //increment
           index++
          })

          return  _.sortBy(searchResults, ['highScore']).reverse();

          } 
          //otherwise flatten and return
          else {

                var index = 0;  
                _.forOwn(searchEntities, function(entityType, key){
                  
                    _.forEach(results[index], function(value){
                      value.thisEntityType = entityType.singular
                    })

                 //increment
                 index++
                })

           console.log(results);

           //flatten results
            var flattendResults = _.union.apply(_, results); 
            //return flattened array of results
            return flattendResults;
          }
      });
    }


    /*
    Uses Mongo $text Search to search DB
    */
    function entitySearch(entity, query) {
      //get plural of entity
      var plural = entityTypes[entity.toLowerCase()].plural
      //get search results
       return $http({method: 'GET', url: BASE.URL + '/api/' + plural + '/search?txt=' + '"' + query + '"' })
              .then(function(response){
                return response.data;
              })
    }



    function getLookupValue(filter, entityType, searchVal){
              //Switch based on entity type
              switch(entityType) {
                case 'Contact':
                    var query = {"filter": {"where": {"or": [{"firstName": {"regexp": "/" + searchVal + "/i"}}, {"lastName": {"regexp": "/" + searchVal + "/i"}}]}, "orderBy": "firstName ASC", limit: 15}}
                    break;
                case 'Company':
                    var query = {"filter": {"where": {"name": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "name ASC", limit: 15}}
                    break;
                case 'Opportunity':
                    var query = {"filter": {"where": {"name": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "name ASC", limit: 15}}
                    break;
                case 'Appuser':
                    var query = {"filter": {"where": {"fullName": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "fullName ASC", limit: 15}}
                    break;
              }

              //protects from making unnecessary api calls
              if(searchVal){
              //then return appropriate values
              return $injector.get(entityType).find(query).$promise
                  .then(function(results){
                    console.log(results);
                    // $scope.data.lookupResults = results;
                    return results;
                  })
                  .catch(function(err){
                    console.log(err);
                  })
              }
      }
 

});