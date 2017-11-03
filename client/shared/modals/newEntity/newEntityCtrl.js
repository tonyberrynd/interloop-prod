/* ==========================================================================
   New Contact Modal
   ========================================================================== */

angular.module('interloop.newEntityCtrl', [])

//declare dependencies
.controller('newEntityCtrl', function(
  $http,
  $injector,
  $q,
  $rootScope,
  $scope,
  $timeout,
  $uibModalInstance,
  Contact,
  ContactFields,
  emailTypes,
  Logger,
  modalManager,
  phoneTypes,
  RelationshipManager,
  resolvedData,
  searchService,
  socialTypes
  ) {

// BINDABLES
//===========================================
  var currentEntity = _.get(resolvedData, 'currentEntity', null);
  var relatedRecords = _.get(resolvedData, 'relatedRecords', null);
  var activityType = _.get(resolvedData, 'activityType', null);

  console.log('activity type', activityType)

  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisRecord = {}; //will be filled in by user
  $scope.data.currentEntity = currentEntity || null;
  $scope.data.activityType = activityType ? _.upperFirst(activityType) : null;

  //for activity log call
  $scope.data.callTypes = [
  {
    id: 1,
    value: 'inbound',
    label: 'Inbound Call'
  },
  {
    id: 2,
    value: 'outbound',
    label: 'Outbound Call'
  }];

  //set default to first type
  if(activityType == 'call'){
    $scope.data.thisRecord.callType = $scope.data.callTypes[1];
  }

  //loading indicators
  $scope.data.loadingOwners = false;
  $scope.data.loadingRelated = false;
  $scope.data.createNewCollapse = false;

  //get social, email, phonetypes
  //-------------------------------
  $scope.data.socialTypes = socialTypes;
  $scope.data.emailTypes = emailTypes;
  $scope.data.phoneTypes = phoneTypes;


  // Get fields
  //-------------------------------
  $scope.data.fields = $injector.get(currentEntity + 'Fields');
  $scope.data.customFields = _.filter($rootScope.customFields,function(o){
      return _.includes(o.useWith, currentEntity);
  })

  //Data Holders
  //-------------------------------
  $scope.data.selectedOwners = [];
  $scope.data.selectedRelated = [];
  $scope.data.results = [];
  $scope.data.lookupResults = [];
  $scope.data.scopeRelated = 'all';

  //Add Current Owner
  //---------------------------------
  $scope.data.selectedOwners.push($rootScope.activeUser);

  //Related Records
  //---------------------------------
  if(relatedRecords.length){
    _.forEach(relatedRecords, function(record){
      //set this entity type for searching filters
      record.thisEntityType = record.entityType;
      //push into scope
      $scope.data.selectedRelated.push(record);
      //push other related items into search array for easy access
      $scope.data.results.push(setUpPreSearch(record.entities));
    });
  }
   
  //functions
  //----------------------
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.addRemoveOwner = addRemoveOwner;
  $scope.removeOwner = removeOwner;
  $scope.addRemoveRelated = addRemoveRelated;
  $scope.removeRelated = removeRelated;
  $scope.addAddress = addAddress;
  $scope.editAddress = editAddress;
  $scope.removeAddress = removeAddress;
  $scope.addEmail = addEmail;
  $scope.removeEmail = removeEmail;
  $scope.addPhone = addPhone;
  $scope.removePhone = removePhone;
  $scope.addSocial = addSocial;
  $scope.removeSocial = removeSocial;
  $scope.getRecords = getRecords;
  $scope.getLookupValue = getLookupValue;
  $scope.newEntity = newEntity;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    //ensure minimum values - NEED TO LOOK AT
   _.forEach($scope.data.fields, function(value){
      if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
        $scope.data.thisRecord[value.key] = $scope.data.thisRecord[value.key] || [{}];
      }
    })

    //ensure minimum values - NEED TO LOOK AT
    _.forEach($scope.data.customFields, function(value){
      if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
        $scope.data.thisRecord[value.key] = $scope.data.thisRecord[value.key] || [{}];
      }
    })

    //focuses on first input
    $timeout(function () {
       angular.element(document.getElementsByClassName("form-control")[0]).focus();
    }, 250);
}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================

//entity created & relating to other records
function ok() {

  $scope.data.processing = true;

  //if activity - set type / due date etc
  //----------------------------------
  if(currentEntity == 'Activity'){

      $scope.data.thisRecord.type = activityType;

      // todo specifics
      if(activityType == 'todo'){
        $scope.data.thisRecord.dueDate = $scope.data.customDate ? $scope.data.customDate : convertDate($scope.data.setDate);
      }

      if(activityType == 'note'){
        $scope.data.thisRecord.completed = true;
      }

      //if completed set date and completed by
      if($scope.data.thisRecord.completed){ 
         $scope.data.thisRecord.completedDate = moment().format();
         $scope.data.thisRecord.completedBy = {
          'firstName': $rootScope.activeUser.firstName,
          'lastName': $rootScope.activeUser.lastName,
          'color': $rootScope.activeUser.color,
          'id': $rootScope.activeUser.id
        }
      }
  }

    
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
    console.log('about to create this thing',currentEntity);
    $injector.get(currentEntity).create($scope.data.thisRecord).$promise
      .then(function(results){

            //recieve this record from results
            var thisRecord = results;
            console.log('created record', thisRecord);

            //set this entity type in case going back to another new entity form
            thisRecord.thisEntityType = currentEntity;

            //link to owners etc
            //----------------------------
            var allPromises = [];


            //primary company
            if($scope.data.thisRecord.primaryCompany) {
              allPromises.push(linkCompany(thisRecord, $scope.data.thisRecord.primaryCompany, true))
            } 

            //add in owner promises
            //----------------------------
            _.forEach($scope.data.selectedOwners, function(owner){
                allPromises.push($injector.get(currentEntity).owners.create(
                    {"id": thisRecord.id},
                    {
                        "firstName": owner.firstName,
                        "lastName": owner.lastName,
                        "initials": owner.initials,
                        "email": owner.email,
                        "split": owner.splitPercent || null,
                        "active": true,
                        "ownerId": owner.id
                    }).$promise)
            })

              //add in related promises
              //----------------------------
              _.forEach($scope.data.selectedRelated, function(value){
                 var name = value.thisEntityType == 'Contact' ? value.firstName + ' ' + value.lastName : value.name;
                 // Link entity to activity
                 if(currentEntity == 'Activity'){
                   allPromises.push(

                        RelationshipManager.linkActivity(thisRecord.id, value.id, value.thisEntityType,
                              {
                                "activity": {
                                  "name": _.upperFirst(activityType),
                                  "type": activityType, 
                                  "completed": _.get(thisRecord, 'completed', false)
                                  
                                }, 
                                "entity": {
                                  "name": name,
                                  "description": _.upperFirst(activityType),
                                  "isPrimary": false
                                }
                              })
                        )
                //Link entity to entity
                 } else {
                 allPromises.push(
                  RelationshipManager.linkEntity(thisRecord, value, currentEntity, value.thisEntityType, 
                        {
                          "from": {
                            "name": thisRecord.name,
                            "role": "linked Entity",
                            "description": "linked Entity", //TODO - NEED TO STANDARDIZE
                            "isPrimary": false
                          }, 
                          "to": {
                            "name": name,
                            "role": "linked Entity",
                            "description": "linked Entity", //TODO - NEED TO STANDARDIZE
                            "isPrimary": false
                          }
                        }))
                }
               })

              //$q all limit limits the concurrency so we dont overwhelm the server
              //----------------------------
              console.log('all promises', allPromises);
              return $q.allLimit(1, allPromises)
                .then(function(data) {
                   Logger.info(currentEntity + ' Created Succesfully');
                   $scope.data.processing = false;
                   //close with the originally created entity // Does not necessary include related items though
                   $uibModalInstance.close(thisRecord);
                }, function(err) {
                      // One promise died!
                      console.log(err);

                      Logger.warning('Error linking to X record but will continue linking other records')
                }, function(progress) {
                    //spits out progress
                    console.log(progress);

                    //show progress bar
                });
      })
      .catch(function(err){
        console.log(err);
        Logger.error('Error Creating ' + currentEntity, 'Please Try Again in a moment');
      })
  }


  /*
  Cancel
  */
  function cancel () {
    $uibModalInstance.dismiss('cancel');
  };



    //TB - TODO - Look at moving the broadcast messages into a shared factory 
function linkCompany(record, company, updateGrid){
  return RelationshipManager.linkEntity(record, company, currentEntity, "Company",  
  {
    "from": { "name": record.name, "description": "Primary Org", "isPrimary": true}, 
    "to" : { "name": company.name, "description": "Primary Org", "isPrimary": true}
  })
  .then(function(results){
    return results; 
  }); 
}; 



  //Activity Specific Stuff
  //-----------------------------------------

  function convertDate(date){
    switch(date) {
        case 'today':
            return moment().endOf("day").format();
            break;
        case 'tomorrow':
            return moment().add(1, 'd').endOf("day").format();
            break;
        case 'next-week':
            return moment().add(1, 'w').endOf("day").format();
            break;
        case 'next-month':
            return moment().add(1, 'm').endOf("day").format();
            break;
        default:
            return moment().endOf("day").format();
    }
}


  //Utility functions for array type values
  //------------------------------------------
  /*
  Add Email
  */
  function addEmail(field){
    console.log('add email');
    $scope.data.thisRecord[field.key] = $scope.data.thisRecord[field.key] || [];
    $scope.data.thisRecord[field.key].push({
      label: 'work',
      value: null
    });
  }

  /*
  Remove Email
  */
  function removeEmail(social, field){
    $scope.data.thisRecord[field.key].splice($scope.data.thisRecord[field.key].indexOf(social), 1);
  }

  /*
  Add Phone Number
  */
  function addPhone(field){
    console.log('add phone');
    $scope.data.thisRecord[field.key] = $scope.data.thisRecord[field.key] || [];
    $scope.data.thisRecord[field.key].push({
      label: 'work',
      value: null
    });
  }

  /*
  Remove Phone Number
  */
  function removePhone(social, field){
    $scope.data.thisRecord[field.key].splice($scope.data.thisRecord[field.key].indexOf(social), 1);
  }

  /*
  Add Social Account
  */
  function addSocial(field){
    console.log('add social');
    $scope.data.thisRecord[field.key] = $scope.data.thisRecord[field.key] || [];
    $scope.data.thisRecord[field.key].push({
      label: 'other',
      value: null
    });
  }

  /*
  Remove Social Account
  */
  function removeSocial(social, field){
    $scope.data.thisRecord[field.key].splice($scope.data.thisRecord[field.key].indexOf(social), 1);
  }

  /*
  Add Address
  */
  function addAddress(field){
    var addAddressModal = modalManager.openModal('addAddress');

    addAddressModal.result.then(function(results){
      $scope.data.thisRecord[field.key] = $scope.data.thisRecord[field.key] || [];
      $scope.data.thisRecord[field.key].push(results);
    }, function(){
      //ignore
    })
  }

  /*
  Remove Address
  */
  function removeAddress(address, addresses){
    addresses.splice(addresses.indexOf(address), 1);
  }

  /*
  Edit Address
  */
  function editAddress(address, addresses){
    var resolvedData = {
      address: address
    }
    var editAddressModal = modalManager.openModal('editAddress', resolvedData);

    editAddressModal.result.then(function(results){
      //change to results
      address = results;
    }, function(){
      //ignore
    })
  }


  //Created another related entity
  //-----------------------------

  function newEntity(currentEntity){

    var resolvedData = {
      'currentEntity': currentEntity,
      'relatedRecords': []
    }

    var newEntityModal = modalManager.openModal('newEntity', resolvedData);
        //push into related once created
        newEntityModal.result.then(function(results){
          $scope.data.selectedRelated.push(results);
          $scope.data.searchRelated = '';
          $scope.data.results = [];
        }, function(){

        })


  }


  //Search & Related Entities
  //------------------------------------------

  /*
   Transform Rleated Records for appropriate linking
  */
  function setUpPreSearch(records){
    _.forEach(records, function(record){
      record.thisEntityType = record.entityType;
      //need to reassign id to match true entitiy id, not the entity link id
      //otherwise will cause issues in the promise all after selecting multiple users
      record.id = record.entityId;
    })
    return records;
  }



  /*
Get Look Up Values
*/
function getLookupValue(filter, entityType, searchVal){
  var deferred = $q.defer();

  $scope.data.searchVal = searchVal;
  $scope.data.searching = true;
  $scope.data.serverError = false;
  $scope.data.loadingResults = true;
  $scope.data.lookupResults = [{},{}];

  //Switch based on entity type
  switch(entityType) {
    case currentEntity:
        var query = {"filter": {"where": {"or": [{"firstName": {"regexp": "/" + searchVal + "/i"}}, {"lastName": {"regexp": "/" + searchVal + "/i"}}]}, "orderBy": "firstName ASC", limit: 15, "fields": ['id', 'firstName', 'lastName', 'emails']}}
        break;
    case 'Company':
        var query = {"filter": {"where": {"name": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "name ASC", limit: 15}, "fields": ['id', 'name', 'domain']}
        break;
    case currentEntity:
        var query = {"filter": {"where": {"name": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "name ASC", limit: 15}, "fields": ['id', 'name', 'primaryCompany', 'value', 'status', 'stage', 'forecast', 'estimatedClose', 'score']}
        break;
    case 'Appuser':
        var query = {"filter": {"where": {"fullName": {"regexp": "/" + searchVal + "/i"}}, "orderBy": "fullName ASC", limit: 15}, "fields": ['id', 'firstName', 'lastName', 'initials', 'email']}
        break;
  }

  //protects from making unnecessary api calls
  if(searchVal){
  //then return appropriate values
  return $injector.get(entityType).find(query).$promise
      .then(function(results){
        $scope.data.serverError = false;
        $scope.data.searching = false;
        $scope.data.loadingResults = false;
        $scope.data.lookupResults = results;

        return results;
      })
      .catch(function(err){
        $scope.data.serverError = true;
        $scope.data.searching = false;
        $scope.data.loadingResults = false;
        console.log(err);
        return err;
      })
  } else {
    $scope.data.searching = false;
  }
}

  /*
  Searches Related Records
  */
 function getRecords(searchVal){
      $scope.data.results = [];
      $scope.data.serverError = false;
      $scope.data.loadingResults = true;

      return searchService.globalSearch(searchVal, false)
              .then(function(results){
                $scope.data.results = results;
                $scope.data.loadingResults = false;
                console.log(results);
              })
              .catch(function(err){
                $scope.data.serverError = true;
                 $scope.data.loadingResults = false;
              })
  }


  /*
  Add Selected Owner
  */
  function addRemoveOwner(owner){
    if(!_.find($scope.data.selectedOwners, ['id', owner.id])){
           $scope.data.selectedOwners.push(owner);
    } else {
      removeOwner(owner);
    }
  }

  /*
  Remove Selected Owner
  */
  function removeOwner(owner){
    $scope.data.selectedOwners.splice($scope.data.selectedOwners.indexOf(owner), 1);
  }

  /*
  Add Related Record
  */
  function addRemoveRelated(item){
      //ensures unique
      if(!_.find($scope.data.selectedRelated, ['id', item.id])){
          $scope.data.selectedRelated.push(item)
      } else {
        removeRelated(item);
      }
  }

  /*
  Remove Related Record
  */
  function removeRelated(item){
    $scope.data.selectedRelated.splice($scope.data.selectedRelated.indexOf(item), 1);
  }

//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

// WATCHES
//===========================================
//provides dynamic domain seaching when inputting a companies name
$scope.$watch('data.thisRecord.name', function (oldVal, newVal) {
  if(newVal && newVal.length){
   $http({
          method: 'GET',
          url: 'https://autocomplete.clearbit.com/v1/companies/suggest?query=:' + newVal,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(response) {
            //returns potential domains - for free - how good is that??? 
            $scope.data.domainSuggestions = response.data;
            // error
          }, function errorCallback(response) {
            //domain suggestions
           $scope.data.domainSuggestions = [];
        });
  }
});

//-------------------------------------------

});