/* Settings Routes
 ========================================================================== */

angular.module('interloop.routes.configure', [])

//UI Router
.config(function($stateProvider, $urlRouterProvider, $stickyStateProvider) {

   $stateProvider.state('app.configure', {
      url: "/configure",
      abstract: true,
      sticky: true,
      views: {
         //main content area
          'page-content@app': {
            templateUrl: 'configure/configure2.tpl.html'
          }
      },
      data: {
          pageTitle: 'Configure',
          navTitle:  'Configure',
          mainState: true
      },
      authenticate: true
  });


  $stateProvider.state('app.configure.trialBilling', {
        url: "/trial-billing",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/trialBilling/trialBilling.tpl.html',
              controller: 'configTrialBillingCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.permissions', {
        url: "/permissions",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/permissions/permissions.tpl.html',
              controller: 'configPermissionsCtrl'
            }
        }
  });

  $stateProvider.state('app.configure.features', {
        url: "/feature-flags",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/features/features.tpl.html',
              controller: 'configFeaturesCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.limits', {
        url: "/limits",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/limits/limits.tpl.html',
              controller: 'configLimitsCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.fields', {
        url: "/fields",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/fields/fields2.tpl.html',
              controller: 'configFieldsCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.systemViews', {
        url: "/system-views",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/systemViews/systemViews.tpl.html',
              controller: 'configSystemViewsCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.create-user', {
        url: "/create-user",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/createUser/createUser.tpl.html',
              controller: 'configCreateUserCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.raw', {
        url: "/raw",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/raw/raw.tpl.html',
              controller: 'configRawCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.banners', {
        url: "/banners",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/banners/banners.tpl.html',
              controller: 'configBannersCtrl'
            }
        }
  });

  $stateProvider.state('app.configure.error-messages', {
        url: "/error-messages",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/errorHandling/errorHandling.tpl.html',
              controller: 'configErrorHandlingCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.notifications', {
        url: "/notifications",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/notifications/notifications.tpl.html',
              controller: 'configNotificationsCtrl'
            }
        }
  });


  $stateProvider.state('app.configure.onboarding', {
        url: "/onboarding",
        views: {
            'configure-content@app.configure': {
              templateUrl: 'configure/onboarding/onboarding.tpl.html',
              controller: 'configOnboardingCtrl'
            }
        }
  });

});