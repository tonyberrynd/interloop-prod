angular.module('interloop.factory.gridManager', [])

.factory('gridManager', function($rootScope, $q, $timeout, $injector, $state, searchService, View, EndFields, RelationshipManager, QueryBuilder) {


	// Base Variables
	//=============================================

	//DATA ELEMENTS
	//-------------------------

	//bound grid for factory
	var grid = null;

	//monitors local search and changes datasource
	var localSearch = '';

	//pagination size
	var paginationSize = 100;

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

	//placeholder for selected data
	var selectedData = {
		items: []
	}

	//grid is initializing or not (AKA first time into a  module, example - "Opportunities")
   	var initializing = false;


	//TEMPLATE ELEMENTS
	//-------------------------

	//null cell template
	var nullCell = '<span class="null-cell">--</span>';

	//base select and star definitions inluded on every entity
	var baseDefs = [	
		//select
		{headerName: "--", 
		 field: "select", 
		 headerClass: 'text-center', 
		 cellClass: 'no-padding no-row-click', 
		 headerCheckboxSelectionFilteredOnly: true, 
		 checkboxSelection: true, width: 45, 
		 suppressSizeToFit: true, 
		 suppressMovable: true,
		 suppressResize: true,
		 suppressSorting: true, 
		 pinned: 'left'},

		//star
	    {headerName: "--", 
	      field: "star", 
	      headerClass: 'text-center', 
	      cellRenderer: starRenderer,  
	      cellClass: 'no-padding no-row-click', 
	      width: 45, 
	      suppressSizeToFit: true, 
	      suppressMovable: true, 
	      suppressResize: true,
	      suppressSorting: true, 
	      pinned: 'left'}
	];


    var EnterpriseDatasource = {

        getRows: function(params) {

            console.log('EnterpriseDatasource.getRows: params = ', params);


            //ENTITY NEEDED
            //-------------------------------
            var entityModel = $injector.get(currentEntityType);

            //GROUPING
            //-------------------------------
            if(params.requst && params.requst.rowGroupCols.length) {
                return entityModel.groupBy({'attribute': 'status'})
                    .$promise
                    .then(function(results){
                        params.successCallback(results);
                    })
                    .catch(function(err){
                        params.failCallback();
                    })
            } 
            //no grouping
            else {
                return entityModel.find()
                    .$promise
                    .then(function(results){
                        params.successCallback(results);
                    })
                    .catch(function(err){
                        params.failCallback();
                    })
            }

            
        }
    };


	//datasource
	//build data source so it can be reused
    var dataSource = {
        // rowCount: null, // behave as infinite scroll - not needed for enterprise
        getRows: function (params) {
        	//shows request values
        	//---------------------------------------
        	console.log('asking for ' + params.startRow + ' to ' + params.endRow);

        	//Filter Modal
			//---------------------------------------

            if(params.filterModel) {
                console.log('filter model', params.filterModel);
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
                                if(results.length == 0) {
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
    	dateWithQuarterRender: dateWithQuarterRender,
    	defaultRender: defaultRender,
    	emailRender: emailRender,
    	getNestedOwner: getNestedOwner,
    	numberRender: numberRender,
    	ownerRender: ownerRender,
    	phoneRender: phoneRender,
    	starRenderer: starRenderer,
    	tagsRender: tagsRender,
    	websiteRender: websiteRender,
    	ownerRender: ownerRender,
    	oppStatusRender: oppStatusRender,
    	oppStageRender: oppStageRender,
        getPrimaryCompany: getPrimaryCompany,
        primaryCompanyRender: primaryCompanyRender,
        getLastInteraction: getLastInteraction,
        getRelatedToCount: getRelatedToCount,
        getActivityCount: getActivityCount,
        oppValueRender: oppValueRender,
        MyCellRenderer: MyCellRenderer,
        getOppValueHeader: getOppValueHeader	
    }


	//////////////////////////////////

	//factory object
    var gridManager = {
    	initGrid: initGrid,
    	// getMetaData: getMetaData,
    	getColumns: getColumns,
    	getColumnState: getColumnState,
        getSortModel: getSortModel,
    	getSelectedData: getSelectedData,
    	showHideColumn: showHideColumn,
    	// getCurrentViewId: getCurrentViewId,
    	// getCurrentView: getCurrentView,
    	changeView: changeView,
        changeCurrentQuery: changeCurrentQuery,
        getCurrentQuery: getCurrentQuery,
    	showOverlay: showOverlay,
        purgeCache: purgeCache,
        ensureNodeVisible: ensureNodeVisible,
        refreshInfinitePageCache: refreshInfinitePageCache,
    	clearSelected: clearSelected,
    	refreshView: refreshView,
    	sizeToFit: sizeToFit,
    	exportToExcel: exportToExcel,
    	setLocalSearch: setLocalSearch,
    	getLocalSearch: getLocalSearch,
        setContext: setContext
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

    	//shared end fields
    	var endFields = EndFields;

    	//entity defs
    	var entityDefs = []

    	//loop through and create entity defs
    	_.forOwn(_.merge(entityFields, endFields), function(value, key){

    		var columnObject = {
    			headerName: value.label,
    			field: value.field
    		}

    		//add extra attributes only if definited
    		//----------------------------
            if(value.colId) {columnObject['colId'] = value.colId }
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
    		//cell renderer
    		if(value.cellRenderer) {columnObject['cellRenderer'] = value.cellRenderer }

            if(value.keyCreator) {columnObject['keyCreator'] = value.keyCreator  }

            //if type category - group
            if(value.type == 'category') { columnObject['enableRowGroup'] = true }

    		// name and field required - others optional in field definition
    		entityDefs.push(columnObject);
    	})

    	//Concat column defs
    	var columnDefs = unPackColumnDefs(baseDefs.concat(entityDefs));
    	// console.log(columnDefs);

    	//return appropriate grid options
	    var options = {
		    	// data
		    	//==================================
		        columnDefs: columnDefs,
		        rowData: null,

		        // row model
		        //==================================
                rowModelType: 'infinite',
			    // rowModelType: 'enterprise',
                // rowGroupPanelShow: 'always',
			    // how big each page in our page cache will be, default is 100
			    paginationPageSize: paginationSize,
			    // how many extra blank rows to display to the user at the end of the dataset,
			    // which sets the vertical scroll and then allows the grid to request viewing more rows of data.
			    // default is 1, ie show 1 row.
			    paginationOverflowSize: 2,
			    // how many server side requests to send at a time. if user is scrolling lots, then the requests
			    // are throttled down
			    maxConcurrentDatasourceRequests: 3,
			    // how many rows to initially show in the grid. having 1 shows a blank row, so it looks like
			    // the grid is loading from the users perspective (as we have a spinner in the first col)
			    infiniteInitialRowCount: 0,
			    // how many pages to store in cache. default is undefined, which allows an infinite sized cache,
			    // pages are never purged. this should be set for large data to stop your browser from getting
			    // full of data
			    maxPagesInCache: 5,
			    //return mongoID as node ID
			    getRowNodeId: function(item) {
			        return item.id.toString();
			    },

		        // height
		        //==================================
		        headerHeight: 40,
		        rowHeight: 50,

		        // adjust
		        //==================================
		        enableColResize: true,

		        //panel
		        //==================================
		        showToolPanel: false,

		        //sorting
		        //==================================
		        unSortIcon: false,
		        //server side filtering to work with infinite scroll
		        enableServerSideSorting: true,
    			enableServerSideFilter: true,

		        //animation
		        //==================================
		        animateRows: false,

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
		    		sortAscending: '<img src="./assets/img/grid/sortAscending.svg" style="width: 20px;"/>',
					sortDescending: '<img src="./assets/img/grid/sortDescending.svg" style="width: 20px;"/>',
			    	groupExpanded: '<img src="./assets/img/grid/groupExpanded.svg" style="width: 40px; padding:10px; margin-top:-2px;"/>',
					groupContracted: '<img src="./assets/img/grid/groupContracted.svg" style="width: 40px; padding:10px; margin-top:-2px;"/>',
					checkboxChecked: '<img src="./assets/img/grid/checkboxChecked.svg" style="width: 40px; padding:10px; margin-top:-2px;"/>',
					checkboxUnchecked: '<img src="./assets/img/grid/checkboxUnchecked.svg" style="width: 40px; padding:10px; margin-top:-2px;"/>',
					checkboxIndeterminate: '<img src="./assets/img/grid/checkboxIndeterminate.svg" style="width: 40px; padding:10px; margin-top:-2px;"/>'
				},

				//Context
				//==================================
				context: {
		              valueType: 'total',
		              changeHistory: 'none',
		              changeHistoryDuration: 7,
		              nameFormat: 'first last'
		         },
    
				// enterpise
				//==================================
		        enableStatusBar: false,
		        enableRangeSelection: false,
		        suppressContextMenu: true,
		        suppressMenuMainPanel: true,
		        suppressMenuFilterPanel: true,
		        suppressMenuColumnPanel: true,

		        // default column
		        //==================================
		        defaultColDef: {
		              // make every column editableq
		              editable: false,
		              cellRenderer: defaultRender,
                      cellClassRules: {
                         'updated-cell-indicator': function(params) { 
                            if(params.data == undefined) {
                                return false
                            } else {
                                return _.filter(params.data.changeHistories, ['attribute', params.colDef.field]).length > 0 && params.context.changeHistory == 'indicator';
                            }
                          },
                          'updated-cell-full': function(params) { 
                            if(params.data == undefined) {
                                return false
                            } else {
                                return _.filter(params.data.changeHistories, ['attribute', params.colDef.field]).length > 0 && params.context.changeHistory == 'full';
                            }
                          }
                     }
		         },

		         //events
		         //==================================
				onGridReady: gridReady,
				onRowClicked: rowClicked,
				// onCellFocused: cellFocused,
				onSelectionChanged: selectionChanged
	    	};

	    	//resolve the options
            defer.resolve(options);

	    return defer.promise;
    }



    //ON READY EVENT
    //========================================
    function gridReady(params) {

        console.log('gridReady!');
    	//bind grid instance for factory
    	//-----------------------------
    	grid = params;

		//Set UP Grid Data Source
		//TODO - WILL CHANGE WHEN AG_GRID 10 COMES OUT WITH ENTERPRISE ROWS MODEL
		//----------------------------------

        //regular data source
		grid.api.setDatasource(dataSource);

        //enterprise data source
        // grid.api.setEnterpriseDatasource(EnterpriseDatasource);


		//if has a columnState, set column state
		//-----------------------------------
      //   if(currentView.columnState) {
    		// grid.api.setColumnState(currentView.columnState)
      //   }


		//if has sort model, set sort model
		//------------------------------------
        // if(currentView.sortModel) {
        //     grid.api.setSortModel(currentView.sortModel)
        // }

        //let controller know
        $rootScope.$broadcast('GRID_READY', {});

    }


    /*
    Change View
    */
    function changeView(changeToView) {
    	grid.api.showLoadingOverlay()
    	//set current view
    	currentView = changeToView;
        //set current query
        currentQuery = changeToView.query || {"filter": {}};
    	//reset data source
    	grid.api.setDatasource(dataSource);
    	//wait 1/4 second to hide overlay
    	$timeout(function(){
   			//hide overlay
    		grid.api.hideOverlay()
    	}, 250)
    }


    /*
    Change Filter Model
    */
    function changeCurrentQuery(filters) {

        grid.api.showLoadingOverlay()

        //set current view
        currentQuery.filter['where'] = QueryBuilder.buildQuery(filters);

        //get new metadata for this query
        var entityModel = $injector.get(currentEntityType);

        return entityModel.metadata({"filter": currentQuery.filter.where}).$promise
                .then(function(results){

                    console.log('got metadata');

                    //set last row
                    lastRow = results.count || 0;

                    //reset data source
                    grid.api.setDatasource(dataSource);
                    //wait 1/4 second to hide overlay
                    $timeout(function(){
                        //hide overlay
                        grid.api.hideOverlay()
                    }, 250)

                    return results;
                })
                .catch(function(err){
                    //SWITCH BACK TO CURRENT VIEW OR SOMETING??

                    console.log(err);
                })
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
        if(params.data !== undefined) {
        	$timeout(function(){
        		$state.go('app.sidebar.' + currentEntityType.toLowerCase() + '.insights', {'id': params.node.id}, {reload: 'app.sidebar.' + currentEntityType.toLowerCase() });
        		$rootScope.sidebarOpen = true;
        	}, 0);
        }
    }


    /*
    Selection Changed
    */
    function selectionChanged(params) {
    	 $timeout(function(){
       		selectedData.items = grid.api.getSelectedRows();
    	}, 0);
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
        grid.api.purgeInfinitePageCache();
    }

    /*
    Refresh Infinite Page Cache
    */
    function refreshInfinitePageCache() {
        grid.api.refreshInfinitePageCache();
    }
    /*
    Show Overlay
    */
    function showOverlay() {
    	grid.api.showLoadingOverlay()
    }

    /*
    Refresh View
    */
    function refreshView() {
    	console.log('refresh in factory');
    	grid.api.showLoadingOverlay()
		//refresh
		grid.api.refreshView();
		//hide overlay
		$timeout(function(){
			grid.api.hideOverlay()
		}, 250)

    }

    /*
    Clear Selected
    */
    function clearSelected(params) {
		//clear selected data
		selectedData.items = [];
		//deselect rows
		grid.api.deselectAll()
    }

    /*
    Size to fit
    */
    function sizeToFit(params) {
    	grid.api.sizeColumnsToFit();
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


    //==================================
    //Getters / Setters
    //==================================

    /*
    Local Search
    */
    function setLocalSearch(value) {
    	localSearch = value;
        //resets data source now using searching route vs basic query routes
        $timeout(function(){
            grid.api.setDatasource(dataSource);
        }, 0)
    	
    }

    /*
    Local Search
    */
    function getLocalSearch(value) {
    	return localSearch
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
    Get Selected Data
    */
    function getSelectedData() {
    	return selectedData;
    }

    /*
    Set Context
    */
    function setContext(contextItem, value) {
        console.log('contextItem', contextItem);
        console.log('contextValue', value);
        //clear cache
        grid.api.gridOptionsWrapper.gridOptions.context[contextItem] = value;
        //refresh header
        grid.api.refreshHeader();
        //refresh grid
        grid.api.refreshInfinitePageCache();
    }



    //==================================
    //Rendering & Sorting Functions Go Here
    //==================================

	//Value Getters
	//----------------------------------

	function getNestedValue(params) {
    	return _.get(params.data, params.colDef.field + ".value" , null);  
	}

	//owner is a little different than nested value
	function getNestedOwner(params) {
    	return _.get(params.data, params.colDef.field + ".fullName" , null);  
	}


    function getNestedStage(params) {
        return _.get(params.data, params.colDef.field + ".score" , null);
    }

    //get primary company
    function getPrimaryCompany(params) {
        return _.get(params.data, 'entityLinks', null) ? RelationshipManager.getPrimary(params.data.entityLinks, "Company") : null;
    };

    //get activity counts
    function getActivityCount(params) {
        var activityLinks = _.get(params.data, 'activityLinks', null);
        return activityLinks ? _.filter(activityLinks, ['_isDeleted', false]).length : null;
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


    //Default Render
	//----------------------------------
	function defaultRender(params) {
		//shows nothing when infinite scroll is triggered
		 if (params.data !== undefined) {
                return params.value ? params.value : nullCell;
            } else {
                return  '<div class="loading-data"></div>';
         }
	}

	//Star Renderer as Component
	//----------------------------------
	function starRenderer (params) {

		var eDiv = document.createElement('div');
	    eDiv.innerHTML = '<span><button class="btn btn-link star-button"><icon class="wb-star"></icon></button></span>';
	    var eButton = eDiv.querySelectorAll('.star-button')[0];

	    eButton.addEventListener('click', function() {
	        console.log('button was clicked!!');
	    });

	    return eDiv;

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
	      element.className = "star is-starred no-panel-open"
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


	//Generic Renders
	//----------------------------------

	function dateRender(params) {
		 if (params.data !== undefined) {
                return params.value ? '<span class="date-formatted">' + moment(params.value).format("MMM D YYYY") + '</span>' : nullCell;
            } else {
                return '<div class="loading-data"></div>';
         }
	}

	function dateWithQuarterRender(params) {
		if (params.data !== undefined) {
                return params.value ? '<span class="date-formatted">' + moment(params.value).format("MMM D YYYY") + '</span>' + '<span class="date-quarter">' + 'Q' + moment(params.value).quarter() + '</span>' : nullCell;
            } else {
                return '<div class="loading-data"></div>';
        }
	}


	function emailRender(params) {
		if (params.data !== undefined) {
                return params.value ? '<a href="mailto:' + params.value + '">' + params.value + '</a>' : nullCell;
            } else {
                return '<div class="loading-data"></div>';
        }	
	}

	function phoneRender(params) {
		if (params.data !== undefined) {
                return params.value ? '<a href="tel:' + params.value + '">' + params.value + '</a>' : nullCell;
            } else {
                return '<div class="loading-data"></div>';
        }
	}

	function websiteRender(params) {
		if (params.data !== undefined) {
                return params.value ? '<a href="' + params.value + '" target="_blank">' + params.value + '</a>' : nullCell;
            } else {
                return '<div class="loading-data"></div>';
        }
	}

	//TODO - ALLOW FOR MULTIPLE CURRENCIES
	function currencyRender(params) {
		if (params.data !== undefined) {
                return params.value ?  numeral(params.value).format('$ 0,0.00') : nullCell;
            } else {
                return '<div class="loading-data"></div>';
        }
	}


	function numberRender(params) {
		if (params.data !== undefined) {
                return params.value ? numeral(params.value).format('0,0') : nullCell;
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
		      return html;
		    }
		    else {
		      return '<span class="null-cell">--</span>';
		    }
		 }

	      else {
	        return  '<div class="loading-data"></div>';
	 	}
	 }


	function ownerRender(params) {
		if (params.data !== undefined) {
                return params.value ? params.value : nullCell;
            } else {
                return '';
        }
	}


    //Custom Renders
	//----------------------------------

    function oppValueRender(params) {
        //value type
        var valueType = params.context.valueType;
        //switch type
        switch (valueType) {
            case 'total': return params.value ? numeral(params.value).format('$ 0,0.00') : nullCell;
            case 'weighted': return params.value ? numeral((_.get(params.data.stage, 'score', 0) * .01) * params.value).format('$ 0,0.00') : nullCell;
            case 'predicted': return params.value ? numeral(params.value * .85).format('$ 0,0.00') : nullCell; // TODO - REPLACE WITH PREDICTIVE CONFIDENCE
        }
    }

    function primaryCompanyRender(params) {
      return params.value ? params.value.name : nullCell;
    }

	function contactNameRender(params) {

				//infinite loading
		if (params.data !== undefined) {

			if(params.data.avatar) {

					var template = '<div class="avatar-cell">'
					template += '<div class="avatar" >'
					template += '<div class="avatar-img"><img src="' + params.data.avatar + '" alt="' + params.data.firstName + ' ' + params.data.lastName + '"></div>'
					template += '</div>'
					template += '<span class="avatar-name">' + params.data.firstName + ' ' + params.data.lastName + '</span>'
					template += '</div>'

				} 
				else {

					var firstLetter = params.data.firstName ? params.data.firstName.charAt(0) : '';
					var lastLetter = params.data.lastName ? params.data.lastName.charAt(0) : '';

					var template = '<div class="avatar-cell">'
					template += '<div class="avatar" >'
					template += firstLetter + lastLetter
					template += '</div>'
					template += '<span class="avatar-name">' + params.data.firstName + ' ' + params.data.lastName + '</span>'
					template += '</div>'

				}
				return params.data.firstName || params.data.lastName ? template : nullCell;
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
				return params.value ? template : nullCell;
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
	    return owner ? '<div class="oppOwnerCell"><span class="avatar avatar-sm"><span>' + initials + '</span></span><span class="avatar-name">' + owner + '</span></div>' : nullCell;
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

	    return params.data.stage ? '<div class="oppStageCell">' + '<span class="oppStageCell-number">' + percent + '%</span>' + '<span class="oppStageCell-name pull-right">' + value + '</span></div>' : nullCell;
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

		    return status != null ? '<div class="oppStatusCell show-ellipsis">' + '<icon style="color:' + color + ';" class="wb-medium-point text-inline"></icon>' + status + '</div>' : nullCell;
		}
	    else {
        	return  '<div class="loading-data"></div>';
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
