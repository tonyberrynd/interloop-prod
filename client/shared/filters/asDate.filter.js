/* ==========================================================================
   Allows use to 
   ========================================================================== */

angular.module('interloop.filter.asDate', [])

.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
})