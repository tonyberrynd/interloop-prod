/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.opportunityEditCtrl', [])
//declare dependencies
.controller('opportunityEditCtrl', function(
	$scope,
	$stateParams,
	$rootScope,
	$injector,
	$state,
	Opportunity,
	Logger,
	modalManager,
	OpportunityFields,
	EndFields,
	socialTypes,
	emailTypes,
	phoneTypes
 ) {

// BINDABLES
//===========================================
	//Vars
	//---------------------
	var entityType = 'Opportunity';

	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;
	$scope.data.currentEntity = 'Opportunity';
	$scope.data.socialTypes = socialTypes;
	$scope.data.emailTypes = emailTypes;
	$scope.data.phoneTypes = phoneTypes;

	//get fields
	$scope.data.fields = OpportunityFields;

	//custom fields
	$scope.data.customFields = _.filter($rootScope.customFields,function(o){
        return _.includes(o.useWith, 'Opportunity');
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

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){

	return Opportunity.findOne({"filter": {"where": {"id": $stateParams.id}}}).$promise	
				.then(function(results){
					$scope.data.thisRecord = results

					_.forEach($scope.data.fields, function(value){
						if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
							$scope.data.thisRecord[value.key] = $scope.data.thisRecord[value.key].length ? $scope.data.thisRecord[value.key] : [{}];
						}
					})

					_.forEach($scope.data.customFields, function(value){
						if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
							$scope.data.thisRecord[value.key] = $scope.data.thisRecord[value.key].length ? $scope.data.thisRecord[value.key] : [{}];
						}
					})

					$scope.data.activated = true;
				})
				.catch(function(err){
					Logger.error('Error Fetching Record For Editing', 'You may not have access to edit this record');
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
		$state.go('app.opportunity-details', {id: $stateParams.id })
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



		//save opportunity
		 return Opportunity.prototype$patchAttributes({"id": $scope.data.thisRecord.id}, $scope.data.thisRecord).$promise
        .then(function(response) {
            if(!noAlert) {
              Logger.info('Record updated');
            }
            returnToDetails();
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

	function removeAddress(adddress, addresses){
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
