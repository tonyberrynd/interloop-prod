/* ==========================================================================
   Bytes Filter for Files Sizez
   ========================================================================== */

angular.module('interloop.filter.fileTypes', [])

.filter('fileTypes', function() {
  return function(fileType) {
   
    switch(fileType) {
      case 'image/png':
          return 'PNG Image'
          break;
      case 'image/jpg':
          return 'JPG Image'
          break;
      default:
          return 'Uploaded File'
  }
    
  }
});