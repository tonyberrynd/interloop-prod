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
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return 'Excel Spreadsheet'
          break;
      case 'application/pdf':
          return "PDF Document"
          break;
      default:
          return 'Uploaded File'
  }
    
  }
});