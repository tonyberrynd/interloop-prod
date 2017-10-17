angular.module('interloop.factory.configService', [])


.factory('configService', function($rootScope, $q, $timeout, $state, LoopBackAuth, Appuser, $injector, Org) {

    //service object
    var configService = {
        init: init,
        shutDown: shutDown
    };

    return configService;

    /////////////////////////////////////////


    function init(isMobile) {
        console.log('init');

        return $q.all([
            Appuser.findById({ id: Appuser.getCurrentId()}).$promise,
            Org.findOne().$promise
        ])
         .then(function(results){

          console.log(results);

          //set rootScope values
          //----------------------
          $rootScope.activeUser = results[0];
          //active org
          $rootScope.activeOrg = results[1];

          if(!isMobile){

            //instantiate pusher
            var pusher = $injector.get('$pusher')(client);

            //realtime updates
            //----------------------
            var notificationsChannelName = 'notifications-' + Appuser.getCurrentId();
            var notificationsChannel = pusher.subscribe(notificationsChannelName);

            //should we launch the onboarding modal?
            //----------------------
            if(!$rootScope.activeUser.onboarding) {
              $injector.get('modalManager').openModal('onboarding');
            }

            //bind notification channel
            //----------------------
            notificationsChannel.bind('new_notification', function(data) {
                console.log('new notification');
                // showWebNotification(data.notification); 
            })

            //boot up intercom
            //----------------------
            $injector.get('$intercom').boot({
              app_id: "vp6k9wou",
              id: Appuser.getCurrentId(),
              name: $rootScope.activeUser.fullName,
              email: $rootScope.activeUser.email,
              created_at: $rootScope.activeUser.createdOn
             });

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


          //Setup Config Need & Return
         //----------------------

            return {'test': 'test'}
        })
         .catch(function(err){

           LoopBackAuth.clearUser();
           LoopBackAuth.clearStorage();

           $state.go('login')
         })

    }



    function shutDown() {

        // clear rootscope user and org
        $rootScope.activeOrg = null;
        $rootScope.activeUser = null;

        //unbind real time updates
        notificationsChannel.unbind('new_notification');

        var pusher = $injector.get('$pusher')(client);
        pusher.unsubscribe(notificationsChannelName);

        //shutdown intercom
        $intercom.shutdown();

        // go to login state
        $state.go('login');

    }




});