/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.insightsCtrl', [])
//declare dependencies
.controller('insightsCtrl', function(
	$scope,
	$timeout,
	$location,
	$window,
	$state,
	$stateParams,
	View,
	Logger,
	InsightManager,
	gridManager,
	ViewManager,
	BaseChartConfig) {

// BINDABLES
//===========================================

	//vars
	//---------------------
	var insightKey = $stateParams.insightKey;

	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;

	$scope.data.tickSize = 'month';
	$scope.data.dateRange = 'Jan 1 2017 - Dec 31 2017'


	//extend base config

	// $scope.data.chartConfig = _.assignIn(BaseChartConfig, {
	// 	plotOptions: {
	//         series: {
	//             stacking: 'normal'
	//         }
	//     },
	//     series: [{
	//         name: 'John',
	//         data: [5, 3, 4, 7, 2]
	//     }, {
	//         name: 'Jane',
	//         data: [2, 2, 3, 2, 1]
	//     }, {
	//         name: 'Joe',
	//         data: [3, 4, 4, 2, 5]
	//     }]
	// });


	// var columnDefs = [
 //    {headerName: 'Core', children: [
 //        {headerName: "ID", field: "id"},
 //        {headerName: "Make", field: "make"},
 //        {headerName: "Price", field: "price", filter: "number"}
 //    ]},
 //    {headerName: 'Extra', children: [
 //        {headerName: "Val 1", field: "val1", filter: "number"},
 //        {headerName: "Val 2", field: "val2", filter: "number"},
 //        {headerName: "Val 3", field: "val3", filter: "number"},
 //        {headerName: "Val 4", field: "val4", filter: "number"},
 //        {headerName: "Val 5", field: "val5", filter: "number"},
 //        {headerName: "Val 6", field: "val6", filter: "number"},
 //        {headerName: "Val 7", field: "val7", filter: "number"},
 //        {headerName: "Val 8", field: "val8", filter: "number"},
 //        {headerName: "Val 9", field: "val9", filter: "number"},
 //        {headerName: "Val 10", field: "val10", filter: "number"}
 //    ]}
	// ];
	// var makes = ['Toyota','Ford','BMW','Phantom','Porsche'];

	// var floatingTopRows = [createRow(999),createRow(998)];
	// var floatingBottomRows = [createRow(997),createRow(996)];

	//functions
	//----------------------
	$scope.changeChartType = changeChartType;
	$scope.changeInsight = changeInsight;

	// $scope.resize = resize;
	// $scope.changeChart = changeChart;

//-------------------------------------------
// ACTIVATE
//===========================================
function activate(insightKey) {

	$scope.data.activated = false;

	$scope.data.chartConfig = {};
	$scope.data.chartConfig
	$scope.data.chartTypes = null;
	$scope.data.dataTypes = null;
	tableData = [];

	return InsightManager.getThisInsight(insightKey)
		.then(function(results){

			console.log('initial results', results);
			

			if(!_.isNil(_.get(results, 'config', null))){

			//----------------------------------
			//build chart 
			//----------------------------------
			$scope.data.chartConfig = 	_.merge(angular.copy(BaseChartConfig), results.config.chartConfig);
			$scope.data.chartConfig.chart.type = results.config.chartTypes[0];
			$scope.data.currentChartType = results.config.chartTypes[0];
			$scope.data.chartTypes = _.get(results.config, 'chartTypes', []);
			$scope.data.dataTypes = _.get(results.config, 'dataTypes', []);

			$scope.data.question = results.config.question;

			//set data into chart
			_.forEach(results.data.series, function(series){
				//sets data into each series
				var thisSeries = _.find($scope.data.chartConfig.series, ['id', series.id]);
					thisSeries.data = series.data;
			})

			//have to manually set x axis for some reason - bug with angular wrapping around highcharts
			// $scope.data.chartConfig.xAxis = {};
			// $scope.data.chartConfig.xAxis.setCateogies = results.config.chartConfig.xAxis;
			// $scope.data.chartConfig.yAxis = {};
			// $scope.data.chartConfig.yAxis = results.config.chartConfig.yAxis;
			// $scope.data.chartConfig.options.y.categories = results.config.xAxis.categories;

			console.log('scope', $scope.data.chartConfig);

			var tableData = _.flatten(_.map(_.unionBy(results.data.series, 'data'), "data"));

			if(insightKey == 'current-forecast') {

			}
			//----------------------------------
			//build table 
			//----------------------------------
			$scope.data.gridOptions = {
			    defaultColDef: {
			        enableRowGroup: true,
			        enablePivot: true,
			        enableValue: true
			    },
			    headerHeight: 40,
			    rowHeight:40,
			    rowGroupPanelShow: 'never',
			    pivotPanelShow: 'never',
			    columnDefs: results.config.columnDefs || [],
			    rowData: tableData,
			    enableStatusBar: true,
			    enableRangeSelection: true,
			    enableColResize: true,
			    enableSorting: true,
			    enableFilter: true,
			    domLayout: 'autoHeight'
			};


			//activate
			$timeout(function(){
				$scope.data.activated = true;
			}, 250)

			} else {
				Logger.error("Error Fetching Chart Config", "Please Try again in a moment")
			}
		})
		.catch(function(err){
			console.log(err);
		})



}
//-------------------------------------------
activate(insightKey);
//-------------------------------------------


// FUNCTIONS
//===========================================


function changeChartType(type){
	$scope.data.chartConfig.chart.type = type  
	$scope.data.currentChartType = type;

	if(type == 'area') {
		$scope.data.chartConfig.plotOptions = {
        area: {
	            stacking: 'normal'
	        }
    	}
	};
}


function changeInsight(insightKey){
	// activate(insightKey);
	// var chart = $scope.data.chartConfig.getHighcharts();
	// chart.redraw();
	// $scope.data.chartConfig.chart.destroy();
	$state.go('app.insights', {"insightKey": insightKey}, {reload: 'app.insights', inherit: false, notify: true});

}

/*
function keydown
*/

function createRow(index) {
    return {
        id: 'D' + (1000 + index),
        make: makes[Math.floor(Math.random()*makes.length)],
        price: Math.floor(Math.random()*100000),
        val1: Math.floor(Math.random()*1000),
        val2: Math.floor(Math.random()*1000),
        val3: Math.floor(Math.random()*1000),
        val4: Math.floor(Math.random()*1000),
        val5: Math.floor(Math.random()*1000),
        val6: Math.floor(Math.random()*1000),
        val7: Math.floor(Math.random()*1000),
        val8: Math.floor(Math.random()*1000),
        val9: Math.floor(Math.random()*1000),
        val10: Math.floor(Math.random()*1000)
    };
}

function setRowData(rowCount) {
    var rowData = [];
    for (var i = 0; i<rowCount; i++) {
        rowData.push(createRow(i));
    }
    $scope.data.gridOptions.api.setRowData(rowData);
}


function resize() {
	$(window).resize();
}


function changeChart() {
	$scope.data.chartConfig = _.assignIn(BaseChartConfig, {
			chart: {
		        type: 'sankey',
		    },
	        plotOptions: {
		        series: {
		            cursor: 'pointer',
		            point: {
		                events: {
		                    click: function () {
		                        console.log(this);
		                    }
		                }
		            }
		        }
		    },
	        series: [{
		        keys: ['from', 'to', 'weight', 'toColor', 'fromColor', 'cubeColor'],
					data: [
					  [
					    "start-stage1",
					    "stage1",
					    3,
					    "rgba(41, 128, 185,.5)",
					    "rgba(142, 68, 173,.5)",
					    "#3498db"

					  ],
					  [
					    "start-stage1",
					    "stage2",
					    8,
					    "rgba(41, 128, 185,.5)",
					    "rgba(22, 160, 133,.5)",
					    "rgba(41, 128, 185,.5)",
					  ],
					  [
					    "start-stage1",
					    "stage3",
					    10,
					    "rgba(41, 128, 185,.5)",
					    "rgba(44, 62, 80,.5)",
					    "rgba(41, 128, 185,.5)",
					  ],
					  [
					    "start-stage2",
					    "stage1",
					    0,
					    "rgba(39, 174, 96,.5)"
					  ],
					  [
					    "start-stage2",
					    "stage2",
					    8,
					    "rgba(39, 174, 96,.5)"
					  ],
					  [
					    "start-stage2",
					    "stage3",
					    10,
					    "rgba(39, 174, 96,.5)"
					  ],
					  [
					    "start-stage3",
					    "stage1",
					    0
					  ],
					  [
					    "start-stage3",
					    "stage2",
					    8
					  ],
					  [
					    "start-stage3",
					    "stage3",
					    10
					  ]
					]
				}]
	});
}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});
