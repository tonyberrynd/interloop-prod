angular.module('interloop.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('intro', {
    url: '/intro',
    templateUrl: 'modules/intro/intro.tpl.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'modules/login/login.tpl.html',
    controller: 'loginCtrl'
  })

  .state('forgot', {
    url: '/forgot',
    templateUrl: 'modules/forgot/forgot.tpl.html',
    controller: 'forgotCtrl'
  })


  //main app state
  //-------------------------k

  .state('app', {
    url: '',
    abstract: true,
    templateUrl: 'modules/_layout/menu.html',
    resolve: {
        CONFIG: function(configService) {
          return configService.init(true);
        }
      }
  })


  .state('app.pulse', {
    url: '/pulse',
    views: {
      'menuContent': {
        templateUrl: 'modules/pulse/pulse.tpl.html'
      }
    }
  })

  .state('app.forecast', {
    url: '/forecast',
    views: {
      'menuContent': {
        templateUrl: 'modules/forecast/forecast.tpl.html'
      }
    }
  })

  .state('app.opportunities', {
    url: '/opportunities/view/:viewId',
    views: {
      'menuContent': {
        templateUrl: 'modules/opportunities/opportunities.tpl.html',
        controller: 'opportunitiesCtrl'
      }
    },
    data: {
      showOptionButton: true
    },
    params: {
      viewId: 'default'
    }
  })

  .state('app.opportunities-details', {
    url: '/opportunity/:id',
    views: {
      'menuContent': {
        templateUrl: 'modules/opportunities/opportunity-details.tpl.html',
        controller: 'opportunityDetailCtrl'
      }
    },
    data: {
      showOptionButton: true
    },
    params: {
      id: null
    }
  })

  .state('app.activities', {
    url: '/activities',
    views: {
      'menuContent': {
        templateUrl: 'modules/activities/activities.tpl.html',
        controller: 'activitiesCtrl'
      }
    },
    data: {
      showOptionButton: true
    },
    params: {
      viewId: 'default'
    }
  })

  .state('app.activity-details', {
    url: '/activity/:id',
    views: {
      'menuContent': {
        templateUrl: 'modules/activity/activity-details.tpl.html',
        // controller: 'activityDetailCtrl'
      }
    },
    data: {
      showOptionButton: true
    },
    params: {
      id: null
    }
  })

  .state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'modules/contacts/contacts.tpl.html',
        controller: 'contactsCtrl'
      }
    },
    data: {
      showOptionButton: true
    },
    params: {
      viewId: 'default'
    }
  })

  .state('app.contact-details', {
    url: '/contact/:id',
    views: {
      'menuContent': {
        templateUrl: 'modules/contact/contact-details.tpl.html',
        // controller: 'activityDetailCtrl'
      }
    },
    data: {
      showOptionButton: true
    },
    params: {
      id: null
    }
  })

  .state('app.companies', {
    url: '/companies',
    views: {
      'menuContent': {
        templateUrl: 'modules/companies/companies.tpl.html',
        controller: 'companiesCtrl'
      }
    },
    data: {
      showOptionButton: true
    },
    params: {
      viewId: 'default'
    }
  })

  .state('app.company-details', {
    url: '/company/:id',
    views: {
      'menuContent': {
        templateUrl: 'modules/company/company-details.tpl.html',
        // controller: 'activityDetailCtrl'
      }
    },
    data: {
      showOptionButton: true
    },
    params: {
      id: null
    }
  })


  // settings
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'modules/settings/settings.tpl.html',
        // controller: 'settingsCtrl'
      }
    }
  })

  .state('app.settings-notifications', {
    url: '/settings/notifications',
    views: {
      'menuContent': {
        templateUrl: 'modules/settings/notifications.tpl.html'
      }
    }
  })


  // search
  .state('search', {
    url: '/search',
    templateUrl: 'modules/search/search.tpl.html',
    controller: 'searchCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/pulse');

});