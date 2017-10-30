 /* ==========================================================================
 Task Calendar Ctrl
 ========================================================================== */

angular.module('interloop.taskCalendarCtrl', [])
//declare dependencies
.controller('taskCalendarCtrl', function(
  $scope,
  Appuser,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.activated = false;

   /* config object */
  $scope.data.uiConfig = {
    calendar:{
      height: 800,
      editable: true,

      nowIndicator: true,

      header:{
        left: 'prev,next today ',
        center: 'title',
        right: 'month agendaWeek agendaDay '
      },
      eventClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };

  //functions
  //----------------------

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {
  $scope.data.activated = true;
} 

activate()
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/


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


