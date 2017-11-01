/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.addAddressCtrl', [])
//declare dependencies
.controller('addAddressCtrl', function(
	$scope,
  $log, 
  resolvedData,
  $uibModalInstance,
  toastr) {

// BINDABLES
//===========================================
  

	//data
	//----------------------
	$scope.data = {};
  $scope.data.address = _.get(resolvedData, 'address', null) || {};
  $scope.data.ac = _.get(resolvedData, 'address', null) ? resolvedData.address.street_number + ' ' + resolvedData.address.route : null;

  //functions
  $scope.clearAll = clearAll;
  $scope.cancel = cancel;
  $scope.ok = ok;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/
function clearAll(){
  $scope.data.ac = null;
  $scope.data.address = {};
}

/*
Save
*/
function ok() {
  $uibModalInstance.close($scope.data.address);
}

/*
Dismiss Note Modal
*/
function cancel() {
  $uibModalInstance.dismiss('cancel');
}

//-------------------------------------------


// EVENTS
//===========================================


$scope.$watch('data.ac',function(newVal,oldVal) {
    if(_.has(newVal,'geometry')) {
        console.log('select new value', newVal);

        //clear address to start
        var address = {};

        //key mappers
         var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
          };

        //fill out form
        for (var i = 0; i < newVal.address_components.length; i++) {
          var addressType = newVal.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = newVal.address_components[i][componentForm[addressType]];
            address[addressType] = val;
          }
        }

        console.log(address);


        //map into scope
        //-----------------------------

        //set model to mirror address line 1
        $scope.data.ac = address.street_number + ' ' + address.route || '';

        //address line 1
        $scope.data.address.address_line1 = address.street_number + ' ' + address.route;
        $scope.data.address.region = address.administrative_area_level_1 || null;
        $scope.data.address.locality = address.locality || null;
        $scope.data.address.country = address.country || null;
        $scope.data.address.postal_code = address.postal_code || null;

    }
});
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});
