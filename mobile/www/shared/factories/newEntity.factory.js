angular.module('interloop.factory.newEntityFactory', [])

.factory('newEntityFactory', function($log, $rootScope, $uibModal, $q, $http, $injector, searchEntities, entityTypes) {

    var newEntityFactory = {
        createNew: createNew
    };

    return newEntityFactory;

    ////////


    function createNew(entityType, entity) {

    	//get model
    	var entityModel = $injector.get(entityType);

    	//extend entity with necessary extras
    	var currentUser = {
    		'id': $rootScope.activeUser.id, 
    		'initials': $rootScope.activeUser.initials,
    		'fullName': $rootScope.activeUser.fullName,
    		'avatar': $rootScope.activeUser.avatar
    	}
    	//updated by
    	entity.updatedBy = currentUser;
    	entity.createdBy = currentUser;

    	//create model and return results with promise
    	return entityModel.create(entity).$promise

    }


   });