// AG Grid
/* ========================================================================== */
agGrid.LicenseManager.setLicenseKey("Interloop_Interloop_1Devs6_June_2018__MTUyODIzOTYwMDAwMA==5134cbabf8ac3af23acdb3f40454e158");
// get ag-Grid to create an Angular module and register the ag-Grid directive
agGrid.initialiseAgGridWithAngular1(angular);

/* ==========================================================================
   Main App File 
   ========================================================================== */
angular.module('coil', [                     

    //used for mobile demonstrations
  // 'ionic',

  //angular 
  'agGrid',
  'ngResource',
  'ngAnimate',
  'ui.router',
  'ct.ui.router.extras',
  'ui.select',
  'ngSanitize',
  'toastr',  
  'ui.bootstrap',
  'localytics.directives',
  'angularTrix',
  'daterangepicker',
  'rzModule',
  'ui.mask',
  
  'ui.utils.masks',
  'google.places',
  'bootstrapLightbox',
  'angular-clipboard',
  'highcharts-ng',
  // 'angular-loading-bar',

  //third party components
  // 'ngTagsInput',


  // setup
  'coil.config',                       // Interloop Config Blocks - /shared/config
  'coil.config.toastr',


  'coil.routes',                       // routes for application - /shared/routes 

  //shared
  'coil.directive.scrollClass',
  'coil.directive.changeOnBlur',
  'coil.directive.autofocus',

  //values
  'coil.value.baseChartConfig',

  //controllers
  'coil.loginCtrl',
  'coil.adminCtrl',
  'coil.marketingCtrl',
  'coil.productCtrl',
  'coil.chartCtrl',
  'coil.datagridCtrl',
  'coil.addAddressCtrl',
  'coil.mobileCtrl'
  // 'coil.componentsCtrl',

  //filters
  // 'coil.filter.formatDate'


]);