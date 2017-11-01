/* ==========================================================================
   New Company Modal
   ========================================================================== */

angular.module('interloop.newCompanyCtrl', [])

//declare dependencies
.controller('newCompanyCtrl', function(
  $scope,
  $timeout,
  $rootScope,
  $q,
  Company,
  $http,
  $uibModalInstance,
  Logger,
  modalManager,
  RelationshipManager,
  searchService,
  CompanyFields,
  socialTypes,
  resolvedData,
  emailTypes,
  phoneTypes) {

// BINDABLES
//===========================================
  var entityType = _.get(resolvedData, 'entityType', null);
  var thisRecord = _.get(resolvedData, 'thisRecord', null);

  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisRecord = {};
  $scope.data.fieldToggle = 'false';
  $scope.data.loadingOwners = false;
  $scope.data.loadingRelated = false;
  $scope.data.currentEntity = 'Company';
  $scope.data.socialTypes = socialTypes;
  $scope.data.emailTypes = emailTypes;
  $scope.data.phoneTypes = phoneTypes;


  // Get fields
  //-------------------------------
  $scope.data.fields = CompanyFields;
  $scope.data.customFields = _.filter($rootScope.customFields,function(o){
      return _.includes(o.useWith, 'Company');
  })

  //Data Holders
  //---------------------------------
  $scope.data.selectedOwners = [];
  $scope.data.selectedRelated = [];
  $scope.data.scopeRelated = 'all';


  //Assign Owners
  //---------------------------------
  $scope.data.owners = [];
  //should push current user as owner
  $scope.data.owners.push($rootScope.activeUser);

  //Related Records
  //---------------------------------
  $scope.data.related = [];
  if(thisRecord && entityType){
    console.log(thisRecord);
    //need to set entity type so ng repeat know what is going on
    thisRecord.thisEntityType = entityType;
    //push into related array
    $scope.data.related.push(thisRecord);
    //go ahead and prepoulate search results with already related entities
    $scope.data.results = setUpPreSearch(thisRecord.entities);
  }

  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.addOwner = addOwner;
  $scope.removeOwner = removeOwner;
  $scope.addRelated = addRelated;
  $scope.removeRelated = removeRelated;
  $scope.addAddress = addAddress;
  $scope.editAddress = editAddress;
  $scope.addEmail = addEmail;
  $scope.removeEmail = removeEmail;
  $scope.addPhone = addPhone;
  $scope.removePhone = removePhone;
  $scope.addSocial = addSocial;
  $scope.removeSocial = removeSocial;
  $scope.getRecords = getRecords;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    //focuses on first input
    $timeout(function () {
       angular.element(document.getElementsByClassName("form-control")[0]).focus();
      }, 250);

    //push current user in as an owner
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
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

  function ok() {
    
    //set up created by
    //----------------------------
    $scope.data.thisRecord.createdBy = {
      'firstName': $rootScope.activeUser.firstName,
      'lastName': $rootScope.activeUser.lastName,
      'color': $rootScope.activeUser.color,
      'id': $rootScope.activeUser.id
    };

    //set up updated by
    //----------------------------
    $scope.data.thisRecord.updatedBy = {
      'firstName': $rootScope.activeUser.firstName,
      'lastName': $rootScope.activeUser.lastName,
      'color': $rootScope.activeUser.color,
      'id': $rootScope.activeUser.id
    };

     //need to clear out empty array
     //----------------------------
    _.forOwn($scope.data.thisRecord, function(value, key){
      if(_.isArray($scope.data.thisRecord[key])){
        _.forEach($scope.data.thisRecord[key], function(subvalue){
          var keys = _.filter(_.keys(subvalue), function(o) {
            return o !== "$$hashKey";
          });
          //check if empty and remove
          if(keys.length == 0){
            value.splice(value.indexOf(subvalue), 1);
          }
        })
      }
    })

    //Create Entity
    Company.create($scope.data.thisRecord).$promise
      .then(function(results){
                    var thisRecord = results;

                    //link to owners etc
                    //----------------------------
                    var allPromises = [];

                    //add in owner promises
                    //----------------------------
                    _.forEach($scope.data.selectedOwners, function(owner){
                        allPromises.push(Company.owners.create(
                            {"id": thisRecord.id},
                            {
                                "firstName": owner.firstName,
                                "lastName": owner.lastName,
                                "initials": owner.initials,
                                "email": owner.email,
                                "split": owner.splitPercent || null,
                                "active": true,
                                "ownerId": owner.id
                            }).$promise
                        )
                    })

                    //add in related promises
                    //----------------------------
                    _.forEach($scope.data.related, function(value){
                       var name = value.thisEntityType == 'Contact' ? value.firstName + ' ' + value.lastName : value.name;
                       //push in promise
                       allPromises.push(
                        RelationshipManager.linkEntity(thisRecord, value, "Company", value.thisEntityType, 
                              {
                                "from": {
                                  "name": thisRecord.name,
                                  "role": "linked Entity",
                                  "description": "linked Entity",
                                  "isPrimary": false
                                }, 
                                "to": {
                                  "name": name,
                                  "role": "linked entity",
                                  "description": "linkedin entity",
                                  "isPrimary": false
                                }
                              })
                        )
                     })

                    //$q all limit limits the concurrency so we dont overwhelm the server
                    //----------------------------
                    return $q.allLimit(1, allPromises)
                      .then(function(data) {
                         Logger.info('Company Created Succesfully');
                         $uibModalInstance.close(thisRecord);
                      }, function(err) {
                        // One promise died!
                        console.log(err);
                      }, function(progress) {
                        // Progress updates! (progress will equal {completed: Number, count: Number, limit: Number})
                          console.log(progress);
                      });
      })
      .catch(function(err){
        console.log(err);
        Logger.error('Error Creating Company', 'Please Try Again in a moment');
      })
  }

  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };

  //Utility functions for array type values
  //------------------------------------------

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

  
function setUpPreSearch(records){
  _.forEach(records, function(record){
    record.thisEntityType = record.entityType;
    //need to reassign id to match true entitiy id, not the entity link id
    //otherwise will cause issues in the promise all after selecting multiple users
    record.id = record.entityId;
  })

  return records;
}


 function getRecords(searchVal){
      $scope.data.results = [];
      $scope.data.serverError = false;
      $scope.data.loadingResults = true;

      return searchService.globalSearch(searchVal, false)
              .then(function(results){
                $scope.data.results = results;
                console.log(results);
              })
              .catch(function(err){
                $scope.data.serverError = true;
              })
  }


  function addOwner(owner){
    if(!_.find($scope.data.owners, ['id', owner.id])){
           $scope.data.owners.push(owner);
      }
  }

  function removeOwner(owner){
    $scope.data.owners.splice($scope.data.owners.indexOf(owner), 1);
  }


  function addRelated(item){
      //ensures unique
      if(!_.find($scope.data.related, ['id', item.id])){
          $scope.data.related.push(item)
      }
  }

  function removeRelated(item){
    $scope.data.related.splice($scope.data.related.indexOf(item), 1);
  }

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================

$scope.$watch('data.thisRecord.name', function (oldVal, newVal) {
  if(newVal && newVal.length){
   $http({
          method: 'GET',
          url: 'https://autocomplete.clearbit.com/v1/companies/suggest?query=:' + newVal,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(response) {
          
            $scope.data.domainSuggestions = response.data;

            console.log($scope.data.domainSuggestions);
            // error
          }, function errorCallback(response) {

           $scope.data.domainSuggestions = [];
    });
    }

});

//-------------------------------------------

});