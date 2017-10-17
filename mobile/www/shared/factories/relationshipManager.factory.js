angular.module('interloop.factory.relationshipManager', [])

.factory('RelationshipManager', function($http, $q, Appuser, Logger, $injector) {

    var RelationManager = {
        getPrimary: getPrimary,
        getFirst: getFirst, 
        getPrimaryOrFirst: getPrimaryOrFirst, 
        getTags: getTags,  
        getActivities: getActivities, 
        getItems: getItems, 
        getEntities: getEntities, 
        linkEntity: linkEntity, 
        unlinkEntity: unlinkEntity, 
        linkItem: linkItem, 
        unlinkItem: unlinkItem, 
        linkActivity: linkActivity, 
        unlinkActivity: unlinkActivity, 
        linkReference: linkReference, 
        unlinkReference: unlinkReference, 
        relateToWizard: relateToWizard
    };

    return RelationManager;

    //////// Functions defined here

    function getPrimary(entityLinks, entityType) {
       return  _.find(entityLinks, {"entityType": entityType, "isPrimary": true}); 
    }; 

    function getFirst(entityLinks, entityType) {
       return  _.find(entityLinks, {"entityType": entityType}); 
    }; 

     function getPrimaryOrFirst(entityLinks, entityType) {
       var item = getPrimary(entityLinks, entityType);  //get primary if it exists 
       item = _.isNil(item) ? getFirst(entityLinks, entityType) : item;  //get first if no primary 
       item = item || null; //set to null if both are missing 
       return  item; 
    }; 

    function getTags(items, entityType) { 
       return  _.filter(items, {'itemType' : 'Tag'}) || []; 
    }; 

    function getEntities(entityType, entityId)
    {
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 
        return entityModel.prototype$__get__entities({"id": entityId}).$promise
    }; 

    function getItems(entityType, entityId)
    {
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 
        return entityModel.prototype$__get__items({"id": entityId}).$promise
    }; 

     function getActivities(entityType, entityId)
    {
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 
        return entityModel.prototype$__get__activities({"id": entityId}).$promise
    }; 

    //TB - TODO - add error handling in case only one side gets created 
    function linkEntity(entity, entityToLink, entityType, entityLinkType, relationship){
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 
        var entityLinkModel = $injector.get(entityLinkType);

        //from relationship 
        return entityLinkModel.prototype$__create__entities(
            {"id": entityToLink.id},
            { 
                "entityId": entity.id, 
                "entityType": entityType, 
                "name": _.get(relationship.from, "name", null),
                "description":  _.get(relationship.from, "description", null),
                "isPrimary": _.get(relationship.from, "isPrimary", false)
            }
        ).$promise 

        //to relationship       
        .then(function(results){
            return entityModel.prototype$__create__entities(
            {"id": entity.id},
            {
                "entityId": entityToLink.id, 
                "entityType": entityLinkType, 
                "name": _.get(relationship.to, "name", null),
                "description":  _.get(relationship.to, "description", null),
                "isPrimary": _.get(relationship.to, "isPrimary", false)
            }
            ).$promise
        })  
    }; 

    function unlinkEntity(entity, entityLink, entityType, entityLinkType) {
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 
        var entityLinkModel = $injector.get(entityLinkType);

        //to relationship        
        return entityModel.prototype$__destroyById__entities(
        { 
            "id": _.get(entity, "id", "NoID"), 
            "fk": _.get(entityLink, "id", null)
        }).$promise

        //get sister link 
        .then(function(results){
            return entityLinkModel.prototype$__get__entities(
                {"id": _.get(entityLink, "entityId", null), "filter": {"where":{"entityId": entity.id}}}
            ).$promise
        })        
        //from relationship 
        .then(function(results){
            var otherEntityLink = results[0]; 
            return entityLinkModel.prototype$__destroyById__entities(
            { 
                "id": _.get(entityLink, "entityId", null), 
                "fk": _.get(otherEntityLink, "id", null)
            }).$promise
        })
    }; 

    //TB - TODO Switch to send full entities versus just ids to match entityLink structure 

    function linkActivity(activityId, linkItemId, linkEntityType, relationship){
        var linkEntityModel = $injector.get(linkEntityType);
        var activityModel = $injector.get("Activity");
        

        //to relationship 
        return linkEntityModel.prototype$__create__activities(
            {"id": linkItemId},
            {
                "activityId": activityId, 
                "name": _.get(relationship.activity, "name", null),
                "type": _.get(relationship.activity, "type.value", null),
                "completed": _.get(relationship.activity, "completed", false)
        }).$promise
        //from Relationship 
        .then(function(results){
            return activityModel.prototype$__create__entities(
                {"id": activityId},
                {
                    "entityId": linkItemId, 
                    "entityType": linkEntityType, 
                    "name": _.get(relationship.entity, "name", null),
                    "description":  _.get(relationship.entity, "description", null),
                    "isPrimary": _.get(relationship.entity, "isPrimary", false)
                }
            ).$promise
        }); 
    }; 

    function unlinkActivity(activity, entityLink, entityLinkType){
        var entityLinkModel = $injector.get(entityLinkType);
        var activityModel = $injector.get("Activity");
        

       //to relationship        
        return activityModel.prototype$__destroyById__entities(
        { 
            "id": activity.id, 
            "fk": entityLink.id
        }).$promise

        //get sister link 
        .then(function(results){
            return entityLinkModel.prototype$__get__activities(
                {"id": entityLink.entityId, "filter": {"where":{"activityId": activity.id}}}
            ).$promise
        }) 
                
        //from relationship 
        .then(function(results){
            var otherEntityLink = results[0]; 
            return entityLinkModel.prototype$__destroyById__activities(
            { 
                "id": entityLink.entityId, 
                "fk": otherEntityLink.id
            }).$promise
        })
    }; 


     //need to create link from linkEntity side so that return is correct 
    function linkItem(entityItemId, linkItemId, entityType, linkItemType, relationship){
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 
       
        return entityModel.prototype$__create__items(
            {"id": entityItemId},
            {
                "itemId": linkItemId, 
                "itemType": linkItemType, 
                "name": _.get(relationship, "name", null),
                "description":  _.get(relationship, "description", null)
            }
        ).$promise
    }; 

    function unlinkItem(entityItemId, linkItemId, entityType, linkItemType) {
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 

        //use entityId if it exists otherwise id
        if(entityItemId != null){

             return entityModel.prototype$__destroyById__items(
            { 
                "id": entityItemId, 
                "fk": linkItemId
            }).$promise
        }
        else return $q.when(null);  //keep as promise    
    }; 




    //need to create link from linkEntity side so that return is correct 
    function linkReference(entityItemId, referenceItemId, entityType, referenceTypePlural){
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 
           
        return entityModel[referenceTypePlural].link(
            {"id": entityItemId, "fk": referenceItemId}
        ).$promise 
    }; 

     function unlinkReference(entityItemId, referenceItemId, entityType, referenceTypePlural) {
        var entityModel = $injector.get(entityType);  //get model for linkEntityType 

        //use entityId if it exists otherwise id
        if(referenceItemId != null){
            return entityModel[referenceTypePlural].unlink(
            { 
                "id": entityItemId, 
                "fk": referenceItemId
            }).$promise
        }
        else return $q.when(null);  //keep as promise    
    }; 

     function relateToWizard(entityItem, entityType, relatedToEntities, picklists) {
        //prevents double modal - do nothing if already set to true 
        var relateEntityModal = $injector.get('$uibModal').open({
            animation: true,
            templateUrl: 'shared/modals/relateEntity-modal.tpl.html',
            controller: 'relateEntityCtrl',
            backdrop: 'static',
            size: 'lg',
            windowClass: 'modal-fade-in-scale-up',
            resolve: {
                relatedToInfo: function() {
                    return { 
                        currentEntity: entityItem, //used by Modal to understand where to link tag 
                        entityType: entityType, 
                        relatedToEntities: relatedToEntities, 
                        picklists: picklists
                    }   
                }
            }
        });
        //result on closing modal
        return relateEntityModal.result
    }; 

});