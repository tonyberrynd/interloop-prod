/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.fileUploadCtrl', [])

//declare dependencies
.controller('fileUploadCtrl', function(
  $scope,
  BASE,
  $uibModalInstance,
  resolvedData,
  Upload) {

// BINDABLES
//===========================================

  //vars
  //---------------------

  //data
  //----------------------
  $scope.data = {};

  $scope.data.file = resolvedData;

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {
      //TODO - Need to pass USER ID so can relate attachment to user on backend
      Upload.upload({
          url: BASE.URL + '/api/attachments/upload',
          data: {file: $scope.data.file}
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });

    //close whether done or not
    $uibModalInstance.close($scope.data);
  }


  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});