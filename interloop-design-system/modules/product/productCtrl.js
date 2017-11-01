/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('coil.productCtrl', [])
//declare dependencies
.controller('productCtrl', function(
	$scope,
  $log, 
  $q,
  $timeout,
  $uibModal,
  $http,
  Lightbox,
  toastr) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};

  $scope.data.currentTab = '1';

  $scope.data.serverError = false;

  $scope.data.results = [];
  $scope.data.loadingResults = false;

  $scope.data.noteText = 'Lets set up a time to meet next week what do you think? should we really dig in on it and test a lot of optoins that might work for them';

  $scope.data.people = [
    { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
    { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
    { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
    { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
    { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
    { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
    { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
    { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
  ];

  $scope.totalItems = 64;
  $scope.currentPage = 4;
  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;

  $scope.minSlider = {
        value: 10
  }

  $scope.images = [
    {
      'name': "test_image.png",
      'url': 'http://via.placeholder.com/250X250',
      'caption': 'Optional caption',
      'thumbUrl': 'http://via.placeholder.com/50X50' 
    },
    {
      'name': "test_image2.png",
      'url': 'http://via.placeholder.com/350X250',
      'thumbUrl': 'http://via.placeholder.com/50X50' 
    },
    {
      'name': "test_image3.png",
      'url': 'http://via.placeholder.com/250X450',
      'thumbUrl': 'http://via.placeholder.com/50X50' 
    },
    {
      'name': "test_image4.png",
      'url': 'http://via.placeholder.com/900X900',
      'thumbUrl': 'http://via.placeholder.com/50X50' 
    },
    {
      'name': "test_image4.png",
      'url': 'http://via.placeholder.com/1200X1200',
      'thumbUrl': 'http://via.placeholder.com/50X50' 
    },
    {
      'name': "back_link_test.png",
      'url': 'http://via.placeholder.com/234203948',
      'thumbUrl': 'http://via.placeholder.com/50X50' 
    }
  ];

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };

  $scope.alert = function(text){
    angular.element(document.getElementsByClassName("ui-select-search")).focus();
  }

  $scope.getPeople = function(searchVal){
    var deferred = $q.defer();
    $scope.data.results = [];
    $scope.data.loadingResults = true;

    var people = _.filter($scope.data.people, ['name', searchVal])

    $scope.data.results = people;

    $timeout(function(){
      deferred.resolve($scope.data.results);
      $scope.data.loadingResults = false;
      return deferred.promise;
    }, 2500)
  }

  $scope.success = function(){
    toastr.info('Copied Link', 'Link Succesfully Added To Clipboard');
  }

  $scope.error = function(){
    toastr.error('Copy Error', 'Error Copying Link, Please Try Again In A Moment');
  }

	//functions
	//----------------------

  $scope.showSuccess = showSuccess;
  $scope.showWarning = showWarning;
  $scope.showError = showError;
  $scope.showInfo = showInfo;

  $scope.showSmallModal = showSmallModal;
  $scope.showMediumModal = showMediumModal;
  $scope.showLargeModal = showLargeModal;
  $scope.showWarningModal = showWarningModal;
  $scope.showDangerModal = showDangerModal;
// 
  $scope.addAddressModal = addAddressModal;

  $scope.showMediaPicker = showMediaPicker;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

    $scope.random = function() {
    var value = Math.floor(Math.random() * 100 + 1);
    var type;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    // $scope.showWarning = type === 'danger' || type === 'warning';

    $scope.dynamic = value;
    $scope.type = type;
  };

  $scope.random();

  $scope.randomStacked = function() {
    $scope.stacked = [];
    var types = ['success', 'info', 'warning', 'danger'];

    for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
        var index = Math.floor(Math.random() * 4);
        $scope.stacked.push({
          value: Math.floor(Math.random() * 30 + 1),
          type: types[index]
        });
    }
  };

  $scope.randomStacked();


  $scope.addresses = [];
  $scope.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
      .then(function(response) {
        $scope.addresses = response.data.results
      });
  };


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

function showSuccess(){
  toastr.success('Hello world!', 'Toastr fun!');
}

function showInfo(){
  toastr.info('Hello world!', 'Toastr fun!');
}

function showError(){
  toastr.error('Hello world!', 'Toastr fun!');
}

function showWarning(){
  toastr.warning('Hello world!', 'Toastr fun!');
}



function showSmallModal(parentSelector){
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './modules/product/smallModal.tpl.html',
      controller: null,
      size: 'sm',
      appendTo: parentElem
    });

    modalInstance.result.then(function () {
      console.log('closed modal with result');
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

}

function showMediumModal(parentSelector){
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './modules/product/mediumModal.tpl.html',
      controller: null,
      size: 'md',
      appendTo: parentElem
    });

    modalInstance.result.then(function () {
      console.log('closed modal with result');
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

}

function showLargeModal(parentSelector){
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './modules/product/smallModal.tpl.html',
      controller: null,
      size: 'lg',
      appendTo: parentElem
    });

    modalInstance.result.then(function () {
      console.log('closed modal with result');
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

}


function showWarningModal(parentSelector){
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './modules/product/warningModal.tpl.html',
      controller: null,
      size: 'md',
      appendTo: parentElem
    });

    modalInstance.result.then(function () {
      console.log('closed modal with result');
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

}

function showDangerModal(parentSelector){
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './modules/product/dangerModal.tpl.html',
      controller: null,
      size: 'md',
      appendTo: parentElem
    });

    modalInstance.result.then(function () {
      console.log('closed modal with result');
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

}


function addAddressModal(parentSelector){
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './modules/product/addAddressModal.tpl.html',
      controller: 'addAddressCtrl',
      size: 'sm',
      appendTo: parentElem
    });

    modalInstance.result.then(function () {
      console.log('closed modal with result');
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

}




function showMediaPicker(parentSelector){
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './assets/html/mediaPicker.tpl.html',
      controller: null,
      size: 'lg',
      windowClass: 'media-picker',
      appendTo: parentElem
    });

    modalInstance.result.then(function () {
      console.log('closed modal with result');
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

}

//-------------------------------------------


// EVENTS
//===========================================
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});
