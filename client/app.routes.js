// app.routes.js
/* ==========================================================================
   Routes (UI Router)
   ========================================================================== */

angular.module('interloop.routes', [])


.config(function($stateProvider, $urlRouterProvider) {

/* Login
   ========================================================================== */

  $stateProvider.state('login', {
      url: "/login",
      templateUrl: "modules/login/login.tpl.html",
      controller: "loginCtrl",
      data: {
          pageTitle: 'Login'
      },
      authenticate: false
  });

  $stateProvider.state('forgot', {
      url: "/forgot",
      templateUrl: "modules/forgot/forgot.tpl.html",
      controller: "forgotCtrl",
      data: {
          pageTitle: 'Forgot Password | Interloop'
      },
      authenticate: false
  });

  $stateProvider.state('reset', {
      url: "/reset",
      templateUrl: "modules/reset/reset.tpl.html",
      controller: "resetCtrl",
      data: {
          pageTitle: 'Password Reset | Interloop'
      },
      authenticate: false
  });


  /* Application Modules
   ========================================================================== */


  /* Error Pages
   ========================================================================== */

  $stateProvider.state('maintenance', {
      url: "/maintenance",
      templateUrl: 'assets/errors/maintenance.tpl.html'
  });

  $stateProvider.state('offline', {
      url: "/offline",
      templateUrl: 'assets/errors/offline.tpl.html'
  });

  $stateProvider.state('403', {
      url: "/403",
      templateUrl: 'assets/errors/403.tpl.html'
  });

  $stateProvider.state('404', {
      url: "/404",
      templateUrl: 'assets/errors/404.tpl.html'
  });

  $stateProvider.state('500', {
      url: "/500",
      templateUrl: 'assets/errors/500.tpl.html'
  });

  $stateProvider.state('503', {
      url: "/503",
      templateUrl: 'assets/errors/503.tpl.html'
  });

/* App
   ========================================================================== */

  $stateProvider.state('app', {
      abstract: true,
      sticky: true,
      views: {
          'nav-content@app': {
            templateUrl: 'modules/app/navbar.tpl.html',
            controller: 'navCtrl'
          },
          '@': {
            templateUrl: 'modules/app/app.tpl.html',
          }
      },
      resolve: {
        CONFIG: function(configService, $q) {
          return configService.init();
        }
      }
  });


  /* Analytics
   ========================================================================== */

   //pulse
   $stateProvider.state('app.pulse', {
      sticky: true,
      url: "/pulse",
      views: {
          'page-content@app': {
            templateUrl: 'modules/pulse/pulse.tpl.html',
            // controller: 'opportunitiesCtrl',
          }
      },
      params: {
        dashboardId: 'default'
      },
      data: {
          pageTitle: 'Pulse',
          navTitle: 'Pulse'
      }
   });

  //dashboards
  $stateProvider.state('app.dashboards', {
      sticky: true,
      url: "/dashboards/:dashboardId",
      views: {
          'page-content@app': {
            templateUrl: 'modules/dashboards/dashboards.tpl.html',
            // controller: 'opportunitiesCtrl',
          }
      },
      params: {
        dashboardId: 'default'
      },
      data: {
          pageTitle: 'Dashboards',
          navTitle: 'Dashboards'
      }
   });

  //insights
  $stateProvider.state('app.insights', {
      sticky: true,
      url: "/insights/:insightKey",
      views: {
          'page-content@app': {
            templateUrl: 'modules/insights/insights.tpl.html',
            controller: 'insightsCtrl',
          }
      },
      params: {
        insightKey: 'opp-risk-matrix',
        query: null
      },
      data: {
          pageTitle: 'Insights',
          navTitle: 'Insights'
      }
   });

  $stateProvider.state('app.explorer', {
      sticky: true,
      url: "/explorer",
      views: {
          'page-content@app': {
            templateUrl: 'modules/explorer/explorer.tpl.html',
            controller: 'explorerCtrl',
          }
      },
      params: {
        query: null
      },
      data: {
          pageTitle: 'Explorer',
          navTitle: 'Explorer'
      }
   });

/* Managment
   ========================================================================== */
  //goals
  $stateProvider.state('app.goals', {
      sticky: true,
      url: "/goals/:goalSheetId",
      views: {
          'page-content@app': {
            templateUrl: 'modules/goals/goals.tpl.html',
            // controller: 'opportunitiesCtrl',
          }
      },
      params: {
        goalSheetId: 'default'
      },
      data: {
          pageTitle: 'Goals',
          navTitle: 'Goals'
      }
   });

  //foresight
  $stateProvider.state('app.pace', {
      sticky: true,
      url: "/pace/:goalSheetId",
      views: {
          'page-content@app': {
            templateUrl: 'modules/pace/pace.tpl.html',
            // controller: 'opportunitiesCtrl',
          }
      },
      params: {
        goalSheetId: 'default'
      },
      data: {
          pageTitle: 'Pace',
          navTitle: 'Pace'
      }
   });


  $stateProvider.state('app.1-1', {
      sticky: true,
      url: "/1-1/:week",
      views: {
          'page-content@app': {
            templateUrl: 'modules/1-1/1-1.tpl.html',
            // controller: 'opportunitiesCtrl',
          }
      },
      params: {
        goalSheetId: 'default'
      },
      data: {
          pageTitle: '1-1s',
          navTitle: '1-1s'
      }
   });

  $stateProvider.state('app.performance', {
      sticky: true,
      url: "/performance/:teamId/:userId",
      views: {
          'page-content@app': {
            templateUrl: 'modules/performance/performance.tpl.html',
            // controller: 'opportunitiesCtrl',
          }
      },
      params: {
        teamId: 'all',
        userId: '12345'
      },
      data: {
          pageTitle: 'Performance',
          navTitle: 'Performance'
      }
   });


  $stateProvider.state('app.engagement', {
      sticky: true,
      url: "/engagement/:userId",
      views: {
          'page-content@app': {
            templateUrl: 'modules/engagement/engagement.tpl.html',
            // controller: 'opportunitiesCtrl',
          }
      },
      params: {
        userId: '12345'
      },
      data: {
          pageTitle: 'Engagement',
          navTitle: 'Engagement'
      }
   });

  /* Data
   ========================================================================== */

    //forecasts
  $stateProvider.state('app.forecasts', {
      sticky: true,
      url: "/forecasts/view/:viewId",
      views: {
          'page-content@app': {
            templateUrl: 'modules/forecasts/forecasts.tpl.html',
            // controller: 'opportunitiesCtrl',
          }
      },
      params: {
        viewId: 'default',
        query: null
      },
      data: {
          pageTitle: 'Forecasts',
          navTitle: 'Forecasts'
      }
   });


  //opportunities alias - makes sure the user gets to list in case urls change
  $stateProvider.state('opportunities-alias', {
    url:'/opportunities/view/:viewId',
    controller: function($state, $stateParams){
      $state.go('app.opportunities', $stateParams)
    },
    params: {
      viewId: null
    }
  });

  //opportunities
  $stateProvider.state('app.opportunities', {
      sticky: true,
      url: "/opportunities/view/:viewId/:visualType",
      views: {
          'page-content@app': {
            templateUrl: 'modules/opportunities/opportunities.tpl.html',
            controller: 'opportunitiesCtrl',
          }
      },
      params: {
        viewId: 'default',
        query: null,
        visualType: 'list'
      },
      data: {
          pageTitle: 'Opportunities',
          navTitle: 'Opportunities'
      }
   });

  $stateProvider.state('app.opportunity-details', {
      url: "/opportunity/:id",
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/opportunities/opportunity-details.tpl.html',
            controller: 'opportunityDetailsCtrl'
          }
      },
      onEnter: function($rootScope, $state, $stateParams){
        $rootScope.sidePanelOpen = true;
      },
      params: {
        id: null,
      },
      data: {
        sidebarState: true,
        routeThroughState: 'app.opportunities'
      }
   });

  //edit opportunity
  $stateProvider.state('app.opportunity-edit', {
      url: "/opportunity/:id/edit",
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'shared/templates/entity-edit.tpl.html',
            // controller: 'editOpportunityCtrl'
          }
      },
      params: {
        id: null,
      }
   });

  //contacts
  $stateProvider.state('app.contacts', {
      sticky: true,
      url: "/contacts/view/:viewId",
      views: {
         'nav-content@app': {
            templateUrl: 'modules/app/navbar.tpl.html',
            controller: 'navCtrl'
          },
          'page-content@app': {
            templateUrl: 'modules/contacts/contacts.tpl.html',
            controller: 'contactsCtrl'
          }
      },
      params: {
        viewId: 'default',
        query: null
      },
      data: {
          pageTitle: 'Contacts',
          navTitle: 'Contacts'
      }
   });

    $stateProvider.state('app.contact-details', {
      url: "/contact/:id",
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/contacts/contact-details.tpl.html',
            controller: 'contactDetailsCtrl'
          }
      },
      onEnter: function($state, $stateParams){
        // event.preventDefault();
        // $state.go('app.opportunities');
        // $state.go('app.opportunity-details', $stateParams);
      },
      params: {
        id: null,
      },
      data: {
        sidebarState: true,
        redirectState: 'app.contacts'
      }
   });

   // companies
   $stateProvider.state('app.companies', {
      sticky: true,
      url: "/companies/view/:viewId",
      views: {
         'nav-content@app': {
            templateUrl: 'modules/app/navbar.tpl.html',
            controller: 'navCtrl'
          },
          'page-content@app': {
            templateUrl: 'modules/companies/companies.tpl.html',
            controller: 'companiesCtrl'
          }
      },
      params: {
        viewId: 'default',
        query: null
      },
      data: {
          pageTitle: 'Companies',
          navTitle: 'Companies'
      }
   });


    $stateProvider.state('app.company-details', {
      url: "/company/:id",
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/companies/company-details.tpl.html',
            controller: 'companyDetailsCtrl'
          }
      },
      onEnter: function($state, $stateParams){
        // event.preventDefault();
        // $state.go('app.opportunities');
        // $state.go('app.opportunity-details', $stateParams);
      },
      params: {
        id: null,
      },
      data: {
        sidebarState: true,
        redirectState: 'app.companies'
      }
   });


   // content
    $stateProvider.state('app.content', {
      url: "/content/view/:viewId",
      views: {
         'nav-content@app': {
            templateUrl: 'modules/app/navbar.tpl.html',
            controller: 'navCtrl'
          },
          'page-content@app': {
            templateUrl: 'modules/content/content.tpl.html',
            controller: 'contentCtrl'
          }
      },
      params: {
        viewId: 'default',
        query: null
      },
      data: {
          pageTitle: 'Content',
          navTitle: 'Content'
      }
   });


  $stateProvider.state('app.content-details', {
      url: "/content/:id",
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/content/content-details.tpl.html',
            controller: 'contentDetailsCtrl'
          }
      },
      onEnter: function($state, $stateParams){
        // event.preventDefault();
        // $state.go('app.opportunities');
        // $state.go('app.opportunity-details', $stateParams);
      },
      params: {
        id: null,
      },
      data: {
        sidebarState: true,
        redirectState: 'app.content'
      }
   });


  /* Activities
   ========================================================================== */

  $stateProvider.state('app.tasks', {
      url: "/tasks/view/:viewId",
      sticky: true,
      views: {
         'nav-content@app': {
            templateUrl: 'modules/app/navbar.tpl.html',
            controller: 'navCtrl'
          },
          'page-content@app': {
            templateUrl: 'modules/tasks/tasks.tpl.html',
            controller: 'tasksCtrl'
          }
      },
      params: {
        viewId: 'default',
        query: null
      },
      data: {
          pageTitle: 'Tasks',
          navTitle: 'Tasks'
      }
   });

  
  $stateProvider.state('app.activity-details', {
      url: "/tasks/:id",
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/tasks/task-details.tpl.html',
            // controller: 'contentDetailsCtrl'
          }
      },
      onEnter: function($state, $stateParams){
        // event.preventDefault();
        // $state.go('app.opportunities');
        // $state.go('app.opportunity-details', $stateParams);
      },
      params: {
        id: null,
      },
      data: {
        sidebarState: true,
        redirectState: 'app.tasks'
      }
   });


/* More Sidepanel States
   ========================================================================== */

  $stateProvider.state('app.mentions', {
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/more/mentions/mentions.tpl.html',
            // controller: 'opportunitiesCtrl'
          }
      },
      onEnter: function($rootScope){
        $rootScope.sidePanelOpen = true;
      }
   });



  $stateProvider.state('app.starred', {
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/more/starred/starred.tpl.html',
            controller: 'starredCtrl'
          }
      },
      onEnter: function($rootScope){
        $rootScope.sidePanelOpen = true;
      }
   });

  $stateProvider.state('app.files', {
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/more/files/files.tpl.html',
            controller: 'filesCtrl'
          }
      },
      onEnter: function($rootScope){
        $rootScope.sidePanelOpen = true;
      }
   });

  $stateProvider.state('app.file-details', {
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/more/files/fileDetails.tpl.html',
            controller: 'fileDetailsCtrl'
          }
      },
      params: {
        id: null
      },
      onEnter: function($rootScope){
        $rootScope.sidePanelOpen = true;
      }
   });

  $stateProvider.state('app.downloads', {
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/more/downloads/downloads.tpl.html',
            // controller: 'opportunitiesCtrl'
          }
      },
      onEnter: function($rootScope){
        $rootScope.sidePanelOpen = true;
      }
   });

  $stateProvider.state('app.directory', {
      sticky: true,
      views: {
          'sidepanel-content@app': {
            templateUrl: 'modules/more/directory/directory.tpl.html',
            controller: 'directoryCtrl'
          }
      },
      onEnter: function($rootScope){
        $rootScope.sidePanelOpen = true;
      }
   });


  /* ==========================================================================
   ** Search **
   ========================================================================== */

    $stateProvider.state('app.search', {
      url: "/search?q",
      views: {
         //main content area
          'page-content@app': {
            templateUrl: 'modules/search/search.tpl.html',
            controller: 'searchCtrl'
          }
      },
      data: {
          pageTitle: 'Search Results',
          navTitle: 'Search Results'
      }
    });

  /* ==========================================================================
   ** Notifications **
   ========================================================================== */

    $stateProvider.state('app.notifications', {
      url: "/notifications",
      views: {
         //main content area
          'page-content@app': {
            templateUrl: 'modules/notifications/notifications2.tpl.html',
            controller: 'notificationsCtrl'
          }
      },
      data: {
          pageTitle: 'My Notifications',
          navTitle: 'My Notifications'
      }
    });

  /* ==========================================================================
   ** Default State **
   ========================================================================== */

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise("/dashboards/default");


});