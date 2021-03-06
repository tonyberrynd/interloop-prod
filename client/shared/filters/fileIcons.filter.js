/* ==========================================================================
   Bytes Filter for Files Sizez
   ========================================================================== */

angular.module('interloop.filter.fileIcons', [])

.filter('fileIcons', function() {
  return function(fileType) {
   
    switch(fileType) {
      case 'image/png':
          return '../assets/img/icons/files/png.svg'
          break;
      case 'image/jpeg':
          return '../assets/img/icons/files/jpg.svg'
          break;
      default:
          return 'Uploaded File'
  }
    
  }
});