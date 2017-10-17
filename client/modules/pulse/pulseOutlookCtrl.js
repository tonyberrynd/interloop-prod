/* ==========================================================================
   Reset Password Controller
   ========================================================================== */

angular.module('interloop.pulseOutlookCtrl', [])
//declare dependencies
.controller('pulseOutlookCtrl', function(
  $scope, 
  $location, 
  $mixpanel,
  $http,
  BASE) {

// BINDABLES
//===========================================
  //vars
  //----------------------
    var params = {
      slidesPerView: $scope.slidesPerView || 1,
      slidesPerColumn: $scope.slidesPerColumn || 1,
      spaceBetween: $scope.spaceBetween || 0,
      direction: $scope.direction || 'horizontal',
      loop: $scope.loop || false,
      initialSlide: $scope.initialSlide || 0,
      showNavButtons: false
  };

  //data
  //----------------------
  $scope.data = {};

  $scope.data.metricBundles = [
    {
      "name": "pipeline metrics",
      "class": "col-xs-3",
      "metrics": [
      {
        "name":"metric 1",
        "value": "352K"
      },
      {
        "name":"metric 1",
        "value": "352K"
      },
      {
        "name":"metric 1",
        "value": "352K"
      },
      {
        "name":"metric 1",
        "value": "352K"
      }
      ]
    },
     {
      "name": "pipeline metrics2",
      "class": "col-xs-4",
      "metrics": [
      {
        "name":"metric 1",
        "value": "352K"
      },
      {
        "name":"metric 1",
        "value": "352K"
      },
      {
        "name":"metric 1",
        "value": "352K"
      }
      ]
    }
  ];


  //functions
  //----------------------
  $scope.nextSlide = nextSlide;
  $scope.prevSlide = prevSlide;
  $scope.onReadySwiper = onReadySwiper;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

function onReadySwiper(swiper) {
      $scope.data.swiper = swiper;
};

function nextSlide(){
      $scope.data.swiper.slideNext();
}

function prevSlide(){
      $scope.data.swiper.slidePrev();
}

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});