/* ==========================================================================
   Panles Config Settings
   ========================================================================== */

angular.module('interloop.config.shortcuts', [])

//CUSTOM SHORTCUT CHEAT SHEET
// .config(function(hotkeysProvider) {
//   hotkeysProvider.template = '<div class="my-own-cheatsheet">Test</div>';
// })

.run(function($rootScope, $log, hotkeys, modalManager) {
//remove default ? shortcut
// hotkeys.del('?');

//Global Search
//==============================================//
hotkeys.add({
    combo: 'esc',
    description: 'Close Sidepanel (If Open)',
    callback: function(event) {
      if($rootScope.sidePanelOpen) {
        $rootScope.sidePanelOpen = false;
      }
    }
});


//Global Search
//==============================================//
hotkeys.add({
    combo: 'mod+shift+g',
    description: 'Global Search',
    callback: function(event) {
     event.preventDefault();
      angular.element('#GlobalSearch').focus();
    }
});


//Local Search
//==============================================//
hotkeys.add({
    combo: 'mod+shift+l',
    description: 'Local Search',
    callback: function(event) {
     event.preventDefault();
      angular.element('#LocalSearch').focus();
    }
});


//New Activity
//==============================================//
hotkeys.add({
    combo: 'mod+shift+a',
    description: 'Create A New Activity',
    callback: function(event) {
     event.preventDefault();
      modalManager.openModal('newActivity');
      $log.log('SHORTCUT: New Activity');
    }
});


//New Opportunity
//==============================================//
hotkeys.add({
    combo: 'mod+shift+o',
    description: 'Create A New Opportunity',
    callback: function(event) {
     event.preventDefault();
      modalManager.openModal('newOpportunity');
      $log.log('SHORTCUT: New Opportunity');
    }
});

//New Contact
//==============================================//
hotkeys.add({
    combo: 'mod+shift+c',
    description: 'Create New Contact',
    callback: function(event) {
     event.preventDefault();
      modalManager.openModal('newContact');
      $log.log('SHORTCUT: New Contact');
    }
});

//New Company
//==============================================//
hotkeys.add({
    combo: 'mod+shift+m',
    description: 'Create A New Company',
    callback: function(event) {
     event.preventDefault();
      modalManager.openModal('newCompany');
      $log.log('SHORTCUT: New Company');
    }
});



//Sidebar Actions
//==============================================//
// hotkeys.add({
//     combo: 'mod+shift+q',
//     description: '[Sidebar] - Show Available Actions',
//     callback: function(event) {
//      event.preventDefault();
//       $rootScope.$broadcast('SIDEBAR_SHOW_ACTIONS');
//       $log.log('SIDEBAR_SHOW_ACTIONS');
//     }
// });


// hotkeys.add({
//     combo: 'mod+shift+l',
//     description: '[Sidebar] - Log An Activity',
//     callback: function(event) {
//      event.preventDefault();
//       $rootScope.$broadcast('SIDEBAR_LOG_ACTIVITY');
//       $log.log('SIDEBAR_LOG_ACTIVITY');
//     }
// });

// hotkeys.add({
//     combo: 'mod+shift+u',
//     description: '[Sidebar] - Log a note',
//     callback: function(event) {
//      event.preventDefault();
//       $rootScope.$broadcast('SIDEBAR_LOG_NOTE');
//       $log.log('SIDEBAR_LOG_NOTE');
//     }
// });

// hotkeys.add({
//     combo: 'mod+shift+a',
//     description: '[Sidebar] - Create An Activity',
//     callback: function(event) {
//      event.preventDefault();
//       $rootScope.$broadcast('SIDEBAR_CREATE_ACTIVITY');
//       $log.log('SIDEBAR_CREATE_ACTIVITY');
//     }
// });

// hotkeys.add({
//     combo: 'mod+shift+u',
//     description: '[Sidebar] - Upload a file',
//     callback: function(event) {
//      event.preventDefault();
//       $rootScope.$broadcast('SIDEBAR_UPLOAD_FILES');
//       $log.log('SIDEBAR_UPLOAD_FILES');
//     }
// });

// hotkeys.add({
//     combo: 'mod+shift+y',
//     description: '[Sidebar] - Manage Tags',
//     callback: function(event) {
//      event.preventDefault();
//       $rootScope.$broadcast('SIDEBAR_MANAGE_TAGS');
//       $log.log('SIDEBAR_MANAGE_TAGS');
//     }
// });

// hotkeys.add({
//     combo: 'mod+shift+h',
//     description: '[Sidebar] - Manage Relationships',
//     callback: function(event) {
//      event.preventDefault();
//       $rootScope.$broadcast('SIDEBAR_MANAGE_RELATIONSHIPS');
//       $log.log('SIDEBAR_MANAGE_RELATIONSHIPS');
//     }
// });


 // ['mod+shift+q','mod+shift+l','mod+shift+u','mod+shift+a','mod+shift+u','mod+shift+t','mod+shift+r']



});
//end hotkeys // 