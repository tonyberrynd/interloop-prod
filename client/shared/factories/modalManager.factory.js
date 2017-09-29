angular.module('interloop.factory.modalManager', [])

.factory('modalManager', function($log, $uibModal, modalDefs) {

    var modalManager = {
        openModal: openModal
    };

    return modalManager;

    ////////

    /*
    Opens Modal Selected by name
    */
    function openModal(modalName, resolvedData) {

        var thisModal = modalDefs[modalName] || null;

            //opens modal
            //--------------------------------
            var modalInstance = $uibModal.open({
              animation: thisModal.animation || true,
              backdrop: 'static',
              windowClass: thisModal.windowClass + ' modal-fade-in-scale-up' || 'modal-fade-in-scale-up',
              ariaLabelledBy: thisModal.ariaLabelledBy || '',
              ariaDescribedBy: thisModal.ariaDescribedBy || '',
              templateUrl: thisModal.templateUrl,
              size: thisModal.size,
              controller: thisModal.controller,
              resolve: {
                  resolvedData: function(){
                      return resolvedData || null;
                  }
              }
            });


            //if result is needed
             modalInstance.result.then(function (returnVal, $q, $timeout) {
                //IF NEED TO HANDLE RETURN VALUE - MANAGE IN THE CONTROLLER
                }, function () {
                  $log.log('dismissed modal');
             });


            //on closing modal
            //--------------------------------
            return modalInstance;

    }
 

});
