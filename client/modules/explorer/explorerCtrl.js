/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.explorerCtrl', [])
//declare dependencies
.controller('explorerCtrl', function(
	$scope,
  $injector,
	Appuser,
	Logger,
  entityTypes,
  chartTypes) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var initializing = true;

	//data
	//----------------------
	$scope.data = {};
  $scope.data.entityTypes = entityTypes;
  $scope.data.groupTypes = ['Sales Professional', 'Status', 'Stage', 'Forecast Category'];
  $scope.data.segmentTypes = ['Stage', 'Status', 'Size', 'Forecast Category'];
  $scope.data.chartTypes = chartTypes;

  //initial chart config - will change as it goes
	 $scope.chartConfig = {
      chart: {
        type: 'bar',
        style: {
            fontFamily: "proxima-nova"
        }
      },
      series: [],
      title: {
        text: null
      },
      legend: {
        verticalAlign: 'top'
      }
  };

  //builds Explore Module
  $scope.data.exploreModule = {
    entity: null,
    group: null,
    chartType: null
  };

  $scope.data.entitySelectOpen = false;
  $scope.data.groupByOpen = false;
  $scope.data.chartTypeOpen = false;

	//functions
	//----------------------
  $scope.resetQuery = resetQuery;
  $scope.toggleEntitySelect = toggleEntitySelect;
  $scope.toggleGroupBy = toggleGroupBy;
  $scope.toggleChartType = toggleChartType;
  $scope.selectEntity = selectEntity;
  $scope.selectGroup = selectGroup;
  $scope.selectChartType = selectChartType;


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  console.log('activate eplorer');
}

activate()
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/


function resetQuery() {
  $scope.data.exploreModule = {
    entity: null,
    group: null,
    chartType: null
  };

}

function selectEntity(entity){
  $scope.data.exploreModule.entity = entity;
  //close dropdown
  $scope.data.entitySelectOpen = false;

  //set group types dynacmially
  $scope.data.groupTypes = $injector.get(entity + 'Fields');
}

function selectGroup(group){
  $scope.data.exploreModule.group = group;
  //close dropdown
  $scope.data.groupByOpen = false;
}

function selectChartType(type){
  $scope.data.exploreModule.chartType = type;

  //set chart type into high charts
  $scope.chartConfig.chart.type = type;

  //close dropdown
  $scope.data.chartTypeOpen = false;


  //should do a check here to make sure all the data is in place
  //------------------
  executeQuery($scope.data.exploreModule)
}

function toggleEntitySelect($event) {

    $event.preventDefault();
    $event.stopPropagation();
    $scope.data.entitySelectOpen = true;

}

function toggleGroupBy($event) {

    $event.preventDefault();
    $event.stopPropagation();
    $scope.data.groupByOpen = true;

}

function toggleChartType($event) {

    $event.preventDefault();
    $event.stopPropagation();
    $scope.data.chartTypeOpen = true;

}


function executeQuery(exploreModule) {

  var thisEntity = _.find(entityTypes, ['plural', exploreModule.entity]);
  var group = _.lowerCase(exploreModule.group);
  // Step 1
  //Retrieve and map the various series of data
  //--------------------------------

    $injector.get(thisEntity.singular).groupBy({'attribute': group}).$promise
      .then(function(results){

        $scope.data.results = results;

        var seriesData = _.map(results, 'sum');

        var categories = _.map(results, 'id');


        //changes chart type
        $scope.data.chartConfig.chart.type = exploreModule.chartType || 'bar';

        //set the data into the chart
        $scope.data.chartConfig.series[0].id = exploreModule.group;
        $scope.data.chartConfig.series[0].data = seriesData;
        //set categories
        $scope.data.chartConfig.xAxis.categories = categories;


        $scope.data.tableHeaders = _.keysIn(angular.fromJson(angular.toJson(results[0])));
      })
      .catch(function(err){
        Logger.error('Error Fetching Analysis', 'Please Try again in a moment');

        console.log(err);
      })

    

} 


    $scope.swapChartType = function () {
      if (this.chartConfig.chart.type === 'line') {
        this.chartConfig.chart.type = 'bar'
      } else {
        this.chartConfig.chart.type = 'line'
        this.chartConfig.chart.zoomType = 'x'
      }
    }

    $scope.data.chartConfig = {
      chart: {
        type: 'bar',
        style: {
            fontFamily: "proxima-nova"
        }
      },
      series: [{
        data: [],
        id: 'series1'
      }],
      xAxis: {
        categories: []
      },
      yAxis: {
        categories: []
      },
      title: {
        text: null
      },
      legend: {
          align: 'right',
          verticalAlign: 'top',
          layout: 'horizontal'
      },
    }


//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
$scope.$watch('data.exploreModule', function(newVal, oldVal){
    
    if(initializing) {
      initializing = false;
      return
    }
    else {

      //Apply Query to Get Correct Data
      
    }
}, true);
//-------------------------------------------

});
