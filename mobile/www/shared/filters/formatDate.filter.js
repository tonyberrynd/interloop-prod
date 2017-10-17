/* ==========================================================================
   Allows use to 
   ========================================================================== */

angular.module('interloop.filter.formatDate', [])

.filter('formatDate', function($filter) {    
    var angularDateFilter = $filter('date');
    return function(theDate) {
       return angularDateFilter(theDate, 'MMM d, y');
    }
});