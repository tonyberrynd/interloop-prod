angular.module('interloop.factory.shareLink', [])

.factory('ShareLinkFactory', function($location, entityTypes) {

	var host = $location.host();
	var port = $location.port();

    var ShareLinkFactory = {
    	getShareLink: getShareLink
    };

    return ShareLinkFactory;

    /////////////////////////////////////////


    function getShareLink(entityType, id) {

        var plural = entityTypes[entityType.toLowerCase()].plural.toLowerCase();

    	//different for localhost and deployed
    	if(host.includes('localhost')){
    		return 'http://' + host + ':' + port + '/' + entityType.toLowerCase() + '/' + id
    	} else {
        //build shared link
    		return 'https://' + host + '/' + entityType.toLowerCase() + '/' + id
    	}

    }


});