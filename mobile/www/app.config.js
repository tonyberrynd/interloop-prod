// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('interloop.config', [])


//BASE URL VALUE
//---------------------
.value('BASE', {
  URL: window.localStorage.baseUrl || 'http://localhost:3000'
})


  //ionic configurations
  //---------------------
  .config(function($ionicConfigProvider) {
    // $ionicConfigProvider.form.checkbox("square");
    $ionicConfigProvider.backButton.text('Back');
    $ionicConfigProvider.backButton.previousTitleText(false);
    //turn off ionic transitions if in native device
    if(window.cordova) {
      // $ionicConfigProvider.views.transition('none');
    }
  })

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //Bindables
    //-----------------------------
    $rootScope.$state = $state;








    /*
    State Change Error
    */
    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){

      //console log error
      //---------------------------------------------
      console.log('state change error', error);
      
    });




  });
})

