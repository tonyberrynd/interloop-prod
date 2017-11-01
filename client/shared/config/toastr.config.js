/* ==========================================================================
   Toastr Config Settings
   ========================================================================== */

angular.module('interloop.config.toastr', [])

//toastr container config
.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: true,
    containerId: 'toast-container',
    maxOpened: 2,    
    newestOnTop: true,
    positionClass: 'toast-top-center',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });
})

//toatr popup config
.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    closeButton: false,
    closeHtml: '<button class="btn btn-clear"><icon class="wb-close-mini"></icon></button>',
    extendedTimeOut: 10000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },  
    messageClass: 'toast-message',
    onHidden: null,
    onShown: null,
    onTap: null,
    progressBar: false,
    tapToDismiss: true,
    templates: {
      toast: 'assets/html/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 7500,
    titleClass: 'toast-title',
    toastClass: 'toast animated'
  });
});