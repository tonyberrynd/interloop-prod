angular.module("coil.config.toastr",[]).config(function(t){angular.extend(t,{autoDismiss:!1,containerId:"toast-container",maxOpened:0,newestOnTop:!0,positionClass:"toast-bottom-left",preventDuplicates:!1,preventOpenDuplicates:!1,target:"body"})}).config(function(t){angular.extend(t,{allowHtml:!1,closeButton:!0,closeHtml:'<button class="btn btn-link"><img src="../assets/img/icons/states/close.svg"></img></button>',extendedTimeOut:2e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},messageClass:"toast-message",onHidden:null,onShown:null,onTap:null,progressBar:!1,tapToDismiss:!0,templates:{toast:"directives/toast/toast.html",progressbar:"directives/progressbar/progressbar.html"},timeOut:4e3,titleClass:"toast-title",toastClass:"toast animated"})});