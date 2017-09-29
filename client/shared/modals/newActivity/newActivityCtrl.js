/* ==========================================================================
   New Activity Modal
   ========================================================================== */

angular.module('interloop.newActivityCtrl', [])

//declare dependencies
.controller('newActivityCtrl', function(
  $scope,
  $timeout,
  $rootScope,
  Company,
  $uibModalInstance,
  Activity,
  Logger,
  modalManager,
  RelationshipManager,
  searchService,
  ActivityFields) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.fieldToggle = 'false';
  $scope.data.loadingOwners = false;
  $scope.data.loadingRelated = false;

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

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    $timeout(function () {
       angular.element(document.getElementsByClassName("form-control")[0]).focus();
      });
    //push current user into owners array
    $scope.data.selectedOwners.push($rootScope.activeUser);

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

          if($scope.data.thisRecord.primaryCompany) {
            return linkCompany(results, $scope.data.thisRecord.primaryCompany, true)
                      .then(function(results){
                        $uibModalInstance.close(results);
                      })
                      .catch(function(err){
                        Logger.error("Error Linking Primary Company", err)
                      })
          } else {
            $uibModalInstance.close(results);
          }
      })
      .catch(function(err){
        Logger.error('Error Creating Activity', 'Please Try Again in a moment');
      })
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

  //TB - TODO - Look at moving the broadcast messages into a shared factory 
function linkCompany(opp, company, updateGrid){
  return RelationshipManager.linkEntity(opp, company, "Activity", "Company",  
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
    return Company.find(
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