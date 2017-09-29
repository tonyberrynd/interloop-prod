angular.module('interloop.factory.pageManager', [])

.factory('pageManager', function($log, $q, $http, $injector) {

	var paginationSize = 50;

	var aggregator = [];

	var currentPage = 0;

	var currentQuery = null;

    var dataManager = {
        getData: getData
    };

    return dataManager;

    ////////

    function getData(firstPage, entityType, view) {

    	//get first page of data
    	if(firstPage) {
    		currentPage = 0;
    	}


    	//set current query
    	currentQuery = angular.fromJson(currentView.query) || {'filter': {}};

    	//extend query to handle paging
    	currentQuery.filter['limit'] = paginationSize;
       	currentQuery.filter['skip'] = paginationSize * currentPage;

       	var entityModel = $injector.get(entityType);
    	 return entityModel.find(view.query)
                            .$promise
                            .then(function(results){
                               
                            	//increment page number
                            	currentPage++

                            	return results;
                            })
                            .catch(function(err){
                              //error getting data
                              console.log('error fetching data');

                              return [];
                            })

    }

 });