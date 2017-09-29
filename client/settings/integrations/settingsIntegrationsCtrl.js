  /* ==========================================================================
   Settings Teams Ctrl
   ========================================================================== */

angular.module('interloop.settingsIntegrationsCtrl', [])
//declare dependencies
.controller('settingsIntegrationsCtrl', function(
	$scope,
  $rootScope,
  $location,
	$log,
  $timeout,
	$uibModal,
  Logger,
	Appuser,
  Org,
  BASE) {

// BINDABLES
//===========================================

  //vars
  //----------------------
  var CONNECTURL = BASE.URL.replace("/api", "");

	//data
	//----------------------
	$scope.data = {};
  $scope.data.activated = false;

  //slack url
  $scope.data.connectSlackUrl = CONNECTURL + '/connect_slack';
  //slack connect url
  $scope.data.connectSalesforceUrl = CONNECTURL + '/connect_salesforce';
  //mailchimp
  $scope.data.connectMailchimpUrl = CONNECTURL + '/connect_mailchimp';


	//functions
	//----------------------


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    //refresh org information if if it's changed onserver
    return Org.findOne()
    .$promise
    .then(function(results){
      console.log(results);
      //set to rootScope
      $rootScope.activeOrg = results;

      //first check if being redirected
      if($location.search().redirect) {

        var connectedApp = $location.search().app || '';

        if($location.search().status == 'success') {
          //show success toast
          Logger.success('Successfully Connected' + ' ' + connectedApp);
  
        } else if($location.search().status == 'error') {
          //show error toast
          Logger.error('Error Connecting' + ' ' + connectedApp, 'Please try again in a few moments');
        }
      }

      $scope.data.activated = true;
    })
    .catch(function(err){
      console.log('Error finding Org Data')


      $scope.data.activated = true;
    })

} 
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================



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