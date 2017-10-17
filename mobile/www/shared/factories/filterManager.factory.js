angular.module('interloop.factory.searchService', [])

.factory('searchService', function($log, $uibModal, $q, $http, BASE, searchEntities, entityTypes) {

    var searchService = {
        globalSearch: globalSearch,
        entitySearch: entitySearch
    };

    return searchService;

    ////////

    /*
    Uses Mongo $text Search to search DB
    */
    function globalSearch(query) {
      var results = {};
      var searchPromises = [];

      //push entities in promises
      //---------------------------
      _.forOwn(searchEntities, function(value, key){
        //searches across all entities
        searchPromises.push($http({method: 'GET', url: BASE.URL + '/api/' + value.plural + '/search?txt=' + '"' + query + '"' }));
      })

      //do search
      //---------------------------
      return $q.all(searchPromises)
      .then(function(results){   

        //add entityType to each result
        var index = 0;  
        _.forOwn(searchEntities, function(value, key){
          //searches across all entities
         results[index].entityType = value.singular;
         index++
        })

        return results; 
      });
    }


    /*
    Uses Mongo $text Search to search DB
    */
    function entitySearch(entity, query) {
      //get plural of entity
      var plural = entityTypes[entity.toLowerCase()].plural
      //get search results
       return $http({method: 'GET', url: BASE.URL + '/api/' + plural + '/search?txt=' + query })
              .then(function(response){
                return response.data;
              })
    }
 

});