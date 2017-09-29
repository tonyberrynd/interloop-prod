// app.routes.js
/* ==========================================================================
   Routes (UI Router)
   ========================================================================== */

angular.module('coil.routes', [])


.config(function($stateProvider, $urlRouterProvider) {

/* Login
   ========================================================================== */

  $stateProvider.state('login', {
      url: "/login",
      templateUrl: 'modules/login/login.tpl.html',
      controller: 'loginCtrl'
  });


  /* Pages
   ========================================================================== */

  $stateProvider.state('maintenance', {
      url: "/maintenance",
      templateUrl: 'modules/pages/maintenance.tpl.html'
  });

  $stateProvider.state('403', {
      url: "/403",
      templateUrl: 'modules/pages/403.tpl.html'
  });

  $stateProvider.state('404', {
      url: "/404",
      templateUrl: 'modules/pages/404.tpl.html'
  });

  $stateProvider.state('500', {
      url: "/500",
      templateUrl: 'modules/pages/500.tpl.html'
  });

  $stateProvider.state('503', {
      url: "/503",
      templateUrl: 'modules/pages/503.tpl.html'
  });


/* Layouts
   ========================================================================== */
  $stateProvider.state('chart-page', {
      url: "/chart-page",
      templateUrl: 'modules/layouts/chart-page.tpl.html'
  });

  $stateProvider.state('grid-page', {
      url: "/grid-page",
      templateUrl: 'modules/layouts/grid-page.tpl.html'
  });

/* App
   ========================================================================== */

  //basic app structure
  $stateProvider.state('app', {
      abstract: true,
      sticky: true,
      templateUrl: 'modules/app/app.tpl.html'
  });

/* Admin
   ========================================================================== */

  $stateProvider.state('app.admin', {
      url: "/admin",
      views: {
          'page-content@app': {
              templateUrl: "modules/admin/admin.tpl.html",
              // controller: 'navCtrl'
          }
        }
  });

  $stateProvider.state('app.admin.dashboard', {
      url: "/dashboard",
      views: {
         //main content area
          'admin-content': {
            templateUrl: 'modules/admin/dashboard.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.admin.payments', {
      url: "/payments",
      views: {
         //main content area
          'admin-content': {
            templateUrl: 'modules/admin/payments.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.admin.deployments', {
      url: "/deployments",
      views: {
         //main content area
          'admin-content': {
            templateUrl: 'modules/admin/deployments.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.admin.bugs', {
      url: "/bugs",
      views: {
         //main content area
          'admin-content': {
            templateUrl: 'modules/admin/bugs.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

/* Brand
   ========================================================================== */

  $stateProvider.state('app.brand', {
      url: "/brand",
      views: {
          'page-content@app': {
              templateUrl: "modules/brand/brand.tpl.html",
              // controller: 'navCtrl'
          }
        }
  });

  $stateProvider.state('app.brand.overview', {
      url: "/overview",
      views: {
         //main content area
          'brand-content': {
            templateUrl: 'modules/brand/overview.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.brand.mission', {
      url: "/mission",
      views: {
         //main content area
          'brand-content': {
            templateUrl: 'modules/brand/mission.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.brand.color', {
      url: "/color",
      views: {
         //main content area
          'brand-content': {
            templateUrl: 'modules/brand/color.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.brand.typography', {
      url: "/typography",
      views: {
         //main content area
          'brand-content': {
            templateUrl: 'modules/brand/typography.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.brand.logos', {
      url: "/logos",
      views: {
         //main content area
          'brand-content': {
            templateUrl: 'modules/brand/logos.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


/* Marketing
   ========================================================================== */

  $stateProvider.state('app.marketing', {
      url: "/marketing",
      views: {
          'page-content@app': {
              templateUrl: "modules/marketing/marketing.tpl.html",
              // controller: 'navCtrl'
          }
        }
  });

  $stateProvider.state('app.marketing.overview', {
      url: "/overview",
      views: {
         //main content area
          'marketing-content': {
            templateUrl: 'modules/marketing/overview.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.marketing.videos', {
      url: "/videos",
      views: {
         //main content area
          'marketing-content': {
            templateUrl: 'modules/marketing/videos.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.marketing.case-studies', {
      url: "/case-studies",
      views: {
         //main content area
          'marketing-content': {
            templateUrl: 'modules/marketing/case-studies.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.marketing.presentations', {
      url: "/presentations",
      views: {
         //main content area
          'marketing-content': {
            templateUrl: 'modules/marketing/presentations.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.marketing.templates', {
      url: "/templates",
      views: {
         //main content area
          'marketing-content': {
            templateUrl: 'modules/marketing/templates.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


/* Product
   ========================================================================== */

  $stateProvider.state('app.product', {
      url: "/product",
      views: {
          'page-content@app': {
              templateUrl: "modules/product/product.tpl.html",
              // controller: 'navCtrl'
          }
        }
  });

  $stateProvider.state('app.product.overview', {
      url: "/overview",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/overview.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.color', {
      url: "/color",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/color.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.typography', {
      url: "/typography",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/typography.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.icons', {
      url: "/icons",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/icons.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.layouts', {
      url: "/layouts",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/layouts.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.pages', {
      url: "/pages",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/pages.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.avatars', {
      url: "/avatars",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/avatars.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.badges', {
      url: "/badges",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/badges.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.banners', {
      url: "/banners",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/banners.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.breadcrumbs', {
      url: "/breadcrumbs",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/breadcrumbs.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.buttons', {
      url: "/buttons",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/buttons.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.checkboxes', {
      url: "/checkboxes",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/checkboxes.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.dropdowns', {
      url: "/dropdowns",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/dropdowns.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

 $stateProvider.state('app.product.data-grid', {
      url: "/data-grid",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/data-grid.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.forms', {
      url: "/forms",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/forms.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

 $stateProvider.state('app.product.lozenges', {
      url: "/lozenges",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/lozenges.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

 $stateProvider.state('app.product.modals', {
      url: "/modals",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/modals.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

 $stateProvider.state('app.product.multi-select', {
      url: "/multi-select",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/multi-select.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

 $stateProvider.state('app.product.popovers', {
      url: "/popovers",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/popovers.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

 $stateProvider.state('app.product.progress', {
      url: "/progress",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/progress.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.pagination', {
      url: "/pagination",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/pagination.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.pricing-table', {
      url: "/pricing-table",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/pricing-table.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.slider', {
      url: "/slider",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/slider.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

   $stateProvider.state('app.product.radio-buttons', {
      url: "/radio-buttons",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/radio-buttons.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.single-select', {
      url: "/single-select",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/single-select.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.tables', {
      url: "/tables",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/tables.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.tabs', {
      url: "/tabs",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/tabs.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.tags', {
      url: "/tags",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/tags.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.toasts', {
      url: "/toasts",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/toasts.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.toggles', {
      url: "/toggles",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/toggles.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.tooltips', {
      url: "/tooltips",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/tooltips.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.lists', {
      url: "/lists",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/lists.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.cards', {
      url: "/cards",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/cards.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.product.comments', {
      url: "/comments",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/comments.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.activity-feed', {
      url: "/activity-feed",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/activity-feed.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.spinners', {
      url: "/spinners",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/spinners.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.graphs', {
      url: "/graphs",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/graphs.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.media-picker', {
      url: "/media-picker",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/media-picker.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.product.sidepanels', {
      url: "/sidepanels",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/sidepanels.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

    $stateProvider.state('app.product.lightbox', {
      url: "/lightbox",
      views: {
         //main content area
          'product-content': {
            templateUrl: 'modules/product/lightbox.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  /* Mobile
   ========================================================================== */

  $stateProvider.state('app.mobile', {
      url: "/mobile",
      views: {
          'page-content@app': {
              templateUrl: "modules/mobile/mobile.tpl.html",
              // controller: 'navCtrl'
          }
        }
  });

  $stateProvider.state('app.mobile.overview', {
      url: "/overview",
      views: {
         //main content area
          'mobile-content': {
            templateUrl: 'modules/mobile/overview.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.mobile.buttons', {
      url: "/buttons",
      views: {
         //main content area
          'mobile-content': {
            templateUrl: 'modules/mobile/buttons.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('app.mobile.forms', {
      url: "/forms",
      views: {
         //main content area
          'mobile-content': {
            templateUrl: 'modules/mobile/forms.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });

  $stateProvider.state('app.mobile.modals', {
      url: "/modals",
      views: {
         //main content area
          'mobile-content': {
            templateUrl: 'modules/mobile/modals.tpl.html',
            // controller: 'forecastingCtrl'
          }
      },
  });


  $stateProvider.state('opportunity-details', {
      // url: "/admin",
      url:"/opportunity/1234",
      sticky: true,
      views: {
          //main content area
          'sidepanel-content@app': {
            templateUrl: 'modules/sidepanel/opportunity.tpl.html',
            // controller: 'forecastingCtrl'
          }
        }
  });

  $stateProvider.state('opportunity-edit', {
      // url: "/admin",
     url:"/opportunity/1234/edit",
      sticky: true,
      views: {
          //main content area
          'sidepanel-content@app': {
            templateUrl: 'modules/sidepanel/opportunity-edit.tpl.html',
            // controller: 'forecastingCtrl'
          }
        }
  });

  // $stateProvider.state('app.opportunity-edit', {
  //     // url: "/admin",
  //     views: {
  //         'sidebar-content@app': {
  //             templateUrl: "modules/sidepanel/opportunity-edit.tpl.html",
  //             // controller: 'navCtrl'
  //         }
  //       }
  // });



  /* ==========================================================================
   ** Default State **
   ========================================================================== */

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise("/brand/overview");


});