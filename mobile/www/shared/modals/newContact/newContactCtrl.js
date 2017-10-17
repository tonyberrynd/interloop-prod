/* ==========================================================================
   New Contact Modal
   ========================================================================== */

angular.module('interloop.newContactCtrl', [])

//declare dependencies
.controller('newContactCtrl', function(
  $scope,
  $uibModalInstance,
  $timeout,
  $document,
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
  $scope.data.companies = [];

  $scope.data.emailTypes = emailTypes;
  $scope.data.phoneTypes = phoneTypes;
  $scope.data.socialTypes = socialTypes;

  $scope.data.contact = {};

  $scope.data.contact.emails = [{
      value: '',
      type: 'work'
  }];

  $scope.data.contact.phones = [{
      value: '',
      type: 'work'
  }];

  $scope.data.contact.social = [{
      value: '',
      type: 'linkedin'
  }];

  //functions
  //----------------------
  $scope.lookupCompanies = lookupCompanies;

  $scope.addEmail = addEmail;
  $scope.addPhone = addPhone;
  $scope.addSocial = addSocial;

  $scope.ok = ok;
  $scope.cancel = cancel;

  $scope.lookupKeydown = lookupKeydown;
  $scope.keydown = keydown;

  $scope.create = create;

//-------------------------------------------

// SHORTCUTS
//===========================================


//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

  //lookup primary company
  function lookupKeydown($event, companies) {
    if($event.keyCode == 13 && !companies.length) {
      console.log('enter!');
      modalManager.openModal('newCompany');
    }

    // if($event.keyCode == 13 && !$scope.data.companies.length && $scope.data.primaryCompany){
    //   modalManager.openModal('newCompany');
    // }
  }

  function lookupCompanies(query) {
    return searchService.entitySearch('Company', query)
          .then(function(results){
            console.log(results);
            $scope.data.companies = results;
        })
  };

  function addEmail() {
    $scope.data.contact.emails.push({value: '', type: 'work'});
    //focus on new input
    $timeout(function(){
       angular.element('#email-' + ($scope.data.contact.emails.length - 1)).focus();
     }, 100);
   
  }

  function addPhone() {
    $scope.data.contact.phones.push({value: '', type: 'work'});
    //focus
    $timeout(function(){
       angular.element('#phone-' + ($scope.data.contact.emails.length - 1)).focus();
     }, 100);
  }

  function addSocial() {
    $scope.data.contact.social.push({value: '', type: 'linkedin'});
    //focus
    $timeout(function(){
       angular.element('#social-' + ($scope.data.contact.emails.length - 1)).focus();
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
    newEntityFactory.createNew('Contact', $scope.data.contact).$promise
      .then(function(results){
        console.log(results);
        $uibModalInstance.close(results);
        Logger.info("Succesfully Created Contact");
      })
      .catch(function(err){
        Logger.error("Error Creating Contact", "Please try again in a moment")
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