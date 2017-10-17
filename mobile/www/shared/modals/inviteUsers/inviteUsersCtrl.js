/* ==========================================================================
   Settings - Invite User Ctrl
   ========================================================================== */

angular.module('interloop.inviteUsersCtrl', [])
//declare dependencies
.controller('inviteUsersCtrl', function(
  $scope, 
  $uibModalInstance, 
  $q,
  Appuser,
  Logger) {

// BINDABLES
//===========================================
  //data
  //----------------------
   $scope.data = {};
   $scope.data.invitees = [{id: '1'}];

  //functions
  //----------------------
  $scope.addNewChoice = addNewChoice;
  $scope.removeItem = removeItem;
  $scope.ok = ok;
  $scope.cancel = cancel;

//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
add invite form user
*/
function addNewChoice() {
  var newItemNo = $scope.data.invitees.length+1;
  $scope.data.invitees.push({'id': newItemNo});
};
     

/*
remove invite form user 
*/    
function removeItem(invite) {
   var index = $scope.data.invitees.indexOf(invite);
   $scope.data.invitees.splice(index, 1);
};

/*
Submit Modal 
*/  
function ok() {

  var newUserPromises = [];

  _.forEach($scope.data.invitees, function(invite, key){
    //push promises
    newUserPromises.push(Appuser.create({ 
      email: invite.email,
      firstName: invite.first || null,
      lastName: invite.last || null,
      password: randomString()
    }).$promise)

  })

  //complete updates
  $q.all(newUserPromises)
      .then(function(results){
        console.log(results);
        //show response
        Logger.info("Successfully Sent Invites");
        //close modal
        $uibModalInstance.close(results);
      })
      .catch(function(err){
        Logger.error("Error Sending Invites");
        $uibModalInstance.dismiss('cancel');
      })
};


/*
Submit Modal 
*/
function cancel() {
  $uibModalInstance.dismiss('cancel');
};


/*
Creates Random String
*/
function randomString() {
  var letters = ['a','b','c','d','e','f','g','h','i','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var numbers = [0,1,2,3,4,5,6,7,8,9];
    var randomstring = '';

        for(var i=0;i<5;i++){
            var rlet = Math.floor(Math.random()*letters.length);
            randomstring += letters[rlet];
        }
        for(var i=0;i<3;i++){
            var rnum = Math.floor(Math.random()*numbers.length);
            randomstring += numbers[rnum];
        }
  return randomstring;
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