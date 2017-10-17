/* ==========================================================================
   Power Bi Dashboards Ctrl
   ========================================================================== */

angular.module('interloop.powerbiCtrl', [])
//declare dependencies
.controller('powerbiCtrl', function(
  $scope,
  $http,
  $q, 
  $state,
  $stateParams,
  $sce, 
  $timeout,
  $rootScope, 
  Logger,
  adalAuthenticationService) {

// BINDABLES
//===========================================
  //data
  //----------------------
  $scope.data = {};
  $scope.data.thisDashboard = {};
 
  //default settings for powerBI configuration 
  $scope.data.embedConfig = {
    settings: {
      filterPaneEnabled: true,
      navContentPaneEnabled: false
  }}; 
    


  //functions
  //----------------------
    $scope.onEmbedded = onEmbedded; 
    $scope.getReports = getReports; 
    $scope.o365Login = o365Login;
    $scope.o365Logout = o365Logout;
    $scope.selectPage = selectPage;


//-------------------------------------------


// ACTIVATE
//===========================================
function activate() {

    if (adalAuthenticationService.userInfo.isAuthenticated) {
        $scope.data.mConnected = true;
        getReports(); 
    }

}
//-------------------------------------------
activate();
//-------------------------------------------


// FUNCTIONS
//===========================================


function o365Login() {

  if(!window.localStorage.adalClientId){
    alert('PowerBI Not Configured For This Organization', 'Please contact support if you believe this is in error');
  } else {
        adalAuthenticationService.login();
  }
}


function o365Logout(){
  adalAuthenticationService.logOut();
}

/* 
Select Report 
*/ 
function selectReport (report) {
    //set current report which will load new embedUrl via powerbi Directive bound to scope
    report.type = "report"; 
    report.settings = $scope.data.embedConfig.settings;
    report.accessToken = adalAuthenticationService.getCachedToken("https://analysis.windows.net/powerbi/api"); 
    $scope.data.thisDashboard.currentReport = report; 
};

/*
Select Page in Report 
*/
function selectPage (page) {
    //var activePage = _.find(currentEntity.dashboard.currentReport.pages, page); 
    page.setActive(); 
    $scope.data.thisDashboard.currentPage = page; 
};

/* 
Get List of reports for this Org 
*/ 
function getReports(){
    var currentUser = $rootScope.activeUser; 
    var matchingRoles = _.intersection(["ADMIN","MANAGER","REP"], currentUser.roles); 
    var topRole = matchingRoles.length > 0 ? matchingRoles[0] : "REP"; 

    var groups = _.get($rootScope.activeOrg.config, 'powerBI.groups', null);
    var group = _.find(groups, ["role",topRole]) || null; 
    var groupId = _.get(group, 'groupId', null);  

    //var powerBI_config = _.get($rootScope.activeOrg.config, "powerBI.graphClientId", null); 
    //var groupId = _.get($rootScope.activeOrg.config, 'powerBI.groupId', null); 

    var reportUrl = "https://api.powerbi.com/v1.0/myorg/" + 
        (groupId != null ? "groups/" + groupId  + '/' : '') + 'reports'; 

//"https://api.powerbi.com/v1.0/myorg/groups/1b69a5d4-5d80-4ada-95dc-ad8c681fcbf1/reports"

  $http.get(reportUrl)
  .then(function(response){
      $scope.data.thisDashboard.reports = response.data.value;  //set dashboard info
      selectReport(response.data.value[0]); //change to read default report from config data 
  })
  .catch(function(err){
    console.log(err);
  }) 
}; 

/* 
Event Function called once reports is embedded 
*/ 
//TB - need to move to shared factory   
function onEmbedded (report){
    report.on('loaded', function(event) { 
        report.getPages()
        .then(function(pages){
            //var newPages = _.map(pages, function(o){return _.omit(o,'report')}); //remove self reference 
            $scope.$evalAsync(function(){
                 $scope.data.thisDashboard.pages = pages; 
            })
        })
    });

    report.on('pageChanged', function(event){
        var page = event.detail.newPage;
        $scope.$evalAsync(function(){
            $scope.data.thisDashboard.currentPage = page; 
        })
    })
}; 


//-------------------------------------------


// EVENTS
//===========================================
// optional
  // $scope.$on("adal:loginSuccess", function () {
  //     $scope.testMessage = "loginSuccess";
  //     console.log('login success');
  //     getReports();
  // });


  $scope.$on("adal:loginSuccess", function () {
    $scope.data.mConnected = true;
    activate();
  });

  // optional
  $scope.$on("adal:loginFailure", function () {
      $scope.testMessage = "loginFailure";
      console.log('login failure');
  });

  // optional
  $scope.$on("adal:notAuthorized", function (event, rejection, forResource) {
      $scope.testMessage = "It is not Authorized for resource:" + forResource;
      console.log('adal unathorized');
  });
//-------------------------------------------

});