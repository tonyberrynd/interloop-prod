/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('coil.chartCtrl', [])
//declare dependencies
.controller('chartCtrl', function(
  $scope,
  $log, 
  $q,
  $timeout,
  BaseChartConfig) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

  var localConfig = {
      chart: {
        type: 'bar',
        height:480
      },
      series: [{
        data: [10, 15, 12, 8, 7],
        id: 'series1'
      }]
  }

   var thisConfig = _.assignIn(angular.copy(BaseChartConfig), localConfig)


  $scope.chartConfig = thisConfig;

  //functions
  //----------------------



//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/



//-------------------------------------------


// EVENTS
//===========================================
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});