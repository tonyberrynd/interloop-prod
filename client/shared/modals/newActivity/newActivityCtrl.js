/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.newActivityCtrl', [])

//declare dependencies
.controller('newActivityCtrl', function(
  $scope,
  $timeout,
  $rootScope,
  Activity,
  $http,
  $uibModalInstance,
  Activity,
  Logger,
  modalManager,
  RelationshipManager,
  searchService,
  ActivityFields,
  socialTypes,
  emailTypes,
  phoneTypes) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisRecord = {};
  $scope.data.fieldToggle = 'false';
  $scope.data.loadingOwners = false;
  $scope.data.loadingRelated = false;
  $scope.data.currentEntity = 'Activity';
  $scope.data.socialTypes = socialTypes;
  $scope.data.emailTypes = emailTypes;
  $scope.data.phoneTypes = phoneTypes;


  //set up fields
  $scope.data.fields = ActivityFields;
    //custom fields
  $scope.data.customFields = _.filter($rootScope.customFields,function(o){
      return _.includes(o.useWith, 'Activity');
  })

  $scope.data.selectedOwners = [];
  $scope.data.selectedRelated = [];
  $scope.data.scopeRelated = 'all';

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.getLookupValue = getLookupValue;
  $scope.searchRelated = searchRelated;
  $scope.showFieldFilter = showFieldFilter;
  $scope.searchOwners = searchOwners;
  $scope.addOwner = addOwner;
  $scope.removeOwner = removeOwner;
  $scope.addRelated = addRelated;
  $scope.removeRelated = removeRelated;
  $scope.clearResults = clearResults;
  $scope.noResultsNew = noResultsNew;
  $scope.addAddress = addAddress;
  $scope.editAddress = editAddress;
  $scope.addEmail = addEmail;
  $scope.removeEmail = removeEmail;
  $scope.addPhone = addPhone;
  $scope.removePhone = removePhone;
  $scope.addSocial = addSocial;
  $scope.removeSocial = removeSocial;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    $timeout(function () {
       angular.element(document.getElementsByClassName("form-control")[0]).focus();
      });
    //push current user into owners array
    $scope.data.selectedOwners.push($rootScope.activeUser);

    //ensure minimum values
   _.forEach($scope.data.fields, function(value){
      if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
        $scope.data.thisRecord[value.key] = $scope.data.thisRecord[value.key] || [{}];
      }
    })

    //ensure minimum values
    _.forEach($scope.data.customFields, function(value){
      if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
        $scope.data.thisRecord[value.key] = $scope.data.thisRecord[value.key] || [{}];
      }
    })

}

activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

  function showFieldFilter(item){
    if($scope.data.fieldToggle == 'false'){
      return item.excludeNew !== true
    } else {
      return item.excludeNew !== true && item.newRequired == true
    }
  }

  function ok() {
    //if required fields selected - only created opp with these field
    //so any other fields filled out wont inadvertenly be added to new record
    if($scope.data.fieldToggle == 'true') {
      //TODO
    }

    Activity.create($scope.data.thisRecord).$promise
      .then(function(results){
          Logger.info('Created Activity', $scope.data.thisRecord.name)

          if($scope.data.thisRecord.primaryActivity) {
            return linkActivity(results, $scope.data.thisRecord.primaryActivity, true)
                      .then(function(results){
                        $uibModalInstance.close(results);
                      })
                      .catch(function(err){
                        Logger.error("Error Linking Primary Activity", err)
                      })
          } else {
            $uibModalInstance.close(results);
          }
      })
      .catch(function(err){
        console.log(err);
        Logger.error('Error Creating Activity', 'Please Try Again in a moment');
      })
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

  //TB - TODO - Look at moving the broadcast messages into a shared factory 
function linkActivity(opp, company, updateGrid){
  return RelationshipManager.linkEntity(opp, company, "Activity", "Activity",  
  {
    "from": { "name": opp.name, "description": "Primary Org", "isPrimary": true}, 
    "to" : { "name": company.name, "description": "Primary Org", "isPrimary": true}
  })
  .then(function(results){
    return results; 
  }); 
}; 

  //returns list of companies filtered by typeahead
  function getCompanies (val) {
    val = val != null ? val : ""; 
    return Activity.find(
       { "filter": { "where" :{ "name": {"like": val ,"options":"i"}}, limit: 10}}
    ).$promise
    .then(function(response){
      return response
    })
  };


function getLookupValue(filter, entityType, searchVal){
  return searchService.getLookupValue(filter, entityType, searchVal);
  }

function searchOwners(){
  $scope.data.results = [];
  $scope.data.loadingOwners = true;
  return searchService.getLookupValue(null, 'Appuser', $scope.data.searchOwnersText)
            .then(function(results){
              $scope.data.results = results;
              $scope.data.loadingOwners = false;
            })
            .catch(function(err){
              console.log(err);
              $scope.data.loadingOwners = false;
            })
}

function searchRelated(){
  $scope.data.results = [];
  $scope.data.loadingRelated = true;
  if($scope.data.scopeRelated !== 'all'){
    return searchService.getLookupValue(null, $scope.data.scopeRelated, $scope.data.searchOwnersText)
            .then(function(results){
              $scope.data.results = results;
                $scope.data.loadingRelated = false;
            })
            .catch(function(err){
              console.log(err);
                $scope.data.loadingRelated = false;
            })
  } else {
    return searchService.globalSearch($scope.data.searchRelatedText, false, null)
            .then(function(results){
              $scope.data.results = results;
              $scope.data.loadingRelated = false;
              console.log(results);
            })
            .catch(function(err){
              console.log(err);
              $scope.data.loadingRelated = false;
            })
  }
}

function clearResults(){
  $scope.data.results = [];
}

function addOwner(owner){
  $scope.data.results.splice($scope.data.results.indexOf(owner), 1)
  $scope.data.selectedOwners = _.unionBy($scope.data.selectedOwners, [owner], 'id');
}

function removeOwner(owner){
  $scope.data.selectedOwners.splice($scope.data.selectedOwners.indexOf(owner), 1)
}


function addRelated(item){
  $scope.data.results.splice($scope.data.results.indexOf(item), 1)
  $scope.data.selectedRelated = _.unionBy($scope.data.selectedRelated, [item], 'id');
}

function removeRelated(item){
  $scope.data.selectedRelated.splice($scope.data.selectedRelated.indexOf(item), 1)
}

function noResultsNew(entityType, modelValue) {
  //opeen entity new
  var newModal = modalManager.openModal('new' + entityType);

  newModal.result.then(function(results){
    console.log('returned new thing');
  }, function(err){
    console.log(err);
  })
}


  function addEmail(field){
    console.log('add email');
    $scope.data.thisRecord[field.key] = $scope.data.thisRecord[field.key] || [];
    $scope.data.thisRecord[field.key].push({
      label: 'work',
      value: null
    });
  }

  function removeEmail(social, field){
    $scope.data.thisRecord[field.key].splice($scope.data.thisRecord[field.key].indexOf(social), 1);
  }

  function addPhone(field){
    console.log('add phone');
    $scope.data.thisRecord[field.key] = $scope.data.thisRecord[field.key] || [];
    $scope.data.thisRecord[field.key].push({
      label: 'work',
      value: null
    });
  }

  function removePhone(social, field){
    $scope.data.thisRecord[field.key].splice($scope.data.thisRecord[field.key].indexOf(social), 1);
  }

  function addSocial(field){
    console.log('add social');
    $scope.data.thisRecord[field.key] = $scope.data.thisRecord[field.key] || [];
    $scope.data.thisRecord[field.key].push({
      label: 'other',
      value: null
    });
  }


  function removeSocial(social, field){
    $scope.data.thisRecord[field.key].splice($scope.data.thisRecord[field.key].indexOf(social), 1);
  }

  function addAddress(field){
    var addAddressModal = modalManager.openModal('addAddress');

    addAddressModal.result.then(function(results){
      $scope.data.thisRecord[field.key] = $scope.data.thisRecord[field.key] || [];
      $scope.data.thisRecord[field.key].push(results);
    }, function(){
      //ignore
    })
  }

  function removeAddress(address, field){
    $scope.data.thisRecord[field.key].splice($scope.data.thisRecord[field.key].indexOf(social), 1);
  }


  function editAddress(fieldValue, address){
    var resolvedData = {
      address: address
    }
    var editAddressModal = modalManager.openModal('editAddress');

    editAddressModal.result.then(function(results){
      address = results;
    }, function(){
      //ignore
    })
  }

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================

$scope.$watch('data.thisRecord.name', function (oldVal, newVal) {

   $http({
          method: 'GET',
          url: 'https://autocomplete.clearbit.com/v1/companies/suggest?query=:' + newVal,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(response) {
          
            $scope.data.websiteSuggestions = response.data;
            // error
          }, function errorCallback(response) {

           $scope.data.websiteSuggestions = [];
    });

});

//-------------------------------------------

});