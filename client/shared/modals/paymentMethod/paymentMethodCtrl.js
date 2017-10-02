/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.paymentMethodCtrl', [])
//decalre dependencies
.controller('paymentMethodCtrl', function(
  $scope
) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};

    $scope.card = {
    name: 'Mike Brown',
    number: '5555 4444 3333 1111',
    expiry: '11 / 2020',
    cvc: '123'
  };

  $scope.cardPlaceholders = {
    name: 'Your Full Name',
    number: 'xxxx xxxx xxxx xxxx',
    expiry: 'MM/YY',
    cvc: 'xxx'
  };

  $scope.cardMessages = {
    validDate: 'valid\nthru',
    monthYear: 'MM/YYYY',
  };

  $scope.cardOptions = {
    debug: false,
    formatting: true,
    width: 500 //optional
  };


  //functions
  //----------------------

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================
//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});