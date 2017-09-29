angular.module('interloop.oauth.factory', [])

.factory('OAuthFactory', function($window, $timeout,BASE, Appuser) {


    //vars
    //----------------------
    var CONNECTURL = BASE.URL.replace("/api", "");

    var OAuthFactory = {
    	connectOffice365: connectOffice365
    };

    return OAuthFactory;


    /////////////////////////////////////////

    //office 365
    function connectOffice365(account) {

        var url = CONNECTURL + '/connect_office365?userId=' + Appuser.getCurrentId();

        authPopup(url);
    }

    //google
    function connectGoogle() {

        var url = CONNECTURL + '/connect_google?userId=' + Appuser.getCurrentId();

        authPopup(url);
    }

    //icloud
    function connectIcloud() {

        var url = CONNECTURL + '/connect_office365?userId=' + Appuser.getCurrentId();

        authPopup(url);
    }

    //evernote
    function connectEvernote() {

        var url = CONNECTURL + '/connect_evernote?userId=' + Appuser.getCurrentId();

        authPopup(url);
    }

    //dropbox
    function connectDropbox() {

        var url = CONNECTURL + '/connect_office365?userId=' + Appuser.getCurrentId();

        authPopup(url);
    }

    //box
    function connectBox() {

        var url = CONNECTURL + '/connect_office365?userId=' + Appuser.getCurrentId();

        authPopup(url);
    }

    function connectCalendar() {
        var url = 'https://app.cronofy.com/oauth/authorize?response_type=code&client_id=lcfLKt_57ddS6Fcy--JrJPUFXqpI6_-i&redirect_uri=http://localhost:3001/settings/integrations&scope=read_events&avoid_linking=true';

        authPopup(url);
    }

    var authWindow;

    function authPopup(url) {
         var url = url,
            width = 800,
            height = 600,
            top = (window.outerHeight - height) / 2,
            left = (window.outerWidth - width) / 2;

        // window.name = "myMainWindow";

        var littleWindow = authWindow = $window.open(url, 'google_login', 'width=' + width + ',height=' + height + ',scrollbars = 0, top=' + top + ',left=' + left);

        //waits until popup window list loaded and then starts checking auth status
        littleWindow.addEventListener('load', check_auth_status(), true); 
    }


    function getUrlParameters(parameter, staticURL, decode) {
       var currLocation = (staticURL.length)? staticURL : window.location.search,
           parArr = currLocation.split("?")[1].split("&"),
           returnBool = true;

       for(var i = 0; i < parArr.length; i++){
            parr = parArr[i].split("=");
            if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            }else{
                returnBool = false;
            }
       }

       console.log(parArr);

       if(!returnBool) return false;
    };


    function check_auth_status() {


    // check popup window url
        try {
            console.log(authWindow.document.domain);
            console.log(authWindow.location.href);
            console.log(document.domain);

          if (authWindow.document.domain === document.domain) {
            // console.log(authWindow.document.URL);
            var status = getUrlParameters('status', authWindow.location.href, true);
            //when auth is complete the code param will be present from facebook
            if (status) {
              console.log('AUTH COMPLETE.');
              authWindow.close();
            }
          }
        } 
        catch(e) {
            // console.log(e);
          //domain mismatch catch
          console.log('Checking auth...');
        }
     
        //on window close
        if (authWindow.closed) {
          console.log('AUTH WINDOW CLOSED.');
          // $scope.authEnd();
        }
        else $timeout(function(){ check_auth_status() }, 5000);

    }



});