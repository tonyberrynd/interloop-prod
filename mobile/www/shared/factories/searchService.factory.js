angular.module('interloop.factory.searchService', [])

.factory('searchService', function($log, $q, $http, $injector, BASE, searchEntities, entityTypes) {

    var searchService = {
        globalSearch: globalSearch,
        entitySearch: entitySearch
    };

    return searchService;

    ////////

    /*
    Uses Mongo $text Search to search DB
    */
    function globalSearch(query, grouped) {
      var results = {};
      var searchPromises = [];

      //push entities in promises
      //---------------------------
      _.forOwn(searchEntities, function(value, key){
        //searches across all entities

        searchPromises.push($injector.get(value.singular).search({"searchText": "" + query + ""}).$promise)
      })

      //do search
      //---------------------------
      return $q.all(searchPromises)
      .then(function(results){  

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
            var flattendResults = _.flattenDeep(_.map(results, 'data')); 
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
 

});