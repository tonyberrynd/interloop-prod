/* ==========================================================================
   New Prospect Modal
   ========================================================================== */

angular.module('interloop.newProspectCtrl', [])

//declare dependencies
.controller('newProspectCtrl', function(
  $scope,
  $timeout,
  $rootScope,
  Company,
  $uibModalInstance,
  Prospect,
  Logger,
  ProspectFields) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

  //set up fields
  $scope.data.fields = ProspectFields;
    //custom fields
  $scope.data.customFields = _.filter($rootScope.customFields,function(o){
      return _.includes(o.useWith, 'Prospect');
  })

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    $timeout(function () {
       angular.element(document.getElementsByClassName("form-control")[0]).focus();
      });

}

activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {

    Prospect.create($scope.data.thisOpp).$promise
      .then(function(results){
          Logger.info('Created Prospect', $scope.data.thisOpp.name)
          $uibModalInstance.close($scope.data);
      })
      .catch(function(err){
        Logger.error('Error Creating Prospect', 'Please Try Again in a moment');
      })
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

  //returns list of companies filtered by typeahead
  function getCompanies (val) {
    val = val != null ? val : ""; 
    return Company.find(
       { "filter": { "where" :{ "name": {"like": val ,"options":"i"}}, limit: 10}}
    ).$promise
    .then(function(response){
      return response
    })
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