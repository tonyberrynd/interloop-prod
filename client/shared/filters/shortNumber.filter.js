/* ==========================================================================
   converts values into short number aka 1M, 10K, 2B, etc
   ========================================================================== */

angular.module('interloop.filter.shortNumber', [])

.filter('shortNumber', function() {    
	return function(number) {
		//if not a number - return -
	    if (isNaN(parseFloat(number))) {
	      return '--';
	    }

	    //otherwise
	    if(number > 1000000) {
	      return numeral(number).format('(0.0a)')
	    } else {
	      return numeral(number).format('(0a)')
	    }
	}
});
