/* ==========================================================================
   Sidebar Action - Create Note
   ========================================================================== */

angular.module('interloop.paymentMethodCtrl', [])
//decalre dependencies
.controller('paymentMethodCtrl', function(
  $scope,
  $timeout
) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.card = {};
  $scope.data.activated = false;

  var card1 = {
    name: 'Mike Brown',
    number: '5555 4444 3333 1111',
    expiry: '11 / 2020',
    cvc: '123'
  };
  var card2 = {
    name: 'Bill Smith',
    number: '4321 4321 4321 4321',
    expiry: '02 / 2018',
    cvc: '591'
  };

  var selectedCard = 1;
  $scope.card = card1;


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
    formatting: true
  };

  //functions
  //----------------------

//-------------------------------------------


// ACTIVATE
//===========================================
function activate(){
  $timeout(function(){
    $scope.data.activated = true;
  }, 500)
}

activate();
//-------------------------------------------


// FUNCTIONS
//===========================================
//-------------------------------------------


// EVENTS
//===========================================
// Events go here
//-------------------------------------------

});