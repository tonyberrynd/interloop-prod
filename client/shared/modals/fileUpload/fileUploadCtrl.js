/* ==========================================================================
   New Opportunity Modal
   ========================================================================== */

angular.module('interloop.fileUploadCtrl', [])

//declare dependencies
.controller('fileUploadCtrl', function(
  $scope,
  $rootScope,
  $timeout,
  BASE,
  $uibModalInstance,
  resolvedData,
  RelationshipManager,
  Upload) {

// BINDABLES
//===========================================

  //vars
  //---------------------
  var entityType = resolvedData.entityType;
  var entityItem = resolvedData.entityItem;

  //data
  //----------------------
  $scope.data = {};

  $scope.data.file = resolvedData.file;
  // $scope.data.entityType = resolvedData.entityType;
  // $scope.data.entityItem = resolvedData.entityItem;

  //name and comment
  $scope.data.name = angular.copy($scope.data.file.name);
  $scope.data.comment = '';

  //make sure and relate this to the user that is uploading the file
  $scope.data.file.uploadBy = $rootScope.activeUser || null;

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

      $rootScope.showBanner = true;
      $rootScope.uploadingFile = true;
      $rootScope.uploadingText = 'Uploading: ' + $scope.data.name;
      $rootScope.uploadState = 'initial';
      var latestFile = null;

      $timeout(function(){
  
        //change file name
        var fileExtension = '.' + $scope.data.file.name.split('.').pop();

        var uniqFileName = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;

        //TODO - Need to pass USER ID so can relate attachment to user on backend
        Upload.upload({
            url: BASE.URL + '/api/attachments/upload?userId=' + $rootScope.activeUser.id,
            data: {
              file: Upload.rename($scope.data.file, uniqFileName),
              name: $scope.data.name,
              comment: $scope.data.comment
            },
            headers: {'Authorization': window.localStorage.$LoopBack$accessTokenId }, // loopback access token
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);

            $rootScope.uploadingFile = true;
            $rootScope.uploadingText = 'Successfully Uploaded!'
            $rootScope.uploadingType = 'success';
            //once file is uploaded - link to user record

            $timeout(function(){
              $rootScope.uploadingFile = false;
              $rootScope.showBanner = false;
            }, 1500)

            latestFile = resp.data;

            console.log('done', resp.data)
            //relate file to entity 
            relateFile(entityItem, entityType, resp.data)

        }, function (resp) {
            console.log('Error status: ' + resp.status);

            $rootScope.uploadingFile = false;
            $rootScope.showBanner = false;
            $rootScope.uploadState = 'error';

        }, function (evt) {
          

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $rootScope.uploadingText = 'Progress: ' + progressPercentage + '% ' + evt.config.data.file.name;
            $rootScope.uploadState = 'processing';
        });

      }, 0)


         //close whether done or not
        $uibModalInstance.close();


  }


  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };



  function relateFile(entityItem, entityType, file){
     //need to link the file to the record
      RelationshipManager.linkItem(entityItem.id, file.id, entityType, "Attachment", {
              "description" : "Linked File", 
              "name": $scope.data.file.name
          })
          .then(function(results){
              console.log('link files', results);
              //ensure there is at least file array
              entityItem.files = entityItem.files || [];

              //push file results into file
              entityItem.files.push(file);
          })
          .catch(function(err){
            Logger.error('Error Adding File', 'Please Try Again In A Few Moments')
          })
  }

//-------------------------------------------


// EVENTS
//===========================================
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});