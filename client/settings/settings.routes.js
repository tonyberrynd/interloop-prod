/* ==========================================================================
   Settings States
   ========================================================================== */

angular.module('interloop.routes.settings', [])


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app.settings', {
      url: "/settings",
      abstract: true,
      views: {
         //main settings-content area
          'page-content@app': {
            templateUrl: "settings/settings2.tpl.html",
          }
      },
      data: {
          pageTitle: 'Settings',
          navTitle: 'Settings'
      }
  });

  //====================================//
  // User Settings
  //====================================//


  $stateProvider.state('app.settings.profile', {
      url: "/profile",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/profile/profile2.tpl.html",
              controller: 'settingsProfileCtrl'
          }
        },
      data: {
          pageTitle: 'My Profile',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.creation', {
      url: "/creation",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/creation/creation.tpl.html",
              controller: 'settingsCreationCtrl'
          }
        },
      data: {
          pageTitle: 'Notification Preferences',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.notifications', {
      url: "/notifications",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/notifications/notifications.tpl.html",
              controller: 'settingsNotificationsCtrl'
          }
        },
      data: {
          pageTitle: 'Notification Preferences',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.connected', {
      url: "/connected",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/connected/connected2.tpl.html",
              controller: 'settingsConnectedCtrl'
          }
        },
      data: {
          pageTitle: 'Connected Apps',
          navTitle: 'Settings'
      }
  });


  //====================================//
  // Company Settings
  //====================================//


  $stateProvider.state('app.settings.company', {
      url: "/company",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/company/company.tpl.html",
              controller: 'settingsCompanyCtrl'
          }
        },
      data: {
          pageTitle: 'Company Settings',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.users', {
      url: "/users",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/users/users.tpl.html",
              controller: 'settingsUsersCtrl'
          }
        },
      data: {
          pageTitle: 'Manage Users',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.permissions', {
      url: "/permissions",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/permissions/permissions2.tpl.html",
              controller: 'settingsPermissionsCtrl'
          }
        },
      data: {
          pageTitle: 'Teams & Visibility',
          navTitle: 'Settings'
      }
  });


    $stateProvider.state('app.settings.teams', {
      url: "/teams",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/teams/teams2.tpl.html",
              controller: 'settingsTeamsCtrl'
          }
        },
      data: {
          pageTitle: 'Teams & Visibility',
          navTitle: 'Settings'
      }
  });

  $stateProvider.state('app.settings.team-details', {
      url: "/teams/:teamId",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/teams/team-details.tpl.html",
              controller: 'settingsTeamDetailsCtrl'
          }
        },
      data: {
          pageTitle: 'Teams & Visibility',
          navTitle: 'Settings'
      },
      params: {
        teamId: null
      }
  });


  $stateProvider.state('app.settings.integrations', {
      url: "/integrations",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/integrations/integrations.tpl.html",
                controller: 'settingsIntegrationsCtrl'
          }
        },
      data: {
          pageTitle: 'Integrations',
          navTitle: 'Settings'
      }
  });




  //====================================//
  // Configuration Settings
  //====================================//

  $stateProvider.state('app.settings.pipelines', {
      url: "/pipelines",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/pipelines/pipelines.tpl.html",
              controller: 'settingsPipelinesCtrl'
          }
        },
      data: {
          pageTitle: 'Pipelines',
          navTitle: 'Settings'
      }
  });

  $stateProvider.state('app.settings.goals', {
      url: "/goals",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/goals/goals.tpl.html",
              controller: 'settingsGoalsCtrl'
          }
        },
      data: {
          pageTitle: 'Manage Goals',
          navTitle: 'Settings'
      }
  });

  $stateProvider.state('app.settings.products', {
      url: "/products",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/products/products.tpl.html",
              // controller: 'settingsGoalsCtrl'
          }
        },
      data: {
          pageTitle: 'Manage Products',
          navTitle: 'Settings'
      }
  });

  $stateProvider.state('app.settings.forecasting', {
      url: "/forecasting",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/forecasting/forecasting.tpl.html",
              controller: 'settingsForecastingCtrl'
          }
        },
      data: {
          pageTitle: 'Forecast Categories',
          navTitle: 'Settings'
      }
  });

  $stateProvider.state('app.settings.types', {
      url: "/types",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/types/types.tpl.html",
              controller: 'settingsTypesCtrl'
          }
        },
      data: {
          pageTitle: 'Entity Types',
          navTitle: 'Settings'
      }
  });

  $stateProvider.state('app.settings.won-loss', {
      url: "/won-loss",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/won-loss/won-loss.tpl.html",
              controller: 'settingsWonLossCtrl'
          }
        },
      data: {
          pageTitle: 'Won / Loss Reasons',
          navTitle: 'Settings'
      }
  });

  $stateProvider.state('app.settings.fields', {
      url: "/fields",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/fields/fields.tpl.html",
              controller: 'settingsFieldsCtrl'
          }
        },
      data: {
          pageTitle: 'Detail Fields',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.custom-fields', {
      url: "/custom-fields",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/custom-fields/custom-fields.tpl.html",
              controller: 'settingsCustomFieldsCtrl'
          }
        },
      data: {
          pageTitle: 'Custom Fields',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.views', {
      url: "/views",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/views/views.tpl.html",
              controller: 'settingsViewsCtrl'
          }
        },
      data: {
          pageTitle: 'Manage Views',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.tags', {
      url: "/tags",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/tags/tags.tpl.html",
              controller: 'settingsTagsCtrl'
          }
        },
      data: {
          pageTitle: 'Manage Tags',
          navTitle: 'Settings'
      }
  });

  //====================================//
  // Data Management
  //====================================//
  
  $stateProvider.state('app.settings.import', {
      url: "/import",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/import/import.tpl.html",
              controller: 'settingsImportCtrl'
          }
        },
      data: {
          pageTitle: 'Import Data',
          navTitle: 'Settings'
      }
  });



  $stateProvider.state('app.settings.import-wizard', {
      url: "/import/:entityType/:importType",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/import/wizard.tpl.html",
              controller: 'settingsImportWizardCtrl'
          }
        },
      data: {
          pageTitle: 'Import Data',
          navTitle: 'Settings'
      },
      params: {
        entityType: null,
        importType: 'excel'
      }
  });

  
  $stateProvider.state('app.settings.export', {
      url: "/export",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/export/export.tpl.html",
              controller: 'settingsExportCtrl'
          }
        },
      data: {
          pageTitle: 'Export Data',
          navTitle: 'Settings'
      }
  });

  $stateProvider.state('app.settings.audit-log', {
      url: "/audit-log",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/audit-log/audit-log.tpl.html",
              controller: 'settingsAuditLogCtrl'
          }
        },
      data: {
          pageTitle: 'Audit Log',
          navTitle: 'Settings'
      }
  });

  //====================================//
  // Billing Settings
  //====================================//

  $stateProvider.state('app.settings.subscription', {
      url: "/subscription",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/subscription/subscription2.tpl.html",
              controller: 'settingsSubscriptionCtrl'
          }
        },
      data: {
          pageTitle: 'Subscription',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.invoices', {
      url: "/invoices",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/invoices/invoices.tpl.html",
              controller: 'settingsInvoicesCtrl'
          }
        },
      data: {
          pageTitle: 'Invoices',
          navTitle: 'Settings'
      }
  });


  $stateProvider.state('app.settings.invoice-details', {
      url: "/invoices/:invoiceId",
      views: {
          'settings-content@app.settings': {
              templateUrl: "settings/invoices/invoice-details.tpl.html",
              // controller: 'settingsInvoicesCtrl'
          }
        },
      data: {
          pageTitle: 'Invoices',
          navTitle: 'Settings'
      }
  });


});
