/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.recordEditCtrl', [])
//declare dependencies
.controller('recordEditCtrl', function(
	$scope,
	$stateParams,
	$q,
	$rootScope,
	$injector,
	$state,
	Logger,
	modalManager,
	EndFields,
	socialTypes,
	RelationshipManager,
	emailTypes,
	phoneTypes
 ) {

// BINDABLES
//===========================================
	//Vars
	//---------------------
	var currentEntity = angular.copy($state.current.data.currentEntity);
	var currentEntityPlural = angular.copy($state.current.data.currentEntityPlural);

	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;
	$scope.data.currentEntity = currentEntity;
	$scope.data.socialTypes = socialTypes;
	$scope.data.emailTypes = emailTypes;
	$scope.data.phoneTypes = phoneTypes;

	//get fields
	$scope.data.fields = $injector.get(currentEntity + 'Fields');

	//custom fields
	$scope.data.customFields = _.filter($rootScope.customFields,function(o){
        return _.includes(o.useWith, currentEntity);
    })

	//functions
	//----------------------
	$scope.returnToDetails = returnToDetails;
	$scope.addAddress = addAddress;
	$scope.editAddress = editAddress;
	$scope.addEmail = addEmail;
	$scope.removeEmail = removeEmail;
	$scope.addPhone = addPhone;
	$scope.removePhone = removePhone;
	$scope.addSocial = addSocial;
	$scope.removeSocial = removeSocial;
	$scope.save = save;
	$scope.removeAddress = removeAddress;
	$scope.socialPlaceholder = socialPlaceholder;
	$scope.getLookupValue = getLookupValue;

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){

	return $injector.get(currentEntity).findOne({"filter": {"where": {"id": $stateParams.id}}}).$promise	
				.then(function(results){
					$scope.data.thisRecord = results;

					$scope.data.thisRecord.primaryCompany = RelationshipManager.getPrimary($scope.data.thisRecord.entityLinks, "Company") || null;
					$scope.data.prevPrimaryCompany = $scope.data.thisRecord.primaryCompany ? angular.copy($scope.data.thisRecord.primaryCompany) : null;

					_.forEach($scope.data.fields, function(value){
						if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
							$scope.data.thisRecord[value.key] = _.get($scope.data.thisRecord, value.key, []).length ? $scope.data.thisRecord[value.key] : [{
								type: $scope.data[value.type + 'Types'][0]
							}];
						}
					})

					_.forEach($scope.data.customFields, function(value){
						if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
							$scope.data.thisRecord[value.key] = _.get($scope.data.thisRecord, value.key, []).length ? $scope.data.thisRecord[value.key] : [{
								type: $scope.data[value.type + 'Types'][0]
							}];
						}
					})

					$scope.data.activated = true;
				})
				.catch(function(err){
					Logger.error('Error Fetching Record For Editing', 'You may not have access to edit this record');
					console.log(err);
				})

}
//-------------------------------------------
activate()
//-------------------------------------------

// FUNCTIONS
//===========================================

	/*
	Return to Detail Page
	*/
	function returnToDetails(){
		$state.go('app.' + _.lowerCase(currentEntity) + '-details', {id: $stateParams.id })
	}


	function socialPlaceholder(social){
		switch(social) {
		    case 'linkedIn':
		    if(currentEntity == 'Company'){
   				   return 'https://www.linkedin.com/company/username'
		    } else {
		    	   return 'https://www.linkedin.com/username'
		    }	
		        break;
		    case 'twitter':
		        return 'https://twitter.com/username';
		        break;
		    case 'facebook':
		        return 'https://www.facebook.com/username';
		        break;
		}

	}



	function save(noAlert){
		//need to clear out empty array
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

		//save record
		 return $injector.get(currentEntity).prototype$patchAttributes({"id": $scope.data.thisRecord.id}, $scope.data.thisRecord).$promise
        .then(function(response) {
            if(!noAlert) {
              Logger.info('Record updated');
            }

            if($scope.data.thisRecord.primaryCompany && ($scope.data.thisRecord.primaryCompany !== $scope.data.prevPrimaryCompany)){

				  $q.when(
				     $scope.data.prevPrimaryCompany 
				     ? unlinkCompany($scope.data.thisRecord, $scope.data.prevPrimaryCompany, false)
				     : null
				  )
				  //Now create new link 
				  .then(function(){ 
				    return linkCompany($scope.data.thisRecord, $scope.data.thisRecord.primaryCompany, true)
				    		.then(function(results){
				    			returnToDetails(currentEntity, $scope.data.thisRecord.id);
				    		})
				  })
				  .catch(function(err){
				  	Logger.error('Error linking primary company', 'please remove before proceeding');
				  })
			}
			else {
				returnToDetails(currentEntity, $scope.data.thisRecord.id);
			}

            
        })
        .catch(function(err) {
            Logger.error('Error updating Record');
            Logger.log(err);
        });

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

	function removeAddress(address, addresses){
		addresses.splice(addresses.indexOf(address), 1);
	}

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


//TB - TODO - Look at moving the broadcast messages into a shared factory 
function linkCompany(record, company, updateGrid){
  return RelationshipManager.linkEntity(record, company, currentEntity, "Company",  
  {
    "from": { "name": record.name, "description": "Primary Org", "isPrimary": true}, 
    "to" : { "name": company.name, "description": "Primary Org", "isPrimary": true}
  })
  .then(function(results){
    // console.log(results);
      $scope.data.thisRecord.primaryCompany = results; 
      $scope.data.prevPrimaryCompany = results; //set new current since link was changed 
       //add this to entityLinks array of this opp
      $scope.data.thisRecord.entityLinks.push(results); 
      // console.log($scope.data.thisRecord);
  }); 
}; 

function unlinkCompany(record, company, updateGrid) {
    //do this from company side to get back in format that matches relatedEntities 
    return RelationshipManager.unlinkEntity(record, company, currentEntity, "Company")
    .then(function(results){
      // console.log(results);
      //remove from the loaded related items - keep as chained promise 
      _.remove($scope.data.thisRecord.entityLinks, {'entityId' :  company.entityId}); 
      //$rootScope.$broadcast('OPP_UPDATED', {"id": opp.id}); 
    }); 
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
