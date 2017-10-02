/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('interloop.addAddressCtrl', [])
//declare dependencies
.controller('addAddressCtrl', function(
	$scope,
  $log, 
  $uibModalInstance,
  toastr) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};
  $scope.data.address = {};
  $scope.data.ac = null;

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
        $scope.data.address = {};

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
            $scope.data.address[addressType] = val;
          }
        }

        //set to street address
        $scope.data.ac = $scope.data.address.route || '';

    }
});
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});
