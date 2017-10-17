/* ==========================================================================
   New Company Modal
   ========================================================================== */

angular.module('interloop.newCompanyCtrl', [])

//declare dependencies
.controller('newCompanyCtrl', function(
  $scope,
  $uibModalInstance,
  hotkeys,
  modalManager,
  emailTypes,
  phoneTypes,
  searchService,
  socialTypes,
  newEntityFactory) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

  $scope.data.emailTypes = emailTypes;
  $scope.data.phoneTypes = phoneTypes;
  $scope.data.socialTypes = socialTypes;

  $scope.data.company = {};

  $scope.data.company.emails = [{
      value: '',
      type: 'work'
  }];

  $scope.data.company.phones = [{
      value: '',
      type: 'work'
  }];

  $scope.data.company.social = [{
      value: '',
      type: 'linkedin'
  }];

  //functions
  //----------------------
  $scope.addEmail = addEmail;
  $scope.addPhone = addPhone;
  $scope.addSocial = addSocial;

  $scope.ok = ok;
  $scope.cancel = cancel;

  $scope.create = create;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  function addEmail() {
    $scope.data.company.emails.push({value: '', type: 'work'});
    //focus on new input
    $timeout(function(){
       angular.element('#email-' + ($scope.data.company.emails.length - 1)).focus();
     }, 100);
   
  }

  function addPhone() {
    $scope.data.company.phones.push({value: '', type: 'work'});
    //focus
    $timeout(function(){
       angular.element('#phone-' + ($scope.data.company.emails.length - 1)).focus();
     }, 100);
  }

  function addSocial() {
    $scope.data.company.social.push({value: '', type: 'linkedin'});
    //focus
    $timeout(function(){
       angular.element('#social-' + ($scope.data.company.emails.length - 1)).focus();
     }, 100);
  }

  function ok() {
    $uibModalInstance.close($scope.data);
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };


  /*
  Key Press Event for Dropdowns
  */
  function keydown($event, dropdownId) {

    //adds down arrow support to email and phone number dropdowns
    if ($event.keyCode == 40) {
          $scope.data[dropdownId] = true;
    }
  }

    /*
  Create
  */
  function create() {
    newEntityFactory.createNew('Company', $scope.data.company).$promise
      .then(function(results){
        console.log(results);
        $uibModalInstance.close(results);
        Logger.info("Succesfully Created Company");
      })
      .catch(function(err){
        Logger.error("Error Creating Company", "Please try again in a moment")
      })
  }


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