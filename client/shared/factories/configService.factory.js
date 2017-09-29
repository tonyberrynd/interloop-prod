angular.module('interloop.factory.configService', [])


.factory('configService', function(
    $rootScope, 
    $q, 
    $http,
    $timeout, 
    $location,
    $state, 
    $mixpanel,
    featureFlags, 
    featureFlagManager, 
    LoopBackAuth, 
    AppRole, 
    CustomField, 
    Appuser, 
    modalManager,
    ActivityType,
    $injector, 
    Org) {

    //service object
    var configService = {
        init: init,
        shutDown: shutDown
    };

    return configService;

    /////////////////////////////////////////


    function init(isMobile) {
        console.log('init');
        $rootScope.initializing = true;

    return $http.get('/api/ping')
          .then(function(results){

          //reject if not result
          if(!results){
            return $q.reject('API-ISSUES');
          }

        return $q.all([
            Appuser.findOne({'filter': {'where': {'id': Appuser.getCurrentId() || window.localStorage.$LoopBack$currentUserId }, 'include': {'role':'permissions'}}}).$promise,
            Org.findOne().$promise,
            CustomField.find().$promise,
            Appuser.notifications.count({'id': Appuser.getCurrentId(), "where": {'read': false} }).$promise,
            ActivityType.find().$promise,
            Appuser.find().$promise
        ])
         .then(function(results){

          console.log(results);

          //set rootScope values
          //----------------------
          $rootScope.activeUser = results[0];
          //active org
          $rootScope.activeOrg = results[1];
          //custom fields
          $rootScope.customFields = results[2];

          //unread notification count
          $rootScope.unreadNotifications = results[3].count || 0;

          //trial info
          $rootScope.trialEnabled = results[1].trialEnabled || false;
          $rootScope.trialEndDate = results[1].trialEndDate || null;

          //activity types
          $rootScope.activityTypes = results[4] || [];

          //appusers
          var peopleLabels = [];
          _.forEach(results[5], function(value) {
            if(value.fullName){
              peopleLabels.push({"label": value.fullName})
            }
          })
          $rootScope.appusers = peopleLabels;

          //set feature flags
          //------------------------
          featureFlags.set(featureFlagManager.getFeatureFlags($rootScope.activeOrg.id, 'BASIC'));


          if(!isMobile){

            //instantiate pusher
            var pusher = $injector.get('$pusher')(client);

            //realtime updates
            //----------------------
            var notificationsChannelName = 'notifications-' + Appuser.getCurrentId();
            var notificationsChannel = pusher.subscribe(notificationsChannelName);

            //should we launch the onboarding modal?
            //----------------------
            // if(!$rootScope.activeUser.onboarding) {
            //   $injector.get('modalManager').openModal('onboarding');
            // }

            //bind notification channel
            //----------------------
            notificationsChannel.bind('new_notification', function(data) {
                console.log('new notification');
                // showWebNotification(data.notification); 

                $rootScope.unreadNotifications++
            })

            //boot up intercom
            //----------------------
            $injector.get('$intercom').boot({
              app_id: "vp6k9wou",
              id: Appuser.getCurrentId(),
              name: $rootScope.activeUser.firstName + ' ' + $rootScope.activeUser.lastName,
              email: $rootScope.activeUser.email,
              created_at: $rootScope.activeUser.createdOn
             });


            //full story
            //---------------------
            FS.identify($rootScope.activeUser.id, {
              displayName: $rootScope.activeUser.firstName + ' ' + $rootScope.activeUser.lastName,
              email: $rootScope.activeUser.email
            });

            //mixpanel
            //----------------------
            $mixpanel.identify($rootScope.activeUser.id);
            $mixpanel.people.set({
                name: $rootScope.activeUser.firstName + ' ' + $rootScope.activeUser.lastName,
                email: $rootScope.activeUser.email
            });

            //headway app - changelog
            //----------------------
            // var config = {
            //   selector: ".navtop-left",
            //   account: "x9ejRx"
            // };
            // //just check to make sure exists
            // if(Headway) {
            //   console.log('init headway');
            //   Headway.init(config);
            // }

            //configure rollbar
            //----------------------
            // Rollbar.configure({
            //   payload: {
            //     person: {
            //       id: Appuser.getCurrentId(),
            //       name: $rootScope.activeUser.fullName,
            //       email: $rootScope.activeUser.email
            //     }
            //   }
            // });

          }

          //User Onboarding
          //------------------------------------------
          if(!$rootScope.activeUser.userOnboarding) {
            modalManager.openModal('userOnboarding');
          }



          //Setup Config Need & Return
         //----------------------
            $rootScope.initializing = false;
            return {'test': 'test'}
        })
         .catch(function(err){
           $rootScope.initializing = false;
           return $q.reject(err);
         })
      })
      .catch(function(err){
          $rootScope.initializing = false;
          return $q.reject('API-ISSUES');
       })

    }



    function shutDown() {

        // clear rootscope user and org
        $rootScope.activeOrg = null;
        $rootScope.activeUser = null;

        var pusher = $injector.get('$pusher')(client);

        //realtime updates
        //----------------------
        var notificationsChannelName = 'notifications-' + Appuser.getCurrentId();
        var notificationsChannel = pusher.subscribe(notificationsChannelName);

        //unbind real time updates
        notificationsChannel.unbind('new_notification');
        pusher.unsubscribe(notificationsChannelName);

        //shutdown intercom
        // $intercom.shutdown();

        // go to login state
        $state.go('login');

    }




});