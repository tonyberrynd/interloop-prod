// AG Grid
/* ========================================================================== */
agGrid.LicenseManager.setLicenseKey("Interloop_Interloop_1Devs6_June_2018__MTUyODIzOTYwMDAwMA==5134cbabf8ac3af23acdb3f40454e158");
// get ag-Grid to create an Angular module and register the ag-Grid directive
agGrid.initialiseAgGridWithAngular1(angular);


/* ==========================================================================
   Main App File 
   ========================================================================== */
angular.module('interloop', [  

  //Env
  //~~~~~~~~~~~~~~~~~~~~~~~~~~
  'client.env',                           //gulp generated app constants (Dev/Prod)


  //Base Files
  //~~~~~~~~~~~~~~~~~~~~~~~~~~                   
  'ngResource',                           //https://docs.angularjs.org/api/ngResource
  'ngAnimate',                            //https://docs.angularjs.org/api/ngAnimate
  'ngSanitize',                           //https://docs.angularjs.org/api/ngSanitize
  'ngTouch',                              //https://docs.angularjs.org/api/ngTouch
  'ui.router',                            //https://github.com/angular-ui/ui-router
  'ct.ui.router.extras',                  //https://github.com/christopherthielen/ui-router-extras
  'AdalAngular',                          //https://github.com/AzureAD/azure-activedirectory-library-for-js
  'powerbi',                              //https://github.com/Microsoft/PowerBI-Angular


  //Loopback Generated Resources
  //~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  'lbServices',                           //https://loopback.io/doc/en/lb2/Create-AngularJS-client.html


  //Third Party Libs
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~                         
  'agGrid',                               //https://www.ag-grid.com/
  'angular-cache',                        //https://github.com/jmdobry/angular-cache
  'angular-clipboard',                    //https://github.com/omichelsen/angular-clipboard   
  'angular-ladda',                        //https://github.com/remotty/angular-ladda
  'angular-loading-bar',                  //https://github.com/chieffancypants/angular-loading-bar
  'angular-web-notification',             //https://github.com/sagiegurari/angular-web-notification
  'angular.filter',                       //https://github.com/fragaria/angular-daterangepicker
  'angularBootstrapNavTree',              //https://github.com/nickperkinslondon/angular-bootstrap-nav-tree
  'angularMoment',                        //https://github.com/urish/angular-moment
  'angular-q-limit',                      //https://github.com/hash-bang/angular-q-limit
  'angularTrix',                          //https://github.com/sachinchoolur/angular-trix
  'bootstrapLightbox',                    //https://github.com/compact/angular-bootstrap-lightbox
  'cfp.hotkeys',                          //https://github.com/chieffancypants/angular-hotkeys
  'checklist-model',                      //https://vitalets.github.io/checklist-model/
  'daterangepicker',                      //https://github.com/fragaria/angular-daterangepicker
  'feature-flags',                        //https://github.com/michaeltaranto/angular-feature-flags
  'frapontillo.bootstrap-duallistbox',    //https://github.com/frapontillo/angular-bootstrap-duallistbox
  'google.places',                        //https://github.com/kuhnza/angular-google-places-autocomplete
  'highcharts-ng',                        //https://github.com/pablojim/highcharts-ng
  'mentio',                               //https://github.com/jeff-collins/ment.io
  'monospaced.elastic',                   //https://github.com/monospaced/angular-elastic
  'ngCountTo',                            //http://pfitzpaddy.github.io/angular-filter-count-to/
  'ngCsv',                                //https://github.com/asafdav/ng-csv
  'ngFileUpload',                         //https://github.com/danialfarid/ng-file-upload  
  'ngPasswordStrength',                   //https://github.com/subarroca/ng-password-strength
  'ngPrettyJson',                         //https://www.npmjs.com/package/ng-prettyjson
  'ngTagsInput',                          //https://github.com/mbenford/ngTagsInput
  'nya.bootstrap.select',                 //https://github.com/lordfriend/nya-bootstrap-select
  'rzModule',                             //https://github.com/angular-slider/angularjs-slider
  'slick',                                //https://github.com/vasyabigi/angular-slick
  'toastr',                               //https://github.com/Foxandxss/angular-toastr
  'ui.bootstrap',                         //https://angular-ui.github.io/bootstrap/
  'ui.knob',                              //https://github.com/yunlzheng/angular-knob
  'ui.mask',                              //https://github.com/angular-ui/ui-mask
  'ui.select',                            //https://github.com/angular-ui/ui-select
  'ui.sortable',                          //https://github.com/angular-ui/ui-sortable
  'ui.utils.masks',                       //https://github.com/assisrafael/angular-input-masks
  'validation.match',                     //https://github.com/TheSharpieOne/angular-validation-match
  'videosharing-embed',                   //https://github.com/erost/ng-videosharing-embed
  'gavruk.card',                          //https://github.com/gavruk/angular-card
  'ui.calendar',                          //https://github.com/angular-ui/ui-calendar
  'ksSwiper',                             //https://github.com/ksachdeva/angular-swiper


  //Support Services
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  'angular-stripe',                       //https://github.com/bendrucker/angular-stripe
  'ngIntercom',                           //https://github.com/gdi2290/angular-intercom
  'pusher-angular',                       //https://github.com/pusher/pusher-angular
  'analytics.mixpanel',                   //https://github.com/mixpanel/mixpanel-js
  'tandibar/ng-rollbar',                  //https://github.com/tandibar/ng-rollbar


  //Applicaiton Files
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //config
  'interloop.config',                       
  'interloop.config.toastr',
  'interloop.config.http-interceptor',
  'interloop.config.shortcuts',

  //routes
  'interloop.routes',  
  'interloop.routes.settings',
  'interloop.routes.configure',                   

  //values
  'interloop.value.config',
  'interloop.value.fields',
  'interloop.value.editions',
  'interloop.value.featureFlags',
  'interloop.value.permissions',
  'interloop.value.modalDefs',
  'interloop.value.baseChartConfig',
  'interloop.value.addressValues',
  'interloop.value.timezoneValues',

  //controllers
  'interloop.loginCtrl',
  'interloop.forgotCtrl',
  'interloop.resetCtrl',

  // app ctrls
  'interloop.navCtrl',
  // pulse
  'interloop.pulseOutlookCtrl',
  //analytics
  'interloop.insightsCtrl',
  'interloop.dashboardsCtrl',
  'interloop.explorerCtrl',
  'interloop.powerbiCtrl',


  //shared list view
  'interloop.listViewCtrl',
  'interloop.recordDetailsCtrl',
  'interloop.recordEditCtrl',

  //details
  'interloop.relationshipDetailsCtrl',
  'interloop.noteDetailsCtrl',
  'interloop.emailDetailsCtrl',

  //more
  'interloop.agendaCtrl',
  'interloop.filesCtrl',
  'interloop.fileDetailsCtrl',
  'interloop.starredCtrl',
  'interloop.directoryCtrl',
  'interloop.mentionsCtrl',

  //search
  'interloop.searchCtrl',

  //notifications
  'interloop.notificationsCtrl',

  // modals
  //-------------------------
  // new entity
  'interloop.newEntityCtrl',
  'interloop.newOpportunityCtrl',
  'interloop.newProspectCtrl',
  'interloop.newCompanyCtrl',
  'interloop.newContactCtrl',

  //new activity
  'interloop.newNoteCtrl',
  'interloop.newActivityCtrl',
  'interloop.customActivityCtrl',
  'interloop.newTaskCtrl',
  'interloop.logCallCtrl',
  'interloop.newMeetingCtrl',

  // other
  'interloop.mediaPickerCtrl',
  'interloop.addAddressCtrl',
  'interloop.addStatusCtrl',
  'interloop.addProductCtrl',
  'interloop.addProcessCtrl',
  'interloop.editAddressCtrl',
  'interloop.bulkAssignCtrl',
  'interloop.bulkDeleteCtrl',
  'interloop.bulkEditCtrl',
  'interloop.bulkExportCtrl',
  'interloop.bulkTagCtrl',
  'interloop.confirmCtrl',
  'interloop.warningCtrl',
  'interloop.showFullRecordCtrl',
  'interloop.connectIcloudCtrl',
  'interloop.createViewCtrl',
  'interloop.deleteViewCtrl',
  'interloop.editActivityTypeCtrl',
  'interloop.editCustomFieldCtrl',
  'interloop.editForecastCategoryCtrl',
  'interloop.editFieldCtrl',
  'interloop.editReasonCtrl',
  'interloop.editStatusCtrl',
  'interloop.editRoleCtrl',
  'interloop.editProductCtrl',
  'interloop.editSystemViewCtrl',
  'interloop.editTeamCtrl',
  'interloop.editUserProfileCtrl',
  'interloop.editViewCtrl',
  'interloop.exportCtrl',
  'interloop.exportDataCtrl',
  'interloop.exportViewCtrl',
  'interloop.fileUploadCtrl',
  'interloop.importDataCtrl',
  'interloop.inviteUsersCtrl',
  'interloop.lostReasonCtrl',
  'interloop.manageRelationshipsCtrl',
  'interloop.manageTagsCtrl',
  'interloop.newCustomFieldCtrl',
  'interloop.newSystemViewCtrl',
  'interloop.newTeamCtrl',
  'interloop.submitForecastCtrl',
  'interloop.wonReasonCtrl',
  'interloop.paymentMethodCtrl',
  'interloop.logDetailsCtrl',
  'interloop.editFormulaCtrl',

  //configuration
  'interloop.configCreateUserCtrl',
  'interloop.configPermissionsCtrl',
  'interloop.configLimitsCtrl',
  'interloop.configFeaturesCtrl',
  'interloop.configTrialBillingCtrl',
  'interloop.configFieldsCtrl',
  'interloop.configSystemViewsCtrl',
  'interloop.configRawCtrl',
  'interloop.configBannersCtrl',
  'interloop.configNotificationsCtrl',
  'interloop.configErrorHandlingCtrl',
  'interloop.configOnboardingCtrl',

  // settings
  'interloop.addActivityTypeCtrl',
  'interloop.addForecastCategoryCtrl',
  'interloop.addGoalCtrl',
  'interloop.addOwnerCtrl',
  'interloop.addOwnersCtrl',
  'interloop.addPipelineCtrl',
  'interloop.addReasonCtrl',
  'interloop.addRelatedCtrl',
  'interloop.addRoleCtrl',
  'interloop.addTagCtrl',
  'interloop.addTeamMemberCtrl',
  'interloop.assignRoleCtrl',
  'interloop.editRoleCtrl',
  'interloop.settingsAuditLogCtrl',
  'interloop.settingsCompanyCtrl',
  'interloop.settingsConnectedCtrl',
  'interloop.settingsCreationCtrl',
  'interloop.settingsCustomFieldsCtrl',
  'interloop.settingsExportCtrl',
  'interloop.settingsDuplicatesCtrl',
  'interloop.settingsFieldsCtrl',
  'interloop.settingsForecastingCtrl',
  'interloop.settingsGoalsCtrl',
  'interloop.settingsImportCtrl',,
  'interloop.settingsIntegrationsCtrl',
  'interloop.settingsInvoicesCtrl',
  'interloop.settingsNotificationsCtrl',
  'interloop.settingsPermissionsCtrl',
  'interloop.settingsPipelinesCtrl',
  'interloop.settingsPipelineDetailsCtrl',
  'interloop.settingsProfileCtrl',
  'interloop.settingsSubscriptionCtrl',
  'interloop.settingsTagsCtrl',
  'interloop.settingsTeamDetailsCtrl',
  'interloop.settingsTeamsCtrl',
  'interloop.settingsTypesCtrl',
  'interloop.settingsStatusesCtrl',
  'interloop.settingsProductsCtrl',
  'interloop.settingsUsersCtrl',
  'interloop.settingsViewsCtrl',
  'interloop.settingsWonLossCtrl',
  'interloop.shareWithCtrl',

  //filters
  'interloop.filter.asDate',
  'interloop.filter.formatDate',
  'interloop.filter.shortNumber',
  'interloop.filter.megaNumber',
  'interloop.filter.thousandSuffix',
  'interloop.filter.bytes',
  'interloop.filter.isSelected',
  'interloop.filter.fileTypes',
  'interloop.filter.fileIcons',

  //directives
  'interloop.directive.contenteditable',
  'interloop.directive.permission',
  'interloop.directive.dynamicTitle',
  'interloop.directive.scrollClass',
  'interloop.directive.changeOnBlur',
  'interloop.directive.autofocus',
  'interloop.directive.focusSelect',
  'interloop.directive.filereader',

  //factories
  'interloop.factory.configService',
  'interloop.factory.authService',
  'interloop.factory.connectivityMonitor',
  'interloop.factory.newEntityFactory',
  'interloop.factory.modalManager',
  'interloop.factory.viewManager',
  'interloop.factory.insightManager',
  'interloop.factory.activityCreator',
  'interloop.factory.gridManager',
  'interloop.factory.queryBuilder',
  'interloop.factory.queryDecoder',
  'interloop.factory.aggregateBuilder', 
  'interloop.factory.sidebarRouter',
  'interloop.factory.sidebarActions',
  'interloop.factory.shareLink',
  'interloop.factory.relationshipManager',
  'interloop.factory.searchService',
  'interloop.factory.featureFlagManager',
  'interloop.factory.tagManager',
  'interloop.factory.smartParse',
  'interloop.factory.excelGenerator',
  'interloop.factory.logger',
  'interloop.oauth.factory',
  'qSerial.factory'


]);