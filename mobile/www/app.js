/* ==========================================================================
   Main App File 
   ========================================================================== */
angular.module('interloop', [


	//base ionic
	'ionic',
	'ngResource',

	//loopback
  'lbServices',

  //libs
  'ion-floating-menu',                //ionic floating menu
  'ionic.contrib.drawer.vertical',    //vertical drawer
  // 'jett.ionic.scroll.sista',          //https://github.com/djett41/ionic-scroll-sista

	// interloop

  //values
  'interloop.value.config',
  'interloop.value.fields',
  'interloop.value.permissions',
  // 'interloop.value.modalDefs',

	// config
	'interloop.config',
	'http-interceptor.config',

	// routes
	'interloop.routes',

  //floating button
  'interloop.floatingButtonCtrl',

  //modules
  'interloop.loginCtrl',
  'interloop.forgotCtrl',

  'interloop.opportunitiesCtrl',
  'interloop.opportunityDetailCtrl',

  'interloop.contactsCtrl',

  'interloop.companiesCtrl',

  'interloop.activitiesCtrl',

  'interloop.searchCtrl',

  'interloop.settingsCtrl',


	//shared
	//----------------------------

	//factories
	'interloop.factory.authService', 

  'interloop.factory.configService',
  'interloop.factory.authService',
  'interloop.factory.newEntityFactory',
  // 'interloop.factory.modalManager',
  'interloop.factory.viewManager',
  // 'interloop.factory.gridManager',
  // 'interloop.factory.queryBuilder',
  // 'interloop.factory.sidebarRouter',
  'interloop.factory.sidebarActions',
  'interloop.factory.relationshipManager',
  'interloop.factory.searchService',
  'interloop.factory.logger',
  'interloop.factory.pageManager'    

      
  // 'ionic-modal-select',               //https://github.com/inmagik/ionic-modal-select
  // 'ui.dateTimeInput',
  // 'ui.utils.masks',                   //https://github.com/assisrafael/angular-input-masks
  // 'angular.filter',                   //https://github.com/a8m/angular-filter
  // 'jett.ionic.content.banner',        //https://github.com/djett41/ionic-content-banner
  // 'ion-alpha-scroll',                 //https://github.com/aquint/ion-alpha-scroll#demo
  // 'ionic-toast',                      //https://market.ionic.io/plugins/ionictoast
  // 'ion-affix',                        //http://www.aliok.com.tr/projects/2015-04-17-ion-affix.html
  // 'ion-autocomplete',                 //https://github.com/guylabs/ion-autocomplete


]);


