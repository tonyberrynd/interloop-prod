angular.module('interloop.factory.gridManager', [])

.factory('gridManager', function($rootScope, $timeout, $injector, View, Logger, Appuser, ViewManager) {

	//bound grid for factory
	var grid = null;
	//min max av - etc
	var metaData = {};
	//columns
	var columns = [];
	//selectedItems
	var selectedData = {};

	//current entity & current view
	var currentEntityType = null;
	var firstViewId = null;

	var currentView = {};
	var prevView = {};

	var nullCell = '<span class="null-cell">--</span>';

	//base select and star definitions
	// var baseDefs = [	

	// 	{headerName: "", 
	// 	 field: "select", 
	// 	 cellClass: 'no-padding no-row-click', 
	// 	 headerCheckboxSelection: true, 
	// 	 headerCheckboxSelectionFilteredOnly: true, 
	// 	 checkboxSelection: true, width: 50, 
	// 	 suppressSizeToFit: true, 
	// 	 suppressMovable: true,
	// 	 suppressResize: true,
	// 	 suppressSorting: true, 
	// 	 pinned: 'left'},

	// 	//star
	//     {headerName: "--", 
	//       field: "star", 
	//       headerClass: 'text-center', 
	//       cellRenderer: starRenderer,  
	//       cellClass: 'no-padding no-row-click', 
	//       width: 50, 
	//       suppressSizeToFit: true, 
	//       suppressMovable: true, 
	//       suppressResize: true,
	//       suppressSorting: true, 
	//       pinned: 'left'}];

	// var endDefs = [
	// 	{headerName: "Last Updated", field: "updatedOn", cellRenderer: 'dateRender'},
	// 	{headerName: "Updated By", field: "updatedBy", valueGetter: 'getNestedOwner'},
	//     {headerName: "Created Date", field: "createdOn", cellRenderer: 'dateRender'},
	//     {headerName: "Created By", field: "createdBy", valueGetter: 'getNestedOwner'},
	// ]	    

	var gridFuncs = {
		getNestedValue: getNestedValue,
    	getNestedOwner: getNestedOwner,
    	defaultRender: defaultRender,
    	starRenderer: starRenderer,
    	dateRender: dateRender,
    	dateWithQuarterRender: dateWithQuarterRender,
    	emailRender: emailRender,
    	phoneRender: phoneRender,
    	websiteRender: websiteRender,
    	currencyRender: currencyRender,
    	numberRender: numberRender,
    	contactNameRender: contactNameRender,
    	tagsRender: tagsRender,
    	tagSorter: tagSorter,
    	sortNullsBottom: sortNullsBottom,
    	sortNullsBottomNumber: sortNullsBottomNumber,
    	ownerRender: ownerRender
	}
	//////////////////////////////////

	//factory object
    var gridManager = {
    	initGrid: initGrid,
    	getMetaData: getMetaData,
    	getColumns: getColumns,
    	getSelectedData: getSelectedData,
    	getCurrentViewId: getCurrentViewId,
    	getCurrentView: getCurrentView,
    	changeView: changeView,
    	refreshView: refreshView,
    	sizeToFit: sizeToFit,
    	exportToExcel: exportToExcel
    };

    /**
	 * Number.prototype.format(n, x)
	 * 
	 * @param integer n: length of decimal
	 * @param integer x: length of sections
	 */
	Number.prototype.formatNumber = function(n, x) {
	    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
	};


    return gridManager;

    ////////


    //=============================================


    function buildColumnDefs(baseDefs, fields) {

    	var columnDefs = angular.copy(baseDefs);

    	_.forEach(fields, function(value, key) {

    		var columnObject = {
    			headerName: value.label,
    			field: value.field
    		}

    		//add extra attributes only if definited
    		//----------------------------
    		//width
    		if(value.width) {columnObject['width'] = value.width }
    		//pinned
    		if(value.pinned) {columnObject['pinned'] = value.pinned }
    		//hidden
    		if(value.hide) {columnObject['hide'] = value.hide }
    		//value getter
    		if(value.valueGetter) {columnObject['valueGetter'] = value.valueGetter }
    		//cell renderer
    		if(value.cellRenderer) {columnObject['cellRenderer'] = value.cellRenderer }
    		//comparator
    		if(value.comparator) {columnObject['comparator'] = value.comparator }

    		// name and field required - others optional in field definition
    		columnDefs.push(columnObject);
    	})

    	//add end defs
    	//updated on, by etc
    	var fullColumnDefs = columnDefs.concat(endDefs);

    	console.log(fullColumnDefs);

    	return fullColumnDefs;
    }

    /*
    Grid Setup
    */
    function initGrid(entityType, viewId) {

    	//clear selected data
    	selectedData = {};

    	//set current entity & view
    	currentEntityType = entityType;

    	//
    	firstViewId = viewId;

    	//return appropriate grid options
	    var options = {
		    	// data
		    	//==================================
		        columnDefs: null,
		        rowData: null,

		        // height
		        //==================================
		        headerHeight: 45,
		        rowHeight: 54,

		        // adjust
		        //==================================
		        enableColResize: true,

		        //panel
		        //==================================
		        showToolPanel: false,

		        //sorting
		        //==================================
		        enableSorting: true,
		        unSortIcon: false,

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
		              valueType: 'Total',
		              changeHistory: 'None',
		              changeHistoryType: 'Full',
		              nameFormat: 'First Last'
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
		              // make every column editable
		              editable: false,
		              cellRenderer: defaultRender,
		              comparator: sortNullsBottom
		         },

		         //events
		         //==================================
				onGridReady: gridReady,
				onCellFocused: cellFocused,
				onSelectionChanged: selectionChanged
	    };

	    return options;
    }


    //Events
    //==========================================

    //bind grid to this facotry
    function gridReady(params) {
    	//bind grid instance for factory
    	grid = params;

    	//fist time need to go get view by id
    	View.findOne({"filter": {"where": {"id": firstViewId}}})
    		.$promise
    		.then(function(results){
    			//calls get data
				getData(results) 

				//set back to null
				firstViewId = null; 

    		})
    		.catch(function(err){
    			//view not found
    			Logger.error('View Not Found')

    			//set back to null
				firstViewId = null; 
    		})
    }

    function cellFocused(params) {
    	// console.log(params);
    	// event.preventDefault();
    }

    //grid row clicked
    function rowClicked(params) {

    	
    	console.log(params);
    	//if has no-row-click class - don't do anything
    	if(params.event.target.className.indexOf('no-row-click') > -1) {
		    return;
		    // do nothing
		} else {
  
	    	//drop into angular digest cycle
	    	$rootScope.$apply(function () {
	            $rootScope.sidebarOpen = true;
	        });

	    }
    }


    function selectionChanged(params) {

    	$rootScope.$apply(function(){
    		selectedData.items = grid.api.getSelectedRows();
    	});
    }

    //change view

    function changeView(view) {
    	//change it
    	getData(view);
    }



    //DATA MANAGEMENT
    //==========================================

    function getData(view){


    	console.log('get data for view', view);

    	// console.log('get data current view'. currentView)
    	//show loading indicator in controller
    	grid.api.showLoadingOverlay();

    	// entity model
		var entityModel = $injector.get(currentEntityType);
		return entityModel.find(view.query)
				.$promise
				.then(function(results){

					//set current view
					currentView.view = view;

					console.log(currentEntityType);

					//TODO - GET FROM DATA
					var entityFields = $injector.get('FIELDS-' + currentEntityType);
					console.log(entityFields);

					var columnDefs = buildColumnDefs(baseDefs, entityFields);
					console.log(columnDefs);
					//set into row data
					grid.api.setColumnDefs(unPackColumnDefs(columnDefs));
					grid.api.setRowData(results);

					//set metaData
					//-------------------------------------------
					metaData.count = grid.api.getModel().getRowCount()

					if(currentEntityType == 'Opportunity') {
						//min - max - averge
						metaData.min = _.min(_.map(results, 'value'));
						metaData.max = _.max(_.map(results, 'value'));
						metaData.avg = _.meanBy(results, 'value');
					}

					//columns
					//-------------------------------------------
					columns = grid.columnApi.getColumnState();


				})
	    		.catch(function(err){
	    			Logger.error('Cant Retrieve Records');
	    			grid.api.hideOverlay();

	    		})
    }

    function getCurrentViewId() {
    	return currentViewId;
    }

    function getCurrentView() {
    	return currentView;
    }

    function getMetaData() {
    	return metaData;
    }

    function getColumns() {
    	return columns;
    }

    function getSelectedData() {
    	return selectedData;
    }


    //GRID API 
    //==========================================

    //refresh view
    function refreshView() {
		var thisView = angular.copy(currentView.view);
		//clear selected data
		selectedData.items = [];
		//re-get data
		getData(thisView);
    }

	//size to fit
    function sizeToFit(params) {
    	grid.api.sizeColumnsToFit();
    }

    //export to excel
    function exportToExcel(params) {
    	grid.api.exportDataAsExcel({
    		fileName: 'test.xls'
    	});
    }


    //UTILITIES
    //==========================================
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


    //Default Render
	//----------------------------------
	function defaultRender(params) {
		return params.value ? params.value : nullCell;
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
		return params.value ? '<span class="date-formatted">' + moment(params.value).format("MMM D YYYY") + '</span>' : nullCell;
	}

	function dateWithQuarterRender(params) {
		return params.value ? '<span class="date-formatted">' + moment(params.value).format("MMM D YYYY") + '</span>' + '<span class="date-quarter">' + 'Q' + moment(params.value).quarter() + '</span>' : nullCell;
	}


	function emailRender(params) {
		return params.value ? '<a href="mailto:' + params.value + '">' + params.value + '</a>' : nullCell;
	}

	function phoneRender(params) {
		return params.value ? '<a href="tel:' + params.value + '">' + params.value + '</a>' : nullCell;
	}

	function websiteRender(params) {
		return params.value ? '<a href="' + params.value + '" targe="_blank">' + params.value + '</a>' : nullCell;
	}

	//TODO - ALLOW FOR MULTIPLE CURRENCIES
	function currencyRender(params) {
		return params.value ? '$' + params.value.formatNumber() : nullCell;
	}


	function numberRender(params) {
		return params.value ? params.value.formatNumber() : nullCell;
	}


	 function tagsRender(params) {
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


	function ownerRender(params) {
		return params.value ? params.value.firstName + ' ' + params.value.lastName : nullCell;
	}


    //Custom Renders
	//----------------------------------

	function contactNameRender(params) {

		if(params.data.avatar) {

			var firstLetter = params.data.firstName ? params.data.firstName.charAt(0) : '';
			var lastLetter = params.data.lastName ? params.data.lastName.charAt(0) : '';

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

		return params.value ? template : nullCell;
	}



	//Custom Comparators
	//----------------------------------

	/*
	Sorts Nulls to Bottom - Converts numbers to string fro comparison
	*/
	function sortNullsBottom(valueA, valueB, nodeA, nodeB, isInverted) {

	  //if value is null - puts them at bottom
      var value1 = (_.isNil(valueA) || valueA == '') ? 'zzz' : (valueA.toString()).toLowerCase();
      var value2 = (_.isNil(valueB) || valueB == '') ? 'zzz' : (valueB.toString()).toLowerCase();

      return  value1.localeCompare(value2, undefined, {numeric: true});


	 	
	 }


	 /*
	 Sorts Nulls to Bottom - Converts numbers to string fro comparison
	*/
	function sortNullsBottomNumber(valueA, valueB, nodeA, nodeB, isInverted) {

	  //if value is null - puts them at bottom
      var value1 = (_.isNil(valueA) || valueA == '') ? -1 : valueA;
      var value2 = (_.isNil(valueB) || valueB == '') ? -1 : valueB;

      return  value2 - value1
	 	
	 }

	/*
	Sort Tags Based on Number of Tags
	*/
	 function tagSorter(valueA, valueB, nodeA, nodeB, isInverted) {

	      var value1 = nodeA.data.itemLinks ? _.filter(nodeA.data.itemLinks, {"itemType": "Tag"}).length : 0;
	      
	      var value2 = nodeB.data.itemLinks  ? _.filter(nodeB.data.itemLinks, {"itemType": "Tag"}).length : 0;

	      return value2 - value1;
	 }



	//Utilities
	//----------------------------------




 });