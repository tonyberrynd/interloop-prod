/* ==========================================================================
   Determines if related record is selected or not
   ========================================================================== */

angular.module('interloop.filter.isSelected', [])

.filter('isSelected', function() {
      return function(items, array) {
        for(var i=0; i<items.length; i++) {
         var item = items[i];
        //set whether is selected
         item.selected = _.find(array, ['id', item.id]) ? true : false;
        }
        return items;
    }
});