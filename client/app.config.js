/* ==========================================================================
   Interloop Config Blocks
   ========================================================================== */

// BASE Config
//===========================================

angular.module('interloop.config', [])


//BASE URL VALUE
//---------------------
.value('BASE', {
  URL: window.localStorage.baseUrl || 'http://localhost:3000'
 })


//HTML5 Mode
//---------------------
.config(function($locationProvider) {
  if (typeof process !== 'undefined' && process.versions.electron) {
     $locationProvider.html5Mode(false);
  } else {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
})


//Hash Prefix Needed for Adal Angular
//---------------------
.config(function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
})

//Ignores unhandled rejections with no cause
//---------------------
// .config(function ($provide) {
//   $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
//       return function (exception, cause) {
//           if (!cause) return; //do nothing (ignore) exception in this case === 'Possibly unhandled rejection: undefined'               
//           $delegate(exception, cause);
//       };
//   }]);
// })


//Compile Provider [Performance]
//enable / disable compileProvider based on ENV
//---------------------
.config(function($compileProvider, ENV) {
  if (ENV == "PRODUCTION") {
    $compileProvider.debugInfoEnabled(false);
  }
  else {
    $compileProvider.debugInfoEnabled(true);
  }
})

//Appy Async [Performance]
//https://code.angularjs.org/1.3.8/docs/api/ng/provider/$httpProvider#useApplyAsync
//---------------------
.config(function ($httpProvider) {
  $httpProvider.useApplyAsync(true);
})


//Lightbox Tempalte
//---------------------
.config(function (LightboxProvider) {
  // set a custom template
  LightboxProvider.templateUrl = 'assets/html/lightbox.tpl.html';
})

//Microsoft Adal
//---------------------
// .config(function(adalAuthenticationServiceProvider, $httpProvider) {

//     var anonymousEndpoints = [
//       '/',
//     ];

//     //set window localstorage to be used in init
//     window.localStorage.adalClientId = window.localStorage.adalClientId || 'no-client-id-for-this-organization';

//     adalAuthenticationServiceProvider.init(
//       {
//           // Config to specify endpoints and similar for your app
//           clientId: window.localStorage.adalClientId,
//           anonymousEndpoints: anonymousEndpoints,
//           popUp: true, 
//           cacheLocation: 'localStorage', // optional cache location default is sessionStorage
//           endpoints: {
//             'https://graph.microsoft.com': 'https://graph.microsoft.com', 
//             "https://api.powerbi.com": "https://analysis.windows.net/powerbi/api",
//           }
//       },
//       $httpProvider   // pass http provider to inject request interceptor to attach tokens
//       );
// }) 

//Stripe
//---------------------
.config(function (stripeProvider) {
  // stripeProvider.setPublishableKey('my_key');
})


//Intercom Config
//---------------------
.config(function($intercomProvider) {
    // Either include your app_id here or later on boot
    $intercomProvider
      .appID('vp6k9wou');

    // you can include the Intercom's script yourself or use the built in async loading feature
    $intercomProvider
      .asyncLoading(true)
})


//Mixpanel
//---------------------
.config(function($mixpanelProvider) {
    $mixpanelProvider.apiKey('59b6a85e46104abe56843abb60ead10b');
})


//Rollbar Config
//https://github.com/tandibar/ng-rollbar
//---------------------
.config(function(RollbarProvider, ENV) {
  if (ENV == "PRODUCTION") {
    RollbarProvider.init({
      accessToken: "c16228063677465584fef9ec2262fa20",
      captureUncaught: true,
      captureUnhandledRejections: false,
      payload: {
        environment: ENV
      }
    });
  }
})

//Run Block
//----------------------
.run(function(
  $rootScope,
  $location,
  $state,
  $q, 
  $urlRouter,
  $stateParams,
  $timeout,
  $window,
  $stickyState,
  $intercom,
  Appuser,
  Logger,
  authService,
  SidebarRouter,
  ContactFields,
  ConnectivityMonitor
  ) {


  // Preload States if going directly to sidebar
  //==========================================


  // BINDABLES
  //===========================================

    //vars
    //=====================
    var firstStateLoaded = false;

    //ELECTRON
    //----------------------
    //Check if running in electron
    if (typeof process !== 'undefined' && process.versions.electron) {
       $rootScope.ELECTRON = true;
    } else {
       $rootScope.ELECTRON = false;
    }

    //window vars
    //----------------------
    $window.client = new Pusher('9730e70eeebf029780f6');

    //connectivity monitor
    //-----------------------
    //start conectivity monitor
    ConnectivityMonitor.startWatching();

    //rootscope
    //----------------------
    //allow referencing of states
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    //rich text areas
    $rootScope.richTextFocus = false;


    // Date Range Picker Options
    //===========================================

    $rootScope.options = {
          singleDatePicker: true,
          parentEl: 'body',
          applyClass: 'btn-primary',
          drops: 'up',
          locale: {
            applyLabel: "Apply",
            fromLabel: "Start",
            toLabel: "End",
            format: 'MMM D, YYYY',
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range'
          },
          alwaysShowCalendars: true,
          ranges: {
            'Last Month':   [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Last Quarter': [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')],
            'Last Year':    [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
            'This Month':   [moment().startOf('month'), moment().endOf('month')],
            'This Quarter': [moment().startOf('quarter'), moment().endOf('quarter')],
            'This Year':    [moment().startOf('year'), moment().endOf('year')],
            'Next Month':   [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')],
            'Next Quarter': [moment().add(1, 'quarter').startOf('quarter'), moment().add(1, 'quarter').endOf('quarter')],
            'Next Year':    [moment().add(1, 'year').startOf('year'), moment().add(1, 'year').endOf('year')]
          }
    };

    // date range
    $rootScope.options2 = {
          singleDatePicker: false,
          parentEl: 'body',
          applyClass: 'btn-primary',
          drops: 'up',
          locale: {
            applyLabel: "Apply",
            fromLabel: "Start",
            toLabel: "End",
            format: 'MMM D, YYYY',
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range'
          },
          alwaysShowCalendars: true,
          ranges: {
            'Last Month':   [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Last Quarter': [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')],
            'Last Year':    [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
            'This Month':   [moment().startOf('month'), moment().endOf('month')],
            'This Quarter': [moment().startOf('quarter'), moment().endOf('quarter')],
            'This Year':    [moment().startOf('year'), moment().endOf('year')],
            'Next Month':   [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')],
            'Next Quarter': [moment().add(1, 'quarter').startOf('quarter'), moment().add(1, 'quarter').endOf('quarter')],
            'Next Year':    [moment().add(1, 'year').startOf('year'), moment().add(1, 'year').endOf('year')]
          }
    };

    //drop down
    $rootScope.options3 = {
          singleDatePicker: false,
          parentEl: 'body',
          applyClass: 'btn-primary',
          drops: 'down',
          opens: 'left',
          locale: {
            applyLabel: "Apply",
            fromLabel: "Start",
            toLabel: "End",
            format: 'MMM D, YYYY',
            cancelLabel: 'Cancel',

          },
          alwaysShowCalendars: true,
    };


  // FUNCTIONS
  //===========================================
    //rich text area focus blue
    $rootScope.trixFocus = function(event, editor){
      $rootScope.$apply(function(){
        $rootScope.richTextFocus = true;
      })
    }

    $rootScope.trixBlur = function(event, editor){
      $rootScope.$apply(function(){
        $rootScope.richTextFocus = false;
      })
    }


    //lightbox copy action
    $rootScope.copySuccess = function(){
      Logger.info('Copied File Link');
    }

    $rootScope.copyFail = function(err){
      Logger.error('Error Copying File Link', err);
    }

    //checks whether a state is active or if parallel state - was laast active state
    $rootScope.includesState = function(state) {
      if($rootScope.$state.includes(state) || _.includes(_.pull(_.map($rootScope.inactiveStates, 'self.name'), 'app.'), state)) {
        return true;
      } else {
        return false;
      }
    }

    //apply timezone
    $rootScope.applyTimezone = function(){
      $rootScope.activeUser.timezone = moment.tz.guess();
      Appuser.prototype$patchAttributes({ id: $rootScope.activeUser.id }, $rootScope.activeUser)
        .$promise
        .then(function successCallback(response) {
            Logger.info('Successfully Updated Profile')
            //set back into scope
            $rootScope.activeUser = response;
            $rootScope.adjustTimezone = false;

          }, function errorCallback(response) {
            Logger.error('Error Updating Profile')
            $rootScope.adjustTimezone = false;
        });

    }

    $rootScope.ignoreTimezone = function(){
      $rootScope.adjustTimezone = false;
    }

  //-------------------------------------------

  // LIFECYCLE
  //===========================================

  // start
  //------------------
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        //check if going to sidebar state
        if(!firstStateLoaded && toState.data && toState.data.sidebarState) {
           // This is key to delaying routing until preload is complete
          event.preventDefault();

           var routeThroughState = toState.data.routeThroughState;
           var preloadStates = $state.get().filter(function(state) { return state.name == routeThroughState; });

           //preloads states
            var initialPromise = $q.when(); // the start of the promise chain
            var preloadPromise = preloadStates.reduce(function (prevPromise, preloadState) {
                // builds a promise chain that goes to each "preload" state one after the other
                return prevPromise.then(function() { 
                  // Chain $state.go promise on the previous promise
                  return $state.go(preloadState, undefined, { 
                    location: false // Don't update url
                  });
                });
              }, initialPromise);
              
            preloadPromise.then(function() {
              firstStateLoaded = true;
              // all states preloaded, now start listening for url changes.
              $timeout(function(){
                $state.go(toState, toParams);
              }, 2500)
            });
        }

        //Check if offline
        //-----------------------
      if(!$window.navigator.onLine && toState.name !== 'offline'){
        event.preventDefault();
        $state.go('offline');
      }
      
      //sidebar state is loading
      // //---------------------------------------------
      // var isGoingToSidebarState = false;
      // if(toState.data && toState.data.sidebarState) {
      //   isGoingToSidebarState = true;
        
      // }

      //handle user authentication
      //---------------------------------------------
      if (toState.authenticate && !Appuser.isAuthenticated()) {
        event.preventDefault();
        $state.go('login');
      }

      //permission based states
      //---------------------------------------------
      if (!authService.userHasPermissionForView(toState)){
        event.preventDefault();
        $state.go('login');
      }
  });

  // success
    //------------------
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 


    //save that first state has been loaded 
    //--------------------------------------------

    if(!toState.abstract) {
      firstStateLoaded = true;
    }

     //set nav bar title dynamically
     //---------------------------------------------
     if(toState.data && toState.data.navTitle && !toState.sidebarState) {
      $rootScope.navTitle = toState.data.navTitle
     }

     //Sticky States
     //---------------------------------------------
     //get inactive states
     $rootScope.inactiveStates = $stickyState.getInactiveStates();

     //Intercom
     //---------------------------------------------
      $intercom.update();

     //Ensure Navbar Is Closed
     //---------------------------------------------
     $timeout(function(){
        $rootScope.sidebarToggle = false;
     }, 50)



     //sidebar state
     //When accessing a sidebar state - ensure that it redirects through
     //a list view so that user feels like they navigated to sidebar

     //JB TODO - Access Latest State From Cache
     //--------------------------------------------

    if(toState.data && toState.data.sidebarState && toState.redirectState) {
        console.log('redirecting through list to sidebar');
        $state.go(toState.redirectState);
    }
        
  })


  //View Content Loaded
  //------------------
  $rootScope.$on('$viewContentLoaded', function(event){
    //hide loading screen if needed
    //---------------------------------------------
     if ($window.loading_screen.loaded && $window.loading_screen.finishing) {
        return
     } else {
        $timeout(function() {
            $window.loading_screen.finish();
         }, 50)
    }
  })


  //Error
  //------------------
  $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
      //sidebar state is loading
      //---------------------------------------------
      if(toState.data && toState.data.sidebarState) {
            $rootScope.stateIsLoading = false;
      }

      //state loading bound to scope
      //---------------------------------------------
      $rootScope.stateLoading = false;

      //console log error
      //---------------------------------------------
      console.log('state change error', error);

      if(error == 'API-ISSUES'){
        $state.go('maintenance', {'redirectUrl': $location.path()})
      }
      else if(error == 'AUTH-ERROR'){
        $state.go('login')
      }
      else {
        //what to do here
      }
      
    });


    //Unauthorized
    //------------------
    $rootScope.$on('loginRequired', function() {
      if($state.current.name !== 'login'){
          $state.go('403');
      }
    });

});