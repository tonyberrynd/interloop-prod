/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.activityEditCtrl', [])
//declare dependencies
.controller('activityEditCtrl', function(
	$scope,
	$stateParams,
	$rootScope,
	$injector,
	$state,
	Activity,
	Logger,
	modalManager,
	ActivityFields,
	EndFields,
	gridManager,
	socialTypes,
	emailTypes,
	phoneTypes
 ) {

// BINDABLES
//===========================================

	//Vars
	//---------------------
	var entityType = 'Activity';

	//data
	//----------------------
	$scope.data = {};
	$scope.data.activated = false;
	$scope.data.currentEntity = 'Activity';
	$scope.data.socialTypes = socialTypes;
	$scope.data.emailTypes = emailTypes;
	$scope.data.phoneTypes = phoneTypes;

	//get fields
	$scope.data.fields = ActivityFields;

	//custom fields
	$scope.data.customFields = _.filter($rootScope.customFields,function(o){
        return _.includes(o.useWith, 'Activity');
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

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){

	return Activity.findOne({"filter": {"where": {"id": $stateParams.id}}}).$promise	
				.then(function(results){
					$scope.data.thisRecord = results

					_.forEach($scope.data.fields, function(value){
						if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
							$scope.data.thisRecord[value.key] = $scope.data.thisRecord[value.key] || [{}];
						}
					})

					_.forEach($scope.data.customFields, function(value){
						if(value.type == 'social' || value.type == 'phone' || value.type == 'email'){
							$scope.data.thisRecord[value.key] = $scope.data.thisRecord[value.key] || [{}];
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
		$state.go('app.activity-details', {id: $stateParams.id })
	}



	function save(noAlert){
		 return Activity.prototype$patchAttributes({"id": $scope.data.thisRecord.id}, $scope.data.thisRecord).$promise
        .then(function(response) {
            if(!noAlert) {
              Logger.info('Record updated');
            }
            gridManager.refreshView();
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
// Watches go here
//-------------------------------------------

});
