angular.module('interloop.factory.pageManager', [])

.factory('pageManager', function($log, $q, $http, $injector) {

	var paginationSize = 50;

	var aggregator = [];

	var currentPage = 0;

	var currentQuery = null;

	var moreData = {
		shouldLoadMore: true
	}

    var dataManager = {
        getData: getData,
        refreshData: refreshData,
        isMoreData: isMoreData
    };

    return dataManager;

    ////////

    function getData(firstPage, entityType, currentView) {

    	//get first page of data
    	if(firstPage) {
    		currentPage = 0;
    		moreData.shouldLoadMore = true;
    	}


    	//set current query
    	currentQuery = angular.fromJson(currentView.query) || {'filter': {}};

    	//extend query to handle paging
    	currentQuery.filter['limit'] = paginationSize;
       	currentQuery.filter['skip'] = paginationSize * currentPage;

       	//sort model
       	if(currentView.sortModel && currentView.sortModel.length) {
        		//set order base value
        		currentQuery.filter['order'] = [];

        		//loop through each item
        		_.forEach(currentView.sortModel, function(value, key){
        			var sortString = value.colId + ' ' + value.sort.toUpperCase();
        			//push each sort filter into query
        			currentQuery.filter.order.push(sortString);
        		})
        }

        //run actual query
        //---------------------------------
       	var entityModel = $injector.get(entityType);
    	 return entityModel.find(currentQuery)
                            .$promise
                            .then(function(results){


                            	if(((currentPage + 1) * paginationSize) >= currentView.count) {
                            		moreData.shouldLoadMore = false;
                            	}
                               
                            	//increment page number
                            	currentPage++

                            	return _.flatten(results);
                            })
                            .catch(function(err){
                              //error getting data
                              console.log('error fetching data');

                              return [];
                            })

    }


    function refreshData(entityType, currentView) {
    	return getData(true, entityType, currentView);
    }

    function isMoreData() {
    	return moreData.shouldLoadMore;
    }

 });