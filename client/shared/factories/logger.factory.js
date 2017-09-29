angular.module('interloop.factory.logger', [])

.factory('Logger', function($log, $injector) {

     var logger = {
        showToasts: true,

        error: error,
        info: info,
        success: success,
        warning: warning,

        //straight to console - bypass toastr
        log: $log.log

    };

    return logger;

    ////////

    function error(title, message, data) {
        $injector.get('toastr').error(message, title);
        $log.error('Error: ' + message, data);
    } 


    function info(title, message, data) {
        $injector.get('toastr').info(message, title);
        $log.info('Info: ' + message, data);
    } 

    function success(title, message, data) {
        $injector.get('toastr').success(message, title);
        $log.info('Success: ' + message, data);
    } 

    function warning(title, message, data) {
        $injector.get('toastr').warning(message, title);
        $log.warning('Warning: ' + message, data);
    } 

});
