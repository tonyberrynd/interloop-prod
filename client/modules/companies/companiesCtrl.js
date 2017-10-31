/* ==========================================================================
   Opportunities Ctrl
   ========================================================================== */

angular.module('interloop.companiesCtrl', [])

//declare dependencies
.controller('companiesCtrl', function(
  $injector,
  $location,
  $q,
  $rootScope,
  $scope,
  $state,
  $stateParams,
  $timeout,
  $window,
  Appuser,
  EndFields,
  gridManager,
  Logger,
  modalManager,
  CompanyFields,
  SidebarRouter,
  View,
  ViewManager
  ) {

// BINDABLES
//===========================================
  
  //vars
  //----------------------
  var initializing = true;
  var initFilters = true;
  var query = $location.search().query || null;
  var count = $location.search().count || 0;
  var backUrl = $location.search().backUrl || null;
  var oppId = $location.search().id || null;
  var viewFilters = null;

  //data
  //----------------------
  $scope.data = {};
  $scope.data.currentEntity = "Company";
  $scope.data.lookupUsers = false;
  $scope.data.activated = false;
  $scope.data.drawerOpen = false;
  $scope.data.filterChanged = false;
  $scope.data.toggleColumns = true;
  $scope.data.loadingResults = false;
  $scope.data.serverError = false;
  $scope.data.filterMatches = 'all';
  $scope.data.filterView = 'filters';
  $scope.data.searchVal = '';

  //dropdowns
  $scope.data.valueType = 'total';
  $scope.data.overlay = 'none';
  $scope.data.includeDeleted = 'false';
  $scope.data.overlayDuration = '7';

  //datepicker
  $scope.datePicker = {};
  $scope.datePicker.date = {startDate: null, endDate: null};
  $scope.datePicker.date2 = {startDate: null, endDate: null};

  //bind to gridmanager values
  $scope.data.localSearch = gridManager.getLocalSearch();
  $scope.data.localSearchLength = gridManager.getLocalSearchResults();
  $scope.data.selectedData = gridManager.getSelectedData();


  //functions
  //----------------------
  $scope.addFilter = addFilter;
  $scope.addGroup = addGroup;
  $scope.autoSize = autoSize;
  $scope.bulkAssign = bulkAssign;
  $scope.bulkCreateView = bulkCreateView;
  $scope.bulkDelete = bulkDelete;
  $scope.bulkEdit = bulkEdit;
  $scope.bulkExport = bulkExport;
  $scope.bulkTag = bulkTag;
  $scope.changeContext = changeContext;
  $scope.changeLocalSearch = changeLocalSearch;
  $scope.changeView = changeView;
  $scope.clearAllFilters = clearAllFilters;
  $scope.clearFilter = clearFilter;
  $scope.clearLookupValues = clearLookupValues;
  $scope.clearSelected = clearSelected;
  $scope.createView = createView;
  $scope.deleteView = deleteView;
  $scope.discardChanges = discardChanges;
  $scope.editView = editView;
  $scope.exportView = exportView;
  $scope.getLookupValue = getLookupValue;
  $scope.goBackCustomQuery = goBackCustomQuery;
  $scope.importData = importData;
  $scope.initialFilters = initialFilters;
  $scope.isCategoryActive = isCategoryActive;
  $scope.isFilterActive = isFilterActive;
  $scope.isLargeScreen = isLargeScreen;
  $scope.pinUnpinColumn = pinUnpinColumn;
  $scope.refreshView = refreshView;
  $scope.removeGroup = removeGroup;
  $scope.saveView = saveView;
  $scope.saveViewAs = saveViewAs;
  $scope.selectVisible = selectVisible;
  $scope.setFilterModel = setFilterModel;
  $scope.setRowGroupColumns = setRowGroupColumns;
  $scope.setUnsetDefault = setUnsetDefault;
  $scope.showHideColumn = showHideColumn;
  $scope.sizeToFit = sizeToFit;
  $scope.toggleColumns = toggleColumns;
  $scope.toggleDrawer = toggleDrawer;
  $scope.toggleOpen = toggleOpen;
  $scope.updateGrid = updateGrid;
  $scope.selectUsers = selectUsers;
  $scope.applyUsers = applyUsers;
  $scope.selectTags = selectTags;
  $scope.applyTags = applyTags;
  $scope.focusSelect = focusSelect;
  $scope.columnStateChanged = columnStateChanged;
  $scope.isObjectShouldBeString = isObjectShouldBeString;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

  //Get All Views for List
  //------------------------------------------
  return View.find({"filter": {"where": {"entity": "Company"}}}).$promise
          .then(function(results){
            //set views into scope
            $scope.data.views = results;

          //Get Current View
          //------------------------------------------
          return ViewManager.getThisView('Company', $scope.data.views, $stateParams.viewId, query, count)
              .then(function(results){
                //set this view
                $scope.data.thisView = results;

                //match type
                $scope.data.filterMatches = $scope.data.thisView.matchType || 'all';

                //metadata
                $scope.data.count = $scope.data.thisView.count;
                $scope.data.sum = $scope.data.thisView.sum;
                $scope.data.min = $scope.data.thisView.min;
                $scope.data.max = $scope.data.thisView.max;
                $scope.data.avg = $scope.data.thisView.avg;


                //whether to show default toggle
                if($scope.data.thisView.id == $rootScope.activeUser.defaultViews['Company']) {
                  $scope.data.default = true;
                }

                //Init Grid
                //------------------------------------------
                return gridManager.initGrid('Company', $scope.data.thisView)
                  .then(function(results){
                    //grid instance
                    $scope.data.grid = results;
                    // wrap in timeout to allow digest cycle for data.grid to get bound
                    $timeout(function(){
                      //Filters
                      //-----------------------
                      //base field definitions for filters
                      viewFilters = angular.copy($scope.data.thisView.filters) || [];
                      //custom fields
                      var customFields = _.filter($rootScope.customFields,function(o){
                        return _.includes(o.useWith, 'Company') && o.type !== 'divider';
                      })
                      //end fields
                      var endFields = EndFields || [];
                      //set up fields for filters
                      var fields = _.union(CompanyFields, customFields, endFields);
                      //create filters
                      $scope.data.filters = initialFilters(viewFilters, fields);

                      //Columns
                      //-------------------------
                      $scope.data.columns = gridManager.getColumns();
                      $scope.data.columns.splice(0, 3);

                      //Groups
                      //------------------------
                      $scope.data.groups = _.filter(fields, function(o) { return o.type == 'category' || o.type == 'lookup' || o.allowGroup });
                      $scope.data.activeGroups = []; //populate if view has groups

                      //Activate
                      //---------------------------
                      $scope.data.activated = true;

                      //if link to individual opp - open sidebar
                      //--------------------------------------
                      if(oppId) {
                        //open sidebar
                        SidebarRouter.openTo('Company', oppId)
                      }

                    },250);
                })
          })
  })
  .catch(function(err){
    Logger.log(err);
    //otherwise go to the default view for the user - would think most times this would work
    $state.go('app.companies', {viewId: 'default'});
  })
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
Toggle Columns
*/
function toggleColumns(selectAll){
    _.forEach($scope.data.columns, function(column){
      showHideColumn(column, selectAll)
    })
}

/*
Toggle Drawer
*/
function toggleDrawer(){
  gridManager.doLayout();
  $rootScope.drawerOpen = !$rootScope.drawerOpen
}

/*
Select Visible
*/
function selectVisible(){
  gridManager.selectVisible();
}

/*
Build Out Filters
*/
function buildFilters(fields, activeFilters) {
   var filters = [];

  //build out filters for sidepanel
  _.forEach(fields, function(value){
    filters.push({
      'open': false,
      'key': value.key,
      'label': value.label,
      'type': value.type,
      'filters': []
    })
  })

  //Add in current active filters
  _.forEach(activeFilters, function(value){
      var thisFilter = _.find(filters, ['key', value.key]);
          thisFilter.open = true;
          thisFilter.filters.push(value);
  })

  return filters;
}

/*
Add Filters
*/
function addFilter(filter){
  if(filter.open && !filter.filters.length) {
    filter.filters.push({})
  }
}

/*
Go Back To Custom Query
*/
function goBackCustomQuery() {
  // console.log(backUrl);
  $location.url(backUrl);
}

/*
Check If Large Screen
*/
function isLargeScreen() {
  return $window.matchMedia('screen and (max-width: 540px)').matches;
}

/*
Save View
*/
function saveView() {
  var viewDetails = {
      name: $scope.data.thisView.name,
      entity: 'Company',
      query: angular.toJson(gridManager.getCurrentQuery()),
      filters: getFilters(),
      columnState: gridManager.getColumnState(),
      sortModel: gridManager.getSortModel(),
      matchType: $scope.data.filterMatches
  };
  //save view
  View.prototype$patchAttributes({"id": $scope.data.thisView.id}, viewDetails ).$promise
    .then(function(results){
      Logger.info('Saved View');

      //don't show change toolbar
      $scope.data.filterChanged = false;
    })
    .catch(function(err){
      Logger.error('Error Saving View');
    })
}

/*
Discard Changes
*/
function discardChanges() {
  $scope.data.filters = initialFilters(viewFilters, _.union(CompanyFields, EndFields))
  //set filter cahnged to false
  $scope.data.filterChanged = false;
  //update grid
  updateGrid();
}

/*
Save View As
*/
function saveViewAs() {
    //get view details
    var resolvedData = {
        entity: 'Company',
        query: gridManager.getCurrentQuery(),
        filters: getFilters(),
        columnState: gridManager.getColumnState(),
        sortModel: gridManager.getSortModel(),
        matchType: $scope.data.filterMatches
    };

    //open modal
    var saveViewModal = modalManager.openModal('createView', resolvedData);
    //push view into views array
    saveViewModal.result.then(function(results) {
      //append count and sum
      results.count = $scope.data.count;
      results.sum = $scope.data.sum;
      //push into available views
      $scope.data.views.push(results);
    })
}

/*
Edit View
*/
function editView() {
  modalManager.openModal('editView', $scope.data.thisView);
}

/*
Delete View
*/
function deleteView(){
  modalManager.openModal('deleteView', $scope.data.thisView);
}

/*
Build Bulk Query
*/
function buildBulkQuery(){
  var isSelectAllOn = angular.copy($scope.data.selectedData.selectAll);
  //if select all is selected - everything minus those unselected
  if(isSelectAllOn){

    var currentQuery = _.get($scope.data.thisView, 'query.where', null) || {};
    var bulkQuery = {"filter": {"where": {"and": [{"id": {"nin": _.map($scope.data.selectedData.items, 'id')}}, currentQuery ]}}};
    
    console.log('bulkQuery', bulkQuery);

    return bulkQuery;
  } 
  else {
    var bulkQuery = {"filter": { "where" : {"id" : {"inq" : _.map($scope.data.selectedData.items, 'id')}}}};
    console.log('bulkQuery', bulkQuery);
    return bulkQuery;
  }
}

/*
Bulk Create View
*/
function bulkCreateView(){
    console.log('bulk create view;')

    //creates static view that only includes these particular companies
    var query = buildBulkQuery();

      //get view details
    var resolvedData = {
        entity: 'Company',
        query: query,
        filters: null,
        columnState: gridManager.getColumnState(),
        sortModel: null,
        static: false
    };

    //open modal
    var saveViewModal = modalManager.openModal('createView', resolvedData);

    //push view into views array
    saveViewModal.result.then(function(results) {
      //append count and sum
      results.count = $scope.data.selectedData.selectAll ? $scope.data.selectedData.length : $scope.data.selectedData.items.length;
      results.sum = $scope.data.selectedData.selectAll ? $scope.data.sum - _.sumBy($scope.data.selectedData.items, 'value') : _.sumBy($scope.data.sum, 'value');
      //push into available views
      $scope.data.views.push(results);
    })
}

/*
Set Filter Model
*/
function setFilterModel() {
  gridManager.setFilterModel()
}

/*
Gets filters from scope fields
*/
function getFilters() {
  var filters = [];

  _.forEach($scope.data.filters, function(value, key){
    //filter applied
    if(value.filterApplied && value.filterValue) {

      var filterObject = {}
      filterObject.key = value.key;
      filterObject.type = value.filterApplied;
      filterObject.dynamicKey = value.dynamicKey || null;

      //convert string to number if necessary
      if(value.type == 'number' || value.type == 'currency'){
        if(value.filterApplied == 'range') {
          filterObject.value = value.filterValue
        } else {
          filterObject.value = parseInt(value.filterValue);
        }
      } else {
        filterObject.value = value.filterValue;
      }

      if(value.type == 'category' && value.filterValue.length == 0) {
        return
      }
      else {
      //push into filter array
      filters.push(filterObject);
     }

    }
    //push in if either of these filters
    else if(value.filterApplied == 'is-unknown' || value.filterApplied == 'has-any-value'){
      var filterObject = {}
      filterObject.key = value.key;
      filterObject.type = value.filterApplied;
      filters.push(filterObject);
    }
    //exception for date is unknown, etc
    else if (value.filterApplied == 'date-is-unknown' || value.filterApplied == 'date-has-any-value'){

      var filterObject = {}
      filterObject.key = value.key;
      filterObject.type = value.filterApplied;

      filters.push(filterObject);
    }
  })
  return filters;
}


/*
Clear Look Up Values
*/
function clearLookupValues(filter){
  filter.lookupResults = [];
  $scope.data.searchVal = '';
}

  $scope.getPeople = function(searchVal){
    var deferred = $q.defer();
    $scope.data.results = [];
    $scope.data.loadingResults = true;

    var people = _.filter($scope.data.people, ['name', searchVal])

    $scope.data.results = people;

    $timeout(function(){
      deferred.resolve($scope.data.results);
      $scope.data.loadingResults = false;
      return deferred.promise;
    }, 2500)
  }


  $scope.data.people = [
    { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
    { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
    { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
    { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
    { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
    { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
    { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
    { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
  ];

  $scope.getPeople = function(searchVal){
    var deferred = $q.defer();
    $scope.data.results = [];
    $scope.data.loadingResults = true;

    var people = _.filter($scope.data.people, ['name', searchVal])

    $scope.data.results = people;

    $timeout(function(){
      deferred.resolve($scope.data.results);
      $scope.data.loadingResults = false;
      return deferred.promise;
    }, 2500)
  }


/*
Get Look Up Values
*/
function getLookupValue(filter, entityType, searchVal){
  var deferred = $q.defer();

  $scope.data.searchVal = searchVal;
  $scope.data.searching = true;
  $scope.data.serverError = false;
  $scope.data.loadingResults = true;
  $scope.data.lookupResults = [{},{}];

  //Switch based on entity type
  switch(entityType) {
    case 'Company':
        var query = {"filter": {"where": {"or": [{"firstName": {"regexp": "/" + searchVal + "/i"}}, {"lastName": {"regexp": "/" + searchVal + "/i"}}]}, "orderBy": "firstName ASC", limit: 15, "fields": ['id', 'firstName', 'lastName', 'emails']}}
        break;
    case 'Company':
        var query = {"filter": {"where": {"name": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "name ASC", limit: 15}, "fields": ['id', 'name', 'domain']}
        break;
    case 'Company':
        var query = {"filter": {"where": {"name": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "name ASC", limit: 15}, "fields": ['id', 'name', 'primaryCompany', 'value', 'status', 'stage', 'forecast', 'estimatedClose', 'score']}
        break;
    case 'Appuser':
        var query = {"filter": {"where": {"fullName": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "fullName ASC", limit: 15}, "fields": ['id', 'firstName', 'lastName', 'initials', 'email']}
        break;
  }

  //protects from making unnecessary api calls
  if(searchVal){
  //then return appropriate values
  return $injector.get(entityType).find(query).$promise
      .then(function(results){
        $scope.data.serverError = false;
        $scope.data.searching = false;
        $scope.data.loadingResults = false;
        $scope.data.lookupResults = results;
      })
      .catch(function(err){
        $scope.data.serverError = true;
        $scope.data.searching = false;
        $scope.data.loadingResults = false;
        console.log(err);
        return err;
      })
  } else {
    $scope.data.searching = false;
  }
}

/*
Initial Filters
*/
function initialFilters(viewFilters, fields) {
    //clear all filters in scope
    _.forEach(fields, function(value, key){

      value.filters = [];
      value.filters.push({})

    if(value.type == 'category') {
        value.filterApplied = 'category-includes';
        value.filterValue = [];
        value.filterActive = false;

        _.forEach(value.values)
      } else {
        value.filterApplied = null;
        value.filterValue = null;
        value.filterActive = false;
      }
    })

      //set in filter to show UI
    _.forEach(viewFilters, function(value, key){
      var field = _.find(fields, ['key', value.key]) || null;
      //apply to field
      if(field) field.filterApplied = value.type;
      if(field) field.filterValue = value.value;
      if(field) field.filterActive = true;
    })

    //no longer initializing filters
    $timeout(function(){
      initFilters = false;
    }, 250)
    
    return fields;
}


/*
Add Group
*/
function addGroup(group) {
  //splice from groups
  $scope.data.groups.splice($scope.data.groups.indexOf(group), 1);
  //push into active groups
  $scope.data.activeGroups.push(group);
  //pull out column keys - removed undefined for safe grouping - TODO - PUSH OUT BAD GROUPS?
  var groupKeys = _.without(_.map($scope.data.activeGroups, 'colId'), undefined);
  //tells grid to group by this column
  setRowGroupColumns(groupKeys);
}

/*
Remove Group
*/
function removeGroup(group) {
  //splice from groups
  $scope.data.activeGroups.splice($scope.data.activeGroups.indexOf(group), 1);
  //push into active groups
  $scope.data.groups.push(group);
  //pull out column keys - removed undefined for safe grouping - TODO - PUSH OUT BAD GROUPS?
  var groupKeys = _.without(_.map($scope.data.activeGroups, 'colId'), undefined);
  //tells grid to group by this column
  setRowGroupColumns(groupKeys);
}

/*
Changes View
*/
function changeView(view) {
  //close sideapnel
  $rootScope.filterPanelOpen = false;
  // change view
  $state.go('app.companies', {"viewId": view.id}, {reload: 'app.companies'});
}

/*
Local Search has Changed
*/
function changeLocalSearch(){
  gridManager.setLocalSearch($scope.data.localSearch);
}

/*
Refresh View
*/
function refreshView() {
    gridManager.refreshView();
}

/*
Clear All Filters
*/
function clearAllFilters() {
    //TODO - Clear All Filter Values
}

/*
Size Grid To Window
*/
function sizeToFit() {
  gridManager.sizeToFit();
}

/*
Size Grid To Window
*/
function autoSize() {
  gridManager.autoSize();
}

/*
Export To Excel
*/
function exportView() {
  var resolvedData = {
    entityModel: 'Company',
    view: $scope.data.thisView,
    columns: $scope.data.columns 
  };
  //open export view modal
  modalManager.openModal('exportView', resolvedData);
}

/*
Import Data
*/
function importData() {
  modalManager.openModal('importData');
}

/*
Clear Selected
*/
function clearSelected() {
  gridManager.clearSelected();
}

/*
Hide Show Columns
*/
function showHideColumn(column, visible){
  gridManager.showHideColumn(column, visible)
}

/*
Pin / Un Pin a Column
*/
function pinUnpinColumn(column) {
  if(column.pinned) {
    gridManager.setColumnPinned(column, false)
  } else {
    gridManager.setColumnPinned(column, true);
  }
}

/*
Toggle Accordion Open / Closed
*/
function toggleOpen(field) {
  field.open = !field.open
}

/*
Add Grouping Request
*/
function setRowGroupColumns(groupKeys) {
    gridManager.setRowGroupColumns(groupKeys);
}

/*
Set Unset Default View
*/
function setUnsetDefault(value){
  if(value == true) {
      ViewManager.setDefault($scope.data.thisView, 'Company')
      .then(function(){
        $scope.data.default = true;
      })
  } else {
     ViewManager.clearDefault($scope.data.thisView, 'Company')
      .then(function(){
        $scope.data.default = false;
      }) 
  }
}

/*
Assign
*/
function bulkAssign() {
  var resolveData = {
    entity: 'Company',
    query: gridManager.getCurrentQuery()
  };
  //open bulk assign modal
  var bulkAssignModal = modalManager.openModal('bulkAssign', resolveData);

      bulkAssignModal.result.then(function(results){

        //need to create custom remote hook
        return Company.bulkAssign(query, owners).$promise
                .then(function(results){
                   //refresh view
                   refreshView();
                   //log
                   Logger.info('Succesfully assigned owners');
                })
                .catch(function(err){
                  Logger.error('Error assigning owners', 'Please try again in a moment');
                })

      })
}

/*
Edit
*/
function bulkEdit() {
  //resolved information
  var resolveData = {
    entity: 'Company',
    query: gridManager.getCurrentQuery()
  };

  modalManager.openModal('bulkEdit', resolveData);
}

/*
Bulk Tag
*/
function bulkTag() {
  //resolved information
  var resolveData = {
    entity: 'Company',
    query: gridManager.getCurrentQuery()
  };
  //open bulk tag modal
  modalManager.openModal('bulkTag', resolveData);
}

/*
Edit
*/
function bulkEmail() {
  var emailAddresses = _.map($scope.data.selectedData.items, function(value, key){
    return value.emails[0] ? value.emails[0].email : null;
  })
  //open window
   $window.open("mailto:"+ emailAddresses,"_self");
}

/*
Export
*/
function bulkExport() {
  var resolveData = {
    entityModel: 'Company',
    query: gridManager.getCurrentQuery(),
    columns: $scope.data.columns 
  };
  //exoprt data
  modalManager.openModal('bulkExport', resolveData);
}

/*
Edit
*/
function bulkDelete() {
  //resolved information
  var resolveData = {
    entity: 'Company',
    query: gridManager.getCurrentQuery()
  };

  //open modal
  var bulkDeleteModal = modalManager.openModal('bulkDelete', resolveData);
  bulkDeleteModal.result.then(function(results) {
    $scope.data.selectedData.items = [];
  })
}


/*
Create View
*/
function createView() {
  modalManager.openModal('createView');
}


function isObjectShouldBeString(filter){
  if(filter.filterValue !== null && _.get(filter.filterValue, 'startDate', false)){
    filter.filterValue = _.get(filter.filterValue, 'startDate', '');
  }
}

/*
Checks whether filter is active
*/
function isFilterActive(filter) {


if(!filter.filterActive) {
  //default to active
  filter.filterActive = true;
  
  //determine if not active based on type & params
  //default is true - only use this to set as false
  //-------------------------
  switch(filter.type) {
      case 'number':
        //reset on change
          if(filter.filterApplied == 'range'){
             filter.filterValue = _.isNumber(filter.filterValue) ? {} : filter.filterValue;
             //should it be active
             filter.filterActive = (_.isNil(filter.filterValue) || _.isNil(filter.filterValue.lower) || _.isNil(filter.filterValue.upper)) ? false : true;
          } else {
            filter.filterValue = _.isObject(filter.filterValue) ? 0 : filter.filterValue;
          }
          break;
      case 'currency':
          //reset on change
          if(filter.filterApplied == 'range'){
             filter.filterValue = _.isNumber(filter.filterValue) ? {} : filter.filterValue;
             //should it be active
             filter.filterActive = (_.isNil(filter.filterValue) || _.isNil(filter.filterValue.lower) || _.isNil(filter.filterValue.upper)) ? false : true;
          } else {
            filter.filterValue = _.isObject(filter.filterValue) ? 0 : filter.filterValue;
          }
          break;
      case 'date':
          //reset on change
          if(filter.filterApplied == 'date-range'){
             filter.filterValue = _.isString(filter.filterValue) ? {} : filter.filterValue;
             //should it be active
             filter.filterActive = (_.isNil(filter.filterValue) || _.isNil(filter.filterValue.startDate) || _.isNil(filter.filterValue.endDate)) ? false : true;
          } 
          else if (filter.filterApplied == 'date-more-than' || filter.filterApplied == 'date-less-than' || filter.filterApplied == 'date-exactly'){
            filter.filterValue = (!_.isObject(filter.filterValue) || !_.isNil(filter.filterValue.startDate) || !_.isNil(filter.filterValue.endDate)) ? { days: null, timeframe: 'from-now' } : filter.filterValue;
            //else inactive if no days selected
            if(_.isNil(filter.filterValue.days)) {
              filter.filterActive = false;
            }
        } else {
            filter.filterValue = _.get(filter.filterValue, 'endDate', null) ? null : filter.filterValue;
            // set inactive if null value - usually right after switching
            if(_.isNil(filter.filterValue)) {
              filter.filterActive = false;
            }
          }
          break;
    }

  }


  //figure out if diferences vs initial view filters
  //-------------------------
  var differences = _.xorWith(getFilters(), viewFilters, _.isEqual)
  //set to scope
  $scope.data.filterChanged = differences.length ? true : false;


  //if is active - update grid
  //-------------------------
  if(filter.filterActive ){
    updateGrid();
  }
}

function compareDifferences(){
    //figure out if diferences vs initial view filters
  //-------------------------
  var differences = _.xorWith(getFilters(), viewFilters, _.isEqual)
  console.log('get filters', getFilters());
  console.log('view filters', viewFilters);
  console.log('differences', differences);
  //set to scope
  $scope.data.filterChanged = differences.length ? true : false;
}

function columnStateChanged(){
    //check columns difference
  $scope.data.filterChanged = $scope.data.thisView.columnState == gridManager.getColumnState() ? false : true;
}


/*
Checks if Category Filters are active
*/
function isCategoryActive(value, checked, field) {
  //for some reason have to mannually splice this to figure out if adding / removing
  var idx = field.filterValue.indexOf(value);
    if (idx >= 0 && !checked) {
      field.filterValue.splice(idx, 1);
    }
    if (idx < 0 && checked) {
      field.filterValue.push(value);
    }

    //then check whether not should be active
    if(field.filterValue.length) {
      field.filterActive = true;
      updateGrid()
    } else {
      field.filterActive = false;
      updateGrid()
    }
}

/*
Clear Filter
*/
function clearFilter(field) {
  if(field.type == 'category') {
    field.filterValue = []; 
    field.filterApplied = 'category-includes'
    field.filterActive = false;
  } else {
    field.filterApplied = null;
    field.filterValue = null;
    field.filterActive = false;

  }
  //update grid to reflect changes
  updateGrid();

  //compare if view has changed
  compareDifferences();
}

/*
Update Grid
*/
function updateGrid() {
  console.log('update grid');
     var matchType = $scope.data.filterMatches || 'all';
     var filters = getFilters();
     console.log('filters', filters);
        //change query pased to grid
      gridManager.changeCurrentQuery(filters, matchType)
        .then(function(results){
          if(results){
          //metadata - saves one call to server
          $scope.data.count = results.count || 0;
          $scope.data.sum = results.sum || 0;
          $scope.data.min = results.min || 0;
          $scope.data.max = results.max || 0;
          $scope.data.avg = results.avg || 0;
        }
        //force refresh of grid
        setFilterModel();
      })
      .catch(function(err){
        console.log(err);
      })
}

/*
Changes Grid Context
*/
function changeContext(contextType, contextValue){
    gridManager.setContext(contextType, contextValue);
    updateGrid();
}



function selectUsers(filter){
  $scope.data.lookupUsers = true;
  $scope.data.selectedUsers = filter.filterValue;
  $scope.data.selectingForFilter = filter;
}

function applyUsers(){
  $scope.data.selectingForFilter.filterValue = $scope.data.selectedUsers;
  $scope.data.selectingForFilter.filterActive = true; // fires filter
  $scope.data.lookupUsers = false;
  //check if should fire grid update
  isFilterActive($scope.data.selectingForFilter.filterValue);
}


function selectTags(filter){
  $scope.data.lookupTags = true;
  $scope.data.selectedTags = filter.filterValue;
  $scope.data.selectingForFilter = filter;
}

function applyTags(){
  $scope.data.selectingForFilter.filterValue = $scope.data.selectedTags;
  $scope.data.selectingForFilter.filterActive = true; // fires filter
  $scope.data.lookupTags = false;
  //check if should fire grid update
  isFilterActive($scope.data.selectingForFilter.filterValue);
}


function focusSelect(string){
  console.log('focus select');
  $scope.$broadcast(string);
}


//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
// Watchers go here
//-------------------------------------------

});
