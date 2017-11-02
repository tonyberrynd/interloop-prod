angular.module('interloop.factory.gridManager', [])

.factory('gridManager', function($rootScope, $q, $timeout, $document, $injector, $state, Appuser, searchService, View, EndFields, RelationshipManager,Logger, QueryBuilder, SidebarRouter, Activity, Opportunity) {


	// Base Variables
	//=============================================

	//DATA ELEMENTS
	//-------------------------

	//bound grid for factory
	var grid = null;

	//monitors local search and changes datasource
	var localSearch = '';

	//pagination size
	var paginationSize = 300;

	//current entityType
	var currentEntityType = null;

    //current Query
    var currentQuery = {};

    //last row for paging
    var lastRow = null;

	//Hold onto sort model to compare to previous
    var prevSortModel = null;

	//current view
	var currentView = null;

    var selectAllIncrementor = 0;

	//placeholder for selected data
	var selectedData = {
        selectAll: false,
        length: 0,
		items: []
	}

    var localSearchResultsLength = {
        value: 0
    }

    var lastSelectedId = null;

    //placeholder for all fields once concatenated together
    var allFields = null;

	//grid is initializing or not (AKA first time into a  module, example - "Opportunities")
   	var initializing = false;

    //share context
    var context = null;


	//TEMPLATE ELEMENTS
	//-------------------------

	//null cell template
	var nullCell = '<span class="null-cell">--</span>';

	//base select and star definitions inluded on every entity
	var baseDefs = [	
		//select
		{headerName: "--", 
         colId: 'select',
		 field: "select", 
		 headerClass: 'text-center', 
         headerCellRenderer: selectAllRender,
         // headerCheckboxSelection: true,
		 cellClass: 'no-padding no-row-click', 
		 headerCheckboxSelectionFilteredOnly: true, 
		 checkboxSelection: true, 
         width: 45, 
		 suppressSizeToFit: true, 
		 suppressMovable: true,
		 suppressResize: true,
		 suppressSorting: true, 
		 pinned: 'left'},

		//star
	    {headerName: "--", 
          colId: 'star',
	      field: "star", 
	      headerClass: 'text-center', 
	      cellRenderer: starRenderer,  
	      cellClass: 'no-padding no-row-click', 
	      width: 45, 
	      suppressSizeToFit: true, 
	      suppressMovable: true, 
	      suppressResize: true,
	      suppressSorting: true, 
	      pinned: 'left'},


        {headerName: "", 
          colId: 'rightPinned',
          field: "testpin", 
          headerClass: 'text-center', 
          cellRenderer: null,  
          cellClass: 'no-padding no-row-click', 
          width: 1, 
          suppressSizeToFit: true, 
          suppressMovable: true, 
          suppressResize: true,
          suppressSorting: true, 
          pinned: 'right'}
	];


    //=============================================================
    // ENTERPRISE DATASOURCE
    //=============================================================
    var EnterpriseDatasource = {

        getRows: function(params) {

            // console.log('EnterpriseDatasource.getRows: params = ', params);

            //VARS
            //-----------------------------------------
            var showDateDividers = false;
            var dateDividerField = null;

            var request = params.request;
            // the row group cols, ie teh cols that the user has dragged into the
            // 'group by' zone, eg 'Country' and 'Year'
            var rowGroupCols = request.rowGroupCols;

            // the keys we are looking at. will be empty if looking at top level (either
            // no groups, or looking at top level groups). eg ['United States','2002']
            var groupKeys = request.groupKeys;
                // console.log(groupKeys);

            // if going aggregation, contains the value columns, eg ['gold','silver','bronze']
            var valueCols = request.valueCols;

            // we are not doing sorting and filtering in this example, but if you did
            // want to sort or filter using your implementation, you would do it here.
            var filterModel = request.filterModel;
            var sortModel = request.sortModel;

            //using this workaround for now - hopefully will fix bug in ag grid and can get from params
            context = grid.api.gridOptionsWrapper.gridOptions.context || {};


            //Loading overlay on first time through
            //---------------------------------------
            if(initializing) {
                grid.api.showLoadingOverlay()
            }

            //Extend Paging
            //---------------------------------------
            currentQuery.filter['limit'] = paginationSize;
            currentQuery.filter['skip'] = params.request.startRow;

            //Columns
            //---------------------------

            //Sorting
            //---------------------------------------
            if(sortModel.length) {

                //check for date based sorts and in fill width dividers
                //right now only for activities - should this be extended?
                //=========================================
                // if(currentEntityType == 'Activity'){
                //     _.forEach(sortModel, function(value){
                //         var field = _.find(allFields, ['key', value.colId]);
                //         if(field && field.type == 'date') {
                //             showDateDividers = true;
                //             dateDividerField = value.colId;
                //         }
                //     })
                // }

        
                if(sortModel !== prevSortModel) {
                    grid.api.showLoadingOverlay()
                }

                //set previous sort model
                prevSortModel = sortModel || null;

                //set order base value
                currentQuery.filter['order'] = [];

                //loop through each item
                _.forEach(sortModel, function(value, key){



                    //Need to intercept and inject new sort query for certain columns
                    //some doesn't directly sort and need to make it work the way the user expects
                    //==========================================
                    if(currentEntityType == 'Contact' && value.colId == "fullName"){
                        if(context.nameFormat == 'firstLast') {
                             var sortString = 'firstName' + ' ' + value.sort.toUpperCase();
                        }
                        else {
                            var sortString = 'lastName' + ' ' + value.sort.toUpperCase();
                        }
                    }
                    else if(_.find(allFields, ['key', value.colId])['useSortKey']) {
                        var sortString = value.sort.toUpperCase() == 'ASC' ? _.find(allFields, ['key', value.colId])['sortKeyASC'] : _.find(allFields, ['key', value.colId])['sortKeyDESC'];
                    }
                    else {
                       var sortString = value.colId + ' ' + value.sort.toUpperCase(); 
                    }

                    //push each sort filter into query
                    currentQuery.filter.order.push(sortString);
                })
            }


              //Overlay Change History
              //---------------------------------------
              if(context.changeHistory !== 'none') {
                //turn number string into number
                var numberOfDays = Number(context.changeHistoryDuration);
                var beforeDate = moment().subtract(numberOfDays, "days").startOf("day").format();
                //extend query
                _.extend(currentQuery.filter, {"include": {
                  "relation":"changeHistories", 
                  "where": {"createdOn":{"gt": beforeDate}}}
                })
              }


              //Show Deleted Records As Well
              //---------------------------------------
              if(context.showDeleted == "true" ) {
                //extend query
                _.assignIn(currentQuery.filter, {
                    "deleted": true
                })
               } else {
                if(_.has(currentQuery.filter, 'deleted')){
                    delete currentQuery.filter.deleted
                }
              }


            //Grouping & Data
            //---------------------------------------

            //searching trumps the other types of filters / gropuing etc
            //---------------------------------------------
            if(localSearch.length > 0) {
                // console.log('local search')

                //clear any sort of selection when doing searching
                clearSelected();

                //clear groups and search
                return getSearchData(params); 
            }

            //No Groups - Regular Query
            //---------------------------------------------
            else if (rowGroupCols.length === 0) {

                //set back to 0
                localSearchResultsLength.value = 0;

                // console.log('regular data')
        
                return getRegularData(params, showDateDividers, dateDividerField);
            } 

            // otherwise if grouping, a few steps...
            //---------------------------------------------
            else {

                //set back to 0
                localSearchResultsLength.value = 0;

               return getGroups(params, rowGroupCols, groupKeys, valueCols);
                
            }

        }
    };


    function getGroups(params, rowGroupCols, groupKeys, valueCols){

            // console.log('get groups', groupKeys);

            var entityModel = $injector.get(currentEntityType);

            //first grouping - only scope down based on current query
            if(groupKeys.length == 0) {

                //if is in an array - need to unwind first
                var unwindBy = _.find(allFields, ['key', _.first(rowGroupCols).field ])['unwindBy'] || null;
                //group by this
                var groupByThis = _.first(rowGroupCols).id;
                //if first grouping - just use current query to scope what gets grouped
                var matchByThis = currentQuery.filter.where ? [ currentQuery.filter.where ] : [{}];

                // //show / dont show deleted
                // //TODO - ADD CONDITIONAL LOGIC AROUND WHETHER OR NOT TO INCLUDE DELETED
                // _.assignIn(matchByThis[0], {'_isDeleted': false});

            } else {
                var thisGroupLevel = 0;
                //only include grouping if needed
                if(rowGroupCols.length > groupKeys.length) {
                    //if is in an array - need to unwind first
                    var unwindBy = _.find(allFields, ['key', _.first(rowGroupCols).field ])['unwindBy'] || null;
                    //tells mongo aggregate which attribute to use
                    var groupByThis = rowGroupCols[groupKeys.length].id || null;
                    //group level 1 above if grouping
                    thisGroupLevel = (rowGroupCols.length - groupKeys.length) - 1;
                 }



                //first add in the current query
                var matchByThis = currentQuery.filter.where ? [ currentQuery.filter.where ] : [{}];

                // //show / dont show deleted
                // //TODO - ADD CONDITIONAL LOGIC AROUND WHETHER OR NOT TO INCLUDE DELETED
                // _.assignIn(matchByThis[0], {'_isDeleted': false});

                //loop through each key in the tree and scope down at each level
                _.forEach(groupKeys, function(value, key){
                    var thisMatchQuery = {}

                     //creates correct match query
                     // thisMatchQuery[rowGroupCols[thisGroupLevel].field + '.key'] = groupKeys[thisGroupLevel]; 

                    //lots of logic but basically just gets the key equivalent of the value passed back from ag grid since it only passes back the label
                     thisMatchQuery[rowGroupCols[thisGroupLevel].field + '.key'] = _.get(_.find(_.find(allFields, ['key', rowGroupCols[thisGroupLevel].field ]).values, ['label', groupKeys[thisGroupLevel]]), 'value', '--') || '--';

                     //pushed this match query into array of matches that will be used to 
                     //create dynamic aggregation server side
                     matchByThis.push(thisMatchQuery)
                })

            }

            //get group key and label from field defintion
            var groupByKey = (groupKeys.length == 0) ? _.find(allFields, ['key', rowGroupCols[groupKeys.length].field ]).groupByKey : null;
            var groupByLabel = (groupKeys.length == 0) ? _.find(allFields, ['key', rowGroupCols[groupKeys.length].field ]).groupByLabel : null;


            return entityModel.groupBy({'unwindBy': unwindBy, 'match': matchByThis, 'attribute': groupByKey , 'label': groupByLabel })
                    .$promise
                    .then(function(results){

                        //remove _id 
                        // _.forEach(results, function(value){
                        //     delete value._id;
                        //     value[groupByKey] = value.key || '--';
                        //     value[rowGroupCols[groupKeys.length].id + '.value'] = value.key || '--';
                        // })

                        params.successCallback(results, results.length);

                        // clear all overlays
                        grid.api.hideOverlay()
                    })
                    .catch(function(err){
                        params.failCallback(err);
                        // console.log(err);
                    })
    }


    function getRegularData(params, showDateDividers, dateDividerField){

        //show overlay
        // grid.api.showLoadingOverlay()

        var entityModel = $injector.get(currentEntityType);

        //add in excludes for performance
        if($injector.has('EXCLUDE-' + currentEntityType)){
            // console.log('excluding some fields');
            // console.log($injector.get('EXCLUDE-' + currentEntityType));
            currentQuery.filter['fields'] = $injector.get('EXCLUDE-' + currentEntityType);
        }

        //execute query
        return entityModel.find(currentQuery)
            .$promise
            .then(function(results){

                // console.log(results);



                //add in date divider full rows
                //--------------------
                if(showDateDividers) {


                    var index = 0;
                    var currentDateString = moment(results[0][dateDividerField]).format('MMMM Do YYYY');
                    //first row need to push divider
                    results.unshift({
                        fullWidth: true,
                        dateDivider: currentDateString
                    })
                    lastRow++
            
                    //for each one check if previous equals 
                    _.forEach(results, function(value){
                        index++
                        if(!value.fullWidth && moment(value[dateDividerField]).format('MMMM Do YYYY') !== currentDateString) {
                            results[index - 1].push({
                                fullWidth: true,
                                dateDivider: currentDateString
                            })
                            lastRow++
                        } 
                    })
                }

                // console.log(results);
                params.successCallback(results, lastRow);

                //not initializing
                initializing = false;
                
                // clear all overlays
                grid.api.hideOverlay()

                // //show no rows overlay if no rows
                if(lastRow == 0) {
                    grid.api.showNoRowsOverlay()
                }
            })
            .catch(function(err){
                // console.log(err);
                params.failCallback(err);

                // //not initializing
                initializing = false;
                // // clear all overlays
                grid.api.hideOverlay()
            })
    }


    function getSearchData(params){
         //show overlay
        grid.api.showLoadingOverlay()

        var entityModel = $injector.get(currentEntityType);

        return entityModel.search({'searchText': localSearch, 'searchFilter': currentQuery.filter.where || {} })
                .$promise
                .then(function(searchResults){
                    //set it so it can be used in controllers
                    localSearchResultsLength.value = searchResults.length;
                    // console.log(results.length);
                    params.successCallback(searchResults, searchResults.length);

                    //not initializing
                    initializing = false;
                    
                    // clear all overlays
                    grid.api.hideOverlay()

                    //show no rows overlay if no rows
                    if(searchResults.length == 0) {
                        grid.api.showNoRowsOverlay()
                    }
                })
                .catch(function(err){
                    // console.log(err);
                    params.failCallback(err);

                    // //not initializing
                    initializing = false;
                    // clear all overlays
                    grid.api.hideOverlay()
                })
    }


    //=============================================================
    // END ENTERPRISE dataSource
    //=============================================================


	//datasource
	//build data source so it can be reused
    var dataSource = {
        // rowCount: null, // behave as infinite scroll - not needed for enterprise
        getRows: function (params) {
        	//shows request values
        	//---------------------------------------
        	// console.log('asking for ' + params.startRow + ' to ' + params.endRow);

        	//Filter Modal
			//---------------------------------------
            if(params.filterModel) {
                // console.log('filter model', params.filterModel);
            }

        	//Loading overlay on first time through
        	//---------------------------------------
        	if(initializing) {
				grid.api.showLoadingOverlay()
        	}

            // console.log('currentQuery', currentQuery)
        	//Extend Paging
        	//---------------------------------------
        	currentQuery.filter['limit'] = paginationSize;
        	currentQuery.filter['skip'] = params.startRow;
            currentQuery.filter['fields'] = _.map(_.filter(grid.columnApi.getAllColumns(), ['visible', true]), 'colId').push('id');

        	//Sorting
        	//---------------------------------------
        	if(params.sortModel.length) {

        
        		if(params.sortModel !== prevSortModel) {
        			grid.api.showLoadingOverlay()
        		}

        		//set previous sort model
        		prevSortModel = params.sortModel || null;

        		//set order base value
        		currentQuery.filter['order'] = [];

        		//loop through each item
        		_.forEach(params.sortModel, function(value, key){
        			var sortString = value.colId + ' ' + value.sort.toUpperCase();
        			//push each sort filter into query
        			currentQuery.filter.order.push(sortString);
        		})
        	}

        	//Grouping
        	//---------------------------------------

    	    // if we are on the top level, then group keys will be [],
    		// if we are on the second level, then group keys will be like ['United States']
		    // var groupKeys = request.groupKeys;
		    // console.log('group keys', groupKeys);
		    // var doingTopLevel = groupKeys.length === 0;

		    // if (doingTopLevel) {
		    //     this.fakeServer.getTopLevelCountryList(successCallback);
		    // } else {
		    //     var country = request.groupKeys[0];
		    //     this.fakeServer.getCountryDetails(country, successCallback);
		    // }


          //Overlay Change History
          //---------------------------------------
          if(params.context.changeHistory !== 'none') {
            //turn number string into number
            var numberOfDays = Number(params.context.changeHistoryDuration);
            var beforeDate = moment().subtract(numberOfDays, "days").startOf("day").format();
            //extend query
            _.extend(currentQuery.filter, {"include": {
              "relation":"changeHistories", 
              "where": {"createdOn":{"gt": beforeDate}}}
            })
          }


            //Uses current model for requests
           	//Build Sorting Model if Needed
        	//---------------------------------------
            var entityModel = $injector.get(currentEntityType);

            switch(true) {
                case (localSearch.length > 0):
                     //run search query
                    return entityModel.search({'searchText': localSearch, 'searchFilter': currentQuery.filter.where || {} })
                            .$promise
                            .then(function(searchResults){
                                // console.log(results.length);
                                params.successCallback(searchResults, searchResults.length);

                                //not initializing
                                initializing = false;
                                
                                // clear all overlays
                                grid.api.hideOverlay()

                                //show no rows overlay if no rows
                                if(searchResults.length == 0) {
                                    grid.api.showNoRowsOverlay()
                                }
                            })
                            .catch(function(err){
                                params.failCallback();

                                // //not initializing
                                initializing = false;
                                // clear all overlays
                                grid.api.hideOverlay()
                            })
                    break;
                default:
                    //run query
                    return entityModel.find(currentQuery)
                            .$promise
                            .then(function(results){
                                // console.log(results);
                                params.successCallback(results, lastRow);

                                //not initializing
                                initializing = false;
                                
                                // clear all overlays
                                grid.api.hideOverlay()

                                //show no rows overlay if no rows
                                if(lastRow == 0) {
                                    grid.api.showNoRowsOverlay()
                                }
                            })
                            .catch(function(err){
                                params.failCallback();

                                // //not initializing
                                initializing = false;
                                // clear all overlays
                                grid.api.hideOverlay()
                            })
            }
        }

     }
     // end data source


	//grid function mappings
	var gridFuncs = {
		getNestedValue: getNestedValue,
        getNestedStage: getNestedStage,
    	contactNameRender: contactNameRender,
    	companyNameRender: companyNameRender,
    	currencyRender: currencyRender,
    	dateRender: dateRender,
        dueDateRender: dueDateRender,
    	dateWithQuarterRender: dateWithQuarterRender,
    	defaultRender: defaultRender,
    	emailRender: emailRender,
    	getNestedOwner: getNestedOwner,
    	numberRender: numberRender,
    	ownerRender: ownerRender,
    	phoneRender: phoneRender,
    	starRenderer: starRenderer,
        selectAllRender: selectAllRender,
        smartScoreRender: smartScoreRender,
        popoverRender: popoverRender,
    	tagsRender: tagsRender,
    	websiteRender: websiteRender,
    	ownerRender: ownerRender,
    	oppStatusRender: oppStatusRender,
    	oppStageRender: oppStageRender,
        getPrimaryCompany: getPrimaryCompany,
        getOverdueActivities: getOverdueActivities,
        primaryCompanyRender: primaryCompanyRender,
        getLastInteraction: getLastInteraction,
        getRelatedToCount: getRelatedToCount,
        getActivityCount: getActivityCount,
        oppValueRender: oppValueRender,
        MyCellRenderer: MyCellRenderer,
        getOppValueHeader: getOppValueHeader,
        activityNameRender: activityNameRender,
        groupRowInnerRendererFunc: groupRowInnerRendererFunc,
        inForecastRender: inForecastRender,
        GroupInnerRenderer: GroupInnerRenderer

    }


	//////////////////////////////////

	//factory object
    var gridManager = {
    	initGrid: initGrid,
        // initStaticGrid: initStaticGrid,
    	// getMetaData: getMetaData,
        discardChanges: discardChanges,
    	getColumns: getColumns,
    	getColumnState: getColumnState,
        getSortModel: getSortModel,
    	getSelectedData: getSelectedData,
        getSelectedRows: getSelectedRows,
        getPaginationSize: getPaginationSize,
    	showHideColumn: showHideColumn,
        setRowGroupColumns: setRowGroupColumns,
        setColumnPinned: setColumnPinned,
    	// getCurrentViewId: getCurrentViewId,
    	// getCurrentView: getCurrentView,
    	changeView: changeView,
        changeCurrentQuery: changeCurrentQuery,
        getCurrentQuery: getCurrentQuery,
    	showOverlay: showOverlay,
        ensureNodeVisible: ensureNodeVisible,
        purgeCache: purgeCache,
        purgeEnterpriseCache: purgeEnterpriseCache,
        refreshInfiniteCache: refreshInfiniteCache,
    	clearSelected: clearSelected,
    	refreshView: refreshView,
        setData: setData,
    	sizeToFit: sizeToFit,
        autoSize: autoSize,
    	exportToExcel: exportToExcel,
    	setLocalSearch: setLocalSearch,
    	getLocalSearch: getLocalSearch,
        getLocalSearchResults: getLocalSearchResults,
        setContext: setContext,
        setFilterModel: setFilterModel,
        updateRow: updateRow,
        selectAll: selectAll,
        doLayout: doLayout,
        getRowNode: getRowNode
    };

    return gridManager;

    ////////


    //=============================================

    /*
    Grid Setup
    */
    function initGrid(entityType, thisView) {

    	//set initialzing as true
    	initializing = true;

		//turns this initialization into a promise we can use in controllers
		//-----------------------------------------------------------------
		var defer = $q.defer();

    	//clear selected data
    	selectedData.items = [];

    	//set current entity & view
    	currentEntityType = entityType;
        // console.log(currentEntityType);

    	//set current view
    	currentView = thisView;
        // console.log('currentView', currentView);

        //current query
        currentQuery = angular.fromJson(currentView.query) || {'filter': {}};
        // console.log('currentQuery at top', currentQuery)

        //current last row
        lastRow = currentView.count;

    	//Build Column Defs Based on Entity & Custom Fields
    	//---------------------------------
    	//TODO - Get Directly from Data rather than module
    	var entityFields = angular.copy(_.filter($injector.get(currentEntityType + 'Fields'), ['excludeGrid', false]));

        //get custom fields
        var customFields = _.filter($rootScope.customFields, function(o) { return _.includes(o.useWith, currentEntityType) });
        //TODO - MATCH FIELD TYPE TO COLUMN TYPE
        _.forEach(customFields, function(value){
            value.columnType = value.type;
        })

    	//shared end fields
    	var endFields = EndFields;

    	//entity defs
    	var entityDefs = []

        //all fields
        allFields = _.union(entityFields, customFields, endFields);

    	//loop through and create entity defs
    	_.forEach(allFields, function(value, key){

    		var columnObject = {
    			headerName: value.label,
    			field: value.key
    		}

    		//add extra attributes only if definited
    		//----------------------------
            //map key to field
            if(value.key) {columnObject['field'] = value.key }
            //col id    
            if(value.colId) {columnObject['colId'] = value.colId || value.key }
            //column type
            if(value.columnType) {columnObject['type'] = value.columnType }
    		//width
    		if(value.width) {columnObject['width'] = value.width }
    		//pinned
    		if(value.pinned) {columnObject['pinned'] = value.pinned }
    		//hidden
    		if(value.hide) {columnObject['hide'] = value.hide }
    		//value getter
    		if(value.valueGetter) {columnObject['valueGetter'] = value.valueGetter }
            //value getter
            if(value.headerValueGetter) {columnObject['headerValueGetter'] = value.headerValueGetter }
            //filter type
            if(value.filter) {columnObject['filter'] = value.filter }
    		//header class
    		if(value.headerClass) {columnObject['headerClass'] = value.headerClass }
    		//cell class
    		if(value.cellClass) {columnObject['cellClass'] = value.cellClass }
            //number cell class - this makes the cell monospaced for easier scanning
            if(value.type == 'number' || value.type == 'currency') { columnObject['cellClass'] = 'number'}
            //header renderer
            if(value.headerCellRenderer) {columnObject['headerCellRenderer'] = value.headerCellRenderer }
            //key creator
            if(value.keyCreator) {columnObject['keyCreator'] = value.keyCreator  }
            //if type category - group
            if(value.type == 'category' || value.type == 'lookup' || value.allowGroup) { columnObject['enableRowGroup'] = true }
    		// name and field required - others optional in field definition
    		entityDefs.push(columnObject);
    	})

    	//Concat column defs
    	var columnDefs = unPackColumnDefs(baseDefs.concat(entityDefs));

        var getParamValue = function(params){
              if(params.data !== undefined){
                //first look based on type
                return params.colDef.type ? getValueByType(params.colDef.type, params) : getValueByField(params.colDef.field, params);
              }
              else {
                return nullCell;
              }
            }
    	// console.log(columnDefs);

    	//return appropriate grid options
	    var options = {

                // debug: true, // REMOVE IN PRODUCTION
		    	// data
		    	//==================================
		        columnDefs: columnDefs,
		        rowData: null,

		        // row model
		        //==================================
                rowBuffer: 0,
                // rowModelType: 'infinite',
			    rowModelType: 'enterprise',
                // rowGroupPanelShow: 'always',
			    // // how big each page in our page cache will be, default is 100
			    // paginationPageSize: paginationSize,
                 // bring back data 50 rows at a time
                cacheBlockSize: paginationSize,
			    // how many extra blank rows to display to the user at the end of the dataset,
			    // which sets the vertical scroll and then allows the grid to request viewing more rows of data.
			    // default is 1, ie show 1 row.
			    cacheOverflowSize: 0,
			    // how many server side requests to send at a time. if user is scrolling lots, then the requests
			    // are throttled down
			    maxConcurrentDatasourceRequests: 3,
			    // how many rows to initially show in the grid. having 1 shows a blank row, so it looks like
			    // the grid is loading from the users perspective (as we have a spinner in the first col)
			    infiniteInitialRowCount: 10,
			    // how many pages to store in cache. default is undefined, which allows an infinite sized cache,
			    // pages are never purged. this should be set for large data to stop your browser from getting
			    // full of data
			    maxBlocksInCache: 3,
                //purges grouped rows
                purgeClosedRowNodes: true,
			    //return mongoID as node ID
			    getRowNodeId: function(item) {
			        return _.isNil(item.id) ? _.random(0,100000).toString() : item.id.toString();
			    },

		        // height
		        //==================================
                headerHeight:36,
                rowHeight: currentEntityType == 'forecast' ? 60 : 40,

		        // adjust
		        //==================================
		        enableColResize: true,

		        //panel
		        //==================================
		        showToolPanel: false,

		        //sorting
		        //==================================
		        unSortIcon: true,
		        //server side filtering to work with infinite scroll
		        enableServerSideSorting: true,
    			enableServerSideFilter: true,

		        //animation
		        //==================================
		        animateRows: false,

                // isScrollLag: function() { return true; },
                // suppressScrollLag: false,

                suppressAnimationFrame: true,
                suppressColumnVirtualisation: true,


                //Grouping
                //==================================
                groupUseEntireRow: true,
                groupRowRenderer:  'group',
                groupRowInnerRenderer: groupRowInnerRendererFunc,
                groupRowRendererParams: {
                    checkbox: false,
                    // innerRenderer is optional, we could leave this out and use the default
                    innerRenderer: groupRowInnerRendererFunc
                },
                // groupRowRenderer: function(params) {

                //     var html = '<span>'
                //     html += '<span class="ag-group-expanded" ref="eExpanded"></span>' +
                //     html += '<span class="ag-group-contracted" ref="eContracted"></span>' +
                //     html += '<span class="ag-group-checkbox" ref="eCheckbox"></span>' +
                //     html += '<span class="ag-group-value" ref="eValue"></span>' +
                //     html += '<span class="ag-group-child-count" ref="eChildCount"></span>' +
                //     html += '</span>';
                        
                //     return html;
                // },
                // groupRowInnerRenderer: groupRowInnerRendererFunc,
                // // groupRowInnerRenderer: GroupInnerRenderer,
                //  // groupUseEntireRow: true,
                 // groupRowRenderer: 'group',
                //  groupRowRendererParams: {
                //       // checkbox: true,
                //       suppressCount: false,
                //       innerRenderer: groupRowInnerRendererFunc
                //   },

                //full width rows
                //==================================
                isFullWidthCell: function(rowNode) {
                    if(rowNode.data !== undefined){
                        //append this attribute to show that is full width
                        return rowNode.data.fullWidth;
                    } else {
                        return false;
                    }
                },
                 fullWidthCellRenderer: function(params) {
                    if(params.data !== undefined) {

                        var value = params.data.dateDivider || '--'
                        if(params.data.dateDividerOverdue) {
                        var html = '<div class="date-divider overdue">' + value + '</div>';
                        } else if(params.data.dateDividerToday){
                        var html = '<div class="date-divider today">' + value + '</div>';
                        } else {
                         var html = '<div class="date-divider">' + value + '</div>';   
                        }

                        return html;

                    } else {     
                        return nullCell
                    }
                },

		        // select'
		        //==================================
		    	suppressRowClickSelection: true,
		    	rowSelection: 'multiple',

		    	//overlays
		    	//==================================
		    	overlayLoadingTemplate: '<div class="loop-loader loop-loader-xs">Loading...</div>',

		    	//icons
		    	//==================================
		    	icons: {
                    sortUnSort: '<img src="./assets/img/grid/sortUnsort.svg" style="width: 14px;"/>',
		    		sortAscending: '<img src="./assets/img/grid/sortAscending.svg" style="width: 14px;"/>',
					sortDescending: '<img src="./assets/img/grid/sortDescending.svg" style="width: 14px;"/>',
			    	groupExpanded: '<img class="no-row-click" src="./assets/img/grid/groupExpanded.svg" style="width: 40px; height:40px; padding:10px; margin-top:0px;"/>',
					groupContracted: '<img class="no-row-click" src="./assets/img/grid/groupContracted.svg" style="width: 40px; height:40px;  padding:10px; margin-top:0px;"/>',
					checkboxChecked: '<img class="no-row-click" src="./assets/img/grid/checkboxChecked.svg" style="width: 40px; padding:10px; margin-top:-2px;"/>',
					checkboxUnchecked: '<img class="no-row-click" src="./assets/img/grid/checkboxUnchecked.svg" style="width: 40px; padding:10px; margin-top:-2px;"/>',
					checkboxIndeterminate: '<img class="no-row-click" src="./assets/img/grid/checkboxIndeterminate.svg" style="width: 40px; padding:10px; margin-top:-2px;"/>'
				},

				//Context
				//==================================
				context: {
		              valueType: 'total',
		              changeHistory: 'none',
		              changeHistoryDuration: 7,
		              nameFormat: 'firstLast',
                      showDeleted: 'false'
		         },
    
				// enterpise
				//==================================
		        enableStatusBar: false,
		        enableRangeSelection: false,
		        suppressContextMenu: true,
		        // suppressMenuMainPanel: true,
		        // suppressMenuFilterPanel: true,
		        // suppressMenuColumnPanel: true,

                //row class
                getRowClass: function(params) {
                    if(params.data !== undefined) {
                        if (params.data._isDeleted) {
                            return 'ag-row-deleted';
                        }
                    } 
                },

		        // default column
		        //==================================
                columnTypes: {
                    "string": {},
                    "email": {},
                    "phone": {},
                    "social": {},
                    "address": {},
                    "user": {},
                    "number": {},
                    "boolean": {},
                    "domain": {},
                    "currency": {},
                    "date": {},
                    "richDate": {},
                    "primaryCompany": {},
                    "category": {},
                    "mixed-select": {},
                    "divider": {},
                    "tags": {},
                    "score": {},
                    "multi": {},
                    "formula": {}
                },
                defaultColDef: {
                    // make every column editable
                    editable: false,
                    menuTabs:[],
                    cellClass: function(params) { 
                      //looks up change histories
                      var changeHistories = params.data ? _.filter(params.data.changeHistories, ['attribute', params.colDef.field]) :[];
                      //add class if appropriate
                      return (params.context.changeHistory !== 'none' && changeHistories.length ? 'has-history' : null); 
                    },
                    cellRenderer: function(params){

                        if(params.data !== undefined){
                            //change histories
                            var changeHistories = _.filter(params.data.changeHistories, ['attribute', params.colDef.field]);
                            if(params.context.changeHistory !== 'none' && changeHistories.length){
                                var html = '<span class="cell-wrapper ui-popover" data-title="Recent Changes">' + getParamValue(params) + '</span>'
                                    html += '<div class="webui-popover-content">'
                                    html += '<p>' + _.upperFirst(params.colDef.field) + '</p>'
                                    //rip through each change
                                    _.forEach(changeHistories, function(change){
                                        html += '<p style="whitespace:nowrap;">"' + change.previousValue['value'] + '" <icon class="wb-arrow-right"></icon> "' + change.newValue['value'] + '"</p>'
                                    })
                                    //finsh out div
                                    html += '</div>'
                                    return html;
                            } else {
                                    return '<span class="cell-wrapper">' + getParamValue(params) + '</span>'
                            }
                        } else {
                          return  '<div class="loading-data"></div>';
                        }
                    }
                },

		         //events
		         //==================================
				onGridReady: gridReady,
				onRowClicked: rowClicked,
                onRowDataChanged: rowDataChanged,
                onRowSelected: rowSelected,
                onModelUpdated: modelUpdated,
				// onCellFocused: cellFocused,
				onSelectionChanged: selectionChanged,
                onSortChanged: sortChanged,
                onColumnMoved: columnMoved,
                onColumnResized: columnResized,
                onColumnPinned: columnPinned,

                //body scroll event
                onBodyScroll: bodyScrolled
	    	};

	    	//resolve the options
            defer.resolve(options);

	    return defer.promise;
    }


    function bodyScrolled(){
         if(context.changeHistory !== 'none') {
            if($('.ui-popoover')){
                 $('.ui-popover').webuiPopover('destroy');
            }

            $('.ui-popover').webuiPopover({placement:'top', trigger:'hover', style:'inverse'})
          }
    }


    function groupRowInnerRendererFunc(params) {

        // console.log('group params', params);

     var html = '';
     var key = params.data.key || '--';

     // fore grouping or for data - would be 
    if(params.data){

         if(currentEntityType == 'Opportunity') {
            html += '<span class="groupTitle">KEY</span>'.replace('KEY', params.data.name);
            html += '<span style="padding:0px 10px !important" class="pull-right">';
            html += '<span class="count text-right">ITEM_COUNT - </span>'.replace('ITEM_COUNT', params.data.count);
            html += '<span class="count text-right">$ITEM_SUM</span>'.replace('ITEM_SUM', (params.data.sum || 0).toLocaleString())
            html += '</span>';
         } 
         if(currentEntityType == 'Contact') {
            html += '<span class="groupTitle">KEY</span>'.replace('KEY', params.data.firstName + ' ' + params.data.lastName);
            html += '<span style="padding:0px 10px !important" class="pull-right">';
            html += '<span class="count text-right">ITEM_COUNT - </span>'.replace('ITEM_COUNT', params.data.count);
            html += '</span>';
         }
         else {
            html += '<span class="groupTitle"> KEY</span>'.replace('KEY', params.data.name);
            html += '<span style="padding:0px 10px !important" class="pull-right">';
            html += '<h4><span class="label label-default text-right">ITEM_COUNT</span></h4>'.replace('ITEM_COUNT', params.data.name);
            html += '</span>';
         }

      return html;

    } else {
        return params.node.key || params.data.id;
    }

  }

  function GroupInnerRenderer() {}

    GroupInnerRenderer.prototype.init = function(params) {
        // console.log('group row inner params', params);
        var cssClass = params.node.level === 0 ? 'group-inner-renderer-country' : 'group-inner-renderer-year';
        var template = '<span class="'+cssClass+'">'+'Test This Renderer'+'</span>';
        this.eGui  = loadTemplate(template);
    };

    GroupInnerRenderer.prototype.getGui = function() {
        return this.eGui;
    };

    function loadTemplate(template) {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = template;
        return tempDiv.firstChild;
    }



    //ON READY EVENT
    //========================================
    function gridReady(params) {

        // console.log('gridReady!');
    	//bind grid instance for factory
    	//-----------------------------
    	grid = params;

        //setUpGrid
        setUpGrid()

    }   


    function setUpGrid(){
        //Set UP Grid Data Source
        //TODO - WILL CHANGE WHEN AG_GRID 10 COMES OUT WITH ENTERPRISE ROWS MODEL
        //----------------------------------

        //regular data source
        // grid.api.setDatasource(dataSource);

        //enterprise data source
        grid.api.setEnterpriseDatasource(EnterpriseDatasource);


        //if has a columnState, set column state
        //-----------------------------------
        if(currentView.columnState) {
            // console.log('set column State', currentView.columnState);

            var basePlusCurrentState = baseDefs.concat(currentView.columnState);
            grid.columnApi.setColumnState(basePlusCurrentState);
        }


        //if has sort model, set sort model
        //------------------------------------
        if(currentView.sortModel) {
            // console.log('set sort model');
            grid.api.setSortModel(currentView.sortModel)
        }

        //let controller know
        // $rootScope.$broadcast('GRID_READY', {});
    }


    /*
    Readjusts layout immediately instead of waiting for every half second check
    */
    function doLayout(){
        grid.api.doLayout();
    }


    /*
    Change View
    */
    function changeView(changeToView) {
    	grid.api.showLoadingOverlay()
        //ensure clear selected
        clearSelected();
    	//set current view
    	currentView = changeToView;
        //set current query
        currentQuery = changeToView.query || {"filter": {}};
    	//reset data source
    	grid.api.setDatasource(dataSource);
        //clear any selected configuration
        selectedData.selectAll = false;
        selectedData.length = 0;
        selectedData.items = [];
    	//wait 1/4 second to hide overlay
    	$timeout(function(){
   			//hide overlay
    		grid.api.hideOverlay();
    	}, 250)
    }


    /*
    Change Filter Model
    */
    function changeCurrentQuery(filters, matchType) {

        // console.log('change current query');

        // grid.api.showLoadingOverlay()

        //set current view
        currentQuery.filter['where'] = QueryBuilder.buildQuery(currentQuery.filter['where'], filters, matchType);

        //get new metadata for this query
        // var entityModel = $injector.get(currentEntityType);

        var includeDeleted = _.get(context, 'showDeleted', null) == "true" ? true : false;
        // console.log('includeDeleted?', includeDeleted)


        return $injector.get(currentEntityType).metadata({"filter": currentQuery.filter.where, "includeDeleted": includeDeleted}).$promise
                .then(function(results){

                    // console.log('got metadata', results);

                    //set last row
                    lastRow = results.count || 0;

                    // grid.api.purgeEnterpriseCache();

                    return results;
                })
                .catch(function(err){
                    //SWITCH BACK TO CURRENT VIEW OR SOMETING??

                    // console.log(err);
                    return err;
                })
                .finally(function(final){
                    // console.log(final);
                })
    }

    //this function recursively keeps checking until refresh is not in progress
    //if refresh is not in progress then actually sets the datasource as expected

    function safeRefresh() {
        // console.log('refresh in progress?', grid.api.rowRenderer.refreshInProgress);
         if(grid.api.rowRenderer.refreshInProgress) {
            $timeout(function(){
                safeRefresh()
            }, 250)
          }
          else {
            //DO I NEED TO TOTALLY RESET DATASOURCE OR COULD I JUST APPLY SETFILTERMODEL?
            //TODO - CHECK PERFORMANCE ON THIS
             grid.api.purgeEnterpriseCache();
            }
        }


    /*
    Get Current Query
    */
    function getCurrentQuery() {
        return currentQuery;
    }


    //==================================
    //Events & Functions Go Here
    //==================================


    /*
    Row Clicked
    */
    function rowClicked(params) {
        // console.log('event', params.event.target);
        // console.log(params)
        if(params.data == undefined || params.event.target.className.indexOf('no-row-click') > -1 || params.event.target.className.indexOf('ag-full-width-row') > -1 ) {
            return;
        }
        else {
            lastSelectedId = params.data._id ? params.data._id : params.data.id;
            //open sidebar to entity and state
            SidebarRouter.openTo(currentEntityType, lastSelectedId);
        }
    }


    /*
    Row Data Changed
    */
    function modelUpdated(params) {

        $timeout(function(){
            // console.log('focus');
            $('.ui-popover').webuiPopover({placement:'top', trigger:'hover', style:'inverse'});
          }, 0)

        // console.log('model updated')
        if(selectedData.selectAll){
            selectAll(selectedData.items);
        }
    }


    function rowSelected(params){
        $timeout(function(){
        if(selectedData.selectingAll){
          // selectedData.length = currentView.count;

          // // var model = grid.api.getModel();
          // var rowCount = (_.keys(grid.api.getCacheBlockState()).length * paginationSize) - 100;

          // //increment this
          // selectAllIncrementor++
          // if(selectAllIncrementor == rowCount){
          //   selectedData.selectingAll = false;
          //   selectAllIncrementor = 0;
          // }

            return;

        //select all is selected and then selection occurs - this will only occur
        //after a checkbox has been unselected - therefore need to pull from selected Data 
        } else if(selectedData.selectAll && params.node.selected){
            //ensures that number never goes above maximum number or rows currently viewable by user
            if(selectedData < currentView.count){
             selectedData.length = selectedData.length + 1;
            }

             //need to add this record to not selected list
             _.pull(selectedData.items, params.node.data);


        } else if(selectedData.selectAll && !params.node.selected) {
            selectedData.length = selectedData.length - 1;

            //need to add this record to not selected list
             selectedData.items.push(params.node.data);
        } else {

          selectedData.items = grid.api.getSelectedRows();   
        }

        }, 0);
    }

    function rowDataChanged(){
        // console.log('row data changed');
    }


    function sortChanged(){
        $timeout(function(){
            $rootScope.$broadcast('SORT_MODEL_CHANGED');
        }, 0)
    }


    function columnMoved(){
        $timeout(function(){
            $rootScope.$broadcast('COLUMN_MOVED');
        }, 0)
    }

    function columnResized(){
        $timeout(function(){
            $rootScope.$broadcast('COLUMN_RESIZED');
        }, 0)
    }

    function columnPinned(){
        $timeout(function(){
            $rootScope.$broadcast('COLUMN_PINNED');
        }, 0)
    }


    /*
    Selection Changed
    */
    function selectionChanged(params) {
     //    // var selectedLength = grid.api.getSelectedRows().length;
     //    console.log('selection params', params.event);
    	//  $timeout(function(){
     //        if(selectedData.selectAll){
     //         selectedData.length = selectedData.length - 1;
     //        }

     //        //still updated selected items if changing
     //        selectedData.items = grid.api.getSelectedRows();
    	// }, 0);
    }



    //GRID API 
    //==========================================

    /*
    Ensure Node is Visible
    */
    function ensureNodeVisible(id) {
        grid.api.ensureNodeVisible(function(params, id){
            if(params.id == id) {
                return true
            } else {
                return false
            }
        });
    }

    /*
    Purge Cache
    */
    function purgeCache() {
        //clear cache
        // grid.api.purgeInfinitePageCache();

        grid.api.purgeEnterpriseCache();
    }


    /*
    Purge Enterprise Cache
    */
    function purgeEnterpriseCache(route) {
        grid.api.purgeEnterpriseCache(route);
    }

    /*
    Refresh Infinite Page Cache
    */
    function refreshInfiniteCache() {
        // grid.api.refreshInfiniteCache();

        grid.api.purgeEnterpriseCache();
    }
    /*
    Show Overlay
    */
    function showOverlay() {
    	grid.api.showLoadingOverlay()
    }

    function setData(id, field, data){
        var rowNode = grid.api.getRowNode(id);
        rowNode.setDataValue('name', 'TEST THIS NOW');
    }

    /*
    Refresh View
    */
    function refreshView() {
    	// console.log('refresh in factory');
        // console.log('last selected', lastSelectedId)
    	grid.api.showLoadingOverlay()
		//refresh
		// grid.api.refreshView();

        //cell may be different so clear so isn't flash change
        grid.api.clearFocusedCell();

        grid.api.purgeEnterpriseCache();


		//hide overlay
		$timeout(function(){
			grid.api.hideOverlay()

             grid.api.forEachNode( function(node) {
              if(node.id == lastSelectedId){
                // console.log('set focus');
                grid.api.focusedCellController.setFocusedCell(node.rowIndex, grid.columnApi.getAllDisplayedColumns()[0].colId);
              }
            });

		}, 500)

    }

    /*
    Update Row
    */
    function updateRow(id, data) {
        //get row node
        var rowNode = grid.api.getRowNode(id);
        //set data
        rowNode.setData(data);
    }

    /*
    Clear Selected
    */
    function clearSelected(params) {
        $timeout(function(){
        selectAllIncrementor = 0;
		//clear selected data
		selectedData.items = [];
        selectedData.selectAll = false;
        selectedData.length = 0;
		//deselect rows
		grid.api.deselectAll()
        //ensure select all checkbox is unchecked
        $document[0].getElementById('selectAllCheckbox').checked = false;
        }, 0)
    }

    /*
    Size to fit
    */
    function sizeToFit(params) {
    	grid.api.sizeColumnsToFit();
    }

    /*
    Auto Size
    */
    function autoSize(params) {
        var allColumnIds = [];
        grid.api.gridOptionsWrapper.gridOptions.columnDefs.forEach( function(columnDef) {
            allColumnIds.push(columnDef.field);
        });
        grid.columnApi.autoSizeColumns(allColumnIds);
    }

    /*
    Export to Excel
    */
    function exportToExcel(params) {
    	grid.api.exportDataAsExcel({
    		fileName: 'test.xls'
    	});
    }

    /*
    Show Hide Column
    */
    function showHideColumn(column, visible) {
    	grid.columnApi.setColumnVisible(column, visible);
    }

    /*
    Set Row Grouping
    */
    function setRowGroupColumns(groups) {
        grid.columnApi.setRowGroupColumns(groups);
    }


    /*
    Pin / Un Pin Columns
    */
    function setColumnPinned(column, pinned) {
        grid.columnApi.setColumnPinned(column, pinned);
    }


    /*
    Selects Visible Rows
    */
    function selectAll(dontSelectThese){
        //clear selected items
        if(_.isNil(dontSelectThese)){
            selectedData.items = [];
        }

        selectAllIncrementor = 0;

        selectedData.selectingAll = true;
        selectedData.selectAll = true;

        // selectedData.selectingAll = true;
        grid.api.forEachNode( function (node) {
            if(_.find(dontSelectThese, ['id', node.id])) {
                node.setSelected(false);
            } else {
                node.setSelected(true);
            }
        });
        // selectedData.selectAll = true;

        //select all
        selectedData.length = currentView.count - selectedData.items.length;
  
        //timeout ensures all checkboxes are dont being selected as is dont syncronously
        //CURRENT BUG - Selected Number can sometimes be off if toggle select all really quickly 
        $timeout(function(){
            selectedData.selectingAll = false;
        }, 40)
    }



    //==================================
    //Getters / Setters
    //==================================

    /*
    reset grid
    */
    function discardChanges(view){
        currentView = view;
        //call grid ready - basically go back to the initial view
        setUpGrid()
    }

    /*
    Local Search
    */
    function setLocalSearch(value) {
    	localSearch = value;
        //resets data source now using searching route vs basic query routes
        $timeout(function(){
            // grid.api.setDatasource(dataSource);

            grid.api.setEnterpriseDatasource(EnterpriseDatasource);
        }, 0)
    	
    }

    /*
    Gets Row Node By Id
    */
    function getRowNode(id){
        return grid.api.getRowNode(id);
    }

    /*
    Set Filter Model
    */
    function setFilterModel(model){
        grid.api.setFilterModel(model)
    }

    /*
    Local Search
    */
    function getLocalSearch(value) {
    	return localSearch;
    }

    /*
    Local Search Results Length
    */
    function getLocalSearchResults(value) {
        return localSearchResultsLength;
    }

    /*
    Get Columns
    */
    function getColumns() {
    	return grid.columnApi.getAllColumns();
    }

    /*
    Get Column State
    */
    function getColumnState() {
    	return grid.columnApi.getColumnState();
    }

    /*
    Get Sort Model
    */
    function getSortModel() {
        return grid.api.getSortModel();
    }

    /*
    Get Selected Data - the proxy for selected based on select all / not select all being turned on
    */
    function getSelectedData() {
    	return selectedData;
    }

    /*
    Get Selected Data
    */
    function getSelectedRows() {
        return grid.api.getSelectedRows();
    }

    /*
    Get paginiation size for parity with the rest of the application
    */
    function getPaginationSize(){
        return paginationSize;
    }

    /*
    Set Context
    */
    function setContext(contextItem, value) {
        // console.log('contextItem', contextItem);
        // console.log('contextValue', value);
        //clear cache
        grid.api.gridOptionsWrapper.gridOptions.context[contextItem] = value;
    }



    //==================================
    //Rendering & Sorting Functions Go Here
    //==================================

	//Value Getters
	//----------------------------------

	function getNestedValue(params) {
        //need to check if grouping and essentially bypass normal valueGetter
        if(params.node.group){
            return params.data.key || '--'
        } else {
        	return _.get(params.data, params.colDef.field + ".label" , null);  
        }
	}

	//owner is a little different than nested value
	function getNestedOwner(params) {
        if(params.node.group){
            return params.data.key || '--'
        } else {
    	return _.get(params.data, params.colDef.field + ".fullName" , null); 
        } 
	}


    function getNestedStage(params) {
        if(params.node.group){
            return params.data.key || '--'
        } else {
        return _.get(params.data, params.colDef.field + ".score" , null);
        }   
    }

    //get primary company
    function getPrimaryCompany(params) {
        if(params.node.group){
            return params.data.key || '--'
        } else {
        return _.get(params.data, 'entityLinks', null) ? RelationshipManager.getPrimary(params.data.entityLinks, "Company") : null;
        }
    };

    //gets overdue activity counts
    function getOverdueActivities(params){
        var activityLinks = _.get(params.data, 'activityLinks', []);
        return activityLinks.length;
    }

    //get activity counts
    function getActivityCount(params) {
        var activityLinks = _.get(params.data, 'activityLinks', []);
        return _.filter(activityLinks, ['_isDeleted', false]).length;
    };

    //get related counts
    function getRelatedToCount(params) {
        var entityLinks = _.get(params.data, 'entityLinks', null);
        return entityLinks ? _.filter(entityLinks, ['_isDeleted', false]).length : null;
    };

    //get last interaction
    function getLastInteraction(params) {
        var activityLinks = _.get(params.data, 'activityLinks', null);
        return activityLinks && _.sortBy(activityLinks, 'updatedOn')[0] ? _.get(_.sortBy(activityLinks, 'updatedOn')[0], 'updatedOn', null) : null;
    };

    function getOppValueHeader(params) {
        //value type
        var valueType = params.context.valueType;
        //switch type
        switch (valueType) {
            case 'total': return 'Value';
            case 'weighted': return 'Weighted Value';
            case 'predicted': return 'Predicted Value';
        }
    };

        // function to act as a class
    function MyCellRenderer () {}

    // gets called once before the renderer is used
    MyCellRenderer.prototype.init = function(params) {
        // create the cell
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = '<span class="my-css-class"><button class="btn-simple">Push Me</button><span class="my-value"></span></span>';

        // get references to the elements we want
        this.eButton = this.eGui.querySelectorAll('.btn-simple')[0];
        this.eValue = this.eGui.querySelectorAll('.my-value')[0];

        // set value into cell
        this.eValue.innerHTML = params.valueFormatted ? params.valueFormatted : params.value;

        // add event listener to button
        this.eventListener = function() {
            console.log('button was clicked!!');
        };
        this.eButton.addEventListener('click', this.eventListener);
    };

    // gets called once when grid ready to insert the element
    MyCellRenderer.prototype.getGui = function() {
        return this.eGui;
    };

    // gets called whenever the user gets the cell to refresh
    MyCellRenderer.prototype.refresh = function(params) {
        // set value into cell again
        this.eValue.innerHTML = params.valueFormatted ? params.valueFormatted : params.value;
    };

    // gets called when the cell is removed from the grid
    MyCellRenderer.prototype.destroy = function() {
        // do cleanup, remove event listener from button
        this.eButton.removeEventListener('click', this.eventListener);
    };



    function wrapThis(params, renderContent){

        if(params.data !== undefined) {

        var changeHistories = _.filter(params.data.changeHistories, ['attribute', params.colDef.field]);

        if(params.context.changeHistory !== 'none' && changeHistories.length){
            
            var html = '<span class="ui-popover changeHistoryBackground"></span>'
                html += '<div class="webui-popover-content">'
                html += '<p class="text-center">Recent Changes</p>'
                html += '<br>'
                //rip through each change
                _.forEach(changeHistories, function(change){
                    html += '<p style="whitespace:nowrap;">"' + change.previousValue['value'] + '" <icon class="wb-arrow-right"></icon> "' + change.newValue['value'] + '"</p>'
                })
                //finsh out div
                html += '</div>'
                html += renderContent

            return html;
               
            } else {
                return renderContent;
            }
        }
        else {
            return  '<div class="loading-data"></div>';
        }
    }


    //Default Render
	//----------------------------------
	function defaultRender(params) {

		//shows nothing when infinite scroll is triggered
		 if (params.data !== undefined) {
            return wrapThis(params, params.value ? params.value : nullCell);      
        } else {
            return  '<div class="loading-data"></div>';
        }

	}

	//Star Renderer as Component
	//----------------------------------
	function starRenderer (params) {

    if (params.data !== undefined) {
        //check if should star on first render
        var starredItems = _.get($rootScope.activeUser, 'starredLinks', []);
        //assumes all ids are unique - do i need to check type as well?
        var isStarred = !_.isNil(_.find(starredItems, ['itemId', params.data.id]));

		var eDiv = document.createElement('div');
            eDiv.innerHTML = '<span class="no-row-click"><button class="btn btn-link star-button no-row-click"><icon class="wb-star no-row-click"></icon></button></span>';

        //button click
	    var eButton = eDiv.querySelectorAll('.star-button')[0];

        if(isStarred) {
          eButton.className = "btn btn-link star-button starred"
         }
         else {
          eButton.className = "btn btn-link star-button"
         }

	    eButton.addEventListener('click', function() {
	        event.preventDefault();
              //get class of 
              var className = eButton.getAttribute("class");
              //star item
              if(className == "btn btn-link star-button") {
               // $rootScope.$broadcast('STAR_ITEM', {entity: params.data});
               starItem(currentEntityType, params.data, eButton);
               //set starred class
               eButton.className = "btn btn-link star-button starred"
              }
              else {

                var starredLinks = _.filter($rootScope.activeUser.starredLinks, ['itemId', params.data.id]);
                // console.log(starredLinks);
                //loop through each to ensure there are not any starred items of same entity
                _.forEach(starredLinks, function(value, key){
                  var foreignKeyId = value.id;
                  unStarItem(params.data, foreignKeyId);
                })
                //change class name
                eButton.className = "btn btn-link star-button"
              }
	    });

	    return eDiv;

        }
        else {
                return '<div class="loading-data"></div>';
        }

	}


	//starred item
	function starItem(entityType, entityItem, element) {

	    // name
	    var name = '';
	    if(entityType == 'Contact') {
	      name = entityItem.fullName || '';
	    } else {
	      name = entityItem.name || '';
	    }

	    //var starred objects
	    var starObject = {
	      "name": name,
	       "itemId": entityItem.id,
	       "itemType": entityType
	    }

	    Appuser.prototype$__create__starredItems(
	      {"id": Appuser.getCurrentId()}, starObject)
	    .$promise
	    .then(function(response){
	      Logger.info('Starred Item');
	      //update rootscope locally to match server
	      $rootScope.activeUser.starredLinks.push(response);
	      //let sidebar know if needed
	      // $rootScope.$broadcast('STAR_ITEM', {id: entityItem.id});
	    })
	    .catch(function(err){
	      //set
	      Logger.error('Error Starring Item');
	      element.className = "star is-starred no-row-click"
	    })
	  }

	  //remnoved starred item
	  function unStarItem(entityItem, foreignKeyId) {
	    Appuser.prototype$__destroyById__starredItems({"id": Appuser.getCurrentId()}, {"fk": foreignKeyId})
	      .$promise
	      .then(function(response){
	        //get rootscope active user
	        $rootScope.activeUser.starredLinks = _.filter($rootScope.activeUser.starredLinks, function(o) { return o.id !== response.fk; });
	        //unstar item
	        // $rootScope.$broadcast('UNSTAR_ITEM', {id: entityItem.id});
	      }) 
	      .catch(function(err){
	        Logger.log('Error Unstarring');
	      })
	  }



    function selectAllRender(params){

            // create the div wrapper
            var span = document.createElement('div');
            span.setAttribute('class', 'checkbox-custom checkbox-primary no-row-click selectAll');

            //create the checkbox
            var cb = document.createElement('input');
            cb.setAttribute('type', 'checkbox');
            cb.setAttribute('id', 'selectAllCheckbox');
            cb.setAttribute('class', 'magic-checkbox');

             // create the label
            var cbLabel = document.createElement('label');
            cbLabel.setAttribute('class', 'no-row-click selectAll');
            cbLabel.htmlFor = "selectAllCheckbox";
          
            // apeend input & label inside div
            span.appendChild(cb);
            span.appendChild(cbLabel);

            // add event listener
            cb.addEventListener('change', function (e) {
                // console.log(e);
                //handle event in particular controller
                if ($document[0].getElementById('selectAllCheckbox').checked == false) {
                      clearSelected();
                } else {
                      selectAll();
                } 
            });
            return span;
    }


    function inForecastRender(params){
          if (params.data !== undefined) {

            var html =  '<span class="toggle toggle-primary no-row-click" style="margin:7px 2px;">'
                html += '<input class="toggle-range no-row-click" id="' + params.data.id + '-inForecast" type="checkbox">'
                html += '<label class="toggle-btn no-row-click" for="' + params.data.id + '-inForecast"></label>'
                html += '</span>'

            return html;
        }
    }


    function activityNameRender(params) {

        if(params.data !== undefined){


        if(params.data && params.data.type && params.data.type.value == 'Follow Up'){


            var completed = params.data.completed || false;

            var element = document.createElement('div');
            element.className = 'no-row-click checkbox-custom checkbox-success grid-checkbox-div no-row-click';

            if (_.isNil(params.value)) {
                return element;
            }
            else {
                var template = '';
                if(completed) {
                  template += '<input class="no-row-click" id="' + params.data.id + '" type="checkbox" checked><label class="no-row-click grid-checkbox no-row-click" for="' + params.data.id + '"></label>';
                  template += '<span class="grid-checkbox-span">' + params.value + '</span>'
                }
                else {
                  template += '<input class="no-row-click" id="' + params.data.id + '" type="checkbox"><label class="no-row-click grid-checkbox no-row-click" for="' + params.data.id + '"></label>';
                  template += '<span class="grid-checkbox-span">' + params.value + '</span>'
                }
                element.innerHTML = template;
                element.addEventListener('change', function (e) {
                  if(e.target.checked){ 
                    params.data.completed = true;
                    params.data.completedDate = new Date(); 
                    params.data.status = {"value": "Completed"};
                  } 
                  else {
                    params.data.completed = false;
                    params.data.completedDate = null; 
                    params.data.status = {"value": "Pending"}
                  }; 
                  Activity.prototype$patchAttributes(
                    { id: params.data.id }, 
                    { 'completed': params.data.completed, 'completedDate': params.data.completedDate, 'status': params.data.status }).$promise
                    .then(function(results){
                      Logger.info('Successfully Completed Task');
                      //refresh row
                      refreshRow(params.node);
                    })
                    .catch(function(err){
                      Logger.error('Error Updating Task');
                    })
                });
            }
            return element;

        } else if(params.data && params.data.type && params.data.type.value == 'Meeting') {

            return '<icon class="fa fa-calendar"></icon>' + params.value

        }
        else {
            return params.value
        }


        } else {
            return nullCell;
        }
  }

	//Generic Renders
	//----------------------------------

	function dateRender(params) {
		 if (params.data !== undefined) {
                return wrapThis(params, params.value ? '<span class="date-formatted">' + moment(params.value).format("MMM D, YYYY") + '</span>' : nullCell);
            } else {
                return '<div class="loading-data"></div>';
         }
	}


    function dueDateRender(params){
        if (params.data !== undefined) {

                 var startOfDay = moment().startOf('day');
                 var momentDate = params.value ? moment(params.value) : null;

                 if(momentDate < startOfDay) {
                      return wrapThis(params, '<span class="date-formatted overdue">' + moment(params.value).format("MMM D, YYYY") + '</span>');
                } else if (_.isNil(params.value)) {
                      return nullCell;
                }
                else {
                    return wrapThis(params, '<span class="date-formatted">' + moment(params.value).format("MMM D, YYYY") + '</span>');
                }
            } else {
                return '<div class="loading-data"></div>';
         }
    }


    if(momentDate < startOfDay) {
      return wrapThis(params, '<span class="overdue">' + moment(params.data.dueDate).format("MMM D, YYYY") + '</span>');
    } else if (_.isNil(params.data.dueDate)) {
      return '<span class="null-cell">--</span>';
    }
    else {
      return wrapThis(params, moment(params.data.dueDate).format("MMM D, YYYY"));
    }

	function dateWithQuarterRender(params) {
		if (params.data !== undefined) {
                return wrapThis(params, params.value ? '<span class="date-formatted">' + moment(params.value).format("MMM D, YYYY") + '</span>' + '<span class="date-quarter">' + 'Q' + moment(params.value).quarter() + '-' + moment(params.value).format("YY") + '</span>' : nullCell);
            } else {
                return '<div class="loading-data"></div>';
        }
	}


	function emailRender(params) {
		if (params.data !== undefined) {
                if(params.data.emails && params.data.emails.length){
                    var html = '<span class="ui-popover">' + params.data.emails.length + ' Emails</span>'    
                        html += '<div class="webui-popover-content">'
                        //add each email
                        _.forEach(params.data.emails, function(email){
                            html += '<p><a href="mailto:' + email.email + '">' + email.email + '</a></p>'
                        })
                        //finish div
                        html += '</div>'

                    return wrapThis(params, html);
                }
                else {
                    return nullCell;
                }
        } else {
                return '<div class="loading-data"></div>';
        }	
	}

	function phoneRender(params) {
		if (params.data !== undefined) {
                return wrapThis(params, params.value ? '<a href="tel:' + params.value + '">' + params.value + '</a>' : nullCell);
            } else {
                return '<div class="loading-data"></div>';
        }
	}

	function websiteRender(params) {
		if (params.data !== undefined) {
                return wrapThis(params, params.value ? '<a href="' + params.value + '" target="_blank">' + params.value + '</a>' : nullCell);
            } else {
                return '<div class="loading-data"></div>';
        }
	}

	//TODO - ALLOW FOR MULTIPLE CURRENCIES
	function currencyRender(params) {
		if (params.data !== undefined) {
                return wrapThis(params, params.value ?  numeral(params.value).format('$ 0,0.00') : nullCell);
            } else {
                return '<div class="loading-data"></div>';
        }
	}


	function numberRender(params) {
		if (params.data !== undefined) {
                return wrapThis(params, params.value ? numeral(params.value).format('0,0') : nullCell);
            } else {
                return '<div class="loading-data"></div>';
        }
	}


	 function tagsRender(params) {

		 if (params.data !== undefined) {


		    var html = '';
		    var increment = 0;
		    var tags = _.filter(params.data.itemLinks, {"itemType": "Tag"});  
		    if(tags.length) {
		      _.forEach(tags, function(tag) {
		        increment = increment + 1;
		        html += '<span class="tag grid-tag">' + tag.name + '</span>'
		        //only show two full tags
		        if(increment == 2 && tags.length - 2 !== 0) {
		          html += '<span class="tag grid-tag"> + ' + (tags.length - 2) + '</span>'
		          return false;
		        }
		      });
		      return wrapThis(params, html);
		    }
		    else {
		      return '<span class="null-cell">--</span>';
		    }
		 }

	      else {
	        return  '<div class="loading-data"></div>';
	 	}
	 }


	// function ownerRender(params) {
	// 	if (params.data !== undefined) {
 //                return params.value ? params.value : nullCell;
 //            } else {
 //                return '';
 //        }
	// }


    //Custom Renders
	//----------------------------------

    function smartScoreRender(params){

        if (params.data !== undefined && params.value) {
              var value = params.value || 0;
              var html = '<span></span>'
              switch(true) {
                case (value < 40):
                    html = '<span class="low-confidence"><span class="score-indicator"></span>' + value + '</span>';
                    break;
                case (value >= 40 && value <= 65):
                    html = '<span class="medium-confidence"><span class="score-indicator"></span>' + value + '</span>';
                    break;
                case (value > 65):
                   html = '<span class="high-confidence"><span class="score-indicator"></span>' + value + '</span>';
                    break;
                } 

                return wrapThis(params, html);

            } else {
                return nullCell;
        }   
    }


    function popoverRender(params){
        if (params.data !== undefined) {
        var html = '<a id="ui-popover" href="#" >shop pop</a>'
            html += '<div class="webui-popover-content">'
            html += '<p>popover content</p>'
            html += '</div>'

            return html;
        } else {
            return nullCell;
        }
    }

    function oppValueRender(params) {
        //value type
        var valueType = params.context.valueType;
        //switch type
        switch (valueType) {
            case 'total': return wrapThis(params, params.value ? numeral(params.value).format('$ 0,0.00') : nullCell);
            case 'weighted': return wrapThis(params, params.value ? numeral((_.get(params.data.stage, 'score', 0) * .01) * params.value).format('$ 0,0.00') : nullCell);
            case 'predicted': return wrapThis(params, params.value ? numeral(params.value * .85).format('$ 0,0.00') : nullCell); // TODO - REPLACE WITH PREDICTIVE CONFIDENCE
        }
    }

    function primaryCompanyRender(params) {
        var primaryCompanyValue = params.value ? params.value.name : nullCell;
      return wrapThis(params, primaryCompanyValue);
    }

	function contactNameRender(params) {

				//infinite loading
		if (params.data !== undefined) {

            var nameFormat = params.context.nameFormat;

               switch(nameFormat) {
                case 'firstLast':
                    var name = params.data.firstName + ' ' + params.data.lastName;
                    break;
                case 'lastFirst':
                    var name = params.data.lastName + ', ' + params.data.firstName;
                    break;
                default:
                    var name = params.data.firstName + ' ' + params.data.lastName;
            }

			if(params.data.avatar) {

					var template = '<div class="avatar-cell">'
					template += '<div class="avatar" >'
					template += '<div class="avatar-img"><img src="' + params.data.avatar + '" alt="' + params.data.firstName + ' ' + params.data.lastName + '"></div>'
					template += '</div>'
					template += '<span class="avatar-name">' + name + '</span>'
					template += '</div>'

				} 
				else {

					var firstLetter = params.data.firstName ? params.data.firstName.charAt(0) : '';
					var lastLetter = params.data.lastName ? params.data.lastName.charAt(0) : '';

					var template = '<div class="avatar-cell">'
					template += '<div class="avatar" >'
					template += firstLetter + lastLetter
					template += '</div>'
					template += '<span class="avatar-name">' + name + '</span>'
					template += '</div>'

				}
				return wrapThis(params, params.data.firstName || params.data.lastName ? template : nullCell);
			}
		else {
		    return  '<div class="loading-data"></div>';
		}
	}



	function companyNameRender(params) {

		//infinite loading
		if (params.data !== undefined) {

				if(params.data.logo) {

					var template = '<div class="avatar-cell">'
					template += '<div class="avatar square" >'
					template += '<div class="avatar-img"><img src="' + params.data.logo + '" alt="' + params.data.name + '"></div>'
					template += '</div>'
					template += '<span class="avatar-name">' + params.data.name + '</span>'
					template += '</div>'

				} 
				else {

					var firstLetter = params.data.name ? params.data.name.charAt(0) : '';

					var template = '<div class="avatar-cell">'
					template += '<div class="avatar square">'
					template += firstLetter
					template += '</div>'
					template += '<span class="avatar-name">' + params.data.name + '</span>'
					template += '</div>'
				}
				return wrapThis(params, params.value ? template : nullCell);
		}
	    else {
		        return  '<div class="loading-data"></div>';
		}
	}

	// owner render
	function ownerRender(params) {
	    // console.log('owner value' + angular.toJson(params.value));
	    if (params.data !== undefined) {

	    var owner = _.get(params.data, params.colDef.field + ".fullName", null); 
	    var avatar = _.get(params.data, params.colDef.field + ".avatar", null); 
	    var initials = _.get(params.data, params.colDef.field + ".initials", null); 
	    return wrapThis(params, owner ? '<div class="oppOwnerCell"><span class="avatar avatar-sm"><span>' + initials + '</span></span><span class="avatar-name">' + owner + '</span></div>' : nullCell);
	   }
	   else {
        	return  '<div class="loading-data"></div>';
		}
	}


	function oppStageRender(params) {
	   if (params.data !== undefined) {

	     var order = _.get(params.data, params.colDef.field + '.order', 0); 
	     var percent = _.get(params.data, params.colDef.field + '.score', '--'); 
	     var value = _.get(params.data, params.colDef.field + '.value', "N/A");

	    return wrapThis(params, params.data.stage ? '<div class="oppStageCell">' + '<span class="oppStageCell-number">' + percent + '%</span>' + '<span class="oppStageCell-name pull-right">' + value + '</span></div>' : nullCell);
	   }
	   else {
        	return  '<div class="loading-data"></div>';
		}
	}



	//opp status render
	function oppStatusRender(params) {

		//infinite loading
		if (params.data !== undefined) {

		    var color = _.get(params.data, params.colDef.field + '.color', null);
		    var status = _.get(params.data, params.colDef.field + '.label', null); 

		    return wrapThis(params, status != null ? '<div class="oppStatusCell show-ellipsis">' + '<icon style="color:' + color + ';" class="wb-medium-point text-inline"></icon>' + status + '</div>' : nullCell);
		}
	    else {
        	return  '<div class="loading-data"></div>';
		}
	 }






     //

     function getValueByType(type, params){
        switch(type) {
          case 'string':
            return params.value ?  params.value : nullCell;
          break
          case 'domain':
            return params.value ? params.value : nullCell;
          break
          case 'email':
            if(params.value && params.value.length){
            var emailHtml = '';
            //build out visual array
                _.forEach(params.value, function(emailAddress){
                    emailHtml += '<div class="tag">' + emailAddress.value + '</div>';
                })
                return emailHtml;
            } else {
                return nullCell;
            }
          break
          case 'phone':
            if(params.value && params.value.length){
            var phoneHtml = '';
                //build out visual array
                _.forEach(params.value, function(phoneNumber){
                    phoneHtml += '<div class="tag">' + phoneNumber.value + '</div>';
                })
                return phoneHtml;
            } else {
                return nullCell;
            }
          break
          case 'social':
            // console.log('social', params.value);
            if(params.value && params.value.length){
                var socialHtml = '';
                //build out visual array
                _.forEach(params.value, function(social){
                    //push social icons into grid
                    switch(social.type) {
                        case 'twitter':
                            socialHtml += '<span class="fa fa-twitter-square"></span>'
                            break;
                        case 'facebook':
                            socialHtml += '<span class="fa fa-facebook-square"></span>'
                            break;
                        case 'linkedin':
                            socialHtml += '<span class="fa fa-linkedin-square"></span>'
                            break;
                    }
                })
                return socialHtml;
            } else {
                return nullCell;
            }
          break
          case 'address':
            if(params.value && params.value.length){
                var addressHtml = '';
                //build out visual array
                _.forEach(params.value, function(address){
                    var locality = address.locality || '--'
                    var region = address.region || '--'
                    addressHtml += '<div class="tag"><icon class="fa fa-map-marker"></icon> ' + locality + ', ' + region + '</div>';
                })
                return addressHtml;
            } else {
                return nullCell;
            }
          break
          case 'mixed-select':
            return params.value ?  params.value['label'] + ' (' + params.value['value'] + ')' : nullCell;
          break
          case 'currency':
            return params.value ?  numeral(params.value).format('$ 0,0.00') : nullCell;
          break
          case 'date':
            return params.value ? '<span class="date-formatted">' + moment(params.value).format("MMM D, YYYY") + '</span>' : nullCell;
          break
          case 'richDate':
            return params.value ? '<span class="date-formatted">' + moment(params.value).format("MMM D, YYYY") + '</span>' + '<span class="date-quarter">' + 'Q' + moment(params.value).quarter() + '-' + moment(params.value).format("YY") + '</span>' : nullCell;
          case 'array':
            return params.value.length && params.value.length > 1 ? params.value[0]['value'] + ', +' + params.value.length - 1 : nullCell;
          break
          case 'category':
            return _.get(params.data, params.colDef.field + ".label" , null) || nullCell;
          break
          case 'user':
                var firstLetter = _.get(params.data, params.colDef.field + ".firstName" , null) ? _.get(params.data, params.colDef.field + ".firstName" , '').charAt(0) : '';
                var lastLetter = _.get(params.data, params.colDef.field + ".lastName" , null) ? _.get(params.data, params.colDef.field + ".lastName" , '').charAt(0) : '';
                var html = _.get(params.data, params.colDef.field + ".firstName" , '') + ' ' + _.get(params.data, params.colDef.field + ".lastName" , '')
            return (firstLetter || lastLetter) ? html : nullCell;
          case 'tags':
            var tags = _.filter(_.get(params, 'data.itemLinks', []), ['itemType', 'Tag']);
            if(tags.length){
                var html = '';
                _.forEach(tags, function(value){
                    html += '<div class="tag">' + value.name + '</div>';
                })
                return html;
            }
            else {
                return nullCell;
            }
          break
          case 'primaryCompany':
            return _.get(getPrimaryCompany(params), 'name' , null) || nullCell;
          break
          case 'score':
            return _.get(params.data, 'score' , null) || nullCell;
          break

        default:
              return _.get(params.data, params.colDef.field , null) || nullCell;
        }
    }



     function getValueByField(field, params){
        switch(field) {
          case 'name':
              if(currentEntityType == 'Opportunity') {
                var html = params.data._isDeleted ? '<span class="deleted-record">[DELETED]</span> ' + params.value : params.value;
              }
              else if(currentEntityType == 'Contact') {
                var firstLetter = params.data.firstName ? params.data.firstName.charAt(0) : '';
                var lastLetter = params.data.lastName ? params.data.lastName.charAt(0) : '';
                var html = '<div class="avatar avatar-32 ' + params.data.color + '">' + firstLetter + lastLetter + '</div>' + params.data.firstName + ' ' + params.data.lastName;
              }
              else if(currentEntityType == 'Company') {
                var firstLetter = params.data.name ? params.data.name.charAt(0) : '';
                var html = '<div class="avatar avatar-32 square ' + params.data.color + '">' + firstLetter + '</div>' + params.value
              } else {
                var html = params.value;
              }
              return html;
              break;
          case 'primaryCompany':
             return  _.get(getPrimaryCompany(params), 'name' , null) || nullCell;
            break;
          default:
              return _.get(params.data, params.colDef.field , null) || nullCell;
        }
    }





	//Utilities
	//----------------------------------

		/*
		Unpack Columns Defs so can encode server side
		*/
	  function unPackColumnDefs(columnDefs) {

	  	//column defs with functions
	    var colDefsWithFunctions = [
	      'cellRenderer', 
	      'headerCellRenderer', 
	      'valueGetter', 
	      'headerValueGetter', 
	      'headerCellTemplate', 
	      'cellClass', 
	      'comparator', 
	      'getQuickFilterText', 
	      'aggFunc'
	    ]; 

	    //convert strings to functions for appropriate columns. 
	    var newColumnDefs = angular.copy(columnDefs)
	    _.forEach(newColumnDefs, function(columnDef){
	      _.forEach(columnDef, function(value, key) {
	        if(_.includes(colDefsWithFunctions, key))
	          columnDef[key] = _.has(gridFuncs, value) ? gridFuncs[value] : value  //set as function if it is defined
	      })
	    });  
	    return newColumnDefs; 
	  }; 


 });
