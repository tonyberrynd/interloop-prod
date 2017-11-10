/* ==========================================================================
   Interloop Config Blocks
   ========================================================================== */

// BASE Config
//===========================================

angular.module('coil.config', [])


//HTML5 Mode
//---------------------
.config(function($locationProvider) {
  // if (typeof process !== 'undefined' && process.versions.electron) {
  //    $locationProvider.html5Mode(false);
  // } else {

  //   $locationProvider.html5Mode({
  //     enabled: true,
  //     requireBase: false
  //   });

  // }
})

//Lightbox Tempalte
.config(function (LightboxProvider) {
  // set a custom template
  LightboxProvider.templateUrl = 'assets/html/lightbox.tpl.html';
})


//Run Block
//----------------------
.run(function($rootScope, $state, $stateParams, $timeout, $window, $timeout, $sce) {

  // BINDABLES
  //===========================================
    
    //rootscope
    //----------------------

    $rootScope.richTextFocus = false;

    //allow referencing of states
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;




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

  //checks whether a state is active or if parallel state - was laast active state
  $rootScope.includesState = function(state) {
    if($rootScope.$state.includes(state) || _.includes(_.pull(_.map($rootScope.inactiveStates, 'self.name'), 'app'), state)) {
      return true;
    } else {
      return false;
    }
  }


  $rootScope.trustUrl = function(url){
    return $sce.trustAsResourceUrl(url);
  }

  //-------------------------------------------

  // LIFECYCLE
  //===========================================

  // start
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    
  });

  // success
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 

      $timeout(function(){
        $rootScope.sidebarToggle = false;
      }, 50)
  })


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

});